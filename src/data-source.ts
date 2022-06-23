import { DataSource } from 'typeorm';
import { UserEntity } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [UserEntity],
  synchronize: true,
  logging: false,
});

export const initAppDataSource = async () => {
  await AppDataSource.initialize();
  const user = new UserEntity();
  user.username = 'jack';
  user.password = 'redballoon';
  await AppDataSource.manager.save(user);
};
