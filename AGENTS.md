# Repository Intelligence

## Core Intent
- Product/Shop application.
- See `README.md` for project goals.

## Warning: Next.js Version
- Current Next.js version in project may differ from CLI agent defaults. 
- Potential for breaking changes in App Router or API conventions. 
- Always verify docs/changelog if build fails.

## Navigation Rule
- Consult `RIG.json` first for architectural dependencies. Do not guess paths.

## Efficiency Protocol
- Plan before execution. Create a `.plan` for complex tasks.
- Read only the minimum files necessary.

## Hierarchy Rule
- Local `agents.md` files in sub-folders take precedence.

## Map Maintenance
- If you change project structure (adding/moving/deleting files), your final step must be:
  `npx repomix --style json --no-files --output RIG.json`
