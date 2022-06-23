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
