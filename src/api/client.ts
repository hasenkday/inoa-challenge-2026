import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.B3_STOCK_VIEWER_API_BASE_URL ?? 'http://localhost:3000',
})
