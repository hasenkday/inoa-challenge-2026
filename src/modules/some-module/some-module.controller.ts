import { Controller, Get } from '@nestjs/common'

import { CacheSWR } from '@/common/decorators/cache-swr'

import { SomeModuleService } from './some-module.service'
import type { SomeTypes } from './some-module.types'

@Controller('api/some-endpoint')
export class SomeModuleController {
  constructor(private readonly someThing: SomeModuleService) {}

  @Get()
  @CacheSWR(600, 86400)
  async getSomething(): Promise<SomeTypes[]> {
    const result = (await this.someThing.getSomething()) as SomeTypes[]
    return result
  }
}
