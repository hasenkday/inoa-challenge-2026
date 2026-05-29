/**
 * Returns the month key from an ISO date. (2024-01-15 -> 2024-01)
 */
export function getMonthKey(date: string): string {
  return date.slice(0, 7)
}

/**
 * Returns all month keys between two ISO dates.
 */
export function getMonthsBetween(startDate: string, endDate: string): string[] {
  const months: string[] = []
  const current = new Date(`${getMonthKey(startDate)}-01T00:00:00`)
  const end = new Date(`${getMonthKey(endDate)}-01T00:00:00`)

  while (current <= end) {
    const year = current.getFullYear()
    const month = String(current.getMonth() + 1).padStart(2, '0')

    months.push(`${year}-${month}`)
    current.setMonth(current.getMonth() + 1)
  }

  return months
}

/**
 * Returns the full date range of a month.
 */
export function getMonthDateRange(month: string): {
  startDate: string
  endDate: string
} {
  const [year, monthNumber] = month.split('-').map(Number)

  const startDate = `${month}-01`
  const lastDay = new Date(year, monthNumber, 0).getDate()
  const endDate = `${month}-${String(lastDay).padStart(2, '0')}`

  return {
    startDate,
    endDate,
  }
}
