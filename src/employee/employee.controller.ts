import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  /*
    GET    -> findUnique or findMany
    PATCH  -> update
    POST   -> create
    DELETE -> delete
  */  

  @Get()
  async getOneEmployee(@Param("id") id:number){
    return this.employeeService.getOneEmployee(+id);
  }

  @Get()
  async getAllEmployee(){
    return this.employeeService.getAllEmployees();
  }

  @Patch()
  async updateEmployee(@Param("id") id:number, @Body("data") updateemployeedto:UpdateEmployeeDto){
    return this.employeeService.updateEmployee(+id, updateemployeedto);
  }

  @Post()
  async createEmployee(@Param("id") id:number, @Body("data") createemployeedto:CreateEmployeeDto){
    return this.employeeService.createEmployee(+id, createemployeedto)
  }

  @Delete()
  async deleteEmployee(@Param("id") id:number){
    return this.employeeService.deleteEmployee(+id);
  }
}
