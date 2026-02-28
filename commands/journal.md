---
name: journal
description: Open or create today's daily journal entry
---

Open today's daily journal entry, or create it from a template if it doesn't exist yet.

## Steps

1. **Determine today's date**: Use the current date in `YYYY-MM-DD` format. Split into `YYYY` and `MM` components.

2. **Determine the target path**: `vault/Daily/YYYY/MM/YYYY-MM-DD.md`

3. **Check if the file exists**:

   **If it exists**:
   - Read and display the current content to the user
   - Ask: "Would you like to append to today's journal? If so, what would you like to add?"
   - If the user provides content, append it under a `## Entry HH:MM` heading with the current time
   - Confirm the update

   **If it does not exist**:
   - Create the directory path `vault/Daily/YYYY/MM/` if needed
   - Create the file with this template:
     ```markdown
     ---
     title: Journal YYYY-MM-DD
     date: YYYY-MM-DD
     created: YYYY-MM-DDTHH:MM:SS
     tags: [journal]
     status: organized
     ---

     # YYYY-MM-DD

     ## Reflection

     ## Goals

     ## Notes
     ```
   - Confirm the file was created and display its path

4. **Final output**: Show the file path so the user can navigate to it directly.
