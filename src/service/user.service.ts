import { Provide, Inject } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { UserEntity } from '../entity/User';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class UserService {
  @Inject()
  jwtService: JwtService;

  async generateToken(user: UserEntity) {
    const token = await this.jwtService.sign({
      username: user.username,
      password: user.password,
    });
    return token;
  }

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
