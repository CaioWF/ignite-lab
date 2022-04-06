import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findByIdAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: { authUserId },
    });
  }

  async create({ authUserId }: CreateCustomerParams) /*: Promise<Customer>*/ {
    return this.prisma.customer.create({ data: { authUserId } });
  }
}
