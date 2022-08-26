import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const UserProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => {
            let a = dataSource.getRepository(User);
            return a;
        },
        inject: ['DATA_SOURCE'],
    },
];