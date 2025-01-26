<p align="center"><img src="https://github.com/stacksjs/audiox/blob/main/.github/art/cover.jpg?raw=true" alt="Social Card of this repo"></p>

[![npm version][npm-version-src]][npm-version-href]
[![GitHub Actions][github-actions-src]][github-actions-href]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
<!-- [![npm downloads][npm-downloads-src]][npm-downloads-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

# audiox

> A TypeScript-based audio processing library & CLI that wraps ffmpeg, helping you optimize audio files in Node.js/Bun environments.

## Features

- Audio optimizations and conversions
- Stream-based processing support
- Metadata handling
- Multiple output formats _(WAV, MP3, AAC)_
- Configurable audio properties _(bitrate, channels, sample rate)_
- Error handling and detailed logging
- Fully typed with TypeScript

## Install

```bash
bun install @stacksjs/audiox
```

## Get Started

There are two ways of using this tool: as a library or as a CLI.

### Library Usage

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

### Advanced Usage

#### Stream Processing with Custom Handlers

```ts
// Process audio with stream output handling
await audioWithStreamOut(
  'input.mp3',
  {
    onProcessDataFlushed: (chunk) => {
      // Handle each chunk of processed audio
      console.log('Processing chunk:', chunk?.length)
    },
    onProcessDataEnd: async (data) => {
      // Handle completed audio data
      await Bun.write('output.wav', data!)
    },
  },
  {
    codec: 'pcm_s16le',
    bitrate: '128k',
    channels: 1,
    sampleRate: 16000,
  },
)
```

#### Detailed Audio Information

```ts
// Get audio information including metadata
const audioInfo = await audioInfo('music.mp3', {
  metadataTags: ['title', 'artist', 'album', 'track', 'genre', 'year'],
})

// Example response:
// [
//   {
//     codec: 'mp3',
//     channels: 2,
//     sampleRate: '44100',
//     bitrate: '192000',
//     duration: '180.5',
//     metadata: {
//       title: 'Song Title',
//       artist: 'Artist Name',
//       album: 'Album Name',
//       track: '1',
//       genre: 'Pop',
//       year: '2024'
//     }
//   }
// ]
```

## Configuration

Audiox can be configured using a `audiox.config.ts` (or `audiox.config.js`) file:

```ts
import type { AudioxConfig } from '@stacksjs/audiox'

const config: AudioxConfig = {
  verbose: true, // Enable detailed logging
  // Default audio settings
  codec: 'mp3',
  bitrate: '192k',
  channels: 2,
  sampleRate: 44100,
}

export default config
```

### Available Options

```ts
interface AudioxOptions {
  codec?: 'aac' | 'mp3' | 'pcm_s16le' | string
  bitrate?: string // e.g., "192k"
  channels?: 1 | 2 | 5.1 | 7.1 | number
  sampleRate?: 8000 | 16000 | 44100 | 48000 | number
  quality?: number
  metadata?: {
    [key: string]: string
  }
  onError?: (error: unknown) => void
  verbose: boolean
}
```

## Testing

```bash
bun test
```

## Changelog

Please see our [releases](https://github.com/stacksjs/stacks/releases) page for more information on what has changed recently.

## Contributing

Please review the [Contributing Guide](https://github.com/stacksjs/contributing) for details.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discussions on GitHub](https://github.com/stacksjs/stacks/discussions)

For casual chit-chat with others using this package:

[Join the Stacks Discord Server](https://discord.gg/stacksjs)

## Postcardware

Two things are true: Stacks OSS will always stay open-source, and we do love to receive postcards from wherever Stacks is used! _We also publish them on our website._

Our address: Stacks.js, 12665 Village Ln #2306, Playa Vista, CA 90094 🌎

## Sponsors

We would like to extend our thanks to the following sponsors for funding Stacks development. If you are interested in becoming a sponsor, please reach out to us.

- [JetBrains](https://www.jetbrains.com/)
- [The Solana Foundation](https://solana.com/)

## Credits

- [`bun-ffmpeg`](https://github.com/KenjiGinjo/bun-ffmpeg)
- [Chris Breuer](https://github.com/chrisbbreuer)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [LICENSE](https://github.com/stacksjs/stacks/tree/main/LICENSE.md) for more information.

Made with 💙

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@stacksjs/audiox?style=flat-square
[npm-version-href]: https://npmjs.com/package/@stacksjs/audiox
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/stacksjs/audiox/ci.yml?style=flat-square&branch=main
[github-actions-href]: https://github.com/stacksjs/audiox/actions?query=workflow%3Aci

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/stacksjs/audiox/main?style=flat-square
[codecov-href]: https://codecov.io/gh/stacksjs/audiox -->
