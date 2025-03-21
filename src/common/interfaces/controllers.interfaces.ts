import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { CreateOrderDto } from '../../orders/dto/create-order.dto';
import { OrderPaginationDto } from '../../orders/dto/order.pagination.dto';
import { StatusDto } from '../../orders/dto/status.dto';

export interface IProductsController {
  createProduct(createProductDto: CreateProductDto);
  findAllProducts(paginationDto: PaginationDto);
  findOneProduct(id: number);
  deleteProduct(id: number);
  updateProduct(id: number, updateProductDto: UpdateProductDto);
}

export interface IOrdersController {
  createOrder(createOrderDto: CreateOrderDto);
  findAllOrder(orderPaginationDto: OrderPaginationDto);
  findOneOrder(id: string);
  findOrderByStatus(statusDto: StatusDto, paginationDto: PaginationDto);
  updateStatusOrder(id: string, statusDto: StatusDto);
}
