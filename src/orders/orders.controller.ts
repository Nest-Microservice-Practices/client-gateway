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
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { IOrdersController, PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController implements IOrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly orderClient: ClientProxy,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const product = await firstValueFrom(
        this.orderClient.send({ cmd: 'create_order' }, createOrderDto),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAllOrder(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.orderClient.send({ cmd: 'find_all_order' }, orderPaginationDto);
  }

  @Get('id/:id')
  async findOneOrder(@Param('id', ParseUUIDPipe) id: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const order = await firstValueFrom(
        this.orderClient.send({ cmd: 'find_one_order' }, { id }),
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
        this.orderClient.send(
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
        this.orderClient.send(
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
