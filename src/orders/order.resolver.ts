import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { userInfo } from "os";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { User } from "src/users/entities/user.entity";
import { CreateOrderInput, CreateOrderOutput } from "./dtos/create-order.dto";
import { GetOrdersInput, GetOrdersOutput } from "./dtos/get-order.dto";
import { Order } from "./entities/order.entity";
import { OrderService } from "./orders.service";

@Resolver(of =>Order)
export class OrderResolver {
    constructor(private readonly orderService: OrderService) { }

    @Mutation(returns => CreateOrderOutput)
    @Role(['Client'])
    async createOrder(
        @AuthUser() customer: User, 
        @Args('input')
        createOrderInput: CreateOrderInput
        ) :Promise<CreateOrderOutput> {
        return this.orderService.createOrder(customer, createOrderInput);
    }

    @Query(returns => GetOrdersOutput)
    @Role(["Any"])
    async getOrders(
        @AuthUser() user: User,
        @Args("input") getOrdersInput: GetOrdersInput
    ): Promise<GetOrdersOutput> {
        return this.orderService.getOrders(user, getOrdersInput);
    }
}