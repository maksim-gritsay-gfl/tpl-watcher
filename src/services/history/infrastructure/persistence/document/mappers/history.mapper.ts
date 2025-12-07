import { HistoryEntryDto } from '../../../../dto';
import { HistoryCreateDto } from '../../../../dto/history-create.dto';
import { HistoryEntity } from '../entities/history.entity';

export class HistoryMapper {
  static toDomain(entity: HistoryEntity): HistoryEntryDto {
    const dto = new HistoryEntryDto();
    dto.id = entity.id;
    dto.timestamp = entity.timestamp.toISOString();
    dto.result = entity.result;
    dto.type = entity.type;
    dto.message = entity.message;
    return dto;
  }

  static toEntity(dto: HistoryCreateDto): Partial<HistoryEntity> {
    return {
      result: dto.result,
      type: dto.type,
      message: dto.message,
    };
  }
}

