import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  // 관리자만 수행할 수 있도록.
  async getAllUser(): Promise<User[]> {
    const user = await this.userService.findAll();
    return user;
  }

  // @Get('Test'){
  //   this.userService.signUpTest()
  // }
}
