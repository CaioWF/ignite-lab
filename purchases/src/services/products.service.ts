import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { Product } from '../http/graphql/models/product';
import slugify from 'slugify';
interface CreateProductParams {
  title: string;
}
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findById(id: string): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async create({ title }: CreateProductParams): Promise<Product> {
    const slug = slugify(title, { lower: true });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (productWithSameSlug)
      throw new Error('Another product with same slug already exists');

    return this.prisma.product.create({ data: { title, slug } });
  }
}
