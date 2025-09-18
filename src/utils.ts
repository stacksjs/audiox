import { Logger } from '@stacksjs/clarity'
import { config } from './config'

// Create a module-level singleton logger for the package
const baseLogger: any = new (Logger as any)('audiox')

export function debugLog(category: string, message: string, verbose?: boolean | string[]): void {
  if (verbose === false) {
    return
  }

  // If a category is provided, instantiate a scoped logger name
  const logger: any = category ? new (Logger as any)(`audiox:${category}`) : baseLogger

  if (verbose === true || config.verbose === true) {
    // Use debug level when verbose is explicitly enabled
    logger.debug(message)
  }

  if (Array.isArray(verbose)) {
    // Check if any of the verbose categories match the prefix
    const matches = verbose.some(prefix => category.startsWith(prefix))
    if (matches) {
      logger.info(message)
    }
  }

  if (Array.isArray(config.verbose)) {
    // Check if any of the verbose categories match the prefix
    const matches = config.verbose.some(prefix => category.startsWith(prefix))
    if (matches) {
      logger.info(message)
    }
  }
}
