import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  getEmployeeInfo(){
    return {
      "name":"ABC",
      "id":123,
      "email":"abc@gmail.com"
    }
  }
}
