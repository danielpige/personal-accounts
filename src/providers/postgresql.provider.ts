import { EnvConfiguration } from 'src/config/app.config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: EnvConfiguration().dbHost,
        port: +EnvConfiguration().dbPort,
        username: EnvConfiguration().dbUserName,
        password: EnvConfiguration().dbPassoword,
        database: EnvConfiguration().dbName,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
