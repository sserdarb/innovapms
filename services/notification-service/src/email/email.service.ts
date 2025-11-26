import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransporter({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendReservationConfirmation(data: {
        to: string;
        guestName: string;
        reservationNumber: string;
        checkInDate: string;
        checkOutDate: string;
        roomType: string;
        totalAmount: number;
    }) {
        const template = this.loadTemplate('reservation-confirmation');
        const html = template(data);

        await this.transporter.sendMail({
            from: process.env.SMTP_FROM || 'noreply@elektraweb.com',
            to: data.to,
            subject: `Rezervasyon Onayı - ${data.reservationNumber}`,
            html,
        });
    }

    async sendCheckInReminder(data: {
        to: string;
        guestName: string;
        reservationNumber: string;
        checkInDate: string;
        roomNumber: string;
    }) {
        const template = this.loadTemplate('checkin-reminder');
        const html = template(data);

        await this.transporter.sendMail({
            from: process.env.SMTP_FROM || 'noreply@elektraweb.com',
            to: data.to,
            subject: `Check-in Hatırlatma - ${data.reservationNumber}`,
            html,
        });
    }

    async sendInvoice(data: {
        to: string;
        guestName: string;
        folioNumber: string;
        totalAmount: number;
        pdfBuffer?: Buffer;
    }) {
        const template = this.loadTemplate('invoice');
        const html = template(data);

        const mailOptions: any = {
            from: process.env.SMTP_FROM || 'noreply@elektraweb.com',
            to: data.to,
            subject: `Fatura - ${data.folioNumber}`,
            html,
        };

        if (data.pdfBuffer) {
            mailOptions.attachments = [
                {
                    filename: `fatura-${data.folioNumber}.pdf`,
                    content: data.pdfBuffer,
                },
            ];
        }

        await this.transporter.sendMail(mailOptions);
    }

    private loadTemplate(templateName: string): handlebars.TemplateDelegate {
        const templatePath = path.join(__dirname, '../../templates', `${templateName}.hbs`);
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        return handlebars.compile(templateSource);
    }
}
