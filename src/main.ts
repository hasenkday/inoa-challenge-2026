import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { env } from './config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false })

  app.use(helmet())

  app.enableCors({
    origin: env.ALLOWED_ORIGINS_LIST,
    methods: ['GET', 'POST', 'OPTIONS'],
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  )

  await app.listen(env.PORT)
}

void bootstrap()
