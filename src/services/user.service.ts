import { Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User) {
    const find = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (find) {
      throw 'This email arleady exists!';
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    await this.dataSource.transaction(async (manager) => {
      await manager.save(user);
    });
    return await this.userRepository.findOneBy({
      email: user.email,
    });
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }

  async find(where: object = {}): Promise<User[]> {
    const users = await this.userRepository.findBy(where);
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return user;
    }

    throw {
      code: 404,
      message: 'Not Found!',
    };
  }

  // async update() {}
}
