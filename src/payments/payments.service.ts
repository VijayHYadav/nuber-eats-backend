import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreatePaymentInput, CreatePaymentOutput } from "./dtos/create-payment.dto";
import { GetPaymentsOutput } from "./dtos/get-payments.dto";
import { Payment } from "./entities/payment.entity";
import { Cron, Interval, Timeout, SchedulerRegistry} from "@nestjs/schedule"
@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly payments: Repository<Payment>,
        @InjectRepository(Restaurant)
        private readonly restaurants: Repository<Restaurant>,
        private schedulerRegistry: SchedulerRegistry,
    ) { }

    async createPayment(owner: User, { transactionId, restaurantId }: CreatePaymentInput): Promise<CreatePaymentOutput> {
        try {
            const restaurant = await this.restaurants.findOne(restaurantId);
            if (!restaurant) {
                return {
                    ok: false,
                    error: 'Restaurant not found.'
                };
            }
            if (restaurant.ownerId !== owner.id) {
                return {
                    ok: false,
                    error: 'You are not allowed to do this.',
                };
            }
            await this.payments.save(this.payments.create({
                transactionId,
                user: owner,
                restaurant,
            }))
            return {
                ok: true,
            }
        } catch {
            return {
                ok: false,
                error: 'Could not create payment.',
            };
        }
    }

    async getPayments(user: User):Promise<GetPaymentsOutput> {
        try {
            const payments = await this.payments.find({user: user});
            return {
                ok: true,
                payments,
            }
        }catch {
            return {
                ok: false,
                error: "Could not load payments."
            }
        }
    }

    @Cron('30 * * * * *')
    checkForPayments() {
        console.log('Checking for payments......(cron)')
    }

    @Cron('30 * * * * *', {
        name: 'myJob'
    })
    checkForPaymentsDynamic() {
        console.log('Checking for payments......(cron)(dynamic)');
        const job = this.schedulerRegistry.getCronJob("myJob");
        console.log(job);
        job.stop();
    }

    @Interval(3000)
    checkForPaymentsI() {
        console.log('Checking for payments.......(interval)')
    }

    @Timeout(2000)
    afterStarts() {
        console.log('Congrats!')
    }
}