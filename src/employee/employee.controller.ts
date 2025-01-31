import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { EmailParam } from "src/common/decorator/email.decoratorcorator";
import { IntegerPipe } from "src/common/pipe/integer.pipe";
import { Roles } from "src/common/decorator/role.decoratorcorator";
import { AuthorizationGuard } from "src/common/guard/authorisation.guard";
import { EmployeeDTO } from "./dto/employee.dto";
import { Serialize } from "src/common/interceptor/serialize.interceptor";

@Controller("/employee")
export class EmployeeController{
  constructor (private employeeService: EmployeeService){}

  @Get(":id")
  @UsePipes(IntegerPipe)
  @Serialize(EmployeeDTO)
  async getOneEmployee(@Param("id", ParseIntPipe) id:number){
    return this.employeeService.findOneEmployee(id);
  }

  @Get()
  async getAllEmployees(){
    return this.employeeService.findAllEmployee();
  }

  @Post()
  @Roles("admin")
  @UseGuards(AuthorizationGuard)
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
