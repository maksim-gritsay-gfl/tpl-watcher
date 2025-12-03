import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { HistoryService } from './history.service';

@Module({
  imports: [],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
