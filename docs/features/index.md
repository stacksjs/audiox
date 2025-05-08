# Features

## Audio Conversion & Optimization

AudioX provides powerful audio processing capabilities through a simple, intuitive interface.

### Format Conversion

- Convert between various audio formats:
  - WAV
  - MP3
  - AAC
  - And more custom formats
- Maintain audio quality during conversion
- Batch processing support

### Audio Optimization

- Customize audio parameters:
  - Bitrate control (e.g., "128k", "192k", "320k")
  - Sample rate adjustment (8000Hz - 48000Hz)
  - Channel configuration (mono, stereo, 5.1, 7.1)
- Quality settings for different use cases
- Size optimization while maintaining quality

### Stream Processing

- Handle audio streams efficiently:
  - Input stream processing
  - Output stream generation
  - Buffer-based operations
- Memory-efficient processing for large files
- Real-time audio manipulation

### Metadata Management

- Comprehensive metadata handling:
  - Read and write ID3 tags
  - Custom metadata fields
  - Batch metadata operations
- Preserve important audio information
- Add or modify audio file details

### Developer Tools

- TypeScript Integration:
  - Full type safety
  - Intelligent code completion
  - Interface definitions
- Error Handling:
  - Detailed error messages
  - Error recovery options
  - Custom error callbacks
- Configuration:
  - Global settings
  - Per-operation overrides
  - Environment-specific configs

### CLI Capabilities

- Command-line interface for quick operations
- Batch processing support
- Interactive mode for complex operations
- Script integration capabilities

## Integration Options

### As a Library

```typescript
import { audio } from '@stacksjs/audiox'

// Basic conversion
await audio('input.mp3', 'output.wav', {
  codec: 'pcm_s16le',
  channels: 1,
  sampleRate: 16000,
})

// Stream processing
await audioWithStreamInput(inputStream, 'output.mp3', {
  codec: 'mp3',
  bitrate: '192k',
})
```

### As a CLI Tool

```bash
# Basic conversion
audiox convert input.mp3 output.wav --codec pcm_s16le

# Advanced options
audiox convert input.mp3 output.mp3 --bitrate 192k --channels 2
```

## Performance Features

- Optimized for speed and efficiency
- Minimal memory footprint
- Parallel processing capabilities
- Progress tracking and reporting

## Extensibility

- Plugin system for custom processors
- Custom codec support
- Middleware integration
- Event hooks for processing steps
