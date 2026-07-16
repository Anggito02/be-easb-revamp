import { Role } from "./user_role.enum";

export class User {
  id!: number;
  username!: string;
  email!: string | null;
  passwordHash?: string; // jangan expose keluar layer
  roles!: Role[];
  refreshTokenVersion!: number;
  room_id!: number | null; // null for SUPERADMIN, set for ADMIN/VERIFIKATOR/OPD
  is_active!: boolean;
}