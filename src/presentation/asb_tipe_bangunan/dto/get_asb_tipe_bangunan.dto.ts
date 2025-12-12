import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class GetAsbTipeBangunanDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    amount?: number;
}
