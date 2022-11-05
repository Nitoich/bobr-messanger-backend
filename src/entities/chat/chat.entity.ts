import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Message} from "./message.entity";
import {User} from "../users/user.entity";

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(() => Message, (message) => message.chat)
    messages: Message[];

    @ManyToMany(() => User)
    @JoinTable()
    members: User[];
}