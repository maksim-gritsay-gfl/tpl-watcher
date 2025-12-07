import { Injectable } from '@nestjs/common';
import { HistoryEntryDto } from './dto';
import { HistoryCreateDto } from './dto/history-create.dto';
import { HistoryRepository } from './infrastructure/persistence/document/repositories/history.repository';

@Injectable()
export class HistoryService {
  constructor(private readonly historyRepository: HistoryRepository) {}

  async add(history: HistoryCreateDto): Promise<HistoryEntryDto> {
    return this.historyRepository.create(history);
  }

  async getAll(limit?: number): Promise<HistoryEntryDto[]> {
    return this.historyRepository.findAll(limit);
  }

  async findById(id: string): Promise<HistoryEntryDto | null> {
    return this.historyRepository.findById(id);
  }

  async count(): Promise<number> {
    return this.historyRepository.count();
  }
}
