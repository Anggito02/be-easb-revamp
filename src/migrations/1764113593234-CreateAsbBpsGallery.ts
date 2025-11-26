import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbBpsGallery1764113593234 implements MigrationInterface {
    name = 'CreateAsbBpsGallery1764113593234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE "asb_bps_gallery" (
                "id" SERIAL NOT NULL,
                "id_asb_komponen_bangunan" INTEGER,
                "filename" TEXT NOT NULL,
                "jumlah_bobot" DOUBLE PRECISION,
                "rincian_harga" DOUBLE PRECISION,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb_bps_gallery" PRIMARY KEY ("id")
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "idx_asb_bps_gallery_komponen_bangunan" ON "asb_bps_gallery" ("id_asb_komponen_bangunan")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bps_gallery_deleted_at" ON "asb_bps_gallery" ("deleted_at")`);

        // Add foreign key with CASCADE
        await queryRunner.query(`
            ALTER TABLE "asb_bps_gallery"
            ADD CONSTRAINT "fk_asb_bps_gallery_komponen_bangunan"
            FOREIGN KEY ("id_asb_komponen_bangunan")
            REFERENCES "asb_komponen_bangunan"("id")
            ON DELETE CASCADE
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION set_asb_bps_gallery_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_set_asb_bps_gallery_updated_at
            BEFORE UPDATE ON "asb_bps_gallery"
            FOR EACH ROW
            EXECUTE FUNCTION set_asb_bps_gallery_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_set_asb_bps_gallery_updated_at ON "asb_bps_gallery"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_asb_bps_gallery_updated_at`);

        // Drop foreign key
        await queryRunner.query(`ALTER TABLE "asb_bps_gallery" DROP CONSTRAINT IF EXISTS "fk_asb_bps_gallery_komponen_bangunan"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bps_gallery_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bps_gallery_komponen_bangunan"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_bps_gallery"`);
    }
}
