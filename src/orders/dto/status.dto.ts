import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    message: `Values  status are ${OrderStatusList}`,
  })
  status: OrderStatus;
}
