import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }
  /* POST   ->  create, GET    ->  findUnique and findAll, PATCH  ->  update, DELETE ->  delete */
  async createEmployee(data: CreateEmployeeDto) {
    return this.prisma.info.create({
      data: {
        emp_name: data.emp_name,
        emp_id: data.emp_id,
        email: data.email
      }
    });
  }
  async findOneEmployee(id: Number) {
    return this.prisma.info.findUnique({
      where: { id: Number(id) }
    });
  }

  async findAllEmployee() {
    const cacheKey = "employee_list";
    const cachedData = await this.cacheManager.get(cacheKey);
  
    if (cachedData) {
      console.log("Returning cached data");
      return cachedData;
    }
  
    console.log("Fetching from database...");
    const employees = await this.prisma.info.findMany();
  
    await this.cacheManager.set(cacheKey, employees, 300_000);
    return employees;
  }
  

  async updateEmployee(id: Number, data: UpdateEmployeeDto) {
    return this.prisma.info.update({
      where: { id: Number(id) },
      data: {
        emp_name: data.emp_name,
        emp_id: data.emp_id,
        email: data.email
      }
    })
  }

  async deleteEmployee(id: Number) {
    return this.prisma.info.delete({
      where: { id: Number(id) }
    })
  }

  async findEmployeeByEmail(email: string) {
    const result = await this.prisma.info.findUnique({ where: { email } });
    if (result)
      return { data: result, message: "successfully searched" }
    else
      return { data: result, message: "Email Not Found" };
  }
}