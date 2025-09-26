import { USERS_REPOSITORY, } from 'src/constants';
import { Users } from 'src/entity/users.entity';


export const usersProviders = [
    {
        provide: USERS_REPOSITORY,
        useValue: Users,
    }
];
