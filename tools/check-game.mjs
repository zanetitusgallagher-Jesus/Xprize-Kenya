#!/usr/bin/env node
/* Somo game checker: node tools/check-game.mjs somo2/games/<id> [more folders...]   (or --all)
   Checks a plug-in game package against GAMES.md: game.json is valid; the folder is under 1.5 MB; no network calls;
   no "wrong" wording and no red X marks; instructions are spoken (Somo.say); nothing depends on speed (slow mode);
   the game sends item messages; the SDK and the locked-down CSP are in place; every line has Kiswahili.
   Exit code 1 if any check fails. Written for Somo (owned by the Somo team). */
import fs from 'node:fs'; import path from 'node:path';
const LIMIT = 1.5 * 1024 * 1024;
const SKILLS = (() => { try { const src = fs.readFileSync(new URL('../somo2/games/skills.json', import.meta.url), 'utf8'); return new Set(JSON.parse(src)); } catch { return null; } })();
function size(dir) { let n = 0; for (const f of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, f.name); n += f.isDirectory() ? size(p) : fs.statSync(p).size; } return n; }
function strip(html) { return html.replace(/<script\s+src=["']\.\.\/somo-sdk\.js["']\s*><\/script>/i, ''); }
function check(dir) {
  const res = []; const ok = (name, pass, note = '') => res.push({ name, pass: !!pass, note });
  const id = path.basename(path.resolve(dir)).replace(/^_/, '');
  let m = null; try { m = JSON.parse(fs.readFileSync(path.join(dir, 'game.json'), 'utf8')); } catch (e) { ok('game.json is valid', false, 'cannot read: ' + e.message); return res; }
  const errs = [];
  const str = (k, a, b) => typeof m[k] === 'string' && m[k].length >= a && m[k].length <= b || errs.push(k);
  if (m.id !== id || !/^[a-z][a-z0-9-]{2,39}$/.test(m.id || '')) errs.push('id (must match the folder)');
  str('title', 2, 40); str('title_sw', 2, 40); str('author', 2, 80); str('licence', 2, 40);
  if (!/^\d+\.\d+\.\d+$/.test(m.version || '')) errs.push('version');
  if (!Array.isArray(m.skills) || !m.skills.length || (SKILLS && m.skills.some(s => !SKILLS.has(s)))) errs.push('skills (must be Somo skill ids)');
  if (!Array.isArray(m.stages) || !m.stages.length || m.stages.some(s => !Number.isInteger(s) || s < 1 || s > 4)) errs.push('stages');
  if (!Array.isArray(m.ages) || m.ages.length !== 2 || m.ages[0] > m.ages[1]) errs.push('ages');
  if (!Number.isInteger(m.levels) || m.levels < 1 || m.levels > 20) errs.push('levels');
  if (!Array.isArray(m.languages) || !m.languages.every(l => ['en', 'sw'].includes(l))) errs.push('languages');
  if (!Array.isArray(m.assets) || m.assets.some(a => !fs.existsSync(path.join(dir, a)))) errs.push('assets (every listed file must exist)');
  if (typeof m.thumbnail !== 'string' || !fs.existsSync(path.join(dir, m.thumbnail))) errs.push('thumbnail (file must exist)');
  if (m.slowModeSupported !== true) errs.push('slowModeSupported must be true');
  const allowed = new Set(['id', 'title', 'title_sw', 'author', 'licence', 'version', 'skills', 'stages', 'ages', 'levels', 'languages', 'assets', 'thumbnail', 'slowModeSupported', 'entry', 'lines', 'description', 'description_sw']);
  for (const k of Object.keys(m)) if (!allowed.has(k)) errs.push('unknown field ' + k);
  ok('game.json is valid', !errs.length, errs.join(', '));
  const lines = Array.isArray(m.lines) ? m.lines : [];
  const badLines = lines.filter(l => !l || !l.key || !String(l.en || '').trim() || !String(l.sw || '').trim());
  ok('every spoken line has English and Kiswahili', lines.length > 0 && !badLines.length, lines.length ? (badLines.length ? badLines.length + ' lines missing text' : lines.length + ' lines') : 'no "lines" in game.json');
  const bytes = size(dir); ok('folder under 1.5 MB', bytes < LIMIT, (bytes / 1024).toFixed(0) + ' KB');
  let html = ''; try { html = fs.readFileSync(path.join(dir, m.entry || 'index.html'), 'utf8'); } catch (e) { ok('index.html exists', false); return res; }
  const code = strip(html);
  ok('links the Somo SDK', /<script\s+src=["']\.\.\/somo-sdk\.js["']\s*><\/script>/i.test(html));
  ok('has the locked-down CSP', /http-equiv=["']Content-Security-Policy["'][^>]*connect-src 'none'/i.test(html) && /default-src 'none'/.test(html));
  const net = [/\bfetch\s*\(/, /XMLHttpRequest/, /WebSocket/, /EventSource/, /sendBeacon/, /\bimport\s*\(/, /<link\b/i, /<iframe\b/i, /window\.open\s*\(/, /location\s*\.\s*(href|assign|replace)/, /localStorage|sessionStorage|indexedDB|document\.cookie/, /getUserMedia/,
    /\b(src|href|url)\s*[=(]\s*["']?(https?:)?\/\//i];
  const hits = net.filter(r => r.test(code)).map(r => r.source);
  const urls = (code.match(/https?:\/\/[^\s"'`)<]+/g) || []).filter(u => !/^http:\/\/www\.w3\.org\//.test(u));
  ok('no network calls or storage', !hits.length && !urls.length, [...hits, ...urls].slice(0, 4).join(' | '));
  const visible = code.replace(/<script[\s\S]*?<\/script>/gi, s => s.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, ''));
  const wrong = visible.match(/\b(wrong|incorrect|you fail|failed|loser)\b/i);
  const redx = /[✗✘❌✖]/.test(visible) || /fill=["']#?(red|f00|ff0000|d00|e00)["'][^>]*>\s*[xX×]\s*</i.test(visible);
  ok('no "wrong" wording, no red X', !wrong && !redx, wrong ? 'found "' + wrong[0] + '"' : redx ? 'red X mark' : '');
  const says = (code.match(/\b(Somo\.say|K\.say)\s*\(/g) || []).length; ok('instructions are spoken (Somo.say)', says >= 2, says + ' say calls');
  const speed = code.match(/\b(countdown|time ?left|times ?up|time'?s up|hurry|speed ?bonus|faster!|out of time)\b/i);
  ok('works without speed (slow mode)', !speed, speed ? 'found "' + speed[0] + '"' : 'no timers that end a round, no speed rewards');
  ok('sends item messages', /\bSomo\.item\s*\(|\bSomo\.newItem\s*\(|\bK\.itemDone\b/.test(code));
  ok('no rewards of its own (coins, streaks)', !/\b(coins?|streak|leaderboard)\s*[+:=]/i.test(code));
  return res;
}
const args = process.argv.slice(2); let dirs = args.filter(a => a !== '--all');
if (args.includes('--all') || !dirs.length) { const base = new URL('../somo2/games/', import.meta.url).pathname; dirs = fs.readdirSync(base, { withFileTypes: true }).filter(d => d.isDirectory() && !d.name.startsWith('_')).map(d => path.join(base, d.name)); if (fs.existsSync(path.join(base, '_template'))) dirs.unshift(path.join(base, '_template')); }
let failed = 0;
for (const d of dirs) { const r = check(d); const bad = r.filter(x => !x.pass); failed += bad.length ? 1 : 0;
  console.log(`\n${bad.length ? 'FAIL' : 'PASS'}  ${path.basename(d)}`); for (const x of r) console.log(`  ${x.pass ? '✓' : '·'} ${x.name}${x.note ? '  (' + x.note + ')' : ''}`); }
console.log(`\n${dirs.length - failed} of ${dirs.length} passed.`); process.exit(failed ? 1 : 0);
