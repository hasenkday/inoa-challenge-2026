import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'

import { ContactService } from './contact.service'
import { CreateContactDto } from './dto/create-contact.dto'

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contact: ContactService) {}

  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() dto: CreateContactDto) {
    return this.contact.create(dto)
  }
}
