/* Matatu Spell: blend and spell. Letter passengers board the matatu in order; the conductor blends aloud. Original game for Somo. */
K.meta({ id: 'matatu-spell', title: 'Matatu Spell', title_sw: 'Tahajia ya Matatu', skills: ['cvc'], stages: [2, 3], ages: [6, 8],
  description: 'The route sign shows a picture. Board the letter passengers in order to spell it; the conductor blends the sounds as each one boards. Only letters the child has learned.',
  description_sw: 'Bango la njia linaonyesha picha. Panda abiria-herufi kwa mpangilio ili kutaja neno; kondakta anaunganisha sauti kila mmoja anapopanda.',
  thumb: { bg: '#F2B829', bg2: '#7A4A0A', icons: ['matatu'] } });
K.lines({
  intro1: { en: 'Look at the sign. Help the letter passengers get on the matatu in the right order to spell the word.', sw: 'Angalia bango. Wasaidie abiria-herufi wapande matatu kwa mpangilio sahihi kutaja neno.' },
  intro2: { en: 'More passengers are waiting now. Listen to each sound.', sw: 'Sasa abiria wengi zaidi wanasubiri. Sikiliza kila sauti.' },
  intro3: { en: 'Longer words now. Four passengers!', sw: 'Sasa maneno marefu. Abiria wanne!' },
  sign: { en: 'Our matatu goes to {w}. Who gets on first?', sw: 'Matatu yetu inaenda {w}. Nani anapanda kwanza?' },
  board: { en: '{b}', sw: '{b}' },
  full: { en: '{w}! Twende! Off we go.', sw: '{w}! Twende!' },
  nudge: { en: 'Say {w} slowly. Which sound comes next?', sw: 'Sema {w} polepole. Sauti ipi inafuata?' },
  ex: { en: '{s}. {w}.', sw: '{s}. {w}.' },
});
(() => {
  const SAY = { a: 'ah', b: 'buh', c: 'kuh', d: 'duh', e: 'eh', f: 'fff', g: 'guh', h: 'huh', i: 'ih', j: 'juh', k: 'kuh', l: 'lll', m: 'mmm', n: 'nnn', o: 'aw', p: 'puh', r: 'rrr', s: 'sss', t: 'tuh', u: 'uh', v: 'vvv', w: 'wuh', x: 'ks', z: 'zzz' };
  const SIM = { b: 'd', d: 'b', p: 'b', m: 'n', n: 'm', t: 'd', a: 'u', u: 'a', e: 'i', i: 'e', o: 'a', g: 'k', c: 'g', s: 'z', f: 'v', l: 'r', r: 'l', h: 'n', j: 'g' };
  const CVC = ['cat', 'hat', 'mat', 'rat', 'map', 'cap', 'tap', 'pan', 'fan', 'jam', 'bag', 'hen', 'pen', 'net', 'bed', 'leg', 'ten', 'pig', 'tin', 'pin', 'lid', 'dog', 'pot', 'mop', 'log', 'sun', 'cup', 'bus', 'nut', 'rug', 'jug', 'mug', 'hut', 'bun', 'six', 'fox', 'box'];
  const C4 = ['frog', 'drum', 'flag', 'nest', 'crab', 'desk', 'hand', 'plum', 'stop', 'lamp', 'tent', 'milk'];
  const pool = (list, min) => { const p = list.filter(w => K.canRead(w)); return p.length >= min ? p : list.filter(w => K.canRead(w, 'aeiou')).concat(p).slice(0, Math.max(min, p.length)); };
  const blendSay = (w, k) => w.slice(0, k).split('').map(c => SAY[c] || c).join('... ');
  K.game({ id: 'matatu-spell', levels: 3, skill: () => 'cvc', icon: K.pic('matatu', 120),
    items(lv) { const list = lv === 3 ? pool(C4, 6) : pool(CVC, 8); const ws = K.shuffle(list.length ? list : ['sat', 'pin', 'tip', 'pat']); return Array.from({ length: 8 }, (_, i) => ({ lv, w: ws[i % ws.length] })); },
    render(spec, it, root) {
      const w = spec.w, p = () => K.say('sign', { w }); K.setPrompt(p); p();
      const extra = spec.lv === 1 ? [SIM[w[1]]] : [SIM[w[0]], SIM[w[1]], SIM[w[w.length - 1]]];
      const pass = K.shuffle([...w, ...extra.filter(x => x && !w.includes(x) && (K.canRead(x) || spec.lv === 1))]);
      root.innerHTML = `<div class="card" style="flex-direction:row;gap:10px">${K.pic(w, 70)}<span style="font-size:13px;color:#7A5A3A">ROUTE</span></div>
        <div style="position:relative;width:330px;max-width:96vw"><svg viewBox="0 0 330 120" width="100%"><path d="M8 100V36q0-20 20-20h236q20 0 30 22l10 22v40z" fill="#F2B829"/><path d="M10 64h300" stroke="#E8577A" stroke-width="8"/><circle cx="70" cy="104" r="15" fill="#2E2219"/><circle cx="260" cy="104" r="15" fill="#2E2219"/><path d="M280 26h14l12 26h-26z" fill="#BFE7F5"/></svg>
        <div class="row" id="seats" style="position:absolute;left:14px;right:60px;top:20px;gap:6px">${w.split('').map((_, i) => `<div class="slot" data-s="${i}" style="min-width:52px;min-height:56px;background:rgba(191,231,245,.9);border-color:#fff"></div>`).join('')}</div></div>
        <div class="row" id="stage">${pass.map(l => `<button class="card tok letter" data-l="${l}" style="min-width:56px;min-height:64px">${l}</button>`).join('')}</div>`;
      let k = 0; const S = K.$$('#seats .slot', root);
      K.dnd(root, { onTap: el => K.sayText(SAY[el.dataset.l], 'en'), onDrop: (el, slot) => {
        const l = el.dataset.l;
        if (l === w[k]) { S[k].innerHTML = `<span class="letter" style="color:#2B1E17">${l}</span>`; el.classList.add('gone'); k++; K.sayText(k < w.length ? blendSay(w, k) : blendSay(w, k) + '... ' + w, 'en'); if (k === w.length) { K.say('full', { w }); it.right(false); } }
        else { el.classList.remove('try'); void el.offsetWidth; el.classList.add('try'); it.miss('aeiou'.includes(l) && 'aeiou'.includes(w[k]) ? 'vowel' : SIM[w[k]] === l ? (/[bdpq]/.test(l) ? 'letterReversal' : 'similarSound') : k === 0 ? 'onset' : 'other'); } } });
    },
    nudge(spec) { K.say('nudge', { w: spec.w }); },
    example(spec) { K.example(`<div class="row">${spec.w.split('').map(c => `<div class="slot" style="min-width:48px;min-height:52px"><span class="letter">${c}</span></div>`).join('')}</div>`, 'ex', { s: blendSay(spec.w, spec.w.length), w: spec.w }); },
    reveal(spec, it) { it.right(false); },
  });
})();
