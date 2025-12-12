import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetUserDetailDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  id!: number;
}
