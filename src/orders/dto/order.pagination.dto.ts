import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    message: `Valid status are ${OrderStatusList}`,
  })
  status: OrderStatus;
}
