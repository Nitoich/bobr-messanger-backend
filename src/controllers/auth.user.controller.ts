import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginUserDto } from '../ValidationTypes/User';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import JWT from '../support/JWT';

@Controller()
export class AuthUserController {
  constructor(private userService: UserService) {}
  @Post('/login')
  async login(@Body() userData: LoginUserDto, @Res() res: Response) {
    const { email, password } = userData;
    const user = await this.userService.find({
      email: email,
    });

    if (user[0] && (await bcrypt.compare(password, user[0].password))) {
      res.status(200);
      const iatTime = new Date().getTime();
      res.send({
        access_token: JWT.generate({
          id: user[0].id,
          iat: iatTime,
          exp: iatTime + 5 * 60 * 1000,
        }),
      });
    }
  }

  @Post('/decode')
  async decode(@Body() body, @Res() res) {
    const data = JWT.decode(body.access_token);
    const currentTime = new Date().getTime();
    if (data.exp < currentTime) {
      res.status(401);
      res.send({
        error: 401,
        message: 'Token expired!',
      });
    } else {
      res.status(200);
      res.send(data);
    }
  }
}
