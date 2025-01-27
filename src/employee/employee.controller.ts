import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Controller("/employee")
export class EmployeeController{
  constructor (private employeeService: EmployeeService){}

  @Get(":id")
  async getOneEmployee(@Param("id") id:number){
    return this.employeeService.findOneEmployee(+id);
  }

  @Get()
  async getAllEmployees(){
    return this.employeeService.findAllEmployee();
  }

  @Post()
  async createEmployee(@Body() data:CreateEmployeeDto){
    return this.employeeService.createEmployee(data);
  }

  @Patch()
  async updateEmployee(@Param("id") id:number, @Body() data:UpdateEmployeeDto){
    return this.employeeService.updateEmployee(+id, data);
  }

  @Delete()
  async deleteEmployee(@Param("id") id:number){
    return this.employeeService.deleteEmployee(+id);
  }
}