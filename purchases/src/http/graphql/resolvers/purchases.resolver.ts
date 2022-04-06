import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CustomersService } from '../../../services/customers.service';
import { ProductsService } from '../../../services/products.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.findAll();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productsService.findById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customersService.findByIdAuthUserId(user.sub);

    if (!customer) {
      customer = await this.customersService.create({ authUserId: user.sub });
    }

    return this.purchasesService.create({
      productId: data.productId,
      customerId: customer.id,
    });
  }
}
