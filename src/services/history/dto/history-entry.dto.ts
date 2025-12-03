import { ApiProperty } from '@nestjs/swagger';

export class HistoryEntryDto {
  @ApiProperty({
    description: 'Unique identifier for the history entry',
    example: '1704067200000-abc123def',
  })
  id: string;

  @ApiProperty({
    description: 'Timestamp when the check was performed',
    example: '2024-01-01T00:00:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Result of the check',
    enum: ['OFFER', 'NO OFFER', 'ERROR'],
    example: 'NO OFFER',
  })
  result: 'OFFER' | 'NO OFFER' | 'ERROR';

  @ApiProperty({
    description: 'Type of check - automatic (scheduled) or manual (triggered via API)',
    enum: ['automatic', 'manual'],
    example: 'automatic',
  })
  type: 'automatic' | 'manual';

  @ApiProperty({
    description: 'Optional message associated with the check',
    example: 'Check completed successfully',
    required: false,
  })
  message?: string;
}

