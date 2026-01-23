import type { Client } from '@notionhq/client'

type Cache<T> = { value: T; expiresAt: number }
const cache = new Map<string, Cache<string>>()

function now() {
  return Date.now()
}

export async function getPrimaryDataSourceId(client: Client, databaseId: string): Promise<string> {
  const cached = cache.get(databaseId)
  if (cached && cached.expiresAt > now()) return cached.value

  const db = await client.databases.retrieve({ database_id: databaseId })

  const dataSources = (db as unknown as { data_sources?: Array<{ id: string }> }).data_sources
  const id = dataSources?.[0]?.id

  if (!id) {
    throw new Error(`No data_sources found for database ${databaseId}.`)
  }

  cache.set(databaseId, { value: id, expiresAt: now() + 10 * 60_000 })
  return id
}
