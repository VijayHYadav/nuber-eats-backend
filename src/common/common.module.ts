import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from './common.constant';

// NOTE: There should be only and just one pubsub for whole application.
const pubsub = new PubSub();
@Global()
@Module({
    providers: [
        {
            provide: PUB_SUB,
            useValue: pubsub,
        },
    ],
    exports: [PUB_SUB],
})
export class CommonModule {}

/* NOTE ON new PubSub()
Note that the default PubSub implementation is intended for demo purposes.
It only works if you have a single instance of your server and doesn't scale beyond a couple of connections. 
For production usage you'll want to use one of the PubSub implementations backed by an external store. (e.g. Redis)
*/