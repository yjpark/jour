---
name: vault-management
description: Knowledge for working with the jour vault — file naming, frontmatter schema, folder conventions, tag taxonomy, and section/outline document composition. Activate when creating, editing, or organizing vault files.
version: 0.1.0
---

# Vault Management Skill

This skill provides conventions and rules for working with the `jour` vault. Apply these when creating or modifying any file in the `vault/` directory.

## File Naming Rules

- **Inbox & Tasks**: `YYYY-MM-DD-HH-MM-<slugified-title>.md`
- **Daily notes**: `YYYY-MM-DD.md` inside `vault/Daily/YYYY/MM/`
- **Section notes**: `<slugified-title>.md` (no date prefix) inside `vault/Sections/<topic>/`
- **Outline notes**: `<slugified-title>.md` (no date prefix) inside `vault/Outlines/`
- **Slugification**: lowercase, replace spaces and special characters with `-`, collapse consecutive `-` into one, strip leading/trailing `-`
- **Example (workflow)**: "My project kickoff!" → `2024-01-15-10-30-my-project-kickoff.md`
- **Example (section)**: "Mise en Place" → `mise-en-place.md`

## Frontmatter Schemas

There are three note types, each with its own frontmatter schema.

### Workflow Notes (Inbox, Daily, Tasks, Archive)

```yaml
---
title: <human-readable title>
date: YYYY-MM-DD
created: YYYY-MM-DDTHH:MM:SS
tags: [<tag1>, <tag2>]
status: <status-value>
---
```

| Field     | Required | Description                               |
|-----------|----------|-------------------------------------------|
| `title`   | yes      | Human-readable note title                 |
| `date`    | yes      | Note date (YYYY-MM-DD)                    |
| `created` | yes      | ISO 8601 creation timestamp               |
| `tags`    | yes      | List of tags (see taxonomy below)         |
| `status`  | yes      | Current lifecycle status (see below)      |
| `due`     | no       | Due date for tasks (YYYY-MM-DD)           |
| `priority`| no       | Task priority: `high`, `medium`, `low`    |
| `moved_to`| no       | Target path after organization            |
| `organized_at` | no  | ISO 8601 timestamp when organized         |

#### Status Values

| Status         | Meaning                                   |
|----------------|-------------------------------------------|
| `unorganized`  | New, sitting in Inbox, not yet reviewed   |
| `organized`    | Moved to correct folder, tags assigned    |
| `todo`         | Task not yet started                      |
| `in-progress`  | Task actively being worked on             |
| `done`         | Task completed                            |

### Section Notes (Sections)

```yaml
---
title: <human-readable title>
created: YYYY-MM-DDTHH:MM:SS
tags: [<tag1>, <tag2>]
---
```

| Field     | Required | Description                               |
|-----------|----------|-------------------------------------------|
| `title`   | yes      | Human-readable note title                 |
| `created` | yes      | ISO 8601 creation timestamp               |
| `tags`    | no       | List of tags (e.g., topic tags)           |

No `date` or `status` — section notes are reusable content blocks, not workflow items.

### Outline Notes (Outlines)

```yaml
---
title: <human-readable title>
created: YYYY-MM-DDTHH:MM:SS
tags: [<tag1>, <tag2>]
---
```

| Field     | Required | Description                               |
|-----------|----------|-------------------------------------------|
| `title`   | yes      | Human-readable document title             |
| `created` | yes      | ISO 8601 creation timestamp               |
| `tags`    | no       | List of tags (e.g., topic tags)           |

No `date` or `status` — outline notes define document structure via nested bullet lists.

## Folder Structure

```
vault/
├── Inbox/              # Landing zone for quick captures
├── Daily/              # Daily journal entries
│   └── YYYY/
│       └── MM/
│           └── YYYY-MM-DD.md
├── Tasks/              # Task files
├── Sections/           # Section notes (reusable content blocks)
│   └── <topic>/       # e.g., work/, learning/, health/
├── Outlines/           # Outline notes (document composition)
└── Archive/            # Completed or archived content
```

### Folder Rules

- **Inbox**: All new notes from `/jour:note` land here with `status: unorganized`
- **Daily**: One file per day, created by `/jour:journal`. Never organized by the organizer agent.
- **Tasks**: Task files from `/jour:task`. Organizer may move inbox notes that are clearly tasks here.
- **Sections**: Section notes and topic-specific notes. Use short kebab-case folder names. Section notes are atomic content blocks with no headings in their body.
- **Outlines**: Outline notes that compose section notes into structured documents via nested bullet lists with wikilinks.
- **Archive**: Long-term storage for completed tasks and old organized notes.

## Tag Taxonomy

### Core Tags (always lowercase)

| Tag          | Usage                                     |
|--------------|-------------------------------------------|
| `#inbox`     | File is in the Inbox, unreviewed          |
| `#journal`   | Daily journal entries                     |
| `#task`      | Task files                                |
| `#organized` | File has been organized (use in addition to topic tag) |

### Topic Tags (inferred by organizer)

Topic tags follow the pattern `#<topic-name>` matching the folder name:
- `#work`, `#personal`, `#learning`, `#health`, `#side-projects`
- Create new topic tags as needed, keeping them short and lowercase

### Priority Tags (tasks only)

- `#high-priority`, `#medium-priority`, `#low-priority`

## Section & Outline Composition

Section notes and outline notes form a parallel system for composing structured documents from small, reusable content blocks. This system coexists with the workflow notes (Inbox, Daily, Tasks, Archive) — they serve different purposes.

### Section Note Rules

- Live in `vault/Sections/<topic>/`
- Frontmatter: `title` (required), `created` (auto), `tags` (optional — e.g., topic tags)
- Body is a single block of content with **no markdown headings** (`#`) — just prose, lists, code blocks, etc.
- Can appear in multiple outline notes (reuse across documents)
- Filename: `<slugified-title>.md` — no date prefix

### Outline Note Rules

- Live in `vault/Outlines/`
- Frontmatter: `title` (required), `created` (auto), `tags` (optional — e.g., topic tags)
- Body is a **nested bullet list** defining document structure:
  - **Plain text items** → structural headings in the composed document (no content of their own)
  - **`[[wikilink]]` items** → section content pulled in with an auto-generated heading
- Nesting depth determines heading level:
  - Outline `title` → `#` (H1)
  - Top-level bullets → `##` (H2)
  - Sub-bullets → `###` (H3)
  - And so on for deeper nesting

### Heading Resolution for Wikilinks

When a wikilink appears in an outline, the heading text is resolved in this priority order:

1. **Display text**: `[[filename|Display Text]]` → uses "Display Text"
2. **Frontmatter title**: the `title` field in the linked note's frontmatter
3. **Filename**: the note's filename (without `.md`), un-slugified

### Example

Given these section notes:

`vault/Sections/cooking/mise-en-place.md`:
```markdown
---
title: Mise en Place
created: 2025-03-15T10:00:00
tags: [cooking]
---

Mise en place is the practice of preparing and organizing all ingredients
before you start cooking. Chop vegetables, measure spices, and set out
equipment so the cooking process flows smoothly.
```

`vault/Sections/cooking/knife-skills.md`:
```markdown
---
title: Knife Skills
created: 2025-03-15T10:05:00
tags: [cooking]
---

The three essential cuts are the dice, julienne, and chiffonade. Keep your
knife sharp and let the weight of the blade do the work.
```

And this outline note:

`vault/Outlines/cooking-fundamentals.md`:
```markdown
---
title: Cooking Fundamentals
created: 2025-03-15T11:00:00
tags: [cooking]
---

- Preparation
  - [[mise-en-place]]
  - [[knife-skills|Basic Knife Techniques]]
- Cooking Methods
```

The composed document would render as:

```markdown
# Cooking Fundamentals

## Preparation

### Mise en Place

Mise en place is the practice of preparing and organizing all ingredients
before you start cooking. Chop vegetables, measure spices, and set out
equipment so the cooking process flows smoothly.

### Basic Knife Techniques

The three essential cuts are the dice, julienne, and chiffonade. Keep your
knife sharp and let the weight of the blade do the work.

## Cooking Methods
```

Note: "Basic Knife Techniques" uses the display text from `[[knife-skills|Basic Knife Techniques]]`, while "Mise en Place" falls back to the frontmatter `title`.

## Editing Guidelines

- **Never delete** existing frontmatter fields when organizing — only add or update
- **Always preserve** the original `created` timestamp
- When moving a file: update `status`, add `moved_to`, add `organized_at`
- **Append only** to daily journal files — never overwrite existing content
- Task files: update only `status` and optionally `due` — keep description/notes/checklist intact
- **Section notes**: body must contain no markdown headings (`#`); keep content as a single block
- **Outline notes**: body must be a nested bullet list only; do not add prose outside the list
