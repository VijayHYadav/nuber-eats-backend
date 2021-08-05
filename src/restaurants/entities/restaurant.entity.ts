import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
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

    @Field(type => Boolean, { defaultValue: true }) //graphql thing. //defaultValue= true for graphql scehma.
    @Column({ default: true }) //typeorm thing // defaultValue = true
    @IsOptional() // check if value is missing ignores all validators.
    @IsBoolean()
    isVegan?: Boolean;

    @Field(type => String) //graphql thing.
    @Column() //typeorm thing
    @IsString()
    address: string;

    // @Field(type => String) //graphql thing.
    // @Column() //typeorm thing
    // ownersName?: String;

    // @Field(type => String) //graphql thing.
    // @Column() //typeorm thing
    // @IsString()
    // categoryName?: String;
}