import { Injectable } from '@nestjs/common'
import { Client } from '@notionhq/client'
import { env } from '@/config/env'

@Injectable()
export class NotionClient {
  public readonly client: Client

  constructor() {
    this.client = new Client({
      auth: env.NOTION_TOKEN,
    })
  }
}
