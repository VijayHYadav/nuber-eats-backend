import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantResolver } from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])], // basically this allows you to import typeormmodule for a specific feature in this case it is Restaurant.
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}
