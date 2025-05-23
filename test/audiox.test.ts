import { describe, expect, it } from 'bun:test'
import { unlink } from 'node:fs/promises'
import { audio, audioWav, audioWithStreamInput, audioWithStreamInputAndOut, audioWithStreamOut } from '../src/audio'
import { audioArgs } from '../src/audio-args'
import { audioInfo } from '../src/audio-info'
import { extractError } from '../src/utils/extract-error'

const input = `${import.meta.dir}/samples/input.mp3`
const output = {
  wav: `${import.meta.dir}/samples/output.wav`,
  mp3: `${import.meta.dir}/samples/output.mp3`,
  aac: `${import.meta.dir}/samples/output.aac`,
}

describe('audio', () => {
  it('should throw an error if the input is not a correct path', async () => {
    expect(
      async () =>
        await audio('xxx.xx', 'undefined', {
          codec: 'pcm_s16le',
          channels: 1,
          sampleRate: 16000,
          bitrate: '160k',
          onError: (error: any) => {
            throw error
          },
          verbose: false,
        }),
    ).toThrowError()
  })

  it('audio: normal test ', async () => {
    await audio(input, output.wav, {
      codec: 'pcm_s16le',
      channels: 1,
      sampleRate: 16000,
      bitrate: '160k',
      verbose: false,
    })

    expect(await Bun.file(output.wav).exists()).toBeTrue()

    const result = await audioInfo(output.wav)

    expect(result).toEqual([
      {
        codec: 'pcm_s16le',
        channels: 1,
        sampleRate: '16000',
        bitrate: '256000',
        duration: '12.312000',
      },
    ])

    await unlink(output.wav)
  })

  it('audio: normal test with id3 metadata', async () => {
    await audio(input, output.mp3, {
      codec: 'mp3',
      bitrate: '192k',
      channels: 2,
      sampleRate: 44100,
      verbose: false,
      metadata: {
        title: 'track title',
        artist: 'track artist',
        album: 'track album',
        comment: 'track comment',
        genre: 'track genre',
        year: '2024',
        track: '1',
        composer: 'track composer',
      },
    })

    expect(await Bun.file(output.mp3).exists()).toBeTrue()

    const result = await audioInfo(output.mp3, {
      metadataTags: ['title', 'artist', 'album', 'track', 'genre', 'composer', 'comment', 'year', 'encoder'],
    })

    expect(result).toMatchObject([
      {
        codec: 'mp3',
        channels: 2,
        sampleRate: '44100',
        bitrate: '192000',
        duration: '12.355918',
        metadata: {
          title: 'track title',
          artist: 'track artist',
          album: 'track album',
          track: '1',
          genre: 'track genre',
          composer: 'track composer',
          comment: 'track comment',
          year: '2024',
        },
      },
    ])

    // This could be different in different environments
    // eslint-disable-next-line ts/no-non-null-asserted-optional-chain
    expect(result[0].metadata?.encoder!).toMatch(/Lavf\d+\.\d+\.\d+/)

    await unlink(output.mp3)
  })

  it('audio: test with quality option', async () => {
    await audio(input, output.mp3, {
      codec: 'mp3',
      bitrate: '192k',
      channels: 2,
      sampleRate: 44100,
      quality: 0,
      verbose: false,
    })

    expect(await Bun.file(output.mp3).exists()).toBeTrue()

    const result = await audioInfo(output.mp3, {
      metadataTags: ['title', 'artist', 'album', 'track', 'genre', 'composer', 'comment', 'year', 'encoder'],
    })

    // Check the basic audio properties
    expect(result[0]).toMatchObject({
      codec: 'mp3',
      channels: 2,
      sampleRate: '44100',
    })

    // Verify bitrate is within reasonable range
    const actualBitrate = Number.parseInt(result[0].bitrate)
    expect(actualBitrate).toBeGreaterThan(150000) // ~150kbps
    expect(actualBitrate).toBeLessThan(250000) // ~250kbps

    // Verify duration is within reasonable range
    const actualDuration = Number.parseFloat(result[0].duration)
    expect(actualDuration).toBeGreaterThan(10) // At least 10 seconds
    expect(actualDuration).toBeLessThan(15) // Less than 15 seconds

    await unlink(output.mp3)
  })

  it('audio: test with only codec', async () => {
    await audio(input, output.mp3, {
      codec: 'mp3',
      verbose: false,
    })

    expect(await Bun.file(output.mp3).exists()).toBeTrue()

    const result = await audioInfo(output.mp3, {
      metadataTags: ['title', 'artist', 'album', 'track', 'genre', 'composer', 'comment', 'year', 'encoder'],
    })

    // Check the basic audio properties
    expect(result[0]).toMatchObject({
      codec: 'mp3',
    })

    // Verify duration is within reasonable range
    const actualDuration = Number.parseFloat(result[0].duration)
    expect(actualDuration).toBeGreaterThan(10) // At least 10 seconds
    expect(actualDuration).toBeLessThan(15) // Less than 15 seconds

    await unlink(output.mp3)
  })

  it('audioWithStreamInput: normal test ', async () => {
    const file = Bun.file(input)
    const stream = file.stream()

    await audioWithStreamInput(stream, output.wav, {
      codec: 'pcm_s16le',
      bitrate: '128k',
      channels: 1,
      sampleRate: 16000,
      verbose: false,
    })

    expect(await Bun.file(output.wav).exists()).toBeTrue()

    await unlink(output.wav)
  })

  it('audioWithStreamOut: normal test ', async () => {
    const fileWritePromise = new Promise<void>((resolve) => {
      audioWithStreamOut(
        input,
        {
          onProcessDataFlushed: () => { },
          onProcessDataEnd: async (data) => {
            await Bun.write(output.wav, data!)
            resolve()
          },
        },
        {
          codec: 'pcm_s16le',
          bitrate: '128k',
          channels: 1,
          sampleRate: 16000,
          verbose: false,
        },
      )
    })

    await fileWritePromise

    expect(await Bun.file(output.wav).exists()).toBeTrue()

    const result = await audioInfo(output.wav)
    expect(result).toEqual([
      {
        codec: 'pcm_s16le',
        channels: 1,
        sampleRate: '16000',
        bitrate: '256000',
        duration: '12.312000',
      },
    ])

    await unlink(output.wav)
  })

  it('audioWithStreamInputAndOut: normal test', async () => {
    const file = Bun.file(input)
    const stream = file.stream()

    const fileWritePromise = new Promise<void>((resolve) => {
      audioWithStreamInputAndOut(
        stream,
        {
          onProcessDataFlushed: () => { },
          onProcessDataEnd: async (data) => {
            await Bun.write(output.wav, data!)
            resolve()
          },
        },
        {
          codec: 'pcm_s16le',
          bitrate: '128k',
          channels: 1,
          sampleRate: 16000,
          verbose: false,
        },
      )
    })

    await fileWritePromise

    expect(await Bun.file(output.wav).exists()).toBeTrue()

    const result = await audioInfo(output.wav)
    expect(result).toEqual([
      {
        codec: 'pcm_s16le',
        channels: 1,
        sampleRate: '16000',
        bitrate: '256000',
        duration: '12.312000',
      },
    ])

    await unlink(output.wav)
  })

  it('audioWithStreamInputAndOut: chunks', async () => {
    const file = Bun.file(input)
    const stream = file.stream()

    const { readable, writable } = new TransformStream()
    const reader = stream.getReader()
    try {
      while (true) {
        const { done, value } = await reader.read()
        const writer = writable.getWriter()
        if (done) {
          writer.close()
          break
        }
        writer.write(value)
        writer.releaseLock()
      }
    }
    finally {
      reader.releaseLock()
    }

    const fileWritePromise = new Promise<void>((resolve) => {
      audioWithStreamInputAndOut(
        readable,
        {
          onProcessDataFlushed: () => { },
          onProcessDataEnd: async (data) => {
            await Bun.write(output.wav, data!)
            resolve()
          },
        },
        {
          codec: 'pcm_s16le',
          bitrate: '128k',
          channels: 1,
          sampleRate: 16000,
          verbose: false,
        },
      )
    })

    await fileWritePromise

    expect(await Bun.file(output.wav).exists()).toBeTrue()

    const result = await audioInfo(output.wav)
    expect(result).toEqual([
      {
        codec: 'pcm_s16le',
        channels: 1,
        sampleRate: '16000',
        bitrate: '256000',
        duration: '12.312000',
      },
    ])

    await unlink(output.wav)
  })

  it('audioBuffer', async () => {
    const arrayBuffer = await Bun.file(input).arrayBuffer()
    const data = await audioWav(new Uint8Array(arrayBuffer))
    await Bun.write(output.wav, data!)
    expect(await Bun.file(output.wav).exists()).toBeTrue()

    const result = await audioInfo(output.wav)
    expect(result).toEqual([
      {
        codec: 'pcm_s16le',
        channels: 1,
        sampleRate: '16000',
        bitrate: '256000',
        duration: '12.312000',
      },
    ])

    await unlink(output.wav)
  })

  it('audio: AAC conversion with custom settings', async () => {
    await audio(input, output.aac, {
      codec: 'aac',
      bitrate: '256k',
      channels: 2,
      sampleRate: 48000,
      verbose: false,
      metadata: {
        title: 'AAC Test',
        artist: 'Test Artist',
        album: 'Test Album',
        year: '2024',
      },
    })

    expect(await Bun.file(output.aac).exists()).toBeTrue()

    const result = await audioInfo(output.aac, {
      metadataTags: ['title', 'artist', 'album', 'year'],
    })

    // Check the basic audio properties
    expect(result[0]).toMatchObject({
      codec: 'aac',
      channels: 2,
      sampleRate: '48000',
    })

    // Verify bitrate is within reasonable range (±20% of target)
    const actualBitrate = Number.parseInt(result[0].bitrate)
    expect(actualBitrate).toBeGreaterThan(200000) // ~200kbps
    expect(actualBitrate).toBeLessThan(300000) // ~300kbps

    // Verify duration is within reasonable range
    const actualDuration = Number.parseFloat(result[0].duration)
    expect(actualDuration).toBeGreaterThan(10) // At least 10 seconds
    expect(actualDuration).toBeLessThan(15) // Less than 15 seconds

    // Verify metadata exists if supported by the codec
    if (result[0].metadata) {
      expect(result[0].metadata).toMatchObject({
        title: 'AAC Test',
      })
    }

    await unlink(output.aac)
  })
})

describe('audioArgs', () => {
  it('should generate arguments with all options', () => {
    const result = audioArgs({
      codec: 'mp3',
      bitrate: '128k',
      channels: 2,
      sampleRate: 44100,
      quality: 5,
    })

    expect(result).toEqual([
      '-acodec',
      'mp3',
      '-b:a',
      '128k',
      '-ac',
      '2',
      '-ar',
      '44100',
      '-q:a',
      '5',
    ])
  })

  it('should generate arguments with only required options', () => {
    const result = audioArgs({
      codec: 'aac',
    })

    expect(result).toEqual(['-acodec', 'aac'])
  })

  it('should generate arguments with no options', () => {
    const result = audioArgs()

    expect(result).toEqual([])
  })
})

describe('audio-info', () => {
  it('should return the correct audio info', async () => {
    const result = await audioInfo(input)
    expect(result).toEqual([
      {
        codec: 'mp3',
        channels: 1,
        sampleRate: '24000',
        bitrate: '160000',
        duration: '12.312000',
      },
    ])
  })
})

describe('extractError', () => {
  it('should extract error messages from stderr', () => {
    const stderr = 'Error: Something went wrong\n    at doSomething (index.js:10:5)\n    at main (index.js:5:3)'
    const expected = 'Error: Something went wrong'

    const result = extractError(stderr)

    expect(result).toEqual(expected)
  })

  it('should handle empty stderr', () => {
    const stderr = ''
    const expected = ''

    const result = extractError(stderr)

    expect(result).toEqual(expected)
  })

  it('should handle stderr with only whitespace', () => {
    const stderr = '   \n   \n   '
    const expected = ''

    const result = extractError(stderr)

    expect(result).toEqual(expected)
  })

  it('should handle stderr with practical result', () => {
    const stderr = `ffmpeg version 7.0 Copyright (c) 2000-2024 the FFmpeg developers\n  bla bla bla\n  bla bla bla\n[in#0 @ 0x12572b220] Error opening input: No such file or directory\nError opening input file /GitHub/bun-ffmpeg/inp2ut.mp3.\nError opening input files: No such file or directory\n`
    const expected = `ffmpeg version 7.0 Copyright (c) 2000-2024 the FFmpeg developers\nError opening input file /GitHub/bun-ffmpeg/inp2ut.mp3.\nError opening input files: No such file or directory\n`

    const result = extractError(stderr)

    expect(result).toEqual(expected)
  })
})
