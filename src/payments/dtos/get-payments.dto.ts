import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOuput } from "src/common/dtos/output.dto";
import { Payment } from "../entities/payment.entity";

@ObjectType()
export class GetPaymentsOutput extends CoreOuput {
    @Field(type => [Payment], { nullable: true })
    payments?: Payment[]
}