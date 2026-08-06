# AGENTS.md

This file provides repository-specific guidance for contributors and AI coding agents working in `100-reactjs-projects`.

## Project Overview

`100-reactjs-projects` is a curated collection site for beginner-to-advanced React projects. In its current form, the repository itself is a single Next.js application that showcases project entries, contributor information, and supporting UI.

Important context:

- The app uses the Next.js App Router under `app/`.
- The codebase is written in TypeScript.
- UI is built with React function components, Tailwind CSS, and reusable UI primitives in `components/ui`.
- Project metadata is configuration-driven rather than hardcoded directly in pages.

## Repository Structure

Key folders and files:

- `app/`: App Router pages, layout, metadata routes, and route handlers.
- `components/`: Shared UI and feature components.
- `components/common/`: Cross-page layout/navigation building blocks.
- `components/project/`: Project listing and search UI.
- `components/ui/`: Reusable UI primitives.
- `components/utils/`: Utility presentation components and providers.
- `config/`: Centralized site content and config objects such as hero content, navigation, metadata, and project data.
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions and shared helpers.
- `public/`: Static assets, especially project screenshots under `public/projects`.
- `styles/`: Global styles.
- `types/`: Shared TypeScript types.
- `contributing.md`: Contributor workflow and project submission guidance.
- `eslint.config.mjs`: Lint configuration.
- `package.json`: Source of truth for scripts and dependencies.

## Development Guidelines

### General Standards

- Make focused, minimal changes that solve the requested problem.
- Prefer extending existing patterns over introducing new abstractions.
- Do not refactor unrelated areas while working on a targeted issue.
- Keep code readable and consistent with nearby files.
- Preserve existing behavior unless the task explicitly requires a change.

### Naming and File Practices

- Match the naming convention already used in the surrounding directory before introducing new files.
- Use descriptive component and variable names.
- Keep config/data updates in `config/` when the content is site metadata rather than page logic.
- Store project screenshots in `public/projects` using lowercase, hyphenated filenames.
- Reuse shared types from `types/` or colocate narrowly scoped types when reuse is unnecessary.

### React and Next.js Practices

- Prefer function components and hooks.
- Default to server components unless client-side interactivity is required. Add `"use client"` only where needed.
- Keep page files in `app/` lean by delegating reusable UI into `components/`.
- Use Next.js primitives such as `next/image` and `next/link` where appropriate.
- Follow App Router conventions for routes, metadata, and layout composition.
- Avoid unnecessary client-side state when data can remain static or configuration-driven.

### Styling Practices

- Follow existing Tailwind utility patterns used in the repository.
- Reuse existing UI primitives from `components/ui` before creating new bespoke elements.
- Preserve responsiveness, accessibility, and dark/light theme compatibility.
- For visual changes, keep the current design language consistent unless the issue is explicitly about redesign.

### TypeScript and Quality

- Prefer explicit, accurate types over `any`.
- Keep interfaces and prop types aligned with existing config structures.
- Run lint checks after meaningful code changes when possible:

```bash
pnpm lint
```

- Use the main development workflow from `package.json`:

```bash
pnpm dev
pnpm build
```

## Contribution Workflow

Follow `contributing.md` as the primary contributor guide. The condensed workflow is:

1. Pick or discuss an issue before starting larger changes, especially UI/UX work.
2. Create a focused branch for the task.
3. Make the smallest complete implementation that resolves the issue.
4. Validate the change locally when possible.
5. Open a PR with a clear summary, issue reference, and screenshots for UI updates.

### Branch Naming

Use clear, task-focused branch names, for example:

- `feature/add-todo-app`
- `fix/project-card-layout`
- `docs/update-agents-guide`

### Commit Messages

Use Conventional Commits, consistent with `contributing.md`, for example:

- `feat: add new project entry`
- `fix: correct project card spacing`
- `docs: add repository agent instructions`

### Pull Request Expectations

- Explain what changed and why.
- Keep PR scope narrow and reviewable.
- Include screenshots for UI changes.
- Mention related issues when applicable.

## Project-Specific Notes

### Adding or Updating a Project Entry

When adding a project entry:

- Add the image asset to `public/projects/`.
- Update the project dataset in `config/project-Item.tsx`.
- Ensure `projectImage` matches the uploaded filename exactly.
- Use only supported difficulty values:
  - `Beginner`
  - `Intermediate`
  - `Advanced`
- Verify all referenced links are valid.

## Instructions for AI Coding Agents

- Start by inspecting the relevant files and understanding the local pattern before editing.
- Make the minimum required change; avoid broad cleanup unless explicitly requested.
- Do not rename files, move modules, or reorganize folders without a clear task requirement.
- Preserve existing APIs, prop shapes, and config structures unless the issue requires changing them.
- Prefer editing existing components/config over adding duplicate alternatives.
- Update documentation when behavior, workflow, or repository structure changes.
- If you touch user-facing UI, keep responsiveness and accessibility in mind.
- If you add a new convention, document it in the appropriate markdown file.
- Flag inconsistencies you notice, but do not fix unrelated ones opportunistically.

## What To Avoid

- Unnecessary dependency additions.
- Large-scale refactors hidden inside feature or bug-fix PRs.
- Mixing formatting-only churn with functional changes.
- Introducing patterns that conflict with current App Router or component structure.
- Changing generated, asset, or content files that are unrelated to the task.
