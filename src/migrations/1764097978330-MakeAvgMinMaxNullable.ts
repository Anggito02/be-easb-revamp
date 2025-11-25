import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeAvgMinMaxNullable1764097978330 implements MigrationInterface {
    name = 'MakeAvgMinMaxNullable1764097978330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros" ALTER COLUMN "avg_min" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros" ALTER COLUMN "avg_max" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros" ALTER COLUMN "avg_max" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asb_komponen_bangunan_pros" ALTER COLUMN "avg_min" SET NOT NULL`);
    }

}
