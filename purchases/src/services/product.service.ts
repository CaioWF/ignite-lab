import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { Product } from '../http/graphql/models/product';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }
}
