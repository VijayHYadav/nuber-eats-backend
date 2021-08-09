import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOuput } from "src/common/dtos/output.dto";
import { Verification } from "../entities/verification.entity";

@ObjectType()
export class VerifyEmailOutput extends CoreOuput {}

@InputType()
export class VerifyEmailInput extends PickType(Verification, ['code']) {

}