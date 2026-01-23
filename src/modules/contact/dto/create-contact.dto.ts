import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator'
import type { ContactChannel } from '../contact.types'

/**
 * DTO for creating a contact.
 */
export class CreateContactDto {
  /** Contact's name. */
  @IsString()
  @MaxLength(120)
  name!: string

  /** Communication channel.
   * @example "Whatsapp"
   */
  @IsIn(['Whatsapp', 'E-mail', 'Instagram', 'Linkedin', 'Other'])
  channel!: ContactChannel

  /**
   * Contact info such as phone or email.
   * @example "+55 19 99999-8888"
   * @example "fulana.ciclana@email.com"
   */
  @IsString()
  @MaxLength(200)
  contact!: string

  /** Message content. */
  @IsString()
  @MaxLength(2000)
  message!: string

  /** Optional company name. */
  @IsOptional()
  @IsString()
  company?: string
}
