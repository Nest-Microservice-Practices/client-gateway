import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  totalItems: number;

  @IsEnum(OrderStatusList, {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    message: `Possible values: ${OrderStatusList}`,
  })
  status: OrderStatus = OrderStatus.PENDING;

  @IsBoolean()
  @IsOptional()
  paid: boolean = false;
}
