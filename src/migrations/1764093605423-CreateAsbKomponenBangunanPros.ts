import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAsbKomponenBangunanPros1764093605423 implements MigrationInterface {
    name = 'CreateAsbKomponenBangunanPros1764093605423';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "asb_komponen_bangunan_pros" (
                "id" SERIAL PRIMARY KEY,
                "id_asb_komponen_bangunan" INTEGER NOT NULL,
                "id_asb_tipe_bangunan" INTEGER NOT NULL,
                "min" DOUBLE PRECISION NOT NULL,
                "avg_min" DOUBLE PRECISION NOT NULL,
                "avg" DOUBLE PRECISION NOT NULL,
                "avg_max" DOUBLE PRECISION NOT NULL,
                "max" DOUBLE PRECISION NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL,
                CONSTRAINT "fk_asb_komponen_bangunan_pros_komponen" 
                    FOREIGN KEY ("id_asb_komponen_bangunan") 
                    REFERENCES "asb_komponen_bangunan"("id") 
                    ON DELETE CASCADE,
                CONSTRAINT "fk_asb_komponen_bangunan_pros_tipe" 
                    FOREIGN KEY ("id_asb_tipe_bangunan") 
                    REFERENCES "asb_tipe_bangunan"("id") 
                    ON DELETE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_pros_komponen" ON "asb_komponen_bangunan_pros" ("id_asb_komponen_bangunan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_pros_tipe" ON "asb_komponen_bangunan_pros" ("id_asb_tipe_bangunan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_komponen_bangunan_pros_deleted" ON "asb_komponen_bangunan_pros" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_komponen_bangunan_pros_updated_at') THEN
                    CREATE TRIGGER set_asb_komponen_bangunan_pros_updated_at
                    BEFORE UPDATE ON "asb_komponen_bangunan_pros"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_komponen_bangunan_pros_updated_at ON "asb_komponen_bangunan_pros";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_pros_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_pros_tipe";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_komponen_bangunan_pros_komponen";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_komponen_bangunan_pros";`);
    }
}
