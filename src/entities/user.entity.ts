import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  password: string;

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
