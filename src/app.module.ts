import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports:[EmployeeModule],
  providers:[PrismaService]
})

export class AppModule{}