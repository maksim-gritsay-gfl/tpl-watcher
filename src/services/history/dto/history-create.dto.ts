import { ApiProperty } from '@nestjs/swagger';

export class HistoryCreateDto {
  @ApiProperty({
    description: 'Result of the check',
    enum: ['OFFER', 'NO OFFER', 'ERROR'],
    example: 'NO OFFER',
  })
  result: 'OFFER' | 'NO OFFER' | 'ERROR';

  @ApiProperty({
    description:
      'Type of check - automatic (scheduled) or manual (triggered via API)',
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
