# SAFB AI Charity Protection Repository

SAFB AI Charity Protection is a conceptual repository focused on documenting AI safety principles and guidelines for charitable AI implementations. The repository contains documentation in Ukrainian outlining principles for AI systems that help without causing harm.

**CRITICAL**: Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Current Repository State

**IMPORTANT**: This is a documentation-focused repository with NO source code, build system, tests, or runnable applications.

Repository contains:
- `README.md` - Main documentation in Ukrainian about AI charity protection principles
- `LICENSE` - GNU General Public License v3.0
- `.github/` - GitHub configuration directory (contains this file)

**VALIDATED**: There are no build systems, package managers, or executable code to run.

## Working Effectively

### Essential Commands (All commands complete in under 1 second)
```bash
# Navigate and explore the repository
ls -la                           # List all files and directories
find . -name "*.md" -type f      # Find all markdown files (currently only README.md)
git status                       # Check repository status
git log --oneline -5             # View recent commits

# Read and analyze content
cat README.md                    # Read main documentation
wc -l README.md                  # Count lines in README (currently 2 lines)
head -10 README.md               # Read first 10 lines of README
```

### Repository Navigation
```bash
# Repository structure (as of current state)
.
├── .git/                        # Git metadata
├── .github/                     # GitHub configuration
│   └── copilot-instructions.md  # This file
├── LICENSE                      # GNU GPL v3 license (35,149 bytes)
└── README.md                    # Main documentation (608 bytes, 2 lines)
```

### Documentation Editing Workflow
Always follow this validated workflow when editing documentation:

1. **Backup before editing**:
   ```bash
   cp README.md README.md.backup
   ```

2. **Make your changes** using your preferred editor or tools

3. **Validate changes**:
   ```bash
   cat README.md                 # Review content
   wc -l README.md              # Check line count
   git diff README.md           # Review changes
   ```

4. **Test git operations**:
   ```bash
   git add README.md
   git status                   # Verify staging
   git diff --cached            # Review staged changes
   ```

5. **Commit if satisfied** (or restore backup if not):
   ```bash
   git commit -m "Update documentation"
   # OR restore if needed:
   # mv README.md.backup README.md
   ```

## Validation Scenarios

**MANUAL VALIDATION REQUIREMENT**: After making any changes to documentation, ALWAYS perform these validation steps:

### Documentation Validation
1. **Content Review**:
   ```bash
   cat README.md                # Ensure content is readable and complete
   ```

2. **File Integrity Check**:
   ```bash
   wc -c README.md              # Verify file size is reasonable
   file README.md               # Confirm it's still a text file
   ```

3. **Git Status Validation**:
   ```bash
   git status                   # Verify repository state
   git diff HEAD                # Review all changes
   ```

4. **Character Encoding Check** (Important for Ukrainian text):
   ```bash
   file -bi README.md           # Should show charset=utf-8
   ```

### Git Workflow Validation
Always test the complete git workflow:
1. Make a small test change
2. Stage the change with `git add`
3. Review with `git diff --cached`
4. Commit with descriptive message
5. Verify with `git log --oneline -1`

## Repository Constraints and Limitations

### What You CAN Do
- Edit README.md and other documentation files
- Add new documentation files (.md, .txt)
- Create additional directories for organizing documentation
- Use standard git operations (add, commit, push, pull)
- Add GitHub workflows or configuration files
- Create CONTRIBUTING.md, CHANGELOG.md, or other standard documentation

### What You CANNOT Do
- **NO BUILD COMMANDS**: There is no code to build, no package.json, Makefile, or build system
- **NO TESTS**: There are no test frameworks or test files to run
- **NO APPLICATIONS**: There is no runnable code or applications to start
- **NO PACKAGE MANAGEMENT**: No npm install, pip install, or similar commands
- **NO DEVELOPMENT SERVERS**: No local servers to start or debug

### What NOT to Attempt
- Do not try to run `npm install` - there is no package.json
- Do not try to run `make` - there is no Makefile
- Do not try to run any build commands - there is no source code
- Do not look for test directories or test commands - they don't exist
- Do not try to start development servers - there are none

## Common Tasks

### Repository Overview Commands
```bash
# Quick repository status
git status && echo "---" && ls -la

# File count and types
find . -type f -not -path "./.git/*" | wc -l
find . -name "*.md" | wc -l

# Repository size
du -sh .
```

### Documentation Management
```bash
# Create new documentation file
touch CONTRIBUTING.md
echo "# Contributing Guidelines" > CONTRIBUTING.md

# Find all documentation
find . -name "*.md" -o -name "*.txt" -not -path "./.git/*"

# Check documentation completeness
ls -la *.md 2>/dev/null || echo "No markdown files in root"
```

### Content Analysis
```bash
# Analyze README content
echo "Lines: $(wc -l < README.md)"
echo "Words: $(wc -w < README.md)"
echo "Characters: $(wc -c < README.md)"

# Check for Ukrainian text encoding
file -bi README.md
```

## Future Development Guidelines

If this repository evolves to include source code:

### Potential Technology Stacks
Consider these validated approaches for AI/charity-focused applications:
- **Python**: For AI/ML development with frameworks like TensorFlow, PyTorch
- **JavaScript/TypeScript**: For web applications with React/Vue/Angular
- **Documentation Sites**: Using Jekyll, Hugo, or MkDocs for comprehensive documentation

### Recommended Project Structure
```
├── docs/                    # Documentation
├── src/                     # Source code (when added)
├── tests/                   # Test files (when added)
├── scripts/                 # Build/deployment scripts
├── examples/                # Usage examples
├── CONTRIBUTING.md          # Contribution guidelines
├── CHANGELOG.md             # Version history
└── requirements.txt         # Dependencies (when needed)
```

### Development Environment Setup
When source code is added, consider these patterns:
- Use virtual environments for Python projects
- Include detailed installation instructions
- Provide Docker containerization for consistent environments
- Add pre-commit hooks for code quality

## Troubleshooting

### Common Issues and Solutions

**Issue**: Looking for package.json or build files
**Solution**: This repository contains only documentation. There are no build systems.

**Issue**: Trying to run tests
**Solution**: There are no tests. This is a documentation repository.

**Issue**: Ukrainian text appears garbled
**Solution**: Ensure your editor supports UTF-8 encoding. Use `file -bi README.md` to verify encoding.

**Issue**: Git operations fail
**Solution**: Verify you're in the correct directory and have proper permissions.

### Emergency Recovery
If documentation gets corrupted:
```bash
# Check git history
git log --oneline README.md

# Restore from git
git checkout HEAD -- README.md

# Or restore specific version
git checkout <commit-hash> -- README.md
```

## Performance Notes

All commands in this repository execute in under 1 second:
- File operations: < 0.01 seconds
- Git operations: < 0.01 seconds
- Documentation reading: < 0.01 seconds

**NO TIMEOUT CONCERNS**: All operations are near-instantaneous due to minimal repository size.

## Contribution Workflow

1. **Read current documentation**: `cat README.md`
2. **Understand the mission**: Focus on AI safety and charity protection principles
3. **Make thoughtful additions**: Expand documentation that supports the mission
4. **Validate thoroughly**: Follow all validation scenarios above
5. **Commit with clear messages**: Describe what documentation was added/changed

Remember: This repository's value is in its documentation and principles, not in executable code.