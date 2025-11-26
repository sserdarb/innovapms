import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private connectedClients = new Map<string, string>(); // socketId -> hotelId

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        this.connectedClients.delete(client.id);
    }

    @SubscribeMessage('join-hotel')
    handleJoinHotel(client: Socket, hotelId: string) {
        this.connectedClients.set(client.id, hotelId);
        client.join(`hotel-${hotelId}`);
        console.log(`Client ${client.id} joined hotel ${hotelId}`);
    }

    // Room status update
    notifyRoomStatusChange(hotelId: string, roomData: any) {
        this.server.to(`hotel-${hotelId}`).emit('room-status-changed', roomData);
    }

    // New reservation
    notifyNewReservation(hotelId: string, reservationData: any) {
        this.server.to(`hotel-${hotelId}`).emit('new-reservation', reservationData);
    }

    // Reservation update
    notifyReservationUpdate(hotelId: string, reservationData: any) {
        this.server.to(`hotel-${hotelId}`).emit('reservation-updated', reservationData);
    }

    // Check-in
    notifyCheckIn(hotelId: string, data: any) {
        this.server.to(`hotel-${hotelId}`).emit('check-in', data);
    }

    // Check-out
    notifyCheckOut(hotelId: string, data: any) {
        this.server.to(`hotel-${hotelId}`).emit('check-out', data);
    }

    // Folio update
    notifyFolioUpdate(hotelId: string, folioData: any) {
        this.server.to(`hotel-${hotelId}`).emit('folio-updated', folioData);
    }
}
