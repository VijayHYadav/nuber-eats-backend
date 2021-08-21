import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOuput } from "src/common/dtos/output.dto";
import { Order } from "../entities/order.entity";

@InputType()
export class GetOrderInput extends PickType(Order, ['id']) {}

@ObjectType()
export class GetOrderOutput extends CoreOuput {
    @Field(type => Order, {nullable: true})
    order?: Order;
}