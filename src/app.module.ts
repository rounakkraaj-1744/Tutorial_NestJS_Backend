import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [EmployeeModule],
  providers: [PrismaService]
})
export class AppModule {}
