import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { Enrollment } from '../http/graphql/models/enrollment';

interface FindByCourseIdAndStudentIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByCourseIdAndStudentId({
    courseId,
    studentId,
  }: FindByCourseIdAndStudentIdParams): Promise<Enrollment> {
    return this.prisma.enrollment.findFirst({
      where: {
        canceledAt: null,
        courseId,
        studentId,
      },
    });
  }

  async findByStudentId(studentId): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
        studentId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
