import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDocumentSpecEnumToAsbDocument1764938039098 implements MigrationInterface {
    name = 'AddDocumentSpecEnumToAsbDocument1764938039098';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enum type for document_spec if it doesn't exist
        await queryRunner.query(`
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'document_spec_enum') THEN
                    CREATE TYPE "document_spec_enum" AS ENUM('SURAT_PERMOHONAN', 'KERTAS_KERJA');
                END IF;
            END $$;
        `);

        // Check if column exists and is not already an enum type
        await queryRunner.query(`
            DO $$
            BEGIN
                -- Check if column exists and is not an enum
                IF EXISTS (
                    SELECT 1 
                    FROM information_schema.columns 
                    WHERE table_name = 'asb_document' 
                    AND column_name = 'spec'
                    AND data_type != 'USER-DEFINED'
                ) THEN
                    -- Convert existing column to enum
                    ALTER TABLE "asb_document" 
                    ALTER COLUMN "spec" TYPE "document_spec_enum" 
                    USING "spec"::text::"document_spec_enum";
                ELSIF NOT EXISTS (
                    SELECT 1 
                    FROM information_schema.columns 
                    WHERE table_name = 'asb_document' 
                    AND column_name = 'spec'
                ) THEN
                    -- Add column if it doesn't exist
                    ALTER TABLE "asb_document" 
                    ADD COLUMN "spec" "document_spec_enum" NOT NULL;
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Convert enum column back to text
        await queryRunner.query(`
            ALTER TABLE "asb_document" 
            ALTER COLUMN "spec" TYPE TEXT 
            USING "spec"::text;
        `);

        // Drop the enum type
        await queryRunner.query(`
            DROP TYPE IF EXISTS "document_spec_enum";
        `);
    }
}
