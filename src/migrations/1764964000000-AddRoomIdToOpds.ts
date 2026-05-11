import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoomIdToOpds1764964000000 implements MigrationInterface {
    name = 'AddRoomIdToOpds1764964000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "opds" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_opds_room_id" ON "opds" ("room_id");
        `);

        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_opds_room_id') THEN
                    ALTER TABLE "opds" ADD CONSTRAINT "fk_opds_room_id"
                    FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "opds" DROP CONSTRAINT IF EXISTS "fk_opds_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_opds_room_id";`);
        await queryRunner.query(`ALTER TABLE "opds" DROP COLUMN IF EXISTS "room_id";`);
    }
}
