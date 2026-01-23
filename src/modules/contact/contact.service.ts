import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { NotionClient } from '@/integrations/notion/notion.client'
import { env } from '@/config/env'
import { CONTACTS_PROPS, DEFAULT_STATUS } from './contact.props'
import type { CreateContactInput } from './contact.types'

@Injectable()
export class ContactService {
  constructor(private readonly notion: NotionClient) {}

  async create(input: CreateContactInput) {
    if (input.company && input.company.trim().length === 0) {
      throw new BadRequestException('Company name cannot be empty')
    }

    const nowIso = new Date().toISOString()

    try {
      await this.notion.client.pages.create({
        parent: { database_id: env.NOTION_CONTACTS_DB_ID },
        properties: {
          [CONTACTS_PROPS.NAME]: { title: [{ text: { content: input.name } }] },
          [CONTACTS_PROPS.CHANNEL]: { select: { name: input.channel } },
          [CONTACTS_PROPS.CONTACT]: {
            rich_text: [{ text: { content: input.contact } }],
          },
          [CONTACTS_PROPS.MESSAGE]: {
            rich_text: [{ text: { content: input.message } }],
          },
          [CONTACTS_PROPS.DATE_SENT]: { date: { start: nowIso } },
          [CONTACTS_PROPS.STATUS]: { status: { name: DEFAULT_STATUS } },
        },
      })

      return {
        success: true,
        message: 'Contact saved successfully',
        data: {
          name: input.name,
          dateSent: nowIso,
        },
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error creating contact in Notion:', error.message)
      } else {
        console.error('Unknown error creating contact in Notion:', error)
      }

      throw new InternalServerErrorException('Failed to save contact. Please try again later.')
    }
  }
}
