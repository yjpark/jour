---
name: task
description: Create a new task entry in the vault
---

Create a new task file in `vault/Tasks/` with structured frontmatter and sections.

## Steps

1. **Get the task title**: If `$ARGUMENTS` is provided, use it as the task title. Otherwise, ask: "What is the task title?"

2. **Gather task details** — ask the user:
   - "Due date? (optional, format YYYY-MM-DD or leave blank)"
   - "Priority? (high / medium / low — default: medium)"

3. **Generate the filename**:
   - Get today's date in `YYYY-MM-DD` format
   - Slugify the title: lowercase, replace spaces and special characters with hyphens
   - Filename: `vault/Tasks/YYYY-MM-DD-<slugified-title>.md`

4. **Create the file** with this structure:
   ```markdown
   ---
   title: <task title>
   created: YYYY-MM-DDTHH:MM:SS
   due: YYYY-MM-DD
   priority: high | medium | low
   status: todo
   tags: [task]
   ---

   ## Description

   ## Notes

   ## Checklist

   - [ ]
   ```
   - If no due date was provided, omit the `due` field or leave it blank.

5. **Confirm**: Tell the user the task file was created at the path, and remind them they can update status to `in-progress` or `done` as they work.
