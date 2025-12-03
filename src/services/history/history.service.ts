import { Injectable } from '@nestjs/common';
import { TplCheckerService } from '../tpl-checker/tpl-checker.service';
import { HistoryEntryDto } from './dto';

@Injectable()
export class HistoryService {
  private historyData: HistoryEntryDto[] = [];

  add(history: HistoryEntryDto) {
    this.historyData.push(history);
  }
  
  getAll(): HistoryEntryDto[] {
    return this.historyData;
  }
}
