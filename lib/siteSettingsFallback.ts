import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const fallbackPath = path.join(process.cwd(), '.data', 'site-settings.json')

type FallbackSettings = Record<string, unknown>

async function readFallbackSettingsFile() {
  try {
    const raw = await readFile(fallbackPath, 'utf8')
    return JSON.parse(raw) as FallbackSettings
  } catch {
    return {}
  }
}

export async function readFallbackSiteSetting<T>(key: string, defaultValue: T) {
  const settings = await readFallbackSettingsFile()
  const value = settings[key]

  if (value === undefined || value === null || typeof value !== 'object') {
    return defaultValue
  }

  return {
    ...defaultValue,
    ...value,
  } as T
}

export async function writeFallbackSiteSetting<T>(key: string, value: T) {
  const settings = await readFallbackSettingsFile()

  await mkdir(path.dirname(fallbackPath), { recursive: true })
  await writeFile(
    fallbackPath,
    JSON.stringify(
      {
        ...settings,
        [key]: value,
      },
      null,
      2
    ),
    'utf8'
  )
}

export function isMissingSiteSettingsTable(error: { message?: string } | null | undefined) {
  return Boolean(error?.message?.includes('site_settings'))
}
