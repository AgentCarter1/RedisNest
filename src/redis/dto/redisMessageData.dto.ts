import { ApiProperty } from '@nestjs/swagger';
export class RedisMessageDataDto {
  @ApiProperty()
  userCid: string;
  @ApiProperty()
  relayNo: string;
  @ApiProperty()
  companyId: string;
  @ApiProperty()
  sboxUuid: string;
  @ApiProperty()
  reqMessage: string;
  @ApiProperty()
  resMessage: string;
  @ApiProperty()
  messageDetailEnum: string;
  @ApiProperty()
  messageId: string;
  @ApiProperty()
  status: boolean; // POK or Not
}
