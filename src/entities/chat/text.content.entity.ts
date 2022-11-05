import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Message} from "./message.entity";

@Entity()
export class TextContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => Message, (message) => message.textContent)
    message: Message;
}