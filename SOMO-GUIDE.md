# Somo: what it is and everything it does

*Written November 12, 2026. For the team, teachers, partners and judges. For how to edit the code, read `README.md`.*

**Live site:** https://zanetitusgallagher-jesus.github.io/Xprize-Kenya/somo2/

---

## 1. What Somo is

**Somo** means "lesson" or "study" in Kiswahili. Somo is a free learning website for young children in Kenya, about
**ages 5 to 9**, built by our XPRIZE class team. It teaches the two foundations every child needs before anything
else: **reading (literacy)** and **numbers (numeracy)**.

It works in a phone or tablet browser: no app store, no download, no account with an email. It is made for the
children who need it most: children who may be using a phone to learn for the first time, who may not read yet, and
whose families may share one phone.

### The big idea: Inspire → Interpret → Impart

Every skill in Somo is learned in three steps:

1. **Inspire (take it in).** A rhyme or a story, then a short lesson where the animal friend shows the idea
   (*Watch*), does it with the child (*Together*), then lets the child try (*You!*).
2. **Interpret (make sense of it through play).** Up to three games that practise exactly that skill.
3. **Impart (teach it to someone else).** The child teaches the animal friend, who has made a mistake on purpose,
   and then gets an activity to do at home with a grown-up, away from the screen.

Teaching something to someone else is one of the strongest ways to learn it, so every unit ends with the child
being the teacher.

### Who uses Somo

| Who | Where | What they do |
|---|---|---|
| **Children** | `somo2/` (the Somo app) | Learn on the path, play games, read stories, earn certificates, talk to their teacher with voice notes, do challenges, see the leaderboard. |
| **Teachers** | `somo4/` (Somo 4, the teacher view) | Log in with a PIN, see their students' progress and exactly what each child sees, chat with the class and with each child, set challenges, watch the leaderboard. |
| **The admin** | `somo3/` (Somo 3, the admin view) | Add teachers (people or AI), put students with teachers by age, see every student's info and progress, see what any teacher or child sees. |

There is no separate parent view: the teacher and the admin see progress. Grown-ups at home help the child set up
Somo and do the at-home activities together.

### What makes Somo different

- **It never says "wrong".** There are no red X marks. When a child misses, Somo teaches: it shows why, then lets
  them try again.
- **Everything is spoken aloud** in a recorded Kenyan English voice, and also written on the screen as subtitles,
  so a child who cannot read yet can still use every part of it.
- **It is Kenyan.** Mangoes, matatus, boda bodas, kiondo baskets, mandazi, chai, shillings, Lake Victoria, the
  market. Swahili names and greetings (Jambo, Karibu, Asante, Hongera). Notes for grown-ups in English and Kiswahili.
- **It starts where the child is** (Teaching at the Right Level): a short placement check opens the path at the
  child's level.
- **Rewards come only from learning:** right answers, finished steps, finished challenges. Never from time spent,
  and no streaks.
- **The AI never decides if an answer is right.** Somo's own code does that. The AI only coaches, gives hints and
  writes short notes, and every AI feature has a written fallback, so Somo works even with no AI.

---

## 2. The child's app (`somo2/`)

### 2.1 Getting started

- **Welcome video:** plays by itself the first time. It explains why Somo helps and how to use it (15 minutes a day,
  the animal friends, the path). A grown-up can turn off the autoplay. It can be replayed from the home screen.
- **Accounts (the student):** first name only, age, boy or girl (so the friend says "he" or "she"), and a favourite
  animal friend. A "How to set up" tab has step-by-step instructions for grown-ups at home, students and teachers.
- **Restore my progress:** on a new phone, type the restore code from the teacher to continue where the child left off.
- **Placement check:** a short, friendly check that opens the path at the right level. It never says right or wrong.

### 2.2 The four stages and their animal tutors

Each stage has its own AI tutor with a Swahili stage name:

| Stage | Tutor | Skills |
|---|---|---|
| 1 Mbegu (seed) | **Kuku** the hen | Counting, big numbers, letter sounds, capital and small letter partners |
| 2 Chipukizi (sprout) | **Kobe** the tortoise | Quick sums, make ten, rhyming, blending sounds into words |
| 3 Mti (tree) | **Twiga** the giraffe | Tens and ones, equal groups, tricky words, read and find |
| 4 Matunda (fruit) | **Tembo** the elephant | Adding, taking away, sentences |

That is **15 skills**: counting, big numbers, quick sums, make ten, tens and ones, equal groups, adding, taking
away, letter sounds, letter partners, rhyming, blending, tricky words, read and find, and sentences.

### 2.3 The learning path

- The path is a **safari roadmap** across a sunset savanna, with giraffes, elephants and zebras walking, birds and
  clouds (it stays still if the device asks for reduced motion).
- The big green **Continue** button always takes the child to the next step.
- Each skill is a unit: **Inspire** (rhyme or story + lesson) → **Interpret** (up to 3 games) → **Impart** (teach
  the friend) → an optional **at-home activity**.
- **Stars** (up to 3 per skill) come from real answers: 1 star at 60% of the last 10 answers right; 2 stars at level
  2 and 70%; 3 stars at level 3, 80% and at least 10 tries.
- **Lessons** have three parts: *Watch* (the friend shows how), *Together* (they do it together), *You!* (the child
  answers). A **Help** button gives a hint from the tutor at any time.
- **Learning with a grown-up:** a switch on the home screen shows a tip (in English or Kiswahili) for the grown-up
  before each activity.

### 2.4 The 20 games

Every game is a practice game for one or more skills. None depend on fast reflexes: a slow child can still show what
they know.

| Game | Practises |
|---|---|
| Boda Boda Rush | Almost every skill: ride the boda boda to the right answer |
| Star Blaster | Numbers, sums, sounds and words |
| River Runner | Tens and ones, big numbers, adding, taking away, blending |
| Penalty King | Almost every skill: score the right answer |
| Mango Catcher | Numbers, adding, taking away, sounds, tricky words |
| Number Line Jumper | Big numbers, tens and ones, adding, taking away, make ten |
| Market Day | Buying and change with shillings: numbers, adding, taking away |
| Drum Beats | Blending and read-and-find, to a drum beat |
| Firefly Flash | Counting, quick sums, make ten |
| Word Train | Blending and sentences |
| Memory Match | Pairs for numbers, pictures, tricky words, sounds |
| Bridge Builder | Make ten, quick sums, taking away |
| Matatu Conductor | Quick sums, adding, taking away (passengers on and off) |
| Lake Fishing | Blending, sounds, rhyming |
| Tug of War | Counting, big numbers, tens and ones |
| Kidi's Storybook | Sentences, tricky words, read and find |
| Sound Safari | Letter sounds, blending, read and find |
| Rhyme Match | Rhyming |
| Sound Match | Letter sounds |
| Letter Partners | Capital and small letters |

Games have modes, a best score, coins and unlockable items (in each game's locker). When a child repeats the same
kind of mistake, a short **coach tip** explains the idea before the next round.

### 2.5 Mistakes that teach

Somo recognises common **misconceptions**, not just wrong answers. For example: swapping tens and ones, being off
by ten or by one, forgetting to carry, adding instead of making equal groups, letter reversals (b/d, p/q), mixing up
similar sounds or vowels, guessing from the first letter, missing a small word like "on" or "in", counting the
starting number too, and "same first sound is not a rhyme". The teacher sees which ones repeat.

### 2.6 Rewards

- **Treasure chests:** finishing steps and skills, levelling up and a daily gift each pop a chest with a sticker and
  coins. A **golden chest** comes for finishing a whole skill.
- **Sticker book:** common, rare and golden stickers to collect.
- **Closet:** coins buy outfits and hats for the animal friend.
- **Levels:** experience from learning raises the child's level.
- **Certificates:** after **every lesson** the child gets a *Certificate of Learning* with their name, the lesson,
  their score (questions right the first time, for example "2 of 3, 67%"), 1 to 3 stars, the date and the animal
  friend's signature. It can be **printed** or **saved as a picture**, and every certificate is kept in
  "Certificates" on the home screen.

### 2.7 My teacher (new, Somo 4)

The "My teacher" button on the home screen (with a little badge when something is new) opens four tabs:

- **Class chat:** everyone in the teacher's group hears it.
- **One-on-one** with the teacher: only the child and the teacher.
- **Challenges** from the teacher, with a Play button and a progress bar.
- **Leaderboard:** this week and all time.

How children talk:

- **Voice notes:** tap the big microphone, talk, tap stop, listen if they like, then **Send** (or "Again").
  Voice notes are up to a minute long.
- **Picture replies:** six big picture buttons: Hello!, I need help, I did it!, I am stuck, Thank you!,
  Look at my work!
- Children **never type free text** and **never message another child privately**.
- What the teacher writes is **read aloud** to the child, and there is a speaker button to hear it again.

**Challenges count by themselves:** if the challenge is "Play Firefly Flash 2 times", each round of Firefly Flash
counts, and when it is done Somo celebrates and the points go on the leaderboard.

**The leaderboard:**
- *This week:* answers right the first time in the last 7 days, plus points from challenges done this week.
- *All time:* 10 points for every star, plus points from every challenge.

If the school has not given the child a teacher yet, the screen says the teacher is coming soon.

### 2.8 Story corner and reading

- **Nursery rhymes** from the public domain, some with tunes.
- **Fables** retold (Aesop) and an **East African hare tale**.
- A **tracing book** for all 52 letters (capital and small).
- Stories read *to* the child can use any words; text the child must read alone uses only letters and words
  already taught.

### 2.9 At-home activities

Every unit ends with an optional activity away from the screen, using beans, sticks, bottle caps or cups, explained
in English and Kiswahili. A grown-up taps "We did it together!" to finish it. These activities never block the path.

### 2.10 The AI tutor (Kidi and the stage friends)

- Tap the friend (or Help) to ask for a hint. The tutor replies in a few short, simple sentences, read aloud, and
  never gives away the answer.
- It uses the Somo relay (a Supabase Edge Function that keeps the Claude key on the server), or a key a grown-up
  saved on the device (`somo2/setup/`), or works with no AI using pre-written hints.

### 2.11 Sound and screen

- **Recorded Kenyan English voice** for every line (Opus for most browsers, MP3 for iPhone and iPad).
- **Subtitles:** every spoken line is written at the bottom of the screen (on by default).
- **Music:** the village beat, or the team's safari groove (kalimba, hand drum, drone).
- Big buttons that work by touch, visible focus outlines, and "reduce motion" respected.

### 2.12 Other pages the child can open

- **Turi's trail** (`somo2/trail/`): the team's page with Turi the lion, a treasure trail of lessons with a
  **certificate and score after every lesson**, the class guestbook and polls, and a grown-ups' tracker.
- **Jambo Letters** (`somo2/letters/`): letter tracing, capital and small letters, phonics, books, rhymes, a quiz
  and games for 5-year-olds.
- **AI key setup** (`somo2/setup/`): for grown-ups who want to use their own Claude key on one device.

### 2.13 Grown-ups panel

Pressing and holding the people icon (bottom corner) opens a grown-ups panel with progress, mistakes, the AI status
and a key box. It is hidden from children by the press-and-hold.

---

## 3. Somo 4: the teacher view (`somo4/`)

**Logging in:** pick your name, type your PIN (4 to 6 numbers, given by the admin). Five wrong PINs lock it for 15
minutes. A log-in lasts 12 hours on that browser tab.

**Tabs:**

- **Students:** every student the admin gave you, with age, mastery, answers in the last 7 days, learning gaps and
  when they were last active. Open a student to see:
  - their progress: steps done, at-home activities, stars, a **mastery chart** for each skill, **learning gaps** and
    **mistakes that repeat**;
  - **"See what they see":** the real Somo app with that child's saved progress, inside the page, read-only (you can
    tap around; nothing is saved and nothing is sent);
  - **Progress report:** the AI progress story (English and Kiswahili), the learning-gap chart and the recommended
    plan;
  - **Chat** with that child;
  - **New restore code** (for a new phone; the old phone stops saving) and **Delete account** (type the child's name
    to confirm).
- **Class chat:** write to the whole group (Somo reads it aloud to the children) or record a voice note. Children's
  voice notes have a play button. Any message can be hidden.
- **One-on-one:** a list of your students with their newest message ("New from Amina · today"). Open one to chat.
- **Challenges:** choose "Play a game" (any of the 20 games) or "Finish a lesson" (any of the 15 skills), how many
  times, the points and the number of days. Somo writes the title for you ("Play Firefly Flash 2 times"). The list
  shows how many students have finished each one.
- **Leaderboard:** this week and all time, the same board the children see.

Voice notes are **not** turned into text: teachers listen to them. (Speech-to-text is often wrong for children's
voices, and good converters cost money.)

---

## 4. Somo 3: the admin view (`somo3/`)

Log in with the admin key.

- **All students:** every child, with age, boy or girl, a **teacher picker**, mastery, answers in the last 7 days,
  gaps and last active. A ✓ marks teachers whose ages fit the child.
  - **Assign by age:** every student without a teacher goes to a teacher whose age range fits (people first, then
    AI teachers), the one with the fewest students.
  - Open a student to see their **info** (first name, age, boy or girl, animal friend, when they joined, last saved,
    teacher), their progress, **"See what they see"**, the **progress report**, a link to **their teacher's view**,
    a new restore code and delete account.
- **Teachers:** every teacher, person or AI, with their age range and number of students.
  - **Add a person:** name, youngest and oldest age, PIN.
  - **Add an AI teacher:** name, ages and a **skill file** (the form fills in from the file).
  - **Edit** (new PIN, ages, skill), **Remove** (their students go back to "no teacher yet"), and **"See what they
    see"**, which opens Somo 4 exactly as that teacher sees it, with a blue bar saying it is the admin.
- **Guestbook (Turi's trail):** hide or show notes.

**Only the admin can put a student with a teacher.**

---

## 5. AI teachers

A teacher can be a person or an AI. An AI teacher is made from a **skill file**: a short text in `somo4/teachers/`
that says who the teacher is, what they teach, how they teach and which Swahili words they use.

| Skill file | Teacher | For |
|---|---|---|
| `mwalimu-neema-starter.md` | Mwalimu Neema | Ages 5 to 6: first letters, sounds and counting |
| `mwalimu-juma-numbers.md` | Mwalimu Juma | Ages 6 to 9: numbers coach (sums, tens and ones, taking away) |
| `mwalimu-amani-reading.md` | Mwalimu Amani | Ages 7 to 9: reading coach (blending, tricky words, sentences) |
| `TEMPLATE.md` | (yours) | Copy it to make a new AI teacher, then add it to `index.json` |

- When a child sends a picture reply or a voice note, the AI teacher **answers by itself** in the chat, in 1 to 3
  short sentences that are read aloud.
- It knows the child's first name, age and skill levels, and the recent chat.
- Somo always adds **safety rules** after the skill file: short replies, never give away answers, never ask for or
  repeat personal details, and tell a trusted grown-up if a child seems hurt, scared or unsafe.
- An AI cannot listen to sound. For AI teachers only, the child's phone's own free speech recogniser (when the
  browser has one) passes the words to the AI. Those words are not stored or shown to anyone. If there are no words,
  the AI kindly asks the child to try again or tap a picture.
- The admin can open an AI teacher's view to read its chats, write as it and set its challenges.

---

## 6. Where the data lives (Supabase)

All online data is in one **Supabase** project (a PostgreSQL database). The pages never touch the database directly:
they call one **Edge Function**, `somo-progress`, which checks every key, PIN and permission. Every table has
row-level security on with no policies, so the function is the only way in.

| Table | What it holds |
|---|---|
| `somo_children` | One row per child: first name, age, boy or girl, animal friend, teacher, last saved (the write key only as a hash) |
| `somo_state` | The child's full progress, so it is safe if the phone is lost |
| `somo_snapshots` | A small daily summary (numbers only) |
| `somo_teachers` | Teachers: name, ages, person or AI, PIN (only as a hash), skill file |
| `somo_sessions` | Teacher log-ins (hashed, 12 hours) |
| `somo_messages` | Class and one-on-one chat messages and voice notes |
| `somo_challenges`, `somo_challenge_done` | Challenges and who finished them |
| `somo_guestbook`, `somo_votes` | Turi's trail guestbook and polls |
| `somo_admins` | Admin keys (only as hashes) |

- Progress is saved **on the device first** (Somo keeps working with no internet), then online about once a minute
  after changes, when the app is closed or hidden, and at "Finish". When the app opens, the newer copy wins.
- A second Edge Function, `somo-kidi`, is the AI relay for the tutors. It holds the Claude key as a server secret,
  accepts only requests from our sites and only tutor-style prompts, and has rate and daily limits.

---

## 7. Privacy and safety

- **First names only.** No surnames, emails, phone numbers or addresses. The guestbook refuses links, emails and
  phone numbers, and shows typed text safely (never as code).
- **Children talk only to their teacher:** in the class chat or one-on-one. No private child-to-child messages, no
  free text from children.
- **Teachers and the admin can hide any message.**
- **Voice notes are not turned into text** for people.
- **No API key is ever in the repo.** Keys live on the server or on one device only.
- **Keys and PINs are stored only as hashes**, and wrong PINs lock the log-in for a while.
- **Delete account** removes the child's progress, chats and challenge results.
- **View-only mode** ("See what they see") never saves or sends anything.

---

## 8. How Somo is built

- Every page is a **single HTML file**: no build step needed to run it, no framework, works on cheap phones.
- `somo2/index.html` is built from source in the `rgallagherTT/Chronicle` repo (`prototypes/somo-arcade/`,
  `python3 build.py`), in layers: the core and games, the learning journey, rewards, the stage friends, the story
  library, the feature buttons, online saving, the classroom, certificates, and the school layer (My teacher).
- All art is **drawn in code** (SVG and canvas); stories and rhymes are public domain or retold originals.
- Hosted free on **GitHub Pages** from the `main` branch.

---

## 9. Timeline (November 2026)

| Date | What was added |
|---|---|
| Nov 5 | Guestbook (class database) |
| Nov 6 | The learning path (Build 2) with stage tutors, Inspire → Interpret → Impart, stories, tracing, new games; the AI key setup page; the README |
| Nov 7 | The learning path became the main page, with feature buttons: welcome video, accounts, parent page with AI progress story, gap chart and plan, guestbook and polls, safari music and roadmap, at-home activities |
| Nov 12 | Delete account; progress saved to Supabase and everything renamed from KenyAI to Somo; Somo 3 (admin), classes, subtitles; all data in Supabase; egg rewards removed (treasure chests back); certificates after every lesson (Somo and Turi's trail); **Somo 4**: teachers with PINs, AI teachers, the admin assigns students by age, class and one-on-one chat with voice notes, challenges, leaderboard, "See what they see"; the parent view, guestbook and polls removed from the child's app |
