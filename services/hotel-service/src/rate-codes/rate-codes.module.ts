import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateCodesController } from './rate-codes.controller';
import { RateCodesService } from './rate-codes.service';
import { RateCode } from '../entities/rate-code.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RateCode])],
    controllers: [RateCodesController],
    providers: [RateCodesService],
    exports: [RateCodesService],
})
export class RateCodesModule { }
