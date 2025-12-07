import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { HistoryEntryDto, HistoryResponseDto } from './dto';

@ApiTags('history')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all history entries',
    description: 'Returns all check history entries (both automatic and manual)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Maximum number of history entries to return',
    example: 50,
  })
  @ApiResponse({
    status: 200,
    description: 'List of history entries',
    type: HistoryResponseDto,
  })
  async getAll(@Query('limit') limit?: string): Promise<HistoryResponseDto> {
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    const entries = await this.historyService.getAll(limitNum);
    const total = await this.historyService.count();

    return {
      total,
      entries,
    };
  }
}


