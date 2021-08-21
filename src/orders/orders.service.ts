import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Dish, DishOption } from "src/restaurants/entities/dish.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { User, UserRole } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateOrderInput, CreateOrderOutput } from "./dtos/create-order.dto";
import { GetOrdersInput, GetOrdersOutput } from "./dtos/get-order.dto";
import { OrderItem } from "./entities/order-item.entity";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orders: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly ordersItems: Repository<OrderItem>,
        @InjectRepository(Restaurant)
        private readonly restaurants: Repository<Restaurant>,
        @InjectRepository(Dish)
        private readonly dishes: Repository<Dish>,
    ) { }

    async createOrder(customer: User, { restaurantId, items }: CreateOrderInput): Promise<CreateOrderOutput> {
        try {
            const restaurant = await this.restaurants.findOne(restaurantId);
            if (!restaurant) {
                return {
                    ok: false,
                    error: "Restaurant not found",
                };
            }
            let orderFinalPrice = 0;
            const orderItems: OrderItem[] = [];
            for (const item of items) {
                const dish = await this.dishes.findOne(item.dishId);
                if (!dish) {
                    // abort this whole thing
                    return {
                        ok: false,
                        error: 'Dish not found.'
                    }
                }
                let dishFinalPrice = dish.price;
                for (const itemOption of item.options) {
                    const dishOption = dish.options.find(dishOption => dishOption.name === itemOption.name);
                    if (dishOption) {
                        if (dishOption.extra) {
                            dishFinalPrice = dishFinalPrice + dishOption.extra;
                        } else {
                            const dishOptionChoice = dishOption.choices.find(optionChoice => optionChoice.name === itemOption.choice);
                            if (dishOptionChoice) {
                                if (dishOptionChoice.extra) {
                                    dishFinalPrice = dishFinalPrice + dishOptionChoice.extra;
                                }
                            }
                        }
                    }
                }
                orderFinalPrice = orderFinalPrice + dishFinalPrice;
                const orderItem = await this.ordersItems.save(this.ordersItems.create({
                    dish,
                    options: item.options,
                }));
                orderItems.push(orderItem);
            }
            const order = await this.orders.save(this.orders.create());
            this.orders.create({
                customer,
                restaurant,
                total: orderFinalPrice,
                items: orderItems,
            });
            return {
                ok: true,
            }
        } catch {
            return {
                ok: false,
                error: "Could not create order."
            }
        }
    }

    async getOrders(user: User, { status }: GetOrdersInput): Promise<GetOrdersOutput> {
        let orders: Order[];
        try {
            if (user.role === UserRole.Client) {
                orders = await this.orders.find({
                    where: {
                        customer: user,
                    }
                });
            } else if (user.role === UserRole.Delivery) {
                orders = await this.orders.find({
                    where: {
                        driver: user,
                    }
                });
            } else if (user.role === UserRole.Owner) {
                const restaurants = await this.restaurants.find({
                    where: {
                        owner: user,
                    },
                    relations: ["orders"]
                });
                // const orders = restaurants.map(restaurant => restaurant.orders);
                orders = restaurants.map(restaurant => restaurant.orders).flat(1);
            }
            return {
                ok: false,
                orders
            };
        } catch {
            return {
                ok: false,
                error: "Could not get orders",
            };
        }
    }
}