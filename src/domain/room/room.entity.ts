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
  /** Filled on list/detail reads when joined from kabkotas */
  kabkota_nama?: string | null;
  /** Filled on list/detail reads when joined from provinces via kabkota */
  province_nama?: string | null;
  /** Tahun anggaran for this room's linked kabupaten/kota (from fiscal_years) */
  tahun_anggaran?: number[];
}
