import {Body, Controller, Get, Param, Post, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {ChatsService} from "../../services/chat/chats.service";
import {UserService} from "../../services/users/user.service";

@Controller('/chats')
export class ChatController {
    constructor(
        private chatService: ChatsService,
        private userService: UserService
    ) {}

    @Post()
    async getChats(@Req() req: Request, @Res() res: Response) {
        res.status(200);
        res.send(await this.chatService.where({
            members: req.body.payload.id
        }, {
            members: true
        }));
    }

    @Post(':id/members')
    async addMemberInChat(@Param('id') id:number, @Res() res: Response, @Body() body) {
        const chat = await this.chatService.whereOne({ id }, { members: true });
        const newMember = await this.userService.findOne(body.user_id);
        chat.members = [...chat.members, newMember];
    }

    @Get(':id/members')
    async getMembersInChat() {
        //
    }
}