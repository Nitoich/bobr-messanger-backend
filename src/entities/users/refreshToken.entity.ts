import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity('refresh_token')
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    refresh_token: string;

    @ManyToOne(() => User, (user) => user.refresh_tokens)
    user: User

    @Column()
    created_time: string;

    @Column()
    expired_time: string;

    @Column({ default: true })
    isActive: boolean;
}