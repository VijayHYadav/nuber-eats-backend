import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOuput } from "src/common/dtos/output.dto";
import { Category } from "../entities/category.entity";

@ObjectType()
export class AllCategoriesOutput extends CoreOuput {

    @Field(type => [Category], { nullable: true })
    categories?: Category[]
}