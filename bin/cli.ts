import type { AudioxOptions } from '../src/types'
import process from 'node:process'
import { CLI } from '@stacksjs/clapp'
import { version } from '../package.json'
import { audio } from '../src/audio'
import { audioInfo } from '../src/audio-info'
import { debugLog } from '../src/utils'

const cli = new CLI('audiox')

cli
  .command('convert <input> [output]', 'Convert audio file to different format/settings')
  .option('--codec [codec]', 'Audio codec (aac, mp3, pcm_s16le)')
  .option('--bitrate [bitrate]', 'Audio bitrate (e.g., 192k)')
  .option('--channels [channels]', 'Number of audio channels (1, 2, 5.1, 7.1)')
  .option('--sample-rate [rate]', 'Sample rate (8000, 16000, 44100, 48000)')
  .option('--quality [quality]', 'Audio quality (0-9)')
  .option('--metadata [metadata]', 'Audio metadata in format key=value,key2=value2')
  .option('--verbose', 'Enable verbose logging')
  .example('audiox convert input.mp3 output.wav --codec pcm_s16le --channels 1 --sample-rate 16000')
  .example('audiox convert podcast.mp3 podcast.aac --codec aac --bitrate 128k')
  .example('audiox convert song.wav song.mp3 --metadata title=MySong,artist=Me')
  .action(async (input: string, output?: string, options?: any) => {
    try {
      const audioOptions: AudioxOptions = {
        verbose: options.verbose,
      }

      if (options.codec)
        audioOptions.codec = options.codec

      if (options.bitrate)
        audioOptions.bitrate = options.bitrate

      if (options.channels)
        audioOptions.channels = Number(options.channels)

      if (options.sampleRate)
        audioOptions.sampleRate = Number(options.sampleRate)

      if (options.quality)
        audioOptions.quality = Number(options.quality)

      if (options.metadata) {
        audioOptions.metadata = {}
        const pairs = options.metadata.split(',')
        for (const pair of pairs) {
          const [key, value] = pair.split('=')
          if (key && value)
            audioOptions.metadata[key] = value
        }
      }

      // If no output specified, create one based on input
      if (!output) {
        const ext = options.codec === 'aac'
          ? 'aac'
          : options.codec === 'pcm_s16le'
            ? 'wav'
            : options.codec === 'mp3'
              ? 'mp3'
              : 'wav'
        output = input.replace(/\.[^/.]+$/, `.${ext}`)
      }

      debugLog('cli', `Converting ${input} to ${output}`, options.verbose)
      await audio(input, output, audioOptions)
      debugLog('cli', 'Conversion complete', options.verbose)
    }
    catch (error: any) {
      console.error('Error:', error.message)
      process.exit(1)
    }
  })

cli
  .command('info <input>', 'Get audio file information')
  .option('--metadata [tags]', 'Comma-separated metadata tags to retrieve')
  .option('--verbose', 'Enable verbose logging')
  .example('audiox info music.mp3')
  .example('audiox info podcast.mp3 --metadata title,artist,album')
  .action(async (input: string, options?: any) => {
    try {
      const infoOptions = options.metadata
        ? { metadataTags: options.metadata.split(',') }
        : undefined

      debugLog('cli', `Getting info for ${input}`, options.verbose)
      const info = await audioInfo(input, infoOptions)

      // Pretty print the audio information
      console.log('\nAudio Information:')
      console.log('----------------')
      for (const stream of info) {
        console.log(`Codec: ${stream.codec}`)
        console.log(`Channels: ${stream.channels}`)
        console.log(`Sample Rate: ${stream.sampleRate} Hz`)
        console.log(`Bitrate: ${Math.round(Number.parseInt(stream.bitrate) / 1000)}k`)
        console.log(`Duration: ${Math.round(Number.parseFloat(stream.duration) * 100) / 100}s`)

        if (stream.metadata && Object.keys(stream.metadata).length > 0) {
          console.log('\nMetadata:')
          for (const [key, value] of Object.entries(stream.metadata)) {
            console.log(`${key}: ${value}`)
          }
        }
        console.log('----------------')
      }
    }
    catch (error: any) {
      console.error('Error:', error.message)
      process.exit(1)
    }
  })

cli
  .command('completion', 'Generate shell completion script')
  .action(async () => {
    // TODO: Implement shell completion generation
    console.log('Shell completion not implemented yet')
  })

cli.command('version', 'Show the version of the Reverse Proxy CLI').action(async () => {
  console.log(version)
})

cli.version(version)
cli.help()
cli.parse()
