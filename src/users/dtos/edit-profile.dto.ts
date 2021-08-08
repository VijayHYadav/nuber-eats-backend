import { InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOuput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@ObjectType()
export class EditProfileOutput extends CoreOuput { }

@InputType()
export class EditProfileInput extends PartialType(PickType(User, ["email", "password"])) { }