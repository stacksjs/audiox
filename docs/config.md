# Configuration

Audiox can be configured using a `audiox.config.ts` _(or `audiox.config.js`)_ file in your project root. This configuration will be automatically loaded when running the `audiox` commands.

```ts
// audiox.config.{ts,js}
import type { AudioxOptions } from '@stacksjs/audiox'

const config: AudioxOptions = {
  /**
   * The audio codec to use.
   * Default: 'mp3'
   * Options: 'aac', 'mp3', 'pcm_s16le'
   */
  codec: 'mp3',

  /**
   * The audio bitrate.
   * Default: '192k'
   * Example values: '128k', '256k', '320k'
   */
  bitrate: '192k',

  /**
   * The number of audio channels.
   * Default: 2
   * Options: 1 (mono), 2 (stereo), 5.1 (surround), 7.1 (surround)
   */
  channels: 2,

  /**
   * The audio sample rate in Hz.
   * Default: 44100
   * Common values: 8000, 16000, 44100, 48000
   */
  sampleRate: 44100,

  /**
   * The audio quality setting (0-9).
   * Lower values mean higher quality.
   * Only applicable for certain codecs.
   */
  quality: 0,

  /**
   * Default metadata to apply to converted files.
   * These can be overridden per conversion.
   */
  metadata: {
    artist: 'Default Artist',
    album: 'Default Album',
    year: '2024',
  },

  /**
   * Enable verbose output for debugging.
   * Default: false
   */
  verbose: false,
}

export default config
```

## Using the Configuration

The configuration file will be automatically used by both the CLI and library functions. You can override these settings per command or function call:

### CLI Override

```bash
# Override config settings via CLI
audiox convert input.mp3 output.wav \
  --codec pcm_s16le \
  --channels 1 \
  --sample-rate 16000 \
  --bitrate 128k
```

### Library Override

```ts
import { audio } from '@stacksjs/audiox'

// Override config settings in function call
await audio('input.mp3', 'output.wav', {
  codec: 'pcm_s16le',
  channels: 1,
  sampleRate: 16000,
  bitrate: '128k',
})
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `codec` | string | 'mp3' | Audio codec to use (aac, mp3, pcm_s16le) |
| `bitrate` | string | '192k' | Audio bitrate (e.g., '128k', '256k') |
| `channels` | number | 2 | Number of audio channels |
| `sampleRate` | number | 44100 | Sample rate in Hz |
| `quality` | number | - | Quality setting (0-9, lower is better) |
| `metadata` | object | - | Default metadata for audio files |
| `verbose` | boolean | false | Enable verbose output |

To learn more about audio processing options, check out the [FFmpeg documentation](https://ffmpeg.org/documentation.html).
