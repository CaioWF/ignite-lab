import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from '../../../services/product.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.findAll();
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.create(data);
  }
}
