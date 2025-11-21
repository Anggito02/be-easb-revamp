import { IsNumber, Min } from 'class-validator';

export class GetAsbLantaiDetailDto {
  @IsNumber()
  @Min(1)
  id!: number;
}
