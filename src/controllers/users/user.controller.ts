import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../../services/users/user.service';
import { User } from '../../entities/users/user.entity';
import { CreateUserDto } from '../../ValidationTypes/User';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(@Req() req: Request, @Res() res: Response): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
      return await this.userService.create(userData);
  }

  @Get(':id')
  async getUser(@Param('id') id: number, @Res() res: Response) {
    try {
      res.send(await this.userService.findOne(id));
    } catch (e) {
      res.status(e.code);
      res.send(e);
    }
  }
}
