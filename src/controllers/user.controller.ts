import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../ValidationTypes/User';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(@Req() req: Request, @Res() res: Response) {
    return this.userService.findAll();
  }

  @Post()
  async createUser(
    @Body() userData: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      res.send(await this.userService.create(new User(userData)));
    } catch (e) {
      res.status(400);
      res.send({
        error: {
          code: 400,
          message: e,
        },
      });
    }
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
