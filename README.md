# Somo

A literacy and numeracy website for young children in Kenya (about ages 5 to 9), built by our XPRIZE team.
Its learning model is **Internalize/Inspire → Interpret → Impart**: children take in a new idea, make sense of it through play, then teach it to someone else.

**Live site:** https://zanetitusgallagher-jesus.github.io/Xprize-Kenya/somo2/ (GitHub Pages, from the `main` branch, root folder).

> **If you are an AI assistant editing this repo, read this whole file first.** It tells you what each file is, how the AI key works, and the rules to keep.

---

## What is where

| Path | What it is | Who made it |
|---|---|---|
| `somo2/index.html` | **Somo main page: the child's app (the learning path).** It looks like the original Somo, plus a row of feature buttons. Four stage tutors with Swahili names, numbers and reading paths, 20 games, lessons, treasure chests, certificates, rhymes, stories, tracing, grown-up mode and AI tutor chat. Also: "My teacher" (class chat and one-on-one chat with voice notes, challenges, leaderboard), welcome video, the student account, safari or village music, subtitles, a safari roadmap background, and at-home activities. | Zane's Somo, extended with the team's ideas |
| `somo2/audio/` | Recorded Kenyan-English voice clips (`en.json` Opus for most browsers, `en-mp3.json` for iPhone/iPad). The app picks the right file by itself. | Generated |
| `somo2/trail/index.html` | **Turi's trail** (the team's Somo page): Turi the lion, the treasure trail, a certificate after every lesson, guestbook, polls and a grown-ups' tracker (no eggs since Nov 12, 2026). Opened from the "Turi's trail" button. | Team (partner file) |
| `somo2/letters/index.html` | **Jambo Letters.** Letter tracing, capital and small letters, phonics, books, rhymes, a quiz and games for 5-year-olds. | Team (partner file), plus links at the top |
| `somo2/setup/index.html` | **AI key setup** for grown-ups (see below). | Added Nov 6, 2026 |
| `somo3/index.html` | **Somo 3, the admin view.** Log in with the admin key. Add teachers (people with a PIN, or AI teachers with a skill file), put each student with a teacher (by hand or "Assign by age"), see every student's info and progress, see exactly what any child sees and what any teacher sees, make restore codes, delete accounts, and hide guestbook notes. | Added Nov 12, 2026 |
| `somo4/index.html` | **Somo 4, the teacher view.** A teacher picks their name and types their PIN. They see their students' progress, exactly what each child sees, each child's progress report (AI story, gap chart, plan), a class chat and one-on-one chats (text and voice notes), challenges and the leaderboard. | Added Nov 12, 2026 |
| `somo4/teachers/` | **AI teacher skill files** (`*.md`) and their list (`index.json`). Copy `TEMPLATE.md` to make a new AI teacher. | Added Nov 12, 2026 |
| `somo2/learn/index.html` | An old address that now sends visitors to `somo2/`. | |
| `index.html`, `index (4).html` | The original team files at the repo root. Left as they were. | Team |
| `AI-LOG.md` | **Log of every AI-assisted change.** Add an entry each time you change something. | Everyone |

Every page is a **single self-contained HTML file**: no build step, no npm, no framework. Open it in a browser, or serve the folder with `python3 -m http.server` and visit `http://localhost:8000/somo2/`.

---

## How the AI works (and the API key)

The AI never decides whether a child's answer is right. The app's own code does that; the AI only coaches, hints and writes short notes.

The pages try these routes **in this order**:

1. **A key saved on this device.** A grown-up opens `somo2/setup/`, pastes a Claude API key and taps "Save and test". The key is stored in that browser only (localStorage, name `kenyai-key`) and stays until someone taps "Forget". Every Somo page on that device uses it. A one-time setup link also works: `…/somo2/setup/#key=sk-ant-…`.
2. **The Somo relay.** A Supabase Edge Function (`somo-kidi`, project "AI Tutor") holds a Claude key as a server secret, so the tutors work for everyone with no key on the device. It only accepts requests from this site and from `rgallaghertt.github.io`, only tutor-style prompts, with rate and daily limits. The learning path (`somo2/`) uses it; Turi's trail does not yet.
3. **Inside Claude.** When a page is opened as a Claude artifact, it uses the viewer's Claude account.
4. **No AI.** Every feature has a written fallback (pre-written hints, a template caregiver note), so the site never breaks.

### Rules for the key (important)

- **Never put an API key in any file in this repo**: not in HTML, JavaScript, README, AI-LOG or a commit message. The repo is public, so anyone can read it. GitHub also scans public code for Claude keys and reports them to Anthropic, which **switches the key off within minutes**. To keep a key working, keep it out of the repo.
- To add a key, use `somo2/setup/` on each device, or ask the relay's owner to update the relay's server secret.
- Set a monthly spending limit on the key in the Anthropic Console.

---

## The learning path in more detail (`somo2/`)

- **Placement check** at the start (Teaching at the Right Level): a short check that opens the path at the child's level. It never says right or wrong.
- **Four stages, each with its own AI tutor**:

  | Stage | Tutor | Skills |
  |---|---|---|
  | 1 Mbegu (seed) | Kuku the hen | counting, big numbers, letter sounds, capital and small letters |
  | 2 Chipukizi (sprout) | Kobe the tortoise | quick sums, make ten, rhyming, blending |
  | 3 Mti (tree) | Twiga the giraffe | tens and ones, equal groups, tricky words, read and find |
  | 4 Matunda (fruit) | Tembo the elephant | adding, taking away, sentences |

- **Every skill is a unit of three phases:**
  - **Inspire:** a nursery rhyme or story, then a lesson (Watch → Together → You).
  - **Interpret:** up to three games that train that skill.
  - **Impart:** the child teaches the tutor, who has made a mistake, then gets an activity to show a grown-up at home, in English and Kiswahili.
- **Treasure chests:** finishing steps and skills, levelling up and a daily gift each pop a treasure chest with a sticker and coins (Somo's original rewards). Stickers go in the sticker book; coins buy outfits in the closet.
- **Story corner:** public-domain nursery rhymes, some with tunes; Aesop fables and an East African hare tale, retold; a tracing book for all 52 letters.
- **Learning with a grown-up:** a switch on the home screen shows a tip in English or Kiswahili before each activity.
- **Grown-ups panel:** press and hold the people icon. It shows progress, mistakes, the AI status and its own key box.
- **Feature buttons on the home screen** (added Nov 7, 2026):
  - **Welcome video:** plays by itself on first launch. It explains why to use Somo and how. A grown-up can turn off the autoplay.
  - **My teacher** (Nov 12, 2026): see "Teachers and the admin" below.
  - **Accounts:** the student (first name, age, boy or girl, favourite animal friend), with set-up instructions. There is no parent account any more: teachers and the admin see progress.
  - **Certificates:** a certificate with the score after every lesson (print it or save it as a picture).
  - **Music:** switch between the village beat and the team's safari groove (kalimba, hand drum, drone).
  - **Subtitles:** every spoken line is also written on the screen (on by default).
  - **Turi's trail:** opens `somo2/trail/`.
- **Certificates (from Ekah's website):** after every lesson the child gets a certificate with their name, the lesson, the score (questions right the first time in the lesson's "You!" part), stars, the date and the animal friend's signature. It can be printed or saved as a picture. All certificates are kept under "Certificates" on the home screen, listed on the Parent page, and saved with the progress in Supabase. Turi's trail shows the same kind of certificate after each of its lessons.
- **Safari roadmap:** the path sits on a sunset savanna, with giraffes, elephants and zebras walking, birds and clouds. It stays still when the device asks for reduced motion.
- **At-home activities:** every unit ends with an optional activity away from the screen, using beans, sticks, bottle caps or cups (English and Kiswahili). A grown-up taps "We did it together!" to finish it. These activities never block the path.
- Test hooks for automated testing: `window.__arc`, `window.__jr`, `window.__rw`, `window.__b2`.

`somo2/index.html` is a **built file**. Its source lives in a separate, private repo (`rgallagherTT/Chronicle`, folder `prototypes/somo-arcade/`, built with `python3 build.py`). Small edits directly in `somo2/index.html` are fine. For big changes to the learning path, ask Zane or the repo owner, so the source and this copy don't drift apart.

---

## Teachers and the admin (Somo 3 and Somo 4, all in Supabase)

Three kinds of people use Somo: **children** (the app, `somo2/`), **teachers** (`somo4/`) and **the admin** (`somo3/`). There is no parent view.

- **The admin is the only one who puts a student with a teacher.** In `somo3/` → All students, pick a teacher for each child, or tap "Assign by age": every student without a teacher goes to a teacher whose age range fits (people first, then AI teachers), the one with the fewest students. The admin also sees each student's info (first name, age, boy or girl, animal friend, when they joined), their progress, **exactly what the child sees** (the Somo app with the child's saved progress, read-only) and **exactly what any teacher sees** ("See what they see" opens `somo4/` as that teacher).
- **Teachers:** the admin adds a teacher with a name, an age range and a **PIN** (4 to 6 numbers). The teacher opens `somo4/`, picks their name and types the PIN. Five wrong PINs lock it for 15 minutes. A teacher sees only their own students: progress, gaps, repeated mistakes, "See what they see", the progress report (AI story in English and Kiswahili, gap chart, plan), a new restore code for a new phone, and delete account.
- **AI teachers:** the admin can add an AI teacher instead of a person, with a **skill file** from `somo4/teachers/` (Mwalimu Neema, Mwalimu Juma, Mwalimu Amani, or a new one made from `TEMPLATE.md`). The AI teacher answers the children by itself in the chats (Claude, through the `somo-progress` function and the project's server key). Somo always adds safety rules after the skill: short replies read aloud, never give away answers, never ask for personal details, tell a trusted grown-up if a child seems unsafe. The admin can open an AI teacher's view to read its chats, write as it and set its challenges.
- **Chat:** each teacher has a **class chat** (everyone in the group hears it) and a **one-on-one chat** with each student. Teachers write text (Somo reads it aloud to the children) or record voice notes. **Children send voice notes or picture replies** ("Hello!", "I need help", "I did it!", "I am stuck", "Thank you!", "Look at my work!"), never typed text, and **never message another child privately**. Voice notes are **not turned into text** for people: teachers listen to them. For an AI teacher only, the child's phone's own free speech recogniser (when the browser has one) passes the words to the AI; those words are not stored or shown. Teachers (and the admin) can hide any message.
- **Challenges:** a teacher sends a challenge (play a game N times, or finish a lesson) with points and an end date. It appears in every student's "My teacher" screen, counts by itself when the child plays, and the points go on the leaderboard.
- **Leaderboard:** this week (answers right the first time in the last 7 days, plus challenge points this week) and all time (10 points per star, plus all challenge points). Children and the teacher see the same board.
- **Guestbook and polls** are no longer in the child's app. They remain on Turi's trail, and the admin can still hide guestbook notes.
- **Admin key:** only a hash is stored. To add another admin, insert a row in `somo_admins` with the SHA-256 of a new key.

## Where progress is saved (Supabase)

- **On the device, always.** The app works offline, and every change is saved in the browser first.
- **Online, always.** Once the child's first name is saved in Accounts, the whole progress is also saved in Supabase, a PostgreSQL database (project "AI Tutor"), so teachers and the admin can see it.
  - It saves about once a minute after changes, when the app is closed or hidden, and at "Finish".
  - When the app opens, it checks the online copy. If another phone saved newer progress, that copy is used.
  - **New phone:** the teacher (or admin) makes a new restore code for the child; on the new phone go to Accounts → "Restore my progress". The old phone stops saving.
  - Only the child's first name and learning progress are saved. No contact details, and the secret keys are never stored in plain text.
- **How it connects.** The pages call the `somo-progress` Edge Function, never the database directly. Tables: `somo_children` (one row per child: first name, age, boy or girl, animal friend, teacher; the key is stored only as a hash), `somo_state` (full progress), `somo_snapshots` (a small daily summary), `somo_teachers` (PINs stored only as hashes; AI teachers keep a copy of their skill file), `somo_sessions` (teacher log-ins, hashed, 12 hours), `somo_messages` (chats and voice notes), `somo_challenges` and `somo_challenge_done`, plus `somo_guestbook`, `somo_votes` and `somo_admins`. Row-level security is on with no policies, so the function is the only way in. The function's source is in the Chronicle repo, at `prototypes/somo-arcade/relay/progress/index.ts`.
- **Delete account** (teacher or admin) deletes the child's progress, chats and challenge results from Supabase.

---

## Rules every change must keep

These come from our team's design. Please keep them when you or your AI edit the site.

**Teaching**
- Never say "wrong" or show a red X. When a child misses, teach instead: show why, then let them try again.
- Rewards come **only from learning** (right answers, finished steps, challenges). No streaks, no rewards just for time spent. A **leaderboard** is allowed (team decision, Nov 12, 2026): its points come only from learning.
- Reading text the child must read alone uses only letters and words already taught. Stories read *to* the child can use any words.
- Games never depend on fast reflexes; a slow child must still be able to show what they know.
- The AI tutor replies in a few short, simple sentences and never gives away the answer.

**Culture and language**
- Kenyan settings and things from children's lives: mangoes, matatus, kiondo baskets, mandazi, chai, shillings, Lake Victoria.
- Swahili names and greetings (Jambo, Asante, Karibu, Hongera). Notes for caregivers come in English **and** Kiswahili.
- Use only original art drawn in code, or public-domain text. Don't copy characters, art or text from existing apps, games or books.

**Privacy and safety**
- The guestbook asks for a **first name only**. Never collect emails, phone numbers or other private details from children.
- Children talk **only to their teacher**: in the class chat (everyone in the group hears it) or one-on-one with the teacher. Never child-to-child private messages, and children never type free text (voice notes and picture replies only).
- Voice notes are never turned into text for people. Somo stores voice notes only inside the chat, and teachers or the admin can hide them.
- Show anything a visitor typed with `textContent`, never `innerHTML`, so nobody can inject code.
- Never put API keys or passwords in the repo (see above).

**Accessibility**
- Big buttons that work by touch. Everything is spoken aloud, so a child doesn't need to read the instructions.
- Keep focus outlines visible and respect "reduce motion".

---

## How to make a change (for people and AI assistants)

1. Edit the HTML file(s) directly.
2. Test locally with `python3 -m http.server`. Open the page, click through what you changed, and check the browser console for errors.
3. Add an entry to `AI-LOG.md`: date, goal, the prompt you used, and what the AI did.
4. Commit and push to `main`. GitHub Pages updates the live site within a minute or two.

Keep the links between pages working: `somo2/` (the learning path) links to `trail/`; Turi's trail links to `../`, `../letters/` and `../setup/`; letters and setup link back to `../`. `somo3/` links to `somo4/?as=<teacher id>`, and both open `somo2/?view=1` in a frame for "See what they see" (the child's state is passed in `sessionStorage`, key `somo-view-state`; nothing is saved in view mode).
