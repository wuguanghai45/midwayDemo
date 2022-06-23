import { UserEntity } from '../entity/User';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { InjectEntityModel } from '@midwayjs/orm';

export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(UserEntity);
  }
  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(username, password): Promise<UserEntity> {
    const user = new UserEntity();
    user.password = password;
    user.username = username;
    const resUser = await this.userRepo.findOneBy(user);
    return resUser;
  }
}
