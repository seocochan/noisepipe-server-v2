import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { SearchUser } from '../../../../interface-adapters/interfaces/user/search-user.interface';

export class SearchUserRequest implements SearchUser {
  @IsNotEmpty()
  q!: string;

  @ApiProperty({ required: false })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({ required: false })
  @IsInt()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  size: number = 10;
}
