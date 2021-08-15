import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@InputType({ isAbstract: true })
@ObjectType() //ObjectType what graphql takes to build schema.
@Entity() //typeorm thing
export class Restaurant extends CoreEntity {
    @Field(type => String) //graphql thing.
    @Column() //typeorm thing
    @IsString()
    @Length(5)
    name: string;

    @Field(type => String)
    @Column()
    @IsString()
    coverImg: string;

    @Field(type => String) //graphql thing.
    @Column() //typeorm thing
    @IsString()
    address: string;

    @Field(type => Category)
    @ManyToOne(type => Category, category => category.restaurants)
    category: Category;
}