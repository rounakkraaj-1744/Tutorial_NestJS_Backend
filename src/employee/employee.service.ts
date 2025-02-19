import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Injectable()
export class EmployeeService{
  constructor(private prisma:PrismaService){ }
  /* POST   ->  create, GET    ->  findUnique and findAll, PATCH  ->  update, DELETE ->  delete */
    async createEmployee(data:CreateEmployeeDto){
      return this.prisma.info.create({
        data:{
          emp_name: data.emp_name,
          emp_id: data.emp_id,
          email:data.email
        }
      });
    }
    async findOneEmployee(id:Number){
      return this.prisma.info.findUnique({
        where: {id: Number(id)}
      });
    }

    async findAllEmployee(){
      return this.prisma.info.findMany();
    }
    
    async updateEmployee(id:Number, data:UpdateEmployeeDto){
      return this.prisma.info.update({
        where: {id: Number(id)},
        data:{
          emp_name: data.emp_name,
          emp_id: data.emp_id,
          email:data.email
        }
      })
    }
    
    async deleteEmployee(id:Number){
      return this.prisma.info.delete({
        where: {id: Number(id)}
      })
    }

    async findEmployeeByEmail(email:string){
      const result = await this.prisma.info.findUnique({where: {email}});
      if (result)
        return { data: result, message: "successfully searched"}
      else
        return { data:result, message:"Email Not Found"};
    }
}