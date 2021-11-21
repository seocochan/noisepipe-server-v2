import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { SearchUsers } from '../../../../interface-adapters/interfaces/user/search-users.interface';

export class SearchUsersRequest implements SearchUsers {
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
