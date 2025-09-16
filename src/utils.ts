import { Logger } from '@stacksjs/clarity'
import { config } from './config'

const baseLogger = new Logger('audiox')

export function debugLog(category: string, message: string, verbose?: boolean | string[]): void {
  if (verbose === false) {
    return
  }

  const logger = baseLogger.extend(category)

  if (verbose === true || config.verbose === true) {
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
