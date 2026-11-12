# Somo

A literacy and numeracy website for young children in Kenya (about ages 5 to 9), built by our XPRIZE team.
Its learning model is **Internalize/Inspire → Interpret → Impart**: children take in a new idea, make sense of it through play, then teach it to someone else.

**Live site:** https://zanetitusgallagher-jesus.github.io/Xprize-Kenya/somo2/ (GitHub Pages, from the `main` branch, root folder).

> **If you are an AI assistant editing this repo, read this whole file first.** It tells you what each file is, how the AI key works, and the rules to keep.

---

## What is where

| Path | What it is | Who made it |
|---|---|---|
| `somo2/index.html` | **Somo main page: the learning path.** It looks like the original Somo, plus a row of feature buttons. Four stage tutors with Swahili names, numbers and reading paths, 21 games, lessons, egg basket, rhymes, stories, tracing, grown-up mode and AI tutor chat. Also: welcome video, accounts, parent and teacher page, guestbook and polls, safari or village music, a safari roadmap background, and at-home activities. | Zane's Somo, extended with the team's ideas |
| `somo2/audio/` | Recorded Kenyan-English voice clips (`en.json` Opus for most browsers, `en-mp3.json` for iPhone/iPad). The app picks the right file by itself. | Generated |
| `somo2/trail/index.html` | **Turi's trail** (the team's Somo page): Turi the lion, the treasure trail, surprise eggs, guestbook, polls and a grown-ups' tracker. Opened from the "Turi's trail" button. | Team (partner file) |
| `somo2/letters/index.html` | **Jambo Letters.** Letter tracing, capital and small letters, phonics, books, rhymes, a quiz and games for 5-year-olds. | Team (partner file), plus links at the top |
| `somo2/setup/index.html` | **AI key setup** for grown-ups (see below). | Added Nov 6, 2026 |
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
- **Egg basket rewards:** finishing steps earns eggs (hen, guinea-fowl, duck, ostrich). The child cracks an egg, finds a Kenyan gift and learns one true fact about that egg, then gives the gift to the tutor ("Asante!" / "Karibu!").
- **Story corner:** public-domain nursery rhymes, some with tunes; Aesop fables and an East African hare tale, retold; a tracing book for all 52 letters.
- **Learning with a grown-up:** a switch on the home screen shows a tip in English or Kiswahili before each activity.
- **Grown-ups panel:** press and hold the people icon. It shows progress, mistakes, the AI status and its own key box.
- **Feature buttons on the home screen** (added Nov 7, 2026):
  - **Welcome video:** plays by itself on first launch. It explains why to use Somo and how. A grown-up can turn off the autoplay.
  - **Accounts:** a student part (first name, age, boy or girl, favourite animal friend) and a parent part (first name, relationship, 4-digit PIN, notes language), with set-up instructions for parents, students and teachers.
  - **Parent page:** PIN-protected. It shows an AI progress story (English and Kiswahili), a learning-gap chart (mastery per skill plus answers per day), the mistakes that repeat, and an AI-recommended plan. It updates by itself after each session and falls back to written text when there is no AI.
  - **Delete account:** on the parent page (behind the PIN). It erases the accounts, the PIN and all progress from the device after the parent types the child's first name. It can also remove the saved AI key. Notes already shared in the class guestbook stay there, because the class database has no delete.
  - **Guestbook and polls:** use the class database (`questx-data.js`, site `livtreaux`), so notes and votes are shared with Turi's trail. First names only; links, emails and phone numbers are refused; text is shown with `textContent`.
  - **Music:** switch between the village beat and the team's safari groove (kalimba, hand drum, drone).
  - **Turi's trail:** opens `somo2/trail/`.
- **Safari roadmap:** the path sits on a sunset savanna, with giraffes, elephants and zebras walking, birds and clouds. It stays still when the device asks for reduced motion.
- **At-home activities:** every unit ends with an optional activity away from the screen, using beans, sticks, bottle caps or cups (English and Kiswahili). A grown-up taps "We did it together!" to finish it. These activities never block the path.
- Test hooks for automated testing: `window.__arc`, `window.__jr`, `window.__rw`, `window.__b2`.

`somo2/index.html` is a **built file**. Its source lives in a separate, private repo (`rgallagherTT/Chronicle`, folder `prototypes/somo-arcade/`, built with `python3 build.py`). Small edits directly in `somo2/index.html` are fine. For big changes to the learning path, ask Zane or the repo owner, so the source and this copy don't drift apart.

---

## Where progress is saved (Supabase)

- **On the device, always.** The app works offline, and every change is saved in the browser first.
- **Online, when a grown-up says yes.** In Accounts → Parent, "Save progress online" is ticked by default. With it on, the child's whole progress is also saved in Supabase, a PostgreSQL database (project "AI Tutor").
  - It saves about once a minute after changes, when the app is closed or hidden, and at "Finish".
  - When the app opens, it checks the online copy. If another phone saved newer progress, that copy is used.
  - **New phone:** on the Parent page, "Show the restore code", then on the new phone go to Accounts → "Restore my progress".
  - Only the child's first name and learning progress are saved. No contact details, and the secret keys are never stored in plain text.
- **How it connects.** The page calls the `somo-progress` Edge Function, never the database directly. Tables: `somo_children` (one row per child; the key and family code are stored only as hashes), `somo_state` (full progress) and `somo_snapshots` (a small daily summary, numbers only). Row-level security is on with no policies, so the function is the only way in. The function's source is in the Chronicle repo, at `prototypes/somo-arcade/relay/progress/index.ts`.
- **Delete account** (Parent page) deletes the online copy too, then everything on the device.

---

## Rules every change must keep

These come from our team's design. Please keep them when you or your AI edit the site.

**Teaching**
- Never say "wrong" or show a red X. When a child misses, teach instead: show why, then let them try again.
- Rewards come **only from learning** (right answers, finished steps). No streaks, no leaderboards, no rewards just for time spent.
- Reading text the child must read alone uses only letters and words already taught. Stories read *to* the child can use any words.
- Games never depend on fast reflexes; a slow child must still be able to show what they know.
- The AI tutor replies in a few short, simple sentences and never gives away the answer.

**Culture and language**
- Kenyan settings and things from children's lives: mangoes, matatus, kiondo baskets, mandazi, chai, shillings, Lake Victoria.
- Swahili names and greetings (Jambo, Asante, Karibu, Hongera). Notes for caregivers come in English **and** Kiswahili.
- Use only original art drawn in code, or public-domain text. Don't copy characters, art or text from existing apps, games or books.

**Privacy and safety**
- The guestbook asks for a **first name only**. Never collect emails, phone numbers or other private details from children.
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

Keep the links between pages working: `somo2/` (the learning path) links to `trail/`; Turi's trail links to `../`, `../letters/` and `../setup/`; letters and setup link back to `../`.
