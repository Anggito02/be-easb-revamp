import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailAndRoomIdToUsers1764963000000 implements MigrationInterface {
    name = 'AddEmailAndRoomIdToUsers1764963000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email" VARCHAR(255) NULL;
        `);

        await queryRunner.query(`
            ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "room_id" INTEGER NULL;
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "idx_users_email_unique"
            ON "users" ("email")
            WHERE "email" IS NOT NULL AND "deleted_at" IS NULL;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_users_room_id" ON "users" ("room_id");
        `);

        await queryRunner.query(`
            DO $$ BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_users_room_id') THEN
                    ALTER TABLE "users" ADD CONSTRAINT "fk_users_room_id"
                    FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL;
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "fk_users_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_users_room_id";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_users_email_unique";`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "room_id";`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "email";`);
    }
}
