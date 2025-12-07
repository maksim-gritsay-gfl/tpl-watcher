import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { HistoryEntity } from './infrastructure/persistence/document/entities/history.entity';
import { HistoryRepository } from './infrastructure/persistence/document/repositories/history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity])],
  controllers: [HistoryController],
  providers: [HistoryService, HistoryRepository],
  exports: [HistoryService],
})
export class HistoryModule {}
