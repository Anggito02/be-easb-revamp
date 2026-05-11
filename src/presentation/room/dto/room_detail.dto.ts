export class RoomDetailDto {
    id!: number;
    kode_room!: string;
    nama!: string;
    kabkota_id!: number | null;
    kabkota_nama?: string;
    contract_start!: Date | null;
    contract_end!: Date | null;
    is_active!: boolean;
    tahun_anggarans!: number[];
    createdAt!: Date;
    updatedAt!: Date;
}
