import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType() //ObjectType what graphql takes to build schema.
@Entity() //typeorm thing
export class Restaurant {
    @PrimaryGeneratedColumn() //typeorm thing
    @Field(type => Number)
    id: number;

    @Field(type => String) //graphql thing.
    @Column() //typeorm thing
    name: string;

    @Field(type => Boolean, { nullable: true }) //graphql thing.
    @Column() //typeorm thing
    isVegan?: Boolean;

    @Field(type => String) //graphql thing.
    @Column() //typeorm thing
    address: Boolean;

    @Field(type => String) //graphql thing.
    @Column() //typeorm thing
    ownersName?: String;

    @Field(type => String) //graphql thing.
    @Column() //typeorm thing
    categoryName?: String;
}