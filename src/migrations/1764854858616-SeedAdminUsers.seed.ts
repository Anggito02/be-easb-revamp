import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcryptjs';

export class SeedAdminUsers1764854858616 implements MigrationInterface {
    name = 'SeedAdminUsers1764854858616';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Hash password "Admin12345678"
        const hashedPassword = await bcrypt.hash('Admin12345678', 10);

        // Data Admin users
        const adminUsers = [
            'AdminBAP1',      // Bagian Administrasi Pembangunan 1
            'AdminBAP2',      // Bagian Administrasi Pembangunan 2
            'AdminB1',        // BPKAD 1
            'AdminB2',        // BPKAD 2
            'AdminBPPD1',     // Badan Perencanaan Pembangunan Daerah 1
            'AdminBPPD2',     // Badan Perencanaan Pembangunan Daerah 2
            'AdminSDPRD',     // Sekretariat DPRD
            'AdminBPPD',      // Badan Perencanaan Pembangunan Daerah
            'AdminBPKDAD',    // Badan Pengelolaan Keuangan Dan Aset Daerah
            'AdminBPD',       // Badan Pendapatan Daerah
            'AdminBKDPSDM',   // Badan Kepegawaian Dan Pengembangan Sumber Daya Manusia
            'AdminBRDID',     // Badan Riset Dan Inovasi Daerah
            'AdminID'         // Inspektorat Daerah
        ];

        // Insert admin users
        for (const username of adminUsers) {
            await queryRunner.query(`
                INSERT INTO "users" ("username", "password_hash", "roles")
                VALUES ($1, $2, ARRAY['admin'])
                ON CONFLICT ("username") DO NOTHING
            `, [username, hashedPassword]);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete admin users created by this seed
        const adminUsers = [
            'AdminBAP1', 'AdminBAP2', 'AdminB1', 'AdminB2', 'AdminBPPD1', 'AdminBPPD2',
            'AdminSDPRD', 'AdminBPPD', 'AdminBPKDAD', 'AdminBPD', 'AdminBKDPSDM',
            'AdminBRDID', 'AdminID'
        ];

        await queryRunner.query(`
            DELETE FROM "users" WHERE "username" = ANY($1)
        `, [adminUsers]);
    }
}
