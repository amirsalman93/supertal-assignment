import { DataSource } from 'typeorm';
import { typeorm_config } from './typeorm-config';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource(typeorm_config);

            return dataSource.initialize();
        },
    },
];