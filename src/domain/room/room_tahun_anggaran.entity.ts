export class RoomTahunAnggaran {
  id!: number;
  /** Room used as API context; rows are stored per kabkota (fiscal_years). */
  room_id!: number;
  kabkota_id?: number | null;
  tahun!: number;
  is_active!: boolean;
  createdAt!: Date;
}
