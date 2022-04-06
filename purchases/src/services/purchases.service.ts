import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { Purchase } from '../http/graphql/models/purchase';

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
}
