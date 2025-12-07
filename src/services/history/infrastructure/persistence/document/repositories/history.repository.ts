import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryEntity } from '../entities/history.entity';
import { HistoryEntryDto } from '../../../../dto';
import { HistoryCreateDto } from '../../../../dto/history-create.dto';
import { HistoryMapper } from '../mappers/history.mapper';

@Injectable()
export class HistoryRepository {
  constructor(
    @InjectRepository(HistoryEntity)
    private readonly repository: Repository<HistoryEntity>,
  ) {}

  async create(dto: HistoryCreateDto): Promise<HistoryEntryDto> {
    const entity = this.repository.create(HistoryMapper.toEntity(dto));
    const saved = await this.repository.save(entity);
    return HistoryMapper.toDomain(saved);
  }

  async findAll(limit?: number): Promise<HistoryEntryDto[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('history')
      .orderBy('history.timestamp', 'DESC');

    if (limit) {
      queryBuilder.take(limit);
    }

    const entities = await queryBuilder.getMany();
    return entities.map(HistoryMapper.toDomain);
  }

  async findById(id: string): Promise<HistoryEntryDto | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? HistoryMapper.toDomain(entity) : null;
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}

