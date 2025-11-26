import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from '../entities/api-key.entity';
import { CreateApiKeyDto, UpdateApiKeyDto } from './dto/api-key.dto';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeysService {
    constructor(
        @InjectRepository(ApiKey)
        private apiKeyRepository: Repository<ApiKey>,
    ) { }

    async create(createApiKeyDto: CreateApiKeyDto): Promise<ApiKey> {
        const apiKey = this.generateApiKey();

        const newApiKey = this.apiKeyRepository.create({
            ...createApiKeyDto,
            apiKey,
        });

        return this.apiKeyRepository.save(newApiKey);
    }

    async findAll(hotelId: string, isActive?: boolean): Promise<ApiKey[]> {
        const where: any = { hotelId };

        if (isActive !== undefined) {
            where.isActive = isActive;
        }

        return this.apiKeyRepository.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<ApiKey> {
        const apiKey = await this.apiKeyRepository.findOne({ where: { id } });

        if (!apiKey) {
            throw new NotFoundException('API Key bulunamadı');
        }

        return apiKey;
    }

    async findByKey(apiKey: string): Promise<ApiKey | null> {
        return this.apiKeyRepository.findOne({
            where: { apiKey, isActive: true },
        });
    }

    async update(id: string, updateApiKeyDto: UpdateApiKeyDto): Promise<ApiKey> {
        const apiKey = await this.findOne(id);

        Object.assign(apiKey, updateApiKeyDto);
        return this.apiKeyRepository.save(apiKey);
    }

    async remove(id: string): Promise<void> {
        const apiKey = await this.findOne(id);
        await this.apiKeyRepository.remove(apiKey);
    }

    async updateLastUsed(id: string): Promise<void> {
        await this.apiKeyRepository.update(id, {
            lastUsedAt: new Date(),
        });
    }

    private generateApiKey(): string {
        return `ew_${crypto.randomBytes(32).toString('hex')}`;
    }
}
