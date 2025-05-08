# Audio Conversion & Optimization

## Basic Conversion

AudioX makes it easy to convert between different audio formats while maintaining quality. Here's how to perform basic audio conversions:

```typescript
import { audio } from '@stacksjs/audiox'

// Simple MP3 to WAV conversion
await audio('input.mp3', 'output.wav')

// Conversion with specific codec
await audio('input.mp3', 'output.aac', {
  codec: 'aac',
})
```

## Supported Formats

### Input Formats

- MP3 (MPEG Layer-3)
- WAV (Waveform Audio)
- AAC (Advanced Audio Coding)
- FLAC (Free Lossless Audio Codec)
- OGG (Ogg Vorbis)
- And more...

### Output Formats

- MP3 (various qualities)
- WAV (PCM, various bit depths)
- AAC (various profiles)
- Custom format support

## Quality Settings

### Bitrate Control

```typescript
// High-quality MP3
await audio('input.wav', 'output.mp3', {
  codec: 'mp3',
  bitrate: '320k',
})

// Compressed AAC
await audio('input.wav', 'output.aac', {
  codec: 'aac',
  bitrate: '128k',
})
```

### Sample Rate Adjustment

```typescript
// Convert to 48kHz
await audio('input.mp3', 'output.wav', {
  sampleRate: 48000,
})

// Convert to 16kHz (speech optimized)
await audio('input.mp3', 'output.wav', {
  sampleRate: 16000,
})
```

### Channel Configuration

```typescript
// Convert to mono
await audio('input.mp3', 'output.wav', {
  channels: 1,
})

// Convert to stereo
await audio('input.mp3', 'output.wav', {
  channels: 2,
})
```

## Batch Processing

Process multiple files efficiently:

```typescript
async function batchConvert(files: string[], outputFormat: string) {
  for (const file of files) {
    const output = file.replace(/\.[^/.]+$/, `.${outputFormat}`)
    await audio(file, output, {
      codec: outputFormat,
    })
  }
}
```

## CLI Usage

The CLI provides quick access to conversion features:

```bash
# Basic conversion
audiox convert input.mp3 output.wav

# Quality settings
audiox convert input.mp3 output.mp3 --bitrate 320k

# Channel and sample rate
audiox convert input.mp3 output.wav --channels 1 --sample-rate 16000

# Batch conversion
audiox convert *.mp3 --output-format wav
```

## Best Practices

1. **Format Selection**
   - Use WAV for lossless quality
   - Use MP3 for size efficiency
   - Use AAC for modern compatibility

2. **Quality Optimization**
   - Match sample rate to content type
   - Choose appropriate bitrates
   - Consider target platform requirements

3. **Performance**
   - Use batch processing for multiple files
   - Monitor system resources
   - Implement proper error handling
