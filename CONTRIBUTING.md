# Contributing

## Updating Course Materials

### Regenerating Materials

Run `.\Generate-CourseMaterials.ps1` in PowerShell.

### Providing `.patch` diff files

1. Solve the challenge by updating `demo` files
1. Ensure that file is the only change, unstaged in Git
1. Run `git diff` to confirm, then
  - `git diff --output "../<MODULE>/<FILE>.patch`
1. Update `<MODULE>/README.md` with link to patch
1. Commit the fix to `solved` branch