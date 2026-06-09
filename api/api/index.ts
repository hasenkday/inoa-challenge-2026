import express, { type Express } from 'express'
import type { IncomingMessage, ServerResponse } from 'http'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { AppModule } from '@/app.module'

let cachedServer: Express | null = null

async function bootstrapServer(): Promise<Express> {
  const expressApp = express()
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), {
    logger: ['error', 'warn', 'log'],
  })
  await app.init()
  return expressApp
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!cachedServer) cachedServer = await bootstrapServer()

  // Vercel -> Express boundary: unavoidable cast, isolated here only.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  cachedServer(req as unknown as any, res as unknown as any)
}
