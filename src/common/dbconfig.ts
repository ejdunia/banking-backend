// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

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
