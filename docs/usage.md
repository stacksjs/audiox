# Get Started

There are two ways of using this audio processing tool: _as a library or as a CLI._

## Library Usage

Given the npm package is installed:

```ts
import { audio, audioInfo } from '@stacksjs/audiox'

// Basic audio conversion
await audio('input.mp3', 'output.wav', {
  codec: 'pcm_s16le',
  channels: 1,
  sampleRate: 16000,
  bitrate: '160k',
})

// Get audio file information
const info = await audioInfo('audio.mp3')
console.log(info)
// [
//   {
//     codec: 'mp3',
//     channels: 2,
//     sampleRate: '44100',
//     bitrate: '192000',
//     duration: '180.5',
//   }
// ]

// Convert with metadata
await audio('input.mp3', 'output.mp3', {
  codec: 'mp3',
  bitrate: '192k',
  channels: 2,
  sampleRate: 44100,
  metadata: {
    title: 'My Track',
    artist: 'Artist Name',
    album: 'Album Name',
    year: '2024',
  },
})
```

### Advanced Usage with Streams

```ts
// Stream processing
const file = Bun.file('input.mp3')
const stream = file.stream()

await audioWithStreamInput(stream, 'output.wav', {
  codec: 'pcm_s16le',
  bitrate: '128k',
  channels: 1,
  sampleRate: 16000,
})

// Buffer processing
const arrayBuffer = await Bun.file('input.mp3').arrayBuffer()
const wavData = await audioWav(new Uint8Array(arrayBuffer))
await Bun.write('output.wav', wavData)
```

### Configuration

You can create a `audiox.config.ts` (or `audiox.config.js`) file in your project root to set default options:

```ts
import type { AudioxOptions } from '@stacksjs/audiox'

const config: AudioxOptions = {
  codec: 'mp3',
  bitrate: '192k',
  channels: 2,
  sampleRate: 44100,
  verbose: true,
}

export default config
```

## CLI Usage

The CLI provides easy access to audio conversion and information features:

### Basic Commands

```bash
# Convert audio files
audiox convert input.mp3 output.wav --codec pcm_s16le
audiox convert podcast.mp3 podcast.aac --codec aac --bitrate 128k

# Get audio information
audiox info music.mp3
audiox info podcast.mp3 --metadata title,artist,album

# Show help and version
audiox --help
audiox version
```

### Convert Command Options

```bash
# Convert to WAV with specific settings
audiox convert input.mp3 output.wav \
  --codec pcm_s16le \
  --channels 1 \
  --sample-rate 16000 \
  --bitrate 128k

# Convert to MP3 with metadata
audiox convert input.wav output.mp3 \
  --codec mp3 \
  --bitrate 192k \
  --metadata "title=My Song,artist=Artist Name,year=2024"

# Convert to AAC with high quality
audiox convert input.mp3 output.aac \
  --codec aac \
  --bitrate 256k \
  --channels 2 \
  --sample-rate 48000
```

Available options for conversion:

- `--codec`: Audio codec (aac, mp3, pcm_s16le)
- `--bitrate`: Audio bitrate (e.g., "192k")
- `--channels`: Number of channels (1, 2, 5.1, 7.1)
- `--sample-rate`: Sample rate (8000, 16000, 44100, 48000)
- `--quality`: Audio quality setting (0-9)
- `--metadata`: Metadata in format key=value,key2=value2
- `--verbose`: Enable verbose output

### Info Command

```bash
# Get basic audio information
audiox info music.mp3

# Get specific metadata
audiox info podcast.mp3 --metadata title,artist,album,year

# Get info with verbose output
audiox info music.mp3 --verbose
```

## Testing

```bash
bun test
```

## Requirements

- Node.js/Bun environment
- FFmpeg installed on your system

For more detailed information about specific features and options, check out our [configuration guide](./config.md).
