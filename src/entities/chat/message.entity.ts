import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Chat} from "./chat.entity";
import {User} from "../users/user.entity";
import {TextContent} from "./text.content.entity";

@Entity('message')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Chat, (chat) => chat.messages)
    chat: Chat;

    @ManyToOne(() => User, (user) => user.messages)
    owner: User;

    @OneToMany(() => TextContent, (textContent) => textContent.message)
    textContent: TextContent[];

    @Column()
    created_time: string;

    @Column()
    updated_time: string;
}