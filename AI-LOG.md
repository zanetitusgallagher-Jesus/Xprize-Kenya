# AI Work Log

## Guestbook (Part 3)
- **Date:** Nov 5, 2026
- **Goal:** Add a dynamic guestbook section connected to the class database API.
- **Prompt:**
  "Add a guestbook section to my website. Visitors type a first name and a short message, select a button to save it, and see the 20 newest notes below the form..."
- **What Claude Did:**
  - Added the helper script tag for `questx-data.js` with my site identifier.
  - Built an HTML form for collecting a name and message.
  - Used `QuestXData.save()` to send new entries to the database.
  - Used `QuestXData.list()` to fetch the 20 most recent messages.
  - Used `textContent` to safely display user submissions and prevent security risks.
