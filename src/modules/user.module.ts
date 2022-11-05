import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../entities/users/user.entity';
import {UserService} from '../services/users/user.service';
import {UserController} from '../controllers/users/user.controller';
import {AuthUserController} from '../controllers/users/auth.user.controller';
import {RefreshToken} from "../entities/users/refreshToken.entity";
import {RefreshTokenService} from "../services/users/refreshToken.service";
import {AuthorizedMiddleware} from "../middlewares/authorized.middleware";
import {Message} from "../entities/chat/message.entity";
import {Chat} from "../entities/chat/chat.entity";
import {TextContent} from "../entities/chat/text.content.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken, Message, Chat, TextContent])],
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
