import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { workerProviders } from 'src/providers/worker.providers';
import { JwtStrategy } from 'src/guard/jwtStrategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [
        WorkersController,],
    providers: [
        WorkersService, ...workerProviders],
})
export class WorkersModule { }
