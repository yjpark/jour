---
name: note
description: Capture a quick note to the vault Inbox
---

Capture a quick note and save it to `vault/Inbox/` with proper frontmatter.

## Steps

1. **Get the title**: If `$ARGUMENTS` is provided, use it as the note title. Otherwise, ask the user: "What's the title for this note?"

2. **Get the content**: Ask the user: "What's the content of your note?" (Allow multi-line input.)

3. **Generate the filename**:
   - Get the current date and time in `YYYY-MM-DD-HH-MM` format
   - Slugify the title: lowercase, replace spaces and special characters with hyphens, remove consecutive hyphens
   - Filename: `vault/Inbox/YYYY-MM-DD-HH-MM-<slugified-title>.md`

4. **Create the file** with this frontmatter and content:
   ```markdown
   ---
   title: <human title>
   date: YYYY-MM-DD
   created: YYYY-MM-DDTHH:MM:SS
   tags: [inbox]
   status: unorganized
   ---

   <note content>
   ```

5. **Confirm**: Tell the user the file was created at the path, and suggest running `/jour:organizer` to auto-organize the inbox when ready.
