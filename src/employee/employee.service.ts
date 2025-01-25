import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor (private prisma:PrismaService){}

  async createEmployee(data: CreateEmployeeDto) {
    return this.prisma.info.create({
      data: {
        emp_name: data.emp_name,
        emp_id: Number(data.emp_id),
        email: data.email
    },
    });
  }

  async updateEmployee(id: number, data:UpdateEmployeeDto){
    return this.prisma.info.update({
      where: { id: Number(id) },
      data
    })
  }

  async getAllEmployees(){
    return this.prisma.info.findMany()
  }

  async getOneEmployee(id:number){
    return this.prisma.info.findUnique({
      where: { id: Number(id) },
    });
  }

  async deleteEmployee(id:number){
    return this.prisma.info.delete({
      where: { id: Number(id) },
    })
  }
}