import { Type, Transform } from "class-transformer";
import { IsNumber, IsNotEmpty, IsOptional, Min } from "class-validator";

export class GetAsbTipeBangunanDto {
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page!: number;

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    amount!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    room_id?: number;
}
