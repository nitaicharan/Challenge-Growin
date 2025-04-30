import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCars1746131594282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "cars" 
        ("brand", "model", "stock", "peak_season_price", "mid_season_price", "off_season_price", "image")
      VALUES
        (
          'Toyota',
          'Yaris',
          3,
          98.43,
          76.89,
          53.65,
          'https://img-optimize.toyota-europe.com/resize/ccis/680x680/zip/pt/product-token/46fe99be-e517-4630-9ff6-f170e5b24d38/vehicle/89699/padding/50,50,50,50/image-quality/70/day-exterior-03_040.png'
        ),
        (
          'SEAT',
          'Ibiza',
          5,
          85.12,
          65.73,
          46.85,
          'https://www.seat.com/content/dam/public/seat-website/carworlds/new-cw-ibiza/overview/version-view/ibiza-reference/seat-ibiza-reference-colour-candy-white.png'
        ),
        (
          'Nissan',
          'Qashqai',
          2,
          101.46,
          82.94,
          59.87,
          'https://demo2.nissanflow.com/media/u5pdfota/01-all-new-nissan-qashqai-colours-ffffff.jpg'
        ),
        (
          'Jaguar',
          'e-pace',
          1,
          120.54,
          91.35,
          70.27,
          'https://images.dealer.com/ddc/vehicles/2024/Jaguar/E-PACE/SUV/color/Carpathian%20Gray%20Premium%20Metallic-1AU-44,44,46-640-en_US.jpg'
        ),
        (
          'Mercedes-Benz',
          'Vito',
          2,
          109.16,
          89.64,
          64.97,
          'https://manobramaximarent.com/wp-content/uploads/2022/07/vito-1.png'
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "cars"
      WHERE ("brand", "model") IN (
        ('Toyota',       'Yaris'),
        ('SEAT',         'Ibiza'),
        ('Nissan',       'Qashqai'),
        ('Jaguar',       'e-pace'),
        ('Mercedes-Benz','Vito')
      );
    `);
  }
}
