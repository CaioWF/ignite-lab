import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';
import { Course } from '../http/graphql/models/course';

interface CreateCourseParams {
  title: string;
  slug?: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany();
  }

  async findById(id: string): Promise<Course> {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string): Promise<Course> {
    return this.prisma.course.findUnique({
      where: { slug },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourseParams): Promise<Course> {
    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (courseAlreadyExists) {
      throw new Error('Course already exists');
    }

    return this.prisma.course.create({ data: { title, slug } });
  }
}
