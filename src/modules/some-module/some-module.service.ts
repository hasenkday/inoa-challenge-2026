import { Injectable } from '@nestjs/common'

@Injectable()
export class SomeModuleService {
  getSomething(): Promise<any> {
    return Promise.resolve('something')
  }
}
