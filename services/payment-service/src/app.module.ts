import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTransaction } from './entities/payment-transaction.entity';
import { POSConfiguration } from './entities/pos-configuration.entity';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { POSConfigController } from './pos/pos-config.controller';
import { POSFactory } from './pos/pos.factory';
import { StripeProvider } from './providers/stripe.provider';
import { IyzicoProvider } from './providers/iyzico.provider';
import { PayTRProvider } from './providers/paytr.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'elektraweb_payment',
      entities: [PaymentTransaction, POSConfiguration],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forFeature([PaymentTransaction, POSConfiguration]),
  ],
  controllers: [PaymentController, POSConfigController],
  providers: [
    PaymentService,
    POSFactory,
    StripeProvider,
    IyzicoProvider,
    PayTRProvider,
  ],
})
export class AppModule {}
