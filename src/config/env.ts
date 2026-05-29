import 'dotenv/config'

function splitCsv(value: string): string[] {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

const allowedOriginsRaw = process.env.ALLOWED_ORIGINS ?? ''

export const env = {
  NODE_ENV: (process.env.NODE_ENV ?? 'development') as 'development' | 'production' | 'test',

  PORT: Number(process.env.PORT ?? 3000),

  ALLOWED_ORIGINS: allowedOriginsRaw,
  ALLOWED_ORIGINS_LIST: splitCsv(allowedOriginsRaw),

  BRAPI_BASE_URL: process.env.BRAPI_BASE_URL ?? 'https://brapi.dev/api',
  BRAPI_TOKEN: process.env.BRAPI_TOKEN ?? '',
} as const
