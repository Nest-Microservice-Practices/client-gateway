import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { IOrdersController, PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController implements IOrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const product = await firstValueFrom(
        this.client.send({ cmd: 'create_order' }, createOrderDto),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAllOrder(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const order = await firstValueFrom(
        this.client.send({ cmd: 'find_all_order' }, orderPaginationDto),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOneOrder(@Param('id', ParseUUIDPipe) id: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const order = await firstValueFrom(
        this.client.send({ cmd: 'find_one_order' }, { id }),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findOrderByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const orderByStatus = await firstValueFrom(
        this.client.send(
          { cmd: 'find_all_order' },
          {
            ...paginationDto,
            status: statusDto.status,
          },
        ),
      );
      return orderByStatus;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateStatusOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const order = await firstValueFrom(
        this.client.send(
          { cmd: 'change_order_status' },
          { id, status: statusDto.status },
        ),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
