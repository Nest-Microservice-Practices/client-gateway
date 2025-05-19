import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IProductsController, PaginationDto } from 'src/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NATS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController implements IProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const createProducts = await firstValueFrom(
        this.client.send({ cmd: 'create_product' }, createProductDto),
      );
      return createProducts;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new RpcException(error);
    }
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_product' }, paginationDto);
  }

  @Get(':id')
  async findOneProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const products = await firstValueFrom(
        this.client.send({ cmd: 'find_one_product' }, { id }),
      );
      return products;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.emit({ cmd: 'delete_product' }, { id: id });
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const updateProduct = await firstValueFrom(
        this.client.send(
          { cmd: 'update_product' },
          {
            id,
            ...updateProductDto,
          },
        ),
      );
      return updateProduct;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new RpcException(error);
    }
  }
}
