import { DataSource } from 'typeorm';
import { Authentication } from './entities/authentication.entity';

export const AuthenticationProviders = [
  {
    provide: 'AUTHENTICATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Authentication),
    inject: ['DATA_SOURCE'],
  },
];
