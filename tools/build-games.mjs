#!/usr/bin/env node
/* Builds Somo's own plug-in games from games-src/ into somo2/games/<id>/ (index.html, game.json, thumb.svg).
   Each game is games-src/games/<id>.js: K.meta({...}), K.lines({...}) and K.game({...}). The kit (games-src/kit.js,
   kit.css) and the pictures (icons-*.js) are copied into every game, so each game is one self-contained file.
   Usage: node tools/build-games.mjs [id ...]     Written for Somo (owned by the Somo team). */
import fs from 'node:fs'; import path from 'node:path'; import vm from 'node:vm';
const ROOT = new URL('..', import.meta.url).pathname, SRC = path.join(ROOT, 'games-src'), OUT = path.join(ROOT, 'somo2/games');
const read = f => fs.readFileSync(path.join(SRC, f), 'utf8');
const icons = read('icons-somo.js') + '\n' + read('icons-more.js'), kit = read('kit.js'), css = read('kit.css');
const iconCtx = vm.createContext({}); vm.runInContext(icons + ';this.ICON=ICON;', iconCtx); const ICON = iconCtx.ICON;
const CSP = `default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; media-src data: blob:; font-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'`;
const want = process.argv.slice(2);
const ids = fs.readdirSync(path.join(SRC, 'games')).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)).filter(id => !want.length || want.includes(id));
const kitLines = (() => { const c = vm.createContext({ ICON, Somo: {} }); vm.runInContext(icons + '\n' + kit + ';this.KL=K.KIT_LINES;', c); return c.KL; })();
for (const id of ids) {
  const src = read('games/' + id + '.js'); const cap = {};
  const stub = { meta: m => cap.meta = m, lines: l => cap.lines = l, game: g => cap.game = g };
  const ctx = vm.createContext({ K: new Proxy(stub, { get: (t, k) => t[k] || (() => { }) }), ICON, Math, console });
  vm.runInContext(src, ctx);
  const m = cap.meta; if (!m || m.id !== id) throw new Error(id + ': K.meta({ id }) must match the file name');
  const lines = Object.entries({ ...kitLines, ...(cap.lines || {}) }).map(([key, v]) => ({ key, en: v.en, sw: v.sw }));
  const dir = path.join(OUT, id); fs.mkdirSync(dir, { recursive: true });
  const th = m.thumb || { bg: '#2E1E15', icons: [] }; const n = th.icons.length;
  const thumb = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${th.bg}"/><stop offset="1" stop-color="${th.bg2 || '#1F140E'}"/></linearGradient></defs><rect width="160" height="100" fill="url(#g)"/>${th.extra || ''}${th.icons.map((ic, i) => `<svg x="${80 - n * 26 + i * 52}" y="${n === 1 ? 14 : 24}" width="${n === 1 ? 72 : 52}" height="${n === 1 ? 72 : 52}" viewBox="0 0 64 64">${ICON[ic] || ''}</svg>`).join('')}</svg>`;
  fs.writeFileSync(path.join(dir, 'thumb.svg'), thumb.replace(/\$\{IK\}/g, '#2E2219'));
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<title>${m.title}</title>
<!-- ${m.title} (${m.title_sw}): a Somo game. Original work by the Somo team. Built from games-src/ by tools/build-games.mjs. -->
<style>${css}${m.css || ''}</style></head><body><div id="app"></div>
<script src="../somo-sdk.js"></script>
<script>
${icons}
${kit}
${src}
</script></body></html>
`;
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  const gj = { id, title: m.title, title_sw: m.title_sw, author: 'Somo team (XPRIZE Kenya)', licence: 'Owned by the Somo team', version: m.version || '1.0.0', skills: m.skills, stages: m.stages, ages: m.ages || [5, 8], levels: m.levels || 3, languages: ['en', 'sw'], assets: [], thumbnail: 'thumb.svg', slowModeSupported: true, description: m.description, description_sw: m.description_sw, lines };
  fs.writeFileSync(path.join(dir, 'game.json'), JSON.stringify(gj, null, 2) + '\n');
  console.log(`built ${id} (${(html.length / 1024).toFixed(0)} KB, ${lines.length} lines)`);
}
