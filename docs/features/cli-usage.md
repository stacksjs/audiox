# CLI Usage Guide

AudioX provides a powerful command-line interface for audio processing tasks. This guide covers all CLI features and usage patterns.

## Installation

```bash
# Global installation
npm install -g @stacksjs/audiox

# Local installation
npm install @stacksjs/audiox
```

## Basic Commands

### Convert Audio Files

```bash
# Basic conversion
audiox convert input.mp3 output.wav

# With quality settings
audiox convert input.mp3 output.mp3 --bitrate 320k --channels 2

# With sample rate
audiox convert input.mp3 output.wav --sample-rate 48000
```

### Get Audio Information

```bash
# View audio file details
audiox info input.mp3

# Export info to JSON
audiox info input.mp3 --json

# View specific metadata
audiox info input.mp3 --metadata-only
```

### Batch Processing

```bash
# Convert multiple files
audiox convert *.mp3 --output-format wav

# Process directory
audiox convert ./input-dir --output-dir ./output-dir --format mp3

# Apply same settings to multiple files
audiox convert *.wav --output-format mp3 --bitrate 192k
```

## Advanced Options

### Audio Quality

```bash
# High quality conversion
audiox convert input.wav output.mp3 \
  --bitrate 320k \
  --sample-rate 48000 \
  --channels 2

# Voice optimization
audiox convert input.mp3 output.wav \
  --sample-rate 16000 \
  --channels 1
```

### Metadata Management

```bash
# Set metadata
audiox metadata input.mp3 \
  --title "Song Title" \
  --artist "Artist Name"

# Copy metadata
audiox metadata source.mp3 --copy-to target.mp3

# Remove metadata
audiox metadata input.mp3 --clear
```

### Stream Processing

```bash
# Process from stdin
cat input.mp3 | audiox convert - output.wav

# Process to stdout
audiox convert input.mp3 - > output.wav

# Chain commands
audiox convert input.mp3 - | audiox metadata - --title "Processed"
```

## Configuration

### Global Settings

```bash
# Set default format
audiox config set format mp3

# Set default bitrate
audiox config set bitrate 192k

# View current config
audiox config list
```

### Project Configuration

Create an `audiox.config.js` file:

```javascript
module.exports = {
  // Default settings
  defaults: {
    format: 'mp3',
    bitrate: '192k',
    sampleRate: 44100,
  },

  // Output paths
  paths: {
    output: './processed',
    temp: './temp',
  },

  // Processing rules
  rules: {
    'high-quality': {
      bitrate: '320k',
      sampleRate: 48000,
    },
    'voice-optimized': {
      sampleRate: 16000,
      channels: 1,
    },
  },
}
```

## Best Practices

### Performance

- Use batch processing for multiple files
- Utilize configuration files for consistent settings
- Monitor system resource usage

### Organization

- Follow consistent naming conventions
- Use project configuration files
- Structure output directories logically

### Error Handling

- Check process exit codes
- Implement proper logging
- Use error recovery options

## Examples

### Common Workflows

```bash
# Batch convert with quality preset
audiox convert ./music/*.wav \
  --output-dir ./processed \
  --preset high-quality

# Process and tag files
audiox convert input.mp3 output.mp3 \
  --bitrate 320k \
  --metadata "title=Processed Song" \
  --metadata "artist=AudioX"

# Chain multiple operations
audiox convert input.wav - \
  | audiox filter - --normalize \
  | audiox convert - output.mp3 --bitrate 192k
```
