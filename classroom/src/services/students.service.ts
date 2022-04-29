import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { Student } from '../http/graphql/models/student';

interface CreateStudentParams {
  authUserId: string;
}

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Student[]> {
    return this.prisma.student.findMany();
  }

  async findByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: { authUserId },
    });
  }

  async findById(id: string): Promise<Student> {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  async create({ authUserId }: CreateStudentParams) /*: Promise<Student>*/ {
    return this.prisma.student.create({ data: { authUserId } });
  }
}
