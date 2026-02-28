# jour — Plugin Development Guide & Vault Conventions

`jour` is both a Claude Code plugin and an Obsidian-compatible markdown vault living in the same repository. This file covers how to develop the plugin and how to maintain the vault.

---

## Plugin Development Guide

### Directory Layout

```
/ (repo root = plugin root)
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest (name, version, description)
├── commands/
│   ├── note.md              # /jour:note — capture a quick note to Inbox
│   ├── journal.md           # /jour:journal — open/create today's daily note
│   └── task.md              # /jour:task — create a task entry
├── agents/
│   └── organizer.md         # Vault organizer: scans Inbox, moves files
├── skills/
│   └── vault-management/
│       └── SKILL.md         # Vault conventions reference (auto-activated)
├── vault/
│   ├── Inbox/               # Landing zone for quick notes
│   ├── Daily/               # Daily journal entries (YYYY/MM/ structure)
│   ├── Tasks/               # Task files
│   ├── Sections/            # Section notes (reusable content blocks)
│   │   └── <topic>/         # Short, kebab-case topic names
│   ├── Outlines/            # Outline notes (document composition)
│   └── Archive/             # Organized/archived content
└── CLAUDE.md                # This file
```

### Adding a New Command

1. Create `commands/<command-name>.md`
2. Add YAML frontmatter:
   ```markdown
   ---
   name: <command-name>
   description: <one-line description>
   ---
   ```
3. Write step-by-step instructions for Claude to follow
4. The command is auto-discovered — no registration needed
5. Users invoke it as `/jour:<command-name>`

### Adding a New Agent

1. Create `agents/<agent-name>.md`
2. Add YAML frontmatter:
   ```markdown
   ---
   description: <agent role and when to use it>
   ---
   ```
3. Write the agent's behavior, guidelines, and knowledge
4. Auto-discovered — available immediately after reload

### Adding a New Skill

1. Create `skills/<skill-name>/SKILL.md`
2. Add YAML frontmatter:
   ```markdown
   ---
   name: <Skill Name>
   description: <when Claude should activate this skill>
   version: 0.1.0
   ---
   ```
3. Write the skill content — conventions, rules, reference data
4. Claude activates the skill automatically based on task context

### Naming Conventions

- **Commands**: kebab-case filenames (e.g., `daily-review.md` → `/jour:daily-review`)
- **Agents**: describe the role (e.g., `tag-suggester.md`)
- **Skills**: topic-focused directory names (e.g., `vault-management/`)
- **Vault files**: `YYYY-MM-DD-HH-MM-<slugified-title>.md`

### Testing Locally

1. Add this repo as a local plugin in Claude Code settings (`/plugins` or settings UI)
2. Enable the `jour` plugin
3. Verify commands appear: try `/jour:note`, `/jour:journal`, `/jour:task`
4. Test the organizer agent by asking Claude to run it
5. Check that files are created in the correct `vault/` subdirectories

---

## Vault Conventions

### Frontmatter Schemas

#### Workflow Notes (Inbox, Daily, Tasks, Archive)

```yaml
---
title: <human-readable title>
date: YYYY-MM-DD
created: YYYY-MM-DDTHH:MM:SS
tags: [<tag1>, <tag2>]
status: unorganized | organized | todo | in-progress | done
---
```

Optional fields: `due` (date), `priority` (high/medium/low), `moved_to` (path), `organized_at` (timestamp)

#### Section Notes (Sections)

```yaml
---
title: <human-readable title>
created: YYYY-MM-DDTHH:MM:SS
tags: [<tag1>, <tag2>]
---
```

No `date` or `status` — section notes are reusable content blocks, not workflow items.

#### Outline Notes (Outlines)

```yaml
---
title: <human-readable title>
created: YYYY-MM-DDTHH:MM:SS
tags: [<tag1>, <tag2>]
---
```

No `date` or `status` — outline notes define document structure via nested bullet lists.

### Folder Structure

```
vault/
├── Inbox/              # All quick captures land here
├── Daily/              # Daily notes (never reorganized)
│   └── YYYY/MM/YYYY-MM-DD.md
├── Tasks/              # Dedicated task files
├── Sections/           # Section notes (reusable content blocks)
│   └── <topic>/       # Short, kebab-case topic names
├── Outlines/           # Outline notes (document composition)
└── Archive/            # Completed / old organized content
```

### File Naming Rules

- **Inbox & Tasks**: `YYYY-MM-DD_HH-MM_<slugified-title>.md`
- **Daily notes**: `YYYY-MM-DD.md` inside `vault/Daily/YYYY/MM/`
- **Section notes**: `<slugified-title>.md` (no date prefix) inside `vault/Sections/<topic>/`
- **Outline notes**: `<slugified-title>.md` (no date prefix) inside `vault/Outlines/`
- **Slugify**: lowercase, spaces → `-`, collapse consecutive `-`, strip leading/trailing `-`

### Tag Taxonomy

| Tag            | Usage                                        |
|----------------|----------------------------------------------|
| `#inbox`       | Unreviewed file in Inbox                     |
| `#journal`     | Daily journal entry                          |
| `#task`        | Task file                                    |
| `#organized`   | File has been organized                      |
| `#<topic>`     | Topic tag matching folder (e.g., `#work`)    |

### Editing Rules

- **Never delete** existing frontmatter fields when editing
- **Never overwrite** the `created` timestamp
- **Append only** to daily journal entries
- When organizing: update `status`, add `moved_to` and `organized_at`
- When completing tasks: update `status` to `done` only
- **Section notes**: body must contain no markdown headings (`#`); keep content as a single block
- **Outline notes**: body must be a nested bullet list only; do not add prose outside the list

### Section & Outline Composition

Section notes and outline notes form a parallel system for composing structured documents from small, reusable content blocks.

#### Section Notes

- Live in `vault/Sections/<topic>/`
- Body is a single block of content with **no markdown headings** — just prose, lists, code blocks, etc.
- Can appear in multiple outline notes (reuse across documents)
- Filename is `<slugified-title>.md` with no date prefix

#### Outline Notes

- Live in `vault/Outlines/`
- Body is a **nested bullet list** that defines the structure of a composed document
- Each bullet item is either:
  - **Plain text** → becomes a structural heading in export (no content of its own)
  - **`[[wikilink]]`** → pulls in the referenced section note's content, with an auto-generated heading
- Nesting depth determines heading level (outline `title` = `#`, top-level bullets = `##`, sub-bullets = `###`, etc.)

#### Heading Resolution for Wikilinks

When a wikilink appears in an outline, the heading text is resolved in this priority order:

1. **Display text**: `[[filename|Display Text]]` → uses "Display Text"
2. **Frontmatter title**: the `title` field in the linked note's frontmatter
3. **Filename**: the note's filename (without `.md`), un-slugified

#### Example

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
