export class Room {
  id!: number;
  kode_room!: string;
  nama!: string;
  kabkota_id!: number | null;
  contract_start!: Date | null;
  contract_end!: Date | null;
  is_active!: boolean;
  created_by_user_id!: number | null;
  createdAt!: Date;
  updatedAt!: Date;
}
