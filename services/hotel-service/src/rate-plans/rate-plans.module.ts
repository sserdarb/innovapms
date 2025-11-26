import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatePlansController } from './rate-plans.controller';
import { RatePlansService } from './rate-plans.service';
import { RatePlan } from '../entities/rate-plan.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RatePlan])],
    controllers: [RatePlansController],
    providers: [RatePlansService],
    exports: [RatePlansService],
})
export class RatePlansModule { }
