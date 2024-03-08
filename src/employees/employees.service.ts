import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createEmployee: Prisma.EmployeeCreateInput) {
    return this.prisma.employee.create({
      data: createEmployee,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINNER' | 'ADMIN') {
    if (role) {
      this.prisma.employee.findMany({
        where: {
          role,
        },
      });
    }

    return this.prisma.employee.findMany();
  }

  async findOne(id: number) {
    return this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.prisma.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.prisma.employee.delete({
      where: {
        id,
      },
    });
  }
}
