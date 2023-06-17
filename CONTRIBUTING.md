# Contributing

## Updating Course Materials

### Releasing a Course Update

1. Make the required changes
1. Update README changelog
1. Run `.\Generate-CourseMaterials.ps1` in PowerShell.
1. Tag new release in GitHub
1. Add generated `.zip` files in `.materials` folder to GitHub release

## Updating `.patch` diff files

1. Solve the challenge by updating `demo` files
1. Ensure that file is the only change, unstaged in Git
1. Run `git diff` to confirm, then
  - `git diff --output "../<MODULE>/<FILE>.patch`
1. Update `<MODULE>/README.md` with link to patch
1. Commit the fix to `solved` branch