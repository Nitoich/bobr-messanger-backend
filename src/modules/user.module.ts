import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../entities/user.entity';
import {UserService} from '../services/user.service';
import {UserController} from '../controllers/user.controller';
import {AuthUserController} from '../controllers/auth.user.controller';
import {RefreshToken} from "../entities/refreshToken.entity";
import {RefreshTokenService} from "../services/refreshToken.service";
import {AuthorizedMiddleware} from "../middlewares/authorized.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  providers: [UserService, RefreshTokenService],
  controllers: [UserController, AuthUserController],
  exports: [TypeOrmModule],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthorizedMiddleware)
        .exclude(
            { path: '/login', method: RequestMethod.POST},
            {path: '/refresh', method: RequestMethod.POST}
        )
        .forRoutes(AuthUserController);
  }
}
