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

## Delete account (parent control)
- **Date:** Nov 12, 2026
- **Goal:** Add a delete-account feature that the parent controls (from Tiffany's website).
- **Prompt:** "Can you add a delete account feature for the parent to control?"
- **What Claude Did:**
  - Added "Delete account" under "Account settings" on the Parent page, which is behind the parent PIN.
  - A confirmation screen lists exactly what will be erased from the device: the student and parent accounts and the PIN, all progress (stars, lessons, games, eggs, gifts, closet), the progress story, chart and plan, and guestbook notes and poll votes still waiting on the device. A tick box also removes the saved AI key.
  - The "Delete forever" button only works after the parent types the child's first name.
  - After deleting, the app starts fresh (welcome video, then account set-up). Only KenyAI's own saved data is removed, nothing else in the browser.
  - Notes already shared in the class guestbook stay there (the class database has no delete), and the screen says so.
  - Tested in a browser: the button stays locked until the right name is typed, then the account, the PIN and the progress are erased. Unticking the box keeps the AI key, and data saved by other websites is untouched.

## Save progress to Supabase; rename everything to Somo
- **Date:** Nov 12, 2026
- **Prompt:** "Can KenyAI save student progress to Supabase instead? And rename all to Somo."
- **What Claude Did:**
  - Supabase (project "AI Tutor", PostgreSQL 17): added the table `somo_state`, one row per child with their full progress. Row-level security is on with no policies, and the row is deleted along with the child. Updated the existing `somo-progress` Edge Function (version 2) with "save progress" and "load progress" actions, this site's address, and a higher limit so a class sharing one school connection isn't blocked. Everything it did before still works.
  - The app saves to the device first (it still works offline), and also online when a grown-up keeps "Save progress online" ticked (Accounts → Parent, ticked by default). It saves about once a minute after changes, when the app is closed and at "Finish". When the app opens, the newer online copy wins. A restore code on the Parent page moves progress to a new phone. Delete account also deletes the online copy.
  - Renamed everything visible from KenyAI back to Somo: the app, the welcome video, Turi's trail, the key setup page, Jambo Letters' links and this README. Internal names such as the `kenyai-key` saved-data key stay the same, so existing progress and keys keep working.
  - Tested in a browser against a stand-in server that behaves like the function. A new family is signed up and saved; the secret key is never stored inside the saved progress. Restoring on a second phone works, the first phone picks up the newer progress when it reopens, and deleting removes the online copy. No page errors. The live function couldn't be called from Claude's sandbox, so the first real test happens on the live site.

## Somo3 admin view, teacher view, all data in Supabase, subtitles
- **Date:** Nov 12, 2026
- **Prompt:** "The class DB should be Supabase also. All DB under Supabase, and then your admin can check progress from all your classes... see all the teachers and their views... check the student view... progress of all students... under a different link, Somo3." Then: "Somo 3 is the admin view. The teacher view is integrated into Somo 2. Add subtitles."
- **What Claude Did:**
  - Supabase: new tables `somo_guestbook`, `somo_votes` and `somo_admins` (row-level security on, no policies), plus a teacher name on classes. The `somo-progress` function (version 3) gained guestbook, polls, teacher-class and admin actions. Copied the team's 3 notes and 6 votes from the class database.
  - `somo2/`: the guestbook and polls now save to Supabase, with notes kept on the device and sent later when there's no internet. A new "Teacher" page: make a class (class code plus teacher key), open a class, see every student's progress, open one student. Families join a class with the code in Accounts → Parent. A "Subtitles" button; subtitles are on by default and show every spoken line.
  - `somo3/`: the admin page. It logs in with the admin key and shows totals, all students (searchable), teachers and classes, any class as its teacher sees it, any student's view, and guestbook moderation.
  - `somo2/trail/`: its guestbook and polls now use Supabase through a stand-in for the old helper.
  - Tested in a browser against a stand-in server that mirrors the function: the teacher makes a class, a family joins and plays, and the teacher sees the student. The admin view (a wrong key is refused, then overview, class and student) and hiding a note work. Guestbook and polls work in the app and on Turi's trail, subtitles show, and there were no page errors.

## Remove the egg stuff
- **Date:** Nov 12, 2026
- **Prompt:** "I don't like the egg stuff." Asked which part: "Remove all of it."
- **What Claude Did:**
  - Removed the egg basket rewards (egg cracking, gifts, the gift shelf) and the Egg Farm game from the Somo app (`somo2/`).
  - Brought back Somo's original treasure chests (after a step, a finished skill, a level-up and a daily gift) with stickers, coins and the sticker book. The closet still dresses whichever stage friend is on duty.
  - Updated the welcome video, the student instructions and the delete-account screen to talk about chests and stickers instead of eggs.
  - Left untouched: the Humpty Dumpty rhyme picture (it is part of the nursery rhyme), and Turi's trail, which is the partner's own page with its own surprise eggs.
  - Tested in a browser: Egg Farm and the basket are gone, a finished step pops a chest with a sticker, the sticker book and closet are on the home screen, and there were no page errors.

## Lesson certificates; no eggs on Turi's trail
- **Date:** Nov 12, 2026
- **Goal:** Bring the certificate feature from Ekah's website into the team build: show the child's score after every lesson. Remove the eggs from Turi's trail too.
- **Prompt:** "Remove the eggs from Turi's trail too." / "Can you add a certificate feature that shows the user's score after every lesson so we can add a feature from Ekah's website into our team build 3?"
- **What Claude Did:**
  - `somo2/index.html`: after every lesson, a "Certificate of Learning" with the child's name, the lesson, the score (right the first time), 1 to 3 stars, the date and the stage friend's signature. Buttons: Print, Save picture, Continue (back to the usual "You learned it!" screen). A "Certificates" button on the home screen lists them all; the Parent page lists the latest ones. Certificates are saved with progress (and in Supabase when online saving is on). Source: `prototypes/somo-arcade/src/b2/certs.js` in the Chronicle repo.
  - `somo2/trail/index.html`: removed the egg basket and the "crack an egg" screen; finishing a lesson now gives points and a certificate (name, lesson, score, stars, friend, date) with a "Print or save my certificate" button. Certificates are kept in the saved progress (`st.certs`).
  - Tested in a headless browser: score counted correctly, print/save and the certificate list work, no page errors.

## Somo 4: teacher view, admin assigns students, chats with voice notes, challenges, leaderboard, AI teachers
- **Date:** Nov 12, 2026
- **Goal:** A teacher view (Somo 4) that sees what each child sees; the admin (Somo 3) sees what teachers and children see and is the only one who assigns students to teachers, by age; group and one-on-one chat with voice notes; leaderboards and challenges; AI teachers from skill files. Remove the parent view, the guestbook and polls from the child's app.
- **Prompt:** "Make Somo 4. Somo 4 is the teacher view... the admin is the only one who can assign a student to a teacher... the teacher can have direct chat, like a chat group to the students. Can have like leaderboards, put out games, challenges... The teachers can also be sometimes AI... just do different skill files." Then: leaderboards yes; children send voice notes; teachers log in with just a PIN; group chat and one-on-one chat; the child cannot chat privately with other children; voice notes are not turned into text; guestbook, polls, teacher and parent are out of the child view; there is no parent view.
- **What Claude Did:**
  - Supabase: new tables `somo_teachers`, `somo_sessions`, `somo_messages`, `somo_challenges`, `somo_challenge_done` and the columns `teacher_id`, `age`, `kind` on `somo_children` (row-level security on, no policies). The `somo-progress` function (v4) got teacher PIN log-in with a lockout, teacher and admin views, chats and voice notes, challenges, the leaderboard, AI teacher replies, assign and assign-by-age, restore codes and delete. Tested against the live function with temporary test data, then removed it.
  - `somo4/`: the new teacher page. `somo4/teachers/`: three AI teacher skill files, a template and a list.
  - `somo3/`: a Teachers tab (add a person with a PIN or an AI teacher with a skill file, edit, remove, "See what they see"), a teacher picker per student, "Assign by age", the student's info, "See what they see", progress report, restore code, delete.
  - `somo2/`: "My teacher" (class chat, one-on-one chat, voice notes and picture replies, challenges that count by themselves, leaderboard), a view-only mode (`?view=1`) used by Somo 3 and 4, progress always saved online, and the Parent page, parent account, Teacher page, guestbook and polls removed from the child's app. Source: `prototypes/somo-arcade/src/b2/school.js` in the Chronicle repo.
  - README: new sections and the leaderboard rule updated to the team's decision.
  - Tested in a headless browser (admin → teacher → child, with a stand-in for the server and a fake microphone): no page errors.

## Somo guide (all the features in one file)
- **Date:** Nov 12, 2026
- **Goal:** One long, plain-words file that explains what Somo is and every feature.
- **Prompt:** "Tell me all the features of Somo and what Somo is in a long file."
- **What Claude Did:** wrote `SOMO-GUIDE.md` (what Somo is, the learning model, the child's app feature by feature, Somo 4, Somo 3, AI teachers, data, privacy, how it is built, the timeline) and linked it from the README. Also fixed an empty blue bar that showed on the teacher page for teachers who are not the admin.

## Feature 1: read-aloud check
- **Date:** Nov 12, 2026
- **Goal:** The child reads a short passage out loud; Somo follows word by word and saves accuracy and words correct per minute.
- **Prompt:** "Read-aloud check: add to the Stage 3 Read and find unit, the Stage 4 Sentences unit and the story corner... Web Speech API (en-KE, then en-US)... match in order, up to 3 words ahead... accuracy % and words correct per minute... Let's read these together... a grown-up switch Reading microphone... fallback Read it to a grown-up."
- **What Claude Did:**
  - `somo2/`: a "Read aloud" step before "Teach" in Read and find and Sentences, and a "Read it" shelf in the story corner. 8 passages, checked in code to use only taught words. Live word highlight, "read" / "not yet" words, "Let's read these together" with tap-to-hear, every attempt saved with progress (synced online), a "Reading aloud" trend in the progress report.
  - The "Reading microphone" switch is in the grown-ups panel (press and hold the people icon), because there is no Parent page any more. It is off until a grown-up turns it on. Without it: "Read it to a grown-up", then "Read it well" or "Needs more practice". No audio is stored.
  - `somo4/`: a "Reading aloud" chart and table on each student's page.
  - Source: `prototypes/somo-arcade/src/b2/reading.js` (Chronicle). Tested with a stand-in speech recogniser: no page or console errors.

## Feature 2: learning engine (review dates, warm-up, twin question, hint ladder, fix-it round, Practice Boost)
- **Date:** Nov 12, 2026
- **Goal:** Make every skill stick: spaced review, a check after teaching, better hints, and extra practice.
- **Prompt:** "Review dates from the existing mastery: weak 1 day, building 3 days, strong 7 then 14 days. Each session opens with a warm-up of up to 3 due-review items... Twin question... Hint ladder... Fix-it round... Practice Boost button: 6 questions from the 3 weakest skills."
- **What Claude Did:** (`somo2/`, source `src/b2/learn.js` in Chronicle)
  - Every answer sets the skill's next review date from its mastery (under 60%: 1 day; 60 to 79%: 3 days; 80% and up: 7 days, then 14 after a good strong review).
  - The first step of each session starts with a warm-up of up to 3 questions from due skills (after a 7-day break, the skills left longest come first), then goes on to the step.
  - In lessons: miss 1 gives the nudge and the picture help (as before); miss 2 now shows a worked example (a different question of the same kind, solved, read aloud, with its picture panel) and lets the child try again; after a miss, a twin question on the same skill follows; at the end, a fix-it round replays the questions missed on the first try (no penalty: fix-it answers do not change mastery).
  - "Practice Boost" on the home screen: 6 questions from the 3 weakest skills, 5 coins at the end (normal rewards).
  - Tested in a headless browser: no page or console errors.

## Feature 3: offline install
- **Date:** Nov 12, 2026
- **Goal:** Somo works with no internet and can be added to the home screen like an app.
- **Prompt:** "Add a manifest and a service worker scoped to /Xprize-Kenya/somo2/. Cache the app shell for somo2/, letters/, trail/ and setup/. On first load, cache the one audio file this device uses, showing a progress bar and then a Ready for offline badge. Versioned cache... Supabase and the AI relay go to the network first... a grown-up prompt to add Somo to the home screen."
- **What Claude Did:**
  - `somo2/sw.js`: caches the shell when it installs; pages are network-first (a new push shows at once when online, the cached copy when offline); the voice pack is cache-first in its own cache (`somo-audio-v1`) so new versions of the pages do not download it again; Supabase and the AI relay are never cached. Versioned caches (`somo-shell-v1`); old ones are deleted on update.
  - `somo2/manifest.webmanifest` and icons drawn in code (192, 512, maskable, Apple touch icon).
  - `somo2/` (source `src/b2/offline.js`): the voice pack downloads once with a progress bar, then a "Ready for offline" badge on the home screen; "Grown-up: add Somo to the home screen" chip (install prompt on Android and desktop, instructions on iPhone), also in the grown-ups panel, which can hide the reminder.
  - Tested in a headless browser: shell and voice cached, the app, letters, trail and setup open offline; no page or console errors.

## Feature 4: several children on one phone
- **Date:** Nov 12, 2026
- **Goal:** Brothers and sisters can share one phone, each with their own Somo.
- **Prompt:** "A Who's learning? screen. A grown-up can add a child (first name, age, animal friend). Each child has separate progress, rewards, certificates and fluency history, their own somo_children row... per-child delete. Migrate the existing single account to child 1 with zero data loss (keep the existing kenyai-* storage keys working)."
- **What Claude Did:** (`somo2/`, source `src/b2/kids.js` in Chronicle)
  - "Who's learning?" at the start of each session when a phone has more than one child, and a "Who's learning?" button on the home screen.
  - Adding a child is in the grown-ups panel (press and hold the people icon), because there is no parent PIN any more. Name, age and animal friend are filled in for the new child; online saving registers a separate `somo_children` row for each child, and the admin puts each one with a teacher (class codes were replaced by admin assignment).
  - Separate progress, rewards, certificates and reading history: the first child keeps the existing `kenyai-state` key (no migration needed, nothing lost); other children use `kenyai-state-<id>`; the list is in `kenyai-kids`.
  - "Remove from this phone" per child (tap twice). Online progress stays until a teacher or the admin deletes it.
  - Tested in a headless browser (old single-child phone, add a child, new session, switch back, remove): no data lost, no page or console errors.

## Feature 5: Story sums and Number patterns (two new skills)
- **Date:** Nov 12, 2026
- **Goal:** Word problems and number patterns, as full Inspire → Interpret → Impart units.
- **Prompt:** "Story sums (Stages 3–4): adding and taking away within 20, then within 100, read aloud, with pictures, in Kenyan settings. Number patterns (Stages 2–3): what comes next and the missing number, counting in 1s, 2s, 5s and 10s, forwards and back. Reuse existing game engines... at most one new game. At-home activity and caregiver tip in both languages. Add both to the placement check, the mastery chart and misconception tagging."
- **What Claude Did:** (`somo2/`, source `src/b2/skills2.js` in Chronicle)
  - Number patterns (Stage 2, after Make ten): levels go from 1s to 20, to 2s/5s/10s to 50, to forwards and back to 100 with missing numbers. A pattern-strip picture. Inspire: "Buckle My Shoe: count in twos".
  - Story sums (Stage 4, after Taking away): short stories read aloud about mangoes, the matatu, chai and mandazi with shillings, goats, bananas and eggs; within 10, then 20, then 100; a picture of the things coming or going away. Inspire: a new story, "Baraka's Market Day".
  - Lessons (Watch → Together → You!), Teach (Impart), games (Boda Boda Rush, Penalty King, Star Blaster, Mango Catcher; no new game), at-home activities with Kiswahili steps, grown-up tips in English and Kiswahili, placement check, the teacher and admin skill charts, and new mistake tags (wrong jump size, wrong way, picked a number from the story) with their own coach tips.
  - Tested: 600 generated questions per skill all valid; both lessons, teach-back, a game, the at-home activity, a coach tip and the story run with no page or console errors.

## The Somo logo
- **Date:** Nov 12, 2026
- **Goal:** Use the team's new Somo logo everywhere.
- **Prompt:** "This is the logo of Somo. Add this into Somo." (a design-system zip with the wordmark, mono and reverse versions, and the app icon)
- **What Claude Did:** saved the logo files in `somo2/art/` (the content-credential metadata was taken out to keep them small); new app icons (192, 512, maskable, Apple touch) drawn from `somo-icon.svg`; the wordmark on the Somo home screen (source `src/b2/brand.js` in Chronicle) and in the headers of the teacher (`somo4/`) and admin (`somo3/`) pages; the icon as the browser-tab icon. The service worker cache version went up so phones pick up the new icons. Checked in a headless browser: no page or console errors.
