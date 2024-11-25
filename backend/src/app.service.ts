import { Injectable } from '@nestjs/common';
import { mockProjects } from './lib/mocks/projects';

@Injectable()
export class AppService {
  getHello() {
    return mockProjects[4];
  }
}
