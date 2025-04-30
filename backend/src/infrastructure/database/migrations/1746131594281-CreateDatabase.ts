import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1746131594281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
         "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
         "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
         "name" character varying NOT NULL,
         "password" character varying NOT NULL,
         "email" character varying NOT NULL,
         "license_number" character varying NOT NULL,
         "license_valid_until" date NOT NULL,
         CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE TABLE "cars" (
         "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
         "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
         "brand" character varying NOT NULL,
         "model" character varying NOT NULL,
         "stock" integer NOT NULL,
         "peak_season_price" integer NOT NULL,
         "mid_season_price" integer NOT NULL,
         "off_season_price" integer NOT NULL,
         "image" character varying,
         CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."bookings_status_enum" AS ENUM('CREATED', 'CONFIRMED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "bookings" (
         "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
         "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
         "start_date" date NOT NULL,
         "end_date" date NOT NULL,
         "price" numeric NOT NULL,
         "daily_price" numeric NOT NULL,
         "driving_license" character varying(100) NOT NULL,
         "driving_license_expiry" date NOT NULL,
         "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'CREATED',
         "user_id" uuid,
         "car_id" uuid,
         CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings"
         ADD CONSTRAINT "FK_64cd97487c5c42806458ab5520c"
         FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings"
         ADD CONSTRAINT "FK_a37a9ce499a633119bb1c71010b"
         FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_a37a9ce499a633119bb1c71010b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_64cd97487c5c42806458ab5520c"`,
    );
    await queryRunner.query(`DROP TABLE "bookings"`);
    await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
    await queryRunner.query(`DROP TABLE "cars"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
