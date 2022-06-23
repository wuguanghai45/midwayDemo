import { Rule, RuleType } from '@midwayjs/validate';

export class UserLoginDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}
