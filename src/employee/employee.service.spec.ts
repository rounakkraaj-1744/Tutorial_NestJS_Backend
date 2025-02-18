import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockEmployee = {
  id: 1,
  emp_name: "rocky",
  emp_id: 1001,
  email: "rocky@mail.com",
  statusDelete: false,
};


describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService, PrismaService],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAllEmployee', () => {
    it('should return an array of employees', async () => {
      jest.spyOn(prismaService.info, 'findMany').mockResolvedValue([mockEmployee]);

      const result = await employeeService.findAllEmployee();
      expect(result).toEqual([mockEmployee]);
      expect(prismaService.info.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no employees exist', async () => {
      jest.spyOn(prismaService.info, 'findMany').mockResolvedValue([]);

      const result = await employeeService.findAllEmployee();
      expect(result).toEqual([]);
    });
  });

  describe('createEmployee', () => {
    it('should create a new employee', async () => {
      jest.spyOn(prismaService.info, 'create').mockResolvedValue(mockEmployee);

      const result = await employeeService.createEmployee({
        emp_name: mockEmployee.emp_name,
        emp_id: mockEmployee.emp_id,
        email: mockEmployee.email,
      });

      expect(result).toEqual(mockEmployee);
      expect(prismaService.info.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneEmployee', () => {
    it('should return an employee by ID', async () => {
      jest.spyOn(prismaService.info, 'findUnique').mockResolvedValue(mockEmployee);

      const result = await employeeService.findOneEmployee(mockEmployee.id);
      expect(result).toEqual(mockEmployee);
    });

    it('should return null if employee is not found', async () => {
      jest.spyOn(prismaService.info, 'findUnique').mockResolvedValue(null);

      const result = await employeeService.findOneEmployee(999);
      expect(result).toBeNull();
    });
  });

  describe('updateEmployee', () => {
    it('should update an employee', async () => {
      const updatedEmployee = { ...mockEmployee, emp_name: "Updated Name" };
      jest.spyOn(prismaService.info, 'update').mockResolvedValue(updatedEmployee);

      const result = await employeeService.updateEmployee(mockEmployee.id, {
        emp_name: "Updated Name",
        emp_id: mockEmployee.emp_id,
        email: mockEmployee.email,
      });

      expect(result).toEqual(updatedEmployee);
      expect(prismaService.info.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteEmployee', () => {
    it('should delete an employee', async () => {
      jest.spyOn(prismaService.info, 'delete').mockResolvedValue(mockEmployee);

      const result = await employeeService.deleteEmployee(mockEmployee.id);
      expect(result).toEqual(mockEmployee);
      expect(prismaService.info.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('findEmployeeByEmail', () => {
    it('should return an employee by email', async () => {
      jest.spyOn(prismaService.info, 'findUnique').mockResolvedValue(mockEmployee);

      const result = await employeeService.findEmployeeByEmail(mockEmployee.email);
      expect(result).toEqual({ data: mockEmployee, message: "successfully searched" });
    });

    it('should return Email Not Found if employee is not found', async () => {
      jest.spyOn(prismaService.info, 'findUnique').mockResolvedValue(null);

      const result = await employeeService.findEmployeeByEmail("notfound@mail.com");
      expect(result).toEqual({ data: null, message: "Email Not Found" });
    });
  });
});
