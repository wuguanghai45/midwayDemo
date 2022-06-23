import {
  Controller,
  Provide,
  Post,
  Get,
  Inject,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { UserModel } from '../model/user';
import { UserLoginDTO } from '../dot/user.dto';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { UserService } from '../service/user.service';

@Provide()
@Controller('/api/user')
export class userContorller {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/login')
  @Post('/login')
  @Validate()
  async login(@Body(ALL) userLogin: UserLoginDTO) {
    const password = userLogin.password;
    const username = userLogin.username;
    const userModel = new UserModel();
    const user = await userModel.getUserByUsernameAndPassword(
      username,
      password
    );

    if (user) {
      const token = await this.userService.generateToken(user);
      return {
        code: 200,
        result: 'success',
        message: '登录成功',
        data: {
          token: token,
        },
      };
    }

    return {
      code: 400,
      result: 'error',
      message: '账号或密码不正确',
      data: null,
    };
  }
}
