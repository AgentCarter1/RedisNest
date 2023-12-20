import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { RedisMessageDataDto } from './redis/dto/redisMessageData.dto';

@Controller()
export class AppController {
  constructor(private readonly redisService: RedisService) {}

  @Post('set/:messageId')
  async setMessageData(
    @Param('messageId') messageId: string,
    @Body() data: RedisMessageDataDto,
  ): Promise<string> {
    await this.redisService.setMessageData(messageId, data);
    return `Data set for messageId ${messageId}`;
  }

  @Get('get/:messageId')
  async getMessageData(
    @Param('messageId') messageId: string,
  ): Promise<RedisMessageDataDto> {
    const data = await this.redisService.getMessageData(messageId);
    return data;
  }
}
