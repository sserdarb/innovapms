import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ReportsService {
    async generateOccupancyReport(data: {
        hotelName: string;
        startDate: string;
        endDate: string;
        totalRooms: number;
        occupiedRooms: number;
        revenue: number;
    }): Promise<Buffer> {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));

        // Header
        doc.fontSize(20).text('Doluluk Raporu', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Otel: ${data.hotelName}`);
        doc.text(`Tarih Aralığı: ${data.startDate} - ${data.endDate}`);
        doc.moveDown();

        // Stats
        doc.fontSize(14).text('İstatistikler', { underline: true });
        doc.moveDown();
        doc.fontSize(12);
        doc.text(`Toplam Oda: ${data.totalRooms}`);
        doc.text(`Dolu Oda: ${data.occupiedRooms}`);
        doc.text(`Doluluk Oranı: ${((data.occupiedRooms / data.totalRooms) * 100).toFixed(2)}%`);
        doc.text(`Toplam Gelir: ₺${data.revenue.toLocaleString('tr-TR')}`);

        doc.end();

        return new Promise((resolve) => {
            doc.on('end', () => resolve(Buffer.concat(buffers)));
        });
    }

    async generateReservationsExcel(reservations: any[]): Promise<Buffer> {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Rezervasyonlar');

        // Headers
        worksheet.columns = [
            { header: 'Rezervasyon No', key: 'reservationNumber', width: 20 },
            { header: 'Misafir', key: 'guestName', width: 25 },
            { header: 'Check-in', key: 'checkInDate', width: 15 },
            { header: 'Check-out', key: 'checkOutDate', width: 15 },
            { header: 'Durum', key: 'status', width: 15 },
            { header: 'Tutar', key: 'totalAmount', width: 15 },
        ];

        // Style header
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF3B82F6' },
        };

        // Add data
        reservations.forEach((res) => {
            worksheet.addRow({
                reservationNumber: res.reservationNumber,
                guestName: res.guestName,
                checkInDate: res.checkInDate,
                checkOutDate: res.checkOutDate,
                status: res.status,
                totalAmount: `₺${res.totalAmount}`,
            });
        });

        return await workbook.xlsx.writeBuffer() as Buffer;
    }

    async generateFoliosPDF(folios: any[]): Promise<Buffer> {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));

        doc.fontSize(20).text('Folyo Raporu', { align: 'center' });
        doc.moveDown();

        folios.forEach((folio, index) => {
            if (index > 0) doc.addPage();

            doc.fontSize(14).text(`Folyo No: ${folio.folioNumber}`);
            doc.moveDown();
            doc.fontSize(12);
            doc.text(`Toplam İşlem: ₺${folio.totalCharges}`);
            doc.text(`Ödenen: ₺${folio.totalPayments}`);
            doc.text(`Bakiye: ₺${folio.balance}`);
            doc.text(`Durum: ${folio.status}`);
        });

        doc.end();

        return new Promise((resolve) => {
            doc.on('end', () => resolve(Buffer.concat(buffers)));
        });
    }
}
