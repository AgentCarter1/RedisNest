import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisMessageDataDto } from './dto/redisMessageData.dto';
import { RedisConnection } from './connection/redis.connection';

@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    this.client = new RedisConnection().connectionRedis();
  }

  async setMessageData(
    messageId: string,
    data: RedisMessageDataDto,
  ): Promise<string> {
    try {
      const reply = await this.client.hmset(messageId, data);
      return reply;
    } catch (error) {
      throw new Error(`Error setting data: ${error.message}`);
    }
  }

  async getMessageData(messageId: string): Promise<RedisMessageDataDto> {
    try {
      const result = await this.client.hgetall(messageId);
      if (!result) {
        throw new Error('No data found');
      }

      return this.convertToRedisMessageDataDto(result);
    } catch (error) {
      throw new Error(`Error retrieving data: ${error.message}`);
    }
  }

  private convertToRedisMessageDataDto(
    result: Record<string, string>,
  ): RedisMessageDataDto {
    return {
      userCid: result['userCid'],
      relayNo: result['relayNo'],
      companyId: result['companyId'],
      sboxUuid: result['sboxUuid'],
      reqMessage: result['reqMessage'],
      resMessage: result['resMessage'],
      messageDetailEnum: result['messageDetailEnum'],
      messageId: result['messageId'],
      status: result['status'] === 'true', // Boolean dönüşümü
    };
  }
}
