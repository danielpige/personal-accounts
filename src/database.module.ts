import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/postgresql.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
