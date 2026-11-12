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

## KenyAI learning path becomes the main page, with eight new features
- **Date:** Nov 7, 2026
- **Goal:** Add the class requirements and the team's ideas to the Somo-based learning path, keep it looking like the original Somo, and add the new features as extra buttons.
- **Prompt:** "Please add these to the updated version of Somo: 1. guestbook and polls (the requirement from Mr. Kim), 2. an automatic welcome video, 3. account set-up instructions for parent and student, 4. an AI progress narrative for the parent/teacher, 5. an AI learning-gap chart and recommended plan, 6. a safari music option, 7. a more safari-like roadmap background with moving elements, 8. offline activities in the lesson map. It should look like the original Somo, except with the extra feature buttons."
- **What Claude Did:**
  - Made the learning path the main page at `somo2/`. Moved the team's KenyAI page to `somo2/trail/` (the "Turi's trail" button). `somo2/learn/` now sends visitors to `somo2/`.
  - Added a row of feature buttons under the Somo home screen: Welcome video, Accounts, Parent page, Guestbook & polls, Music (Village or Safari) and Turi's trail.
  - Guestbook and polls use the same class database and site id as the team page, with first names only and `textContent` for display.
  - Added the welcome video (narrated animated scenes with captions; it plays by itself the first time), accounts with instructions for parents, students and teachers, and a PIN-protected parent and teacher page with an AI progress story, a gap chart and an AI plan, all with written fallbacks.
  - Added the team's safari groove as a second music style, a moving savanna behind the roadmap, and an optional at-home activity in every unit.
  - Tested in a browser: the first-launch video, accounts, the at-home step, the parent page with PIN, guestbook and poll saving (with a stand-in database), music switching and saving across a reload, all with no page errors.

## Guestbook and polls: fix saving
- **Date:** Nov 12, 2026
- **Goal:** Notes and votes were not saving on the live site.
- **What Claude Did:**
  - Found the cause: the class database only accepts saves from the enrolled site's own address (site id `x` saves only from `x.github.io`). Our pages used the site id `livtreaux` but run on `zanetitusgallagher-jesus.github.io`, so every save was refused.
  - The main page now saves notes and votes under this page's own GitHub username. It still shows the team's earlier notes and votes from `livtreaux` (read-only), so nothing disappears.
  - Turi's trail (`somo2/trail/`) no longer hard-codes `data-site`, so the helper picks the right site id from the page's address on any host.
  - If a save still fails, the page now shows the server's actual reason instead of a generic message.
  - Tested in a browser with a stand-in server that enforces the same rule: saving a note and a vote both work, and the team's old note still shows.

## Guestbook and polls: keep notes until the site is enrolled
- **Date:** Nov 12, 2026
- **Goal:** The class database answers "The site "zanetitusgallagher-jesus" isn't enrolled yet. Ask your teacher to add it." Notes and votes should not be lost while we wait.
- **What Claude Did:**
  - Until the teacher enrolls the site, a note or vote that the database refuses for that reason is kept on the device. It shows in the list as "On this device, waiting to be shared".
  - Every time the guestbook opens, waiting notes and votes are sent again. Once the site is enrolled they reach the class database by themselves.
  - Fixed the doubled full stop in error messages.
  - Tested in a browser with a stand-in server: refused while not enrolled (kept on the device), then sent and cleared once enrolled.
- **Still needed:** the teacher must enroll the site id `zanetitusgallagher-jesus` in the QuestX class database.
