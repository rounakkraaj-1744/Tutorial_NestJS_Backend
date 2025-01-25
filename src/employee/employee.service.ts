import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  obj = [{
    "name": "abc",
    "emp_id": 123,
    "email": "abc@gmail.com"
  },{
    "name": "xyz",
    "emp_id": 456,
    "email": "xyz@gmail.com"
  }]
  getEmployeeInfo(){
    return this.obj;
  }
}
