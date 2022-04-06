import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { Purchase } from '../http/graphql/models/purchase';

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}
@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create({
    customerId,
    productId,
  }: CreatePurchaseParams): Promise<Purchase> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });
  }
}
