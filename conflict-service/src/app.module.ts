// TODO: use from process.env
const ENV_PATH = '.env';

// Load configuration before ConfigModule to allow usage before and outside of modules
import * as dotenv from 'dotenv';
dotenv.config({ path: ENV_PATH });

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { PG_CONFIG } from './databases/pg.config';
import { ConflictsModule } from './conflicts/conflicts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      envFilePath: ENV_PATH,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRoot(PG_CONFIG),
    ConflictsModule,
  ],
})
export class AppModule {}
