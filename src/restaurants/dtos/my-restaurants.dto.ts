import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOuput } from "src/common/dtos/output.dto";
import { Restaurant } from "../entities/restaurant.entity";

@ObjectType()
export class MyRestaurantsOutput extends CoreOuput {
    @Field(type => [Restaurant])
    restaurants?: Restaurant[]
}
