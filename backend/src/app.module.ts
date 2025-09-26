import { WorkersModule } from './workers/workers.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { Users } from './entity/users.entity';
import { Worker } from './entity/workers.entity';

@Module({
  imports: [
    WorkersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env available globally
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
        dialectOptions: {
          ssl: false,
          allowPublicKeyRetrieval: true,
        },
      }),
    }),
    SequelizeModule.forFeature([Users, Worker])
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
