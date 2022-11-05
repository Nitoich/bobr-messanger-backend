import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import { UserModule } from './user.module';
import { User } from '../entities/users/user.entity';
import { DataSource } from 'typeorm';
import { AuthUserController } from '../controllers/users/auth.user.controller';
import {ChatModule} from "./chat.module";

// @ts-ignore
const databaseConfig = JSON.parse(fs.readFileSync('database.config.json'));
@Module({
  imports: [
    TypeOrmModule.forRoot(Object.assign(databaseConfig, { entities: [__dirname + '/entities/**/*.entity.js'] })),
    UserModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
