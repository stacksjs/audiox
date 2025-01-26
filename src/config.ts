import type { AudioxConfig } from './types'
import { resolve } from 'node:path'
import { loadConfig } from 'bunfig'

export const defaultConfig: AudioxConfig = {
  verbose: true,
}

// @ts-expect-error dtsx issue
// eslint-disable-next-line antfu/no-top-level-await
export const config: AudioxConfig = await loadConfig({
  name: 'audiox',
  cwd: resolve(__dirname, '..'),
  defaultConfig,
})
