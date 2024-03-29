import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryResolver, DishResolver, RestaurantResolver } from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Dish ,CategoryRepository])], // basically this allows you to import typeormmodule for a specific feature in this case it is Restaurant.
  providers: [RestaurantResolver, CategoryResolver, DishResolver, RestaurantService],
})
export class RestaurantsModule { }
