import { WORKER_REPOSITORY, } from 'src/constants';

import { Worker } from '../entity/workers.entity';


export const workerProviders = [
    {
        provide: WORKER_REPOSITORY,
        useValue: Worker,
    }
];
