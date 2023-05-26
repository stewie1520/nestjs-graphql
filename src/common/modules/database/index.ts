import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { ConfigModule } from '../config';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    ...databaseProviders,
  ],
  exports: [
    ...databaseProviders,
  ],
})
export class DatabaseModule {}
