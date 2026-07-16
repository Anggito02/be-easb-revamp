import { IsString, MinLength, IsNumber, IsOptional } from 'class-validator';

export class ChangeUserPasswordDto {
  @IsNumber()
  userId!: number;

  @IsString()
  @MinLength(8)
  newPassword!: string;

  /** Deprecated: superadmin/admin no longer need to send their password for this flow. */
  @IsOptional()
  @IsString()
  currentPassword?: string;
}
