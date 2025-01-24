import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsEmail, IsInt, IsString } from "class-validator"

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @IsString()
    emp_name?: string;

    @IsInt()
    emp_id?: number;

    @IsEmail()
    email?: string;
}
