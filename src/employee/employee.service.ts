import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor (private prisma:PrismaService){}

  async createEmployee(data: CreateEmployeeDto) {
    return this.prisma.info.create({
      data,
    });
  }

  async updateEmployee(id: number, data:UpdateEmployeeDto){
    return this.prisma.info.update({
      where: {id},
      data
    })
  }

  async getAllEmployees(id:number){
    return this.prisma.info.findMany({
      where: {id},
    })
  }

  async getOneEmployee(id:number){
    return this.prisma.info.findUnique({
      where: {id},
    })
  }

  async deleteEmployee(id:number){
    return this.prisma.info.delete({
      where: {id},
    })
  }
}