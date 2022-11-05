import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Chat} from "../entities/chat/chat.entity";
import {Message} from "../entities/chat/message.entity";
import {User} from "../entities/users/user.entity";
import {ChatController} from "../controllers/chat/chat.controller";
import {ChatsService} from "../services/chat/chats.service";
import {UserService} from "../services/users/user.service";
import {TextContent} from "../entities/chat/text.content.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Chat, Message, User, TextContent])],
    controllers: [ChatController],
    providers: [ChatsService, UserService],
    exports: [TypeOrmModule]
})
export class ChatModule {}