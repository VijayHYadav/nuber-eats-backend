import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOuput } from "src/common/dtos/output.dto";
import { Restaurant } from "../entities/restaurant.entity";
import { CreateRestaurantInput } from "./create-restaurant.dto";

@InputType()
export class EditRestaurantInput extends PartialType(CreateRestaurantInput) {
    @Field(type => Number)
    restaurantId: number;
}

@ObjectType()
export class EditRestaurantOuput extends CoreOuput { }