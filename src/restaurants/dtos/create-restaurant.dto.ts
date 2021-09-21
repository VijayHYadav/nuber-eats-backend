import { Field, InputType, Int, ObjectType, OmitType, PickType } from '@nestjs/graphql';
import { CoreOuput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  'name',
  'coverImg',
  'address',
]) {
  @Field(type => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOuput {
  @Field(type => Int)
  restaurantId?: number;
}
