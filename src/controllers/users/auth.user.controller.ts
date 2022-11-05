import {Body, Controller, Post, Req, Res} from '@nestjs/common';
import { LoginUserDto } from '../../ValidationTypes/User';
import { UserService } from '../../services/users/user.service';
import * as bcrypt from 'bcrypt';
import {Request, Response} from 'express';
import JWT from '../../support/JWT';
import * as crypto from 'crypto';
import {RefreshTokenService} from "../../services/users/refreshToken.service";

@Controller()
export class AuthUserController {
  constructor(private userService: UserService, private refreshTokenService: RefreshTokenService) {}

  async generateAccessToken(user) {
    const refreshToken = await this.refreshTokenService.create(user.id);
    const iatTime = new Date().getTime();

    return {
      access_token: JWT.generate({
        id: user.id,
        iat: iatTime,
        exp: iatTime + 5 * 60 * 1000
      }),
      refresh_token: refreshToken.refresh_token
    };
  }

  @Post('/login')
  async login(@Body() userData: LoginUserDto, @Res() res: Response) {
    const { email, password } = userData;
    const user = await this.userService.find({
      email: email,
    });

    if (user[0] && (await bcrypt.compare(password, user[0].password))) {
      res.status(200);
      res.send(await this.generateAccessToken(user[0]));
    } else {
      res.status(401);
      res.send({
        error: {
          code: 401,
          message: 'Unauthorized'
        }
      });
    }
  }

  @Post('/refresh')
  async updateAccessToken(@Body() body, @Res() res: Response) {
    const { refreshToken } = body;

    const currentToken = await this.refreshTokenService.whereOne({
      refresh_token: body.refresh_token
    });


    console.log(currentToken)

    if(currentToken && currentToken.isActive == false) {
      res.status(403);
      res.send({
        error: {
          code: 403,
          message: "Refresh token is expired!"
        }
      });
    }

    if(!currentToken) {
      res.status(404);
      res.send({
        error: {
          code: 404,
          message: 'Token not found!'
        }
      });
    } else {
      if(Number(currentToken.expired_time) < new Date().getTime()) {
        let updated = await this.refreshTokenService.update(currentToken.id, { isActive: false } );
        res.status(403);
        res.send({
          error: {
            code: 403,
            message: "Refresh token is expired!"
          }
        });
      } else {
        let updated = await this.refreshTokenService.update(currentToken.id, { isActive: false });
        res.status(200);
        res.send(await this.generateAccessToken(currentToken.user));
      }
    }
  }

  @Post('/decode')
  async decode(@Body() body, @Res() res: Response, @Req() req: Request) {
    res.send(body);
  }
}
