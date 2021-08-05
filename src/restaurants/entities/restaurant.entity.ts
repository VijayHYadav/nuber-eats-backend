import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType({ isAbstract: true })
@ObjectType() //ObjectType what graphql takes to build schema.
@Entity() //typeorm thing
export class Restaurant {
    @PrimaryGeneratedColumn() //typeorm thing
    @Field(type => Number)
    id: number;

    @Field(type => String) //graphql thing.
    @Column() //typeorm thing
    @IsString()
    @Length(5)
    name: string;

    @Field(type => Boolean, { nullable: true }) //graphql thing.
    @Column() //typeorm thing
    @IsBoolean()
    isVegan?: Boolean;

    @Field(type => String) //graphql thing.
    @Column() //typeorm thing
    address: string;

    @Field(type => String) //graphql thing.
    @Column() //typeorm thing
    ownersName?: String;

    @Field(type => String) //graphql thing.
    @Column() //typeorm thing
    categoryName?: String;
}