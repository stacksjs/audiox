# Advanced Metadata Handling

## Understanding Audio Metadata

AudioX provides comprehensive tools for reading, writing, and manipulating audio file metadata. This guide covers advanced metadata handling techniques and best practices.

## Metadata Types

### Standard Metadata Fields

```typescript
interface AudioMetadata {
  title?: string
  artist?: string
  album?: string
  year?: string
  genre?: string
  track?: string
  composer?: string
  copyright?: string
  description?: string
}
```

### Custom Metadata

```typescript
// Adding custom metadata
await audio('input.mp3', 'output.mp3', {
  metadata: {
    custom_field: 'value',
    processing_date: new Date().toISOString(),
    source_quality: 'studio',
  }
})
```

## Reading Metadata

### Basic Metadata Reading

```typescript
import { getAudioInfo } from '@stacksjs/audiox'

const info = await getAudioInfo('audio.mp3')
console.log(info.metadata) // Access standard metadata
```

### Advanced Metadata Extraction

```typescript
// Reading specific metadata tags
const info = await getAudioInfo('audio.mp3', {
  metadataTags: ['title', 'artist', 'custom_field']
})
```

## Writing Metadata

### Metadata Preservation

```typescript
// Preserve existing metadata while converting
await audio('input.mp3', 'output.wav', {
  preserveMetadata: true,
  metadata: {
    // Add or override specific fields
    processing_tool: 'audiox',
  }
})
```

### Batch Metadata Updates

```typescript
// Update metadata for multiple files
async function updateBatchMetadata(files: string[], metadata: AudioMetadata) {
  for (const file of files) {
    await audio(file, file, {
      metadata,
      preserveExisting: true,
    })
  }
}
```

## Metadata Manipulation

### Metadata Transformation

```typescript
// Transform metadata during processing
function transformMetadata(original: AudioMetadata): AudioMetadata {
  return {
    ...original,
    title: `${original.title} (Processed)`,
    processing_date: new Date().toISOString(),
  }
}
```

### Metadata Validation

```typescript
// Validate metadata before writing
function validateMetadata(metadata: AudioMetadata): boolean {
  const required = ['title', 'artist']
  return required.every(field => metadata[field]?.length > 0)
}
```

## Best Practices

### Metadata Handling

1. Always validate metadata before writing
2. Preserve important existing metadata
3. Use consistent naming conventions
4. Handle missing metadata gracefully

### Performance Considerations

1. Batch metadata operations when possible
2. Cache metadata for frequently accessed files
3. Implement proper error handling
4. Use appropriate metadata field types

## Advanced Use Cases

### Automated Metadata Management

```typescript
// Automatically manage metadata based on file content
async function autoMetadata(file: string) {
  const info = await getAudioInfo(file)

  return {
    title: generateTitle(info),
    artist: extractArtist(info),
    quality: determineQuality(info),
    processed_by: 'audiox',
    processing_date: new Date().toISOString(),
  }
}
```

### Custom Metadata Schemas

```typescript
// Implement custom metadata schemas
interface CustomAudioMetadata extends AudioMetadata {
  processing: {
    tool: string
    version: string
    date: string
    settings: Record<string, unknown>
  }
  quality: {
    original: string
    processed: string
    improvement: number
  }
}
```
