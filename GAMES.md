# Making a game for Somo

Somo has a **games library** ("Michezo"). Besides the 20 games built into the app, anyone on the team can add a game as
a small **plug-in package**. Somo stays in charge of everything that matters (mastery, rewards, time, privacy); a game
only shows items, listens to taps and reports what happened.

Everything in an entry must be **our own work** (XPRIZE requires us to own everything we submit). Do not copy code,
text, stories, characters, art or sounds from other apps, games or websites. Write it yourself, or use public-domain
material and say so.

---

## 1. The package

```
somo2/games/
  index.json          ← the registry: the list of enabled games
  somo-sdk.js         ← the Somo Games SDK (do not copy it into your game; link it, see below)
  game.schema.json    ← the rules for game.json
  _template/          ← copy this folder to start a new game
  <game-id>/
    index.html        ← the whole game, self-contained (inline CSS and JS), works offline
    game.json         ← what the game is (see below)
    thumb.svg         ← the picture on the tile
    (other assets)    ← only if listed in game.json "assets"
```

### game.json

```json
{
  "id": "firefly-flash",
  "title": "Firefly Flash",
  "title_sw": "Vimulimuli",
  "author": "Somo team",
  "licence": "Owned by the Somo team (XPRIZE entry)",
  "version": "1.0.0",
  "skills": ["cnt", "facts", "bond"],
  "stages": [1, 2],
  "ages": [5, 8],
  "levels": 5,
  "languages": ["en", "sw"],
  "assets": [],
  "thumbnail": "thumb.svg",
  "slowModeSupported": true
}
```

- `id` is the folder name (lowercase letters, numbers and hyphens).
- `skills` are Somo skill ids (see `CURRICULUM.md`). Somo only accepts item results for these skills.
- `stages` (1 to 4) and `ages` decide where the game shows in the library and when it shows a "Soon" badge.
- `levels` is how many levels the game has. The library shows how many the child has finished (never a score).
- `assets` are extra files in the folder. Somo caches them for offline use and **sends them to the game** (as data
  URLs in the `init` message), because the game itself cannot load anything from the network.
- `slowModeSupported` must be `true`.

### Adding a game

1. Copy `somo2/games/_template/` to `somo2/games/<your-game-id>/` and build your game in it.
2. Run the checker: `node tools/check-game.mjs somo2/games/<your-game-id>`. Fix everything it reports.
3. Add one line to `somo2/games/index.json`: `{ "id": "<your-game-id>", "enabled": true }`.
4. Bump `VERSION` in `somo2/sw.js` so phones cache the new game.
5. Test it in Somo (see section 5), add an entry to `AI-LOG.md`, commit and push.

To switch a game off for everyone, set `"enabled": false` in the registry, or use the Games tab in `somo3/`.

---

## 2. The rules every game keeps

These are Somo's rules (see `README.md`, "Rules every change must keep"). The checker tests most of them.

- **Never say "wrong", never show a red X.** When the child misses, teach: show why, then let them try again.
- **No speed.** A slow child must be able to show what they know. No timers that end a level, no points for being
  fast. Somo may set `slow` mode; then nothing at all may move on by itself.
- **Everything spoken.** Every instruction goes through `Somo.say(...)` so Somo speaks it in its own voice, with
  subtitles. A child who cannot read must be able to play.
- **Report every item** with `Somo.item(...)`, the first time the child answers it.
- **No rewards of your own.** No coins, stars, points shops or streaks. Somo gives rewards for learning.
- **No network.** No `fetch`, `XMLHttpRequest`, `WebSocket`, external links, ads, analytics, fonts or images from the
  web. The game runs in a locked box (see section 4).
- **No personal data.** Somo sends no name, age or other personal details, and the game must not ask for any.
- **Kenyan, original art** drawn in code (SVG or canvas), big touch targets (at least 48 px), visible focus outlines,
  and calm motion when `reducedMotion` is true.
- **Small:** the whole folder under 1.5 MB.

---

## 3. The message protocol (version 1)

Games talk to Somo only with `postMessage`. Use the SDK (`somo-sdk.js`); it does all of this for you.

Link the SDK in your `index.html` exactly like this (Somo puts the SDK inside your game when it loads it):

```html
<script src="../somo-sdk.js"></script>
```

### Somo → game

| Message | Data | Meaning |
|---|---|---|
| `init` | `{ protocol, gameLevel, skill, language, voiceOn, subtitlesOn, reducedMotion, minutesLeftToday, themeColours, practice, slow, assets }` | Start. `gameLevel` is the level to start at (1 = first). `skill` is the skill Somo wants practised (one of yours). `practice` is true when results will not change mastery. `themeColours` is `{ bg, panel, accent, good, text }`. `assets` maps each listed asset name to a data URL. |
| `pause` | `{}` | Stop everything (time cap, Somo menu). Show nothing that needs the child. |
| `resume` | `{}` | Carry on. |
| `end` | `{ reason }` | Somo is closing the game (`time`, `quit` or `error`). Stop at once. |

No message from Somo ever contains the child's name, age or any other personal data.

### Game → Somo

| Message | Data | Meaning |
|---|---|---|
| `ready` | `{ protocol: 1 }` | The game has loaded and is waiting for `init`. Send it once. |
| `item` | `{ itemId, skill, correct, firstTry, hintsUsed, ms, mistakeTag? }` | One item answered. `correct` is about the child's first answer; `firstTry` is true when that first answer was right with no help; `hintsUsed` counts hints; `ms` is the time taken (Somo never rewards speed); `mistakeTag` is optional, one of Somo's misconception tags (e.g. `miscount`, `offByOne`, `letterReversal`). |
| `levelDone` | `{ level, itemsRight, itemsTotal }` | A level is finished. |
| `say` | `{ text, lang }` | Somo speaks `text` (up to 240 characters) in its own voice, shows subtitles with the word highlight. `lang` is `en` or `sw`. |
| `hint` | `{}` | The child asked for help. Somo gives a hint through its hint ladder (the tutor). |
| `quit` | `{}` | The child wants to leave. Somo closes the game gently. |

### What Somo checks

- The message must come from the game's own frame, with the envelope `{ somo: "game", v: 1, type, data }`.
- Shapes are checked and values are clamped: `itemId` up to 40 characters, `skill` must be one of the game's skills,
  `hintsUsed` 0 to 9, `ms` 0 to 10 minutes, `level` 1 to the game's `levels`, `itemsRight` never more than the item
  results Somo actually received for that level, `text` up to 240 characters.
- Rate limits: at most 2 `item` messages a second, 1 `say` a second, 30 messages in any 10 seconds.
- Anything malformed or over the limit is ignored (and shown in the browser console in development, `?dev=1`).

### What Somo does with results

- `item` → the learning engine (mastery for that skill, mistake tags), the attempt log (`somo_attempts`, for the
  teacher's CSV) and the telemetry log. Answers with hints or after a miss count as practice, never as mastery.
  In practice mode (`practice: true`) nothing changes mastery.
- `levelDone` → the child's progress in the library ("3 of 5 levels"), and coins **from learning only** (one coin per
  item the child got right on the first try in that level, counted by Somo, not by the game).
- Somo enforces the **daily time cap**: it sends `pause`, shows a gentle "time to rest" screen, then sends `end`.
- Every finished visit counts for teacher challenges ("Play Firefly Flash 3 times").

---

## 4. The locked box (sandbox)

Somo loads every game in an `<iframe sandbox="allow-scripts">` (no same-origin, no forms, no pop-ups, no top
navigation, no microphone or camera), and adds a Content Security Policy that blocks all network access:

```
default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:;
media-src data: blob:; font-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'
```

Put the same CSP in your own `index.html` (the template has it). So a game **cannot** reach the network, the
child's saved data (localStorage), Supabase, the AI relay or the microphone. Keep any state you need in memory; Somo
tells you the level to start at.

The service worker caches each enabled game's `index.html`, `game.json`, thumbnail and assets, so games work offline.

---

## 5. Testing a game

1. `node tools/check-game.mjs somo2/games/<id>` must pass. It checks: `game.json` is valid; the folder is under
   1.5 MB; no network calls; no "wrong" wording and no red X marks; instructions go through `Somo.say`; nothing
   depends on speed (slow mode); the game sends `item` messages.
2. Serve the repo (`python3 -m http.server`), open `http://localhost:8000/somo2/?dev=1`, open **Games** (Michezo) and
   play your game to the end. The console must show no errors.
3. Open your `index.html` on its own: it shows a "Open this game from Somo" note and a test button that fakes Somo,
   so you can try it without the app.
