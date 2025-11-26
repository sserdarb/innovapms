import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoliosController } from './folios.controller';
import { FoliosService } from './folios.service';
import { Folio } from '../entities/folio.entity';
import { FolioTransaction } from '../entities/folio-transaction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Folio, FolioTransaction])],
    controllers: [FoliosController],
    providers: [FoliosService],
    exports: [FoliosService],
})
export class FoliosModule { }
