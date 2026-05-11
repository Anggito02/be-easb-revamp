import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ActivateRoomDto {
    @IsBoolean()
    @IsNotEmpty()
    is_active!: boolean;
}
