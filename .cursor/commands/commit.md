# Create Conventional Commit

Analyze staged changes and create a commit following Conventional Commits standard.

## Instructions

1. Run `git diff --cached` to see staged changes
2. Run `git status` to see the overall state
3. Analyze the changes and determine the appropriate commit type
4. Create a commit with a properly formatted message

## Commit Types

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code formatting (no logic change) |
| `refactor` | Code refactoring |
| `perf` | Performance improvement |
| `test` | Adding/updating tests |
| `build` | Build system changes |
| `ci` | CI configuration |
| `chore` | Other changes |

## Format

```
<type>(<scope>): <description>
```

- **type**: required, from the list above
- **scope**: optional, module/area affected (e.g., `auth`, `api`, `projects`)
- **description**: short, imperative mood, no period, lowercase

## Examples

```
feat(auth): add JWT refresh endpoint
fix(api): handle null response in user service
refactor(projects): extract validation logic
docs: update API documentation
```

## Breaking Changes

For breaking changes, add `!` after type/scope:
```
feat(api)!: change response format for endpoints
```
