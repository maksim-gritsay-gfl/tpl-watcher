import { ApiProperty } from '@nestjs/swagger';
import { HistoryEntryDto } from './history-entry.dto';

export class HistoryResponseDto {
  @ApiProperty({
    description: 'Total number of history entries',
    example: 150,
  })
  total: number;

  @ApiProperty({
    description: 'Array of history entries',
    type: [HistoryEntryDto],
  })
  entries: HistoryEntryDto[];
}

