import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor (private prisma:PrismaService){}

  async create(data: CreateEmployeeDto) {
    return this.prisma.info.create({
      data,
    });
  }

  async update(id: number, data:UpdateEmployeeDto){
    return this.prisma.info.update({
      where: {id},
      data
    })
  }

  async findMany(id:number){
    return this.prisma.info.findMany({
      where: {id},
    })
  }

  async findUnique(id:number){
    return this.prisma.info.findUnique({
      where: {id},
    })
  }

  delete(id:number){
    return this.prisma.info.delete({
      where: {id},
    })
  }
}