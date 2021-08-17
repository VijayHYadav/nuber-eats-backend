import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOuput } from "src/common/dtos/output.dto";

@InputType()
export class DeleteRestaurantInput {
    @Field(type => Number)
    restaurantId: number;
}

@ObjectType()
export class DeleteRestaurantOutput extends CoreOuput { }