import { Controller, All, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Proxy')
@Controller()
export class ProxyController {
    private readonly services = {
        auth: process.env.AUTH_SERVICE_URL || 'http://auth-service:3001',
        hotel: process.env.HOTEL_SERVICE_URL || 'http://hotel-service:3002',
        reservation: process.env.RESERVATION_SERVICE_URL || 'http://reservation-service:3003',
        folio: process.env.FOLIO_SERVICE_URL || 'http://folio-service:3004',
        integration: process.env.INTEGRATION_SERVICE_URL || 'http://integration-service:3005',
    };

    constructor(private readonly httpService: HttpService) { }

    @All('auth/*')
    @ApiOperation({ summary: 'Proxy to Auth Service' })
    async proxyAuth(@Req() req: Request, @Res() res: Response) {
        return this.proxy('auth', req, res);
    }

    @All('hotels/*')
    @All('room-types/*')
    @All('rooms/*')
    @ApiOperation({ summary: 'Proxy to Hotel Service' })
    async proxyHotel(@Req() req: Request, @Res() res: Response) {
        return this.proxy('hotel', req, res);
    }

    @All('reservations/*')
    @ApiOperation({ summary: 'Proxy to Reservation Service' })
    async proxyReservation(@Req() req: Request, @Res() res: Response) {
        return this.proxy('reservation', req, res);
    }

    @All('folios/*')
    @ApiOperation({ summary: 'Proxy to Folio Service' })
    async proxyFolio(@Req() req: Request, @Res() res: Response) {
        return this.proxy('folio', req, res);
    }

    @All('integrations/*')
    @All('webhooks/*')
    @ApiOperation({ summary: 'Proxy to Integration Service' })
    async proxyIntegration(@Req() req: Request, @Res() res: Response) {
        return this.proxy('integration', req, res);
    }

    private async proxy(service: string, req: Request, res: Response) {
        try {
            const serviceUrl = this.services[service];
            const path = req.url.replace('/api/', '');
            const url = `${serviceUrl}/${path}`;

            const response = await firstValueFrom(
                this.httpService.request({
                    method: req.method,
                    url,
                    data: req.body,
                    headers: {
                        ...req.headers,
                        host: undefined,
                    },
                }),
            );

            res.status(response.status).json(response.data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).json(error.response.data);
            } else {
                throw new HttpException(
                    'Service unavailable',
                    HttpStatus.SERVICE_UNAVAILABLE,
                );
            }
        }
    }
}
