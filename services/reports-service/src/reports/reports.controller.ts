import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Post('occupancy/pdf')
    @ApiOperation({ summary: 'Doluluk raporu PDF oluştur' })
    async generateOccupancyPDF(@Body() data: any, @Res() res: Response) {
        const pdf = await this.reportsService.generateOccupancyReport(data);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=doluluk-raporu.pdf');
        res.send(pdf);
    }

    @Post('reservations/excel')
    @ApiOperation({ summary: 'Rezervasyon raporu Excel oluştur' })
    async generateReservationsExcel(@Body() data: { reservations: any[] }, @Res() res: Response) {
        const excel = await this.reportsService.generateReservationsExcel(data.reservations);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=rezervasyonlar.xlsx');
        res.send(excel);
    }

    @Post('folios/pdf')
    @ApiOperation({ summary: 'Folyo raporu PDF oluştur' })
    async generateFoliosPDF(@Body() data: { folios: any[] }, @Res() res: Response) {
        const pdf = await this.reportsService.generateFoliosPDF(data.folios);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=folyolar.pdf');
        res.send(pdf);
    }
}
