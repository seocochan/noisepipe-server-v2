import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

// TODO: add interface
export class SearchCollectionsRequest {
  @IsNotEmpty()
  q!: string;

  // TODO: validate encoding
  cursor?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  size: number = 10;
}
