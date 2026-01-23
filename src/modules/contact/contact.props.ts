export const CONTACTS_PROPS = {
  NAME: 'Name',
  CHANNEL: 'Channel',
  CONTACT: 'Contact',
  MESSAGE: 'Message',
  DATE_SENT: 'Date Sent',
  STATUS: 'Status',
} as const

export const CONTACT_STATUS = {
  CONTACTED: 'Contacted',
  TO_TALK: 'To Talk',
  TALKING: 'Talking',
  ACCEPTED: 'Accepted',
  VIEWED_FEEDBACK: 'Viewed/Feedback',
  REFUSED: 'Refused',
} as const

export const DEFAULT_STATUS = CONTACT_STATUS.CONTACTED
