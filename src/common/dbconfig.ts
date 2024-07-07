// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//     imports: [
//       TypeOrmModule.forRootAsync({
//         imports: [ConfigModule],
//         inject: [ConfigService],
//         useFactory: (configService: ConfigService) => ({
//           type: 'postgres',
//           host: configService.get('POSTGRES_HOST'),
//           port: configService.get('POSTGRES_PORT'),
//           username: configService.get('POSTGRES_USER'),
//           password: configService.get('POSTGRES_PASSWORD'),
//           database: configService.get('POSTGRES_DB'),
//           entities: [
//             __dirname + '/../**/*.entity.ts',
//           ],
//           synchronize: true,
//         })
//       }),
//     ],
//   })
// declare const process: {
//   env: {
//     BCRYPT_SALT_ROUNDS: string;
//     DB_USERNAME: string;
//     DB_PASSWORD: string;
//     DB_NAME: string;
//     DB_HOST: string;
//     DB_PORT: number;
//   };
// };

// export const AppDataSource = new DataSource({
// type: "postgres",
// host: process.env.DB_HOST,
// port: process.env.DB_PORT,
// username: process.env.DB_USERNAME,
// password: process.env.DB_PASSWORD,
// database: process.env.DB_NAME,
// synchronize: true,
// logging: false,
// entities: [User, Transaction],
// subscribers: [],
// migrations: [],
//   });
