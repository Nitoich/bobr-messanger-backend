import { Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/users/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    const saveUser = await this.userRepository.create(user);
    return await this.userRepository.save(saveUser);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  async find(where: object = {}): Promise<User[]> {
    const users = await this.userRepository.findBy(where);
    return users;
  }

  async update(id: number, userData) {
    return await this.userRepository.save({
      id,
      ...userData
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

}
