export type ContactChannel = 'Whatsapp' | 'E-mail' | 'Instagram' | 'Linkedin' | 'Other'

export type CreateContactInput = {
  name: string
  channel: ContactChannel
  contact: string
  message: string
  company?: string
}
