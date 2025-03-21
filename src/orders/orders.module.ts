import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { OrdersController } from './orders.controller';
import { envs, ORDER_SERVICE } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.orderServiceHost,
          port: envs.orderServicePort,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
