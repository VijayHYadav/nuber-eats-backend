import { Field, InputType, Int, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOuput } from "src/common/dtos/output.dto";
import { Payment } from "../entities/payment.entity";

// @InputType()
// export class CreatePaymentInput extends PickType(Payment, ["transactionId"]) {
//     @Field(type=> Int)
//     restaurantId: number;
// }

@InputType()
export class CreatePaymentInput extends PickType(Payment, ["transactionId", "restaurantId"]) {
}


@ObjectType()
export class CreatePaymentOutput extends CoreOuput { }