# GitLens Repository Clone Guide

This document explains how to clone the [gitkraken/vscode-gitlens](https://github.com/gitkraken/vscode-gitlens) repository using the provided script.

## Overview

GitLens is a popular Visual Studio Code extension that supercharges Git capabilities. The repository contains the source code for this extension.

## Prerequisites

- **Git**: Ensure Git is installed on your system
  ```bash
  git --version
  ```
- **Bash**: The script requires a Bash shell (available by default on Linux/macOS, or via Git Bash on Windows)

## Quick Start

### Using the Clone Script

The easiest way to clone the GitLens repository is using the provided script:

```bash
./scripts/clone-gitlens.sh
```

This will clone the repository into the default directory `./vscode-gitlens`.

### Custom Target Directory

You can specify a custom target directory:

```bash
./scripts/clone-gitlens.sh /path/to/custom/directory
```

### Example Output

```
[INFO] GitLens Repository Clone Script
[INFO] ================================

[INFO] Repository: https://github.com/gitkraken/vscode-gitlens.git
[INFO] Target Directory: ./vscode-gitlens

[INFO] Cloning repository...
[SUCCESS] Repository cloned successfully!

[INFO] Repository location: ./vscode-gitlens
[INFO] Repository Details:
  - Current branch: main
  - Latest commit: abc1234 - feat: add new feature (2 days ago)
  - Total files: 1234
[SUCCESS] Clone operation completed!
```

## Manual Clone

If you prefer to clone manually without using the script:

```bash
git clone https://github.com/gitkraken/vscode-gitlens.git
```

Or clone to a specific directory:

```bash
git clone https://github.com/gitkraken/vscode-gitlens.git my-gitlens-directory
```

## Features of the Clone Script

- **Error Handling**: Exits on errors with clear error messages
- **Directory Check**: Warns if target directory already exists
- **Colored Output**: Easy-to-read colored console output
- **Repository Info**: Displays branch, latest commit, and file count after cloning
- **Git Validation**: Checks if Git is installed before proceeding

## After Cloning

Once the repository is cloned, you can:

1. **Navigate to the directory**:
   ```bash
   cd vscode-gitlens
   ```

2. **Install dependencies** (requires Node.js):
   ```bash
   npm install
   ```

3. **View repository details**:
   ```bash
   git log --oneline -10
   git branch -a
   ```

4. **Build the extension** (refer to the GitLens repository README for specific instructions):
   ```bash
   npm run build
   ```

## Troubleshooting

### Script Permission Denied

If you encounter a permission error:

```bash
chmod +x scripts/clone-gitlens.sh
```

### Git Not Found

Install Git:
- **Ubuntu/Debian**: `sudo apt-get install git`
- **macOS**: `brew install git` or install Xcode Command Line Tools
- **Windows**: Download from [git-scm.com](https://git-scm.com/)

### Directory Already Exists

The script will prompt you to remove the existing directory or abort. Choose:
- `y` to remove and clone fresh
- `n` to abort and choose a different directory

### Clone Failed

If the clone fails:
1. Check your internet connection
2. Verify you have access to GitHub
3. Try cloning manually with the Git command shown above

## Related Resources

- [GitLens GitHub Repository](https://github.com/gitkraken/vscode-gitlens)
- [GitLens VS Code Extension](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [GitLens Documentation](https://gitlens.amod.io/)
- [Git Documentation](https://git-scm.com/doc)

## Support

For issues with:
- **This script**: Open an issue in this repository
- **GitLens itself**: Visit the [GitLens repository](https://github.com/gitkraken/vscode-gitlens/issues)
