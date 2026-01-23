import 'dotenv/config'

function must(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

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

  NOTION_TOKEN: must('NOTION_TOKEN'),
  NOTION_CONTACTS_DB_ID: must('NOTION_CONTACTS_DB_ID'),
  NOTION_CASES_DB_ID: must('NOTION_CASES_DB_ID'),
} as const
