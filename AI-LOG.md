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

## KenyAI learning path (Build 2) at /somo2/
- **Date:** Nov 6, 2026
- **Goal:** Combine the team's work into one KenyAI site: the KenyAI home page, Jambo Letters, and the full learning path (Somo Build 2).
- **Prompt:** "Put it at /somo2/, rename it to KenyAI, push it to GitHub and send me the working link. Use my partners' two index.html files, or merge them with what you made."
- **What Claude Did:**
  - `somo2/index.html`: the KenyAI home page (Turi the lion, trail, eggs, guestbook, polls), unchanged except two new buttons: "Learning path" and "Jambo Letters".
  - `somo2/learn/`: the learning path renamed from Somo to KenyAI. It has stage tutors with Swahili names (Kuku, Kobe, Twiga, Tembo), Inspire → Interpret → Impart units, an egg basket with Kenyan gifts and egg facts, rhymes, stories, a tracing book, three new games and a learning-with-a-grown-up mode.
  - `somo2/learn/audio/`: the recorded Kenyan English voice (Asilia) so lines play instantly.
  - `somo2/letters/`: Jambo Letters, with links back to the KenyAI home page and the learning path.
  - The AI tutor talks through a server relay that holds the Claude key. The key is never put in the page or the repo, because anyone can read a public website's code. The relay now accepts this site's address.
  - The root `index.html` and `index (4).html` are left as they were.

## AI key setup page and README
- **Date:** Nov 6, 2026
- **Goal:** Give the team a way to add a Claude API key that keeps working, and a README so partners and their AI tools can safely keep editing the repo.
- **Prompt:** "Make a way to add the API key and don't delete it. Please make a README because my partners will be using AI to further edit this repo."
- **What Claude Did:**
  - Added `somo2/setup/`: a grown-ups page to paste a Claude key, test it, show or hide it, and forget it. The key is saved in that browser on that device (localStorage `kenyai-key`) and stays until "Forget" is pressed.
  - The home page now uses that saved key when no other AI route answers. The learning path already reads the same key.
  - Kept the key out of the repo on purpose. GitHub reports Claude keys found in public code, and Anthropic then switches them off, so a key committed here would stop working.
  - Wrote `README.md`: what each file is, how the AI routes and the key work, the teaching, culture, privacy and accessibility rules, and how to test and log changes.

## Key setup: clean pasted keys and explain test failures
- **Date:** Nov 6, 2026
- **Goal:** The setup page said "could not reach Claude" with no reason.
- **What Claude Did:**
  - The setup page now strips hidden characters from a pasted key (spaces, line breaks, zero-width marks). Browsers refuse to send a key that contains them. The home page and the learning path clean the saved key the same way.
  - When the key test fails, the page shows the real error and what to do: wrong or switched-off key, no credit, a blocker or filter on api.anthropic.com, or no internet.
