import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('Email')
@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @Post('reservation-confirmation')
    @ApiOperation({ summary: 'Rezervasyon onay maili gönder' })
    async sendReservationConfirmation(@Body() data: any) {
        await this.emailService.sendReservationConfirmation(data);
        return { success: true, message: 'Email sent successfully' };
    }

    @Post('checkin-reminder')
    @ApiOperation({ summary: 'Check-in hatırlatma maili gönder' })
    async sendCheckInReminder(@Body() data: any) {
        await this.emailService.sendCheckInReminder(data);
        return { success: true, message: 'Email sent successfully' };
    }

    @Post('invoice')
    @ApiOperation({ summary: 'Fatura maili gönder' })
    async sendInvoice(@Body() data: any) {
        await this.emailService.sendInvoice(data);
        return { success: true, message: 'Email sent successfully' };
    }
}
