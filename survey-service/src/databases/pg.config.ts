import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  POSTGRES_SYNCHRONIZE,
} from '../config/db';

export const PG_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  // TODO: should be enabled only for local development
  synchronize: POSTGRES_SYNCHRONIZE,
  autoLoadEntities: true,
};
