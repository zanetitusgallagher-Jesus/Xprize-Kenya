/* Somo game kit (shared by every plug-in game; written for Somo, owned by the Somo team).
   Rounds of 8 to 12 items, 3 levels, a hint ladder (1st miss: a nudge; 2nd miss: a worked example, then try again;
   after that the answer is shown gently), spoken lines through Somo.say (with subtitles), drag or tap-to-pick then
   tap-to-place, item messages for every item. No timers, no scores, no rewards of its own. */
'use strict';
const K = (() => {
  const st = { cfg: null, lines: {}, g: null, level: 1, items: [], idx: 0, first: 0, q: [], last: 0, paused: false, cur: null, prompt: null };
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const lang = () => st.cfg && st.cfg.language === 'sw' ? 'sw' : 'en';
  const fill = (s, v) => String(s).replace(/\{(\w+)\}/g, (_, k) => v && v[k] != null ? v[k] : '');
  const line = (key, v) => { const L = st.lines[key]; return L ? fill(L[lang()] || L.en, v) : fill(key, v); };
  /* spoken lines: Somo accepts one "say" a second, so lines wait their turn (at most 2 waiting) */
  function pump() { if (!st.q.length) return; const now = Date.now(), wait = 1150 - (now - st.last); if (wait > 0) { clearTimeout(st.qt); st.qt = setTimeout(pump, wait); return; } const [t, l] = st.q.shift(); st.last = now; Somo.say(t, l); const b = $('#bubt'); if (b) b.textContent = t; if (st.q.length) st.qt = setTimeout(pump, 1150); }
  function sayText(t, l) { if (!t) return; st.q.push([String(t).slice(0, 240), l || lang()]); if (st.q.length > 2) st.q.splice(0, st.q.length - 2); pump(); }
  const say = (key, v) => sayText(line(key, v));
  const sayNow = (key, v) => { st.q = []; sayText(line(key, v)); };
  const pic = (n, s = 64) => `<svg viewBox="0 0 64 64" width="${s}" height="${s}" aria-hidden="true">${ICON[n] || `<text x="32" y="40" text-anchor="middle" font-size="16" font-weight="800" fill="#2B1E17">${esc(n)}</text>`}</svg>`;
  const ICONS = { help: '<svg viewBox="0 0 24 24"><path d="M9.2 9.3a2.9 2.9 0 1 1 4 2.7c-.8.4-1.2.9-1.2 1.8v.6" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="12" cy="17.8" r="1.5" fill="#fff"/></svg>', ear: '<svg viewBox="0 0 32 32"><path d="M5 12h5l7-6v20l-7-6H5z" fill="#fff"/><path d="M21 11q3 5 0 10M24.5 8q6 8 0 16" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg>' };
  const FRIEND = '<svg viewBox="0 0 30 30"><path d="M11 6q1-5 3-2q1-4 3 0q2-3 3 2z" fill="#C8352B"/><circle cx="15" cy="14" r="10" fill="#FBF5EC" stroke="#D8C7AE"/><circle cx="11" cy="12" r="1.8" fill="#2B1B12"/><circle cx="19" cy="12" r="1.8" fill="#2B1B12"/><path d="M13 15.5l2 3.6 2-3.6z" fill="#F2A33A"/></svg>';
  /* letters the child has been taught (from Somo's init) */
  const letters = () => (st.cfg && typeof st.cfg.taughtLetters === 'string' && st.cfg.taughtLetters.length >= 6) ? st.cfg.taughtLetters : 'satpinmdgockeurhbfl';
  const canRead = (w, extra = '') => [...w].every(c => letters().includes(c) || extra.includes(c));
  const tricky = () => (st.cfg && Array.isArray(st.cfg.taughtTricky) && st.cfg.taughtTricky.length) ? st.cfg.taughtTricky : ['the', 'a', 'I', 'is', 'to', 'my', 'was', 'said'];
  /* ---------- drag, or tap-to-pick then tap-to-place ---------- */
  function dnd(root, { drag = '.tok', drop = '.slot', onDrop, onTap, onTapSlot } = {}) {
    let d = null, sel = null;
    const clear = () => { if (sel) sel.classList.remove('sel'); sel = null; };
    root.addEventListener('pointerdown', e => { const el = e.target.closest(drag); if (!el || el.classList.contains('gone') || el.dataset.off) return; d = { el, x: e.clientX, y: e.clientY, moved: false, id: e.pointerId }; try { el.setPointerCapture(e.pointerId); } catch (_) { } });
    root.addEventListener('pointermove', e => { if (!d || e.pointerId !== d.id) return; const dx = e.clientX - d.x, dy = e.clientY - d.y; if (!d.moved && Math.hypot(dx, dy) < 10) return; if (!d.moved) { d.moved = true; clear(); d.el.classList.add('lift'); } d.el.style.transform = `translate(${dx}px,${dy}px)`; const t = document.elementFromPoint(e.clientX, e.clientY); $$(drop, root).forEach(s => s.classList.toggle('hot', !!t && s.contains(t))); });
    const end = e => { if (!d || e.pointerId !== d.id) return; const el = d.el, moved = d.moved; d = null; el.classList.remove('lift'); el.style.transform = ''; $$(drop, root).forEach(s => s.classList.remove('hot'));
      if (moved) { const t = document.elementFromPoint(e.clientX, e.clientY), slot = t && t.closest(drop); if (slot && root.contains(slot)) onDrop(el, slot); return; }
      if (sel === el) { clear(); return; } clear(); sel = el; el.classList.add('sel'); if (onTap) onTap(el); };
    root.addEventListener('pointerup', end); root.addEventListener('pointercancel', e => { if (d) { d.el.classList.remove('lift'); d.el.style.transform = ''; d = null; } });
    root.addEventListener('click', e => { const slot = e.target.closest(drop); if (!slot || !root.contains(slot) || e.target.closest(drag)) return; if (sel) { const el = sel; clear(); onDrop(el, slot); } else if (onTapSlot) onTapSlot(slot); });
    return { clear };
  }
  /* ---------- the round ---------- */
  function shell() {
    document.body.classList.toggle('rm', !!(st.cfg && st.cfg.reducedMotion));
    const c = st.cfg && st.cfg.themeColours; if (c) for (const k of ['bg', 'panel', 'accent', 'good', 'text']) if (typeof c[k] === 'string' && /^#[0-9a-f]{3,8}$|^rgb/i.test(c[k])) document.documentElement.style.setProperty('--' + k, c[k]);
    $('#app').innerHTML = `<div class="top"><span class="lv" id="lv"></span><div class="dots" id="dots"></div><button class="ib" id="hear" aria-label="Hear it again">${ICONS.ear}</button><button class="ib" id="help" aria-label="Help">${ICONS.help}</button></div><div class="bub"><span class="who">${FRIEND}</span><span id="bubt"></span></div><div id="play"></div>`;
    $('#hear').onclick = () => { if (st.prompt) st.prompt(); };
    $('#help').onclick = () => { const it = st.cur; if (!it) return; it.hints++; Somo.hint(); if (st.g.nudge) st.g.nudge(it.spec, it); };
  }
  /* a new play area for every item, so no listeners carry over from the last one */
  function fresh() { const old = $('#play'), n = old.cloneNode(false); old.replaceWith(n); return n; }
  function dots() { $('#dots').innerHTML = st.items.map((_, i) => `<i class="${i < st.idx ? 'on' : i === st.idx ? 'cur' : ''}"></i>`).join(''); $('#lv').textContent = line('level', { n: st.level }); }
  function intro() {
    st.cur = null; st.prompt = () => say('intro' + st.level); fresh().innerHTML = `<div class="center"><div style="width:110px">${st.g.icon || FRIEND}</div><h1>${esc(line('level', { n: st.level }))}</h1><p>${esc(line('intro' + st.level))}</p><button class="big" id="go">${esc(line('start'))}</button></div>`;
    $('#lv').textContent = line('level', { n: st.level }); $('#dots').innerHTML = ''; sayNow('intro' + st.level); say('tapstart'); $('#go').onclick = () => { st.items = st.g.items(st.level); st.idx = 0; st.first = 0; next(); };
  }
  function next() {
    if (st.idx >= st.items.length) return done(); dots(); const spec = st.items[st.idx];
    const it = st.cur = { spec, t0: Date.now(), misses: 0, hints: 0, first: null, tag: null, over: false, n: st.idx,
      miss(tag) { if (this.over) return; if (this.first === null) { this.first = false; if (tag) this.tag = tag; } this.misses++;
        if (this.misses === 1) { if (st.g.nudge) st.g.nudge(spec, this); else say('nudge'); }
        else if (this.misses === 2) { this.hints++; if (st.g.example) st.g.example(spec, this); else say('nudge'); }
        else if (st.g.reveal) st.g.reveal(spec, this); },
      right(after) { if (this.over) return; this.over = true; if (this.first === null) this.first = true;
        const firstTry = this.first && this.hints === 0; if (firstTry) st.first++;
        const r = { itemId: `${st.g.id}-${st.level}-${st.idx}-${Date.now() % 1e6}`.slice(0, 40), skill: spec.skill || st.g.skill(st.level), correct: !!this.first, firstTry, hintsUsed: Math.min(9, this.hints), ms: Date.now() - this.t0 };
        if (!this.first && this.tag) r.mistakeTag = this.tag; Somo.item(r);
        if (after !== false) say(firstTry ? pick(['praise1', 'praise2', 'praise3', 'praise4']) : 'praiseHelp');
        setTimeout(() => { st.idx++; next(); }, after === false ? 600 : 1500); } };
    st.prompt = null; st.g.render(spec, it, fresh());
  }
  function done() {
    st.cur = null; st.prompt = () => say('leveldone', { n: st.level }); Somo.levelDone({ level: st.level, itemsRight: st.first, itemsTotal: st.items.length });
    const more = st.level < st.g.levels; fresh(); $('#dots').innerHTML = st.items.map(() => '<i class="on"></i>').join('');
    $('#play').innerHTML = `<div class="center pop"><div style="width:120px">${st.g.icon || FRIEND}</div><h1>${esc(line('leveldone', { n: st.level }))}</h1>${more ? `<button class="big" id="nx">${esc(line('nextlevel'))}</button>` : ''}<button class="big ghost" id="again">${esc(line('again'))}</button><button class="big ghost" id="bye">${esc(line('back'))}</button></div>`;
    sayNow('leveldone', { n: st.level }); if (more) say('nextq');
    if (more) $('#nx').onclick = () => { st.level++; intro(); }; $('#again').onclick = () => intro(); $('#bye').onclick = () => Somo.quit();
  }
  /* a worked example box: html, the line to say, then "now you try" */
  function example(html, key, v, after) { const old = $('#play .ex'); if (old) old.remove(); const box = document.createElement('div'); box.className = 'ex pop'; box.innerHTML = `<b>${esc(line('look'))}</b>${html}<button class="big" id="exok">${esc(line('nowyou'))}</button>`; $('#play').appendChild(box); st.q = []; say('look'); if (key) say(key, v); $('#exok').onclick = () => { box.remove(); say('nowyou'); if (after) after(); }; }
  function game(g) {
    st.g = g;
    Somo.on('pause', () => { st.paused = true; if (!$('.pause')) document.body.insertAdjacentHTML('beforeend', `<div class="pause">${esc(line('paused'))}</div>`); });
    Somo.on('resume', () => { st.paused = false; const p = $('.pause'); if (p) p.remove(); });
    Somo.on('end', () => { st.q = []; clearTimeout(st.qt); $('#app').innerHTML = ''; });
    Somo.onInit(cfg => { st.cfg = cfg || {}; st.level = Math.max(1, Math.min(g.levels, cfg && cfg.gameLevel | 0 || 1)); shell(); intro(); });
  }
  const LINES = {
    level: { en: 'Level {n}', sw: 'Kiwango {n}' }, start: { en: 'Start', sw: 'Anza' }, tapstart: { en: 'Tap the green button to start.', sw: 'Gusa kitufe cha kijani kuanza.' },
    praise1: { en: 'Yes! Well done!', sw: 'Ndiyo! Hongera!' }, praise2: { en: 'You got it!', sw: 'Umeweza!' }, praise3: { en: 'Great thinking!', sw: 'Umefikiri vizuri!' }, praise4: { en: 'Super!', sw: 'Safi sana!' },
    praiseHelp: { en: 'Yes! You worked it out.', sw: 'Ndiyo! Umegundua.' }, nudge: { en: 'Look again. Try once more.', sw: 'Angalia tena. Jaribu tena.' },
    look: { en: "Let's look at one together.", sw: 'Tuangalie mfano pamoja.' }, nowyou: { en: 'Now you try.', sw: 'Sasa jaribu wewe.' },
    leveldone: { en: 'Level {n} done!', sw: 'Kiwango {n} kimekwisha!' }, nextlevel: { en: 'Next level', sw: 'Kiwango kijacho' }, nextq: { en: 'Ready for the next level?', sw: 'Uko tayari kwa kiwango kijacho?' },
    again: { en: 'Play again', sw: 'Cheza tena' }, back: { en: 'Back to Somo', sw: 'Rudi Somo' }, paused: { en: 'Resting…', sw: 'Tunapumzika…' },
  };
  return { st, $, $$, esc, shuffle, pick, line, say, sayNow, sayText, pic, dnd, example, letters, canRead, tricky, lang, FRIEND,
    lines(o) { st.lines = Object.assign({}, LINES, o); }, meta() { }, game, setPrompt(fn) { st.prompt = fn; }, get cfg() { return st.cfg; }, KIT_LINES: LINES };
})();
