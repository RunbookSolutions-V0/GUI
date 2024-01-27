export * from './VaporFile'

export function formatBytes(bytes: number, precision: number = 2): string {
  const units: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  bytes = Math.max(bytes, 0)
  const pow = Math.floor((bytes ? Math.log(bytes) : 0) / Math.log(1024))
  const powLimited = Math.min(pow, units.length - 1)

  bytes /= 1 << (10 * pow)

  return `${bytes.toFixed(precision)} ${units[powLimited]}`
}
