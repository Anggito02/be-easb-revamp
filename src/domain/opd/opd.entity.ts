export class Opd {
  id!: number;
  opd!: string;
  alias!: string;
  id_user!: number;
  room_id!: number | null; // required for OPD; nullable initially, enforced NOT NULL in Phase 3
}
