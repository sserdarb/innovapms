import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Webhook } from '../entities/webhook.entity';
import { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WebhooksService {
    constructor(
        @InjectRepository(Webhook)
        private webhookRepository: Repository<Webhook>,
        private httpService: HttpService,
    ) { }

    async create(createWebhookDto: CreateWebhookDto): Promise<Webhook> {
        const webhook = this.webhookRepository.create(createWebhookDto);
        return this.webhookRepository.save(webhook);
    }

    async findAll(hotelId: string, isActive?: boolean): Promise<Webhook[]> {
        const where: any = { hotelId };

        if (isActive !== undefined) {
            where.isActive = isActive;
        }

        return this.webhookRepository.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Webhook> {
        const webhook = await this.webhookRepository.findOne({ where: { id } });

        if (!webhook) {
            throw new NotFoundException('Webhook bulunamadı');
        }

        return webhook;
    }

    async findByEvent(hotelId: string, event: string): Promise<Webhook[]> {
        const webhooks = await this.webhookRepository
            .createQueryBuilder('webhook')
            .where('webhook.hotelId = :hotelId', { hotelId })
            .andWhere('webhook.isActive = :isActive', { isActive: true })
            .andWhere(':event = ANY(webhook.events)', { event })
            .getMany();

        return webhooks;
    }

    async update(id: string, updateWebhookDto: UpdateWebhookDto): Promise<Webhook> {
        const webhook = await this.findOne(id);

        Object.assign(webhook, updateWebhookDto);
        return this.webhookRepository.save(webhook);
    }

    async remove(id: string): Promise<void> {
        const webhook = await this.findOne(id);
        await this.webhookRepository.remove(webhook);
    }

    async trigger(hotelId: string, event: string, payload: any): Promise<void> {
        const webhooks = await this.findByEvent(hotelId, event);

        for (const webhook of webhooks) {
            await this.sendWebhook(webhook, event, payload);
        }
    }

    private async sendWebhook(webhook: Webhook, event: string, payload: any): Promise<void> {
        const data = {
            event,
            timestamp: new Date().toISOString(),
            data: payload,
        };

        try {
            await firstValueFrom(
                this.httpService.post(webhook.url, data, {
                    timeout: webhook.timeoutSeconds * 1000,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(webhook.secret && { 'X-Webhook-Secret': webhook.secret }),
                    },
                }),
            );
        } catch (error) {
            console.error(`Webhook failed for ${webhook.name}:`, error.message);
            // TODO: Implement retry logic and logging
        }
    }
}
