import { IsNumber, IsOptional, ValidateIf } from 'class-validator';

export class AssignKabkotaDto {
    @ValidateIf((o) => o.kabkota_id !== null)
    @IsOptional()
    @IsNumber()
    kabkota_id!: number | null;
}
