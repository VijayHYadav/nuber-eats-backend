import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOuput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreOuput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
