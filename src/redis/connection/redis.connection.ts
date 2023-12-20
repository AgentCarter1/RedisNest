import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisConnection {
  private client: Redis;
  public connectionRedis() {
    this.client = new Redis({
      host: 'localhost',
      port: 6379,
    });
    return this.client;
  }
}
