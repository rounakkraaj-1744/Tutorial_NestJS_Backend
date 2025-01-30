import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { EmailParam } from "src/decorator/email.decorator";
import { IntegerPipe } from "src/pipe/integer.pipe";

@Controller("/employee")
export class EmployeeController{
  constructor (private employeeService: EmployeeService){}

  @Get(":id")
  @UsePipes(IntegerPipe)
  async getOneEmployee(@Param("id") id:number){
    return this.employeeService.findOneEmployee(id);
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

  @Patch(":id")
  async deleteEmployee(@Param("id") id:number){
    return this.employeeService.deleteEmployee(id);
  }

  @Get("search/:email")
    getEmployeeByEmail(@EmailParam() email: string){
        return this.employeeService.findEmployeeByEmail(email);
    }
}