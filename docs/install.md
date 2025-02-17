# Install

## Prerequisites

Before installing `audiox`, make sure you have FFmpeg installed on your system:

::: code-group

```sh [macOS]
# Using Homebrew
brew install ffmpeg

# Using MacPorts
port install ffmpeg
```

```sh [Linux (Debian/Ubuntu)]
sudo apt update
sudo apt install ffmpeg
```

```sh [Linux (RHEL/CentOS)]
sudo yum install epel-release
sudo yum install ffmpeg
```

```sh [Windows]
# Using Chocolatey
choco install ffmpeg

# Using Scoop
scoop install ffmpeg
```

:::

## Package Installation

Choose your package manager of choice:

::: code-group

```sh [npm]
npm install --save-dev @stacksjs/audiox
# npm i -d @stacksjs/audiox

# or, install globally via
npm i -g @stacksjs/audiox
```

```sh [bun]
bun install --dev @stacksjs/audiox
# bun add --dev @stacksjs/audiox
# bun i -d @stacksjs/audiox

# or, install globally via
bun add --global @stacksjs/audiox
```

```sh [pnpm]
pnpm add --save-dev @stacksjs/audiox
# pnpm i -d @stacksjs/audiox

# or, install globally via
pnpm add --global @stacksjs/audiox
```

```sh [yarn]
yarn add --dev @stacksjs/audiox
# yarn i -d @stacksjs/audiox

# or, install globally via
yarn global add @stacksjs/audiox
```

```sh [brew]
brew install audiox # coming soon
```

```sh [pkgx]
pkgx audiox # coming soon
```

:::

## Binary Installation

Choose the binary that matches your platform and architecture:

::: code-group

```sh [macOS (arm64)]
# Download the binary
curl -L https://github.com/stacksjs/audiox/releases/download/v0.9.1/audiox-darwin-arm64 -o audiox

# Make it executable
chmod +x audiox

# Move it to your PATH
mv audiox /usr/local/bin/audiox
```

```sh [macOS (x64)]
# Download the binary
curl -L https://github.com/stacksjs/audiox/releases/download/v0.9.1/audiox-darwin-x64 -o audiox

# Make it executable
chmod +x audiox

# Move it to your PATH
mv audiox /usr/local/bin/audiox
```

```sh [Linux (arm64)]
# Download the binary
curl -L https://github.com/stacksjs/audiox/releases/download/v0.9.1/audiox-linux-arm64 -o audiox

# Make it executable
chmod +x audiox

# Move it to your PATH
mv audiox /usr/local/bin/audiox
```

```sh [Linux (x64)]
# Download the binary
curl -L https://github.com/stacksjs/audiox/releases/download/v0.9.1/audiox-linux-x64 -o audiox

# Make it executable
chmod +x audiox

# Move it to your PATH
mv audiox /usr/local/bin/audiox
```

```sh [Windows (x64)]
# Download the binary
curl -L https://github.com/stacksjs/audiox/releases/download/v0.9.1/audiox-windows-x64.exe -o audiox.exe

# Move it to your PATH (adjust the path as needed)
move audiox.exe C:\Windows\System32\audiox.exe
```

:::

::: tip
You can also find the `audiox` binaries in GitHub [releases](https://github.com/stacksjs/audiox/releases).
:::

## Verifying Installation

After installation, verify that both `audiox` and `ffmpeg` are properly installed:

```bash
# Check audiox version
audiox version

# Check ffmpeg version
ffmpeg -version
```

Read more about how to use it in the [Usage](./usage.md) section of the documentation.
