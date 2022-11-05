import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RefreshToken} from "./refreshToken.entity";
import {Message} from "../chat/message.entity";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  password: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refresh_tokens: RefreshToken[];

  @OneToMany(() => Message, (message) => message.owner)
  messages: Message[];

  constructor(
    data = {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
    },
  ) {
    this.email = data.email;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.password = data.password;
  }
}
