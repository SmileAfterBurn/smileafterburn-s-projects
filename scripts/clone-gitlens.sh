#!/bin/bash

###############################################################################
# Script: clone-gitlens.sh
# Description: Clone the gitkraken/vscode-gitlens repository
# Usage: ./scripts/clone-gitlens.sh [target-directory]
###############################################################################

set -e  # Exit on error

# Configuration
REPO_URL="https://github.com/gitkraken/vscode-gitlens.git"
DEFAULT_TARGET_DIR="./vscode-gitlens"

# Parse arguments
TARGET_DIR="${1:-$DEFAULT_TARGET_DIR}"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored messages
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Main execution
main() {
    print_info "GitLens Repository Clone Script"
    print_info "================================"
    echo ""
    print_info "Repository: ${REPO_URL}"
    print_info "Target Directory: ${TARGET_DIR}"
    echo ""

    # Check if git is installed
    if ! command -v git &> /dev/null; then
        print_error "git is not installed. Please install git first."
        exit 1
    fi

    # Check if target directory already exists
    if [ -d "$TARGET_DIR" ]; then
        print_warning "Target directory '${TARGET_DIR}' already exists."
        read -p "Do you want to remove it and clone fresh? (y/N) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_info "Removing existing directory..."
            rm -rf "$TARGET_DIR"
        else
            print_error "Aborted. Please choose a different target directory."
            exit 1
        fi
    fi

    # Clone the repository
    print_info "Cloning repository..."
    if git clone "$REPO_URL" "$TARGET_DIR"; then
        print_success "Repository cloned successfully!"
        echo ""
        print_info "Repository location: ${TARGET_DIR}"
        
        # Get some repository info
        cd "$TARGET_DIR"
        CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
        LATEST_COMMIT=$(git log -1 --pretty=format:"%h - %s (%cr)" 2>/dev/null || echo "N/A")
        
        echo ""
        print_info "Repository Details:"
        echo "  - Current branch: ${CURRENT_BRANCH}"
        echo "  - Latest commit: ${LATEST_COMMIT}"
        
        # Count files
        FILE_COUNT=$(git ls-files | wc -l)
        echo "  - Total files: ${FILE_COUNT}"
        
        print_success "Clone operation completed!"
    else
        print_error "Failed to clone repository."
        exit 1
    fi
}

# Run main function
main "$@"
