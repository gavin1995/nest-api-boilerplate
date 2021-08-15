import { ApiProperty } from '@nestjs/swagger';

export class PageRequestDto {
  @ApiProperty({ description: '当前页码' })
  page: number;

  @ApiProperty({ required: false, description: '当前页数据条数' })
  pageSize: number;
}
