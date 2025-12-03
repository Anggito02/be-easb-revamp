import { IsNumber } from "class-validator";

export class GetAsbByMonthYearDto {
    @IsNumber()
    month: number;

    @IsNumber()
    year: number;
}