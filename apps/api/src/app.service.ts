import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  @Get()
  getHello() {
    return {
      service: 'user-auth-service',
      status: 'active',
      timestamp: new Date().toISOString(),
    };
  }
}
