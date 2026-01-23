export function cacheControlPublicSWR(options: { sMaxAgeSeconds: number; swrSeconds: number }) {
  const { sMaxAgeSeconds, swrSeconds } = options
  return `public, s-maxage=${sMaxAgeSeconds}, stale-while-revalidate=${swrSeconds}`
}
