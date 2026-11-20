/* Sauti Sokoni (Sounds at the market): first, last and middle sounds. Original game for Somo. */
K.meta({ id: 'sauti-sokoni', title: 'Sauti Sokoni', title_sw: 'Sauti Sokoni', skills: ['fls'], stages: [1, 2], ages: [5, 7],
  description: 'The market seller calls a sound. Put the things with that sound in the kiondo basket. Level 1: first sound; level 2: last sound; level 3: middle sound.',
  description_sw: 'Muuzaji anaita sauti. Weka vitu vyenye sauti hiyo kwenye kiondo. Kiwango 1: sauti ya kwanza; 2: ya mwisho; 3: ya kati.',
  thumb: { bg: '#E8792A', bg2: '#7A3119', icons: ['mango', 'basket', 'mug'] } });
K.lines({
  intro1: { en: 'Welcome to the market! I call a sound. Put things that START with that sound in the basket.', sw: 'Karibu sokoni! Ninaita sauti. Weka vitu vinavyoANZA na sauti hiyo kwenye kiondo.' },
  intro2: { en: 'Now listen for the LAST sound, at the end of the word.', sw: 'Sasa sikiliza sauti ya MWISHO, mwishoni mwa neno.' },
  intro3: { en: 'Now listen for the MIDDLE sound, inside the word.', sw: 'Sasa sikiliza sauti ya KATI, ndani ya neno.' },
  call1: { en: 'Who has things that start with {s}? Put them in the basket.', sw: 'Nani ana vitu vinavyoanza na {s}? Viweke kwenye kiondo.' },
  call2: { en: 'Find things that end with {s}. Put them in the basket.', sw: 'Tafuta vitu vinavyoishia na {s}. Viweke kwenye kiondo.' },
  call3: { en: 'Which one has {s} in the middle? Put it in the basket.', sw: 'Kipi kina {s} katikati? Kiweke kwenye kiondo.' },
  tapname: { en: 'Tap a thing to hear its name.', sw: 'Gusa kitu usikie jina lake.' },
  more: { en: 'Yes! Is there another one?', sw: 'Ndiyo! Kuna kingine?' },
  nudge1: { en: 'Say it slowly: {w}. Listen to the first sound. Is it {s}?', sw: 'Sema polepole: {w}. Sikiliza sauti ya kwanza. Ni {s}?' },
  nudge2: { en: 'Say it slowly: {w}. Listen to the very end. Is it {s}?', sw: 'Sema polepole: {w}. Sikiliza mwisho kabisa. Ni {s}?' },
  nudge3: { en: 'Say it slowly: {w}. Listen to the middle. Is it {s}?', sw: 'Sema polepole: {w}. Sikiliza katikati. Ni {s}?' },
  ex1: { en: '{w}. {s}... {w}. {w} starts with {s}.', sw: '{w}. {s}... {w}. {w} inaanza na {s}.' },
  ex2: { en: '{w}. {w}... {s}. {w} ends with {s}.', sw: '{w}. {w}... {s}. {w} inaishia na {s}.' },
  ex3: { en: '{w}. In the middle of {w} is {s}.', sw: '{w}. Katikati ya {w} kuna {s}.' },
  shown: { en: 'These are the ones. Watch them go in the basket.', sw: 'Hivi ndivyo. Tazama vikiingia kwenye kiondo.' },
});
(() => {
  const SAY = { m: 'mmm', n: 'nnn', s: 'sss', f: 'fff', l: 'lll', r: 'rrr', v: 'vvv', z: 'zzz', b: 'buh', d: 'duh', p: 'puh', t: 'tuh', k: 'kuh', g: 'guh', h: 'huh', j: 'juh', w: 'wuh', x: 'ks', a: 'ah', e: 'eh', i: 'ih', o: 'aw', u: 'uh' };
  const SIM = { m: 'n', n: 'm', b: 'd', d: 'b', p: 'b', t: 'd', k: 'g', g: 'k', f: 'v', v: 'f', s: 'z', z: 's', a: 'u', u: 'a', e: 'i', i: 'e', o: 'u' };
  /* word, first sound, last sound, middle sound (all have a picture) */
  const W = 'cat k t a|hat h t a|bat b t a|mat m t a|rat r t a|map m p a|cap k p a|tap t p a|pan p n a|fan f n a|van v n a|jam j m a|bag b g a|hen h n e|pen p n e|net n t e|bed b d e|leg l g e|web w b e|ten t n e|pig p g i|tin t n i|pin p n i|six s x i|wig w g i|lid l d i|zip z p i|dog d g o|pot p t o|box b x o|mop m p o|fox f x o|log l g o|sock s k o|sun s n u|cup k p u|bus b s u|nut n t u|rug r g u|jug j g u|mug m g u|hut h t u|bun b n u|duck d k u'
    .split('|').map(r => { const [w, f, l, m] = r.split(' '); return { w, pos: [f, l, m] }; });
  const P = lv => lv - 1;               /* level 1 first, 2 last, 3 middle */
  function makeItem(lv) {
    const p = P(lv); const sounds = [...new Set(W.map(x => x.pos[p]))];
    for (let k = 0; k < 50; k++) {
      const s = K.pick(sounds), yes = W.filter(x => x.pos[p] === s); const need = lv === 3 ? 1 : 2; if (yes.length < need + 1) continue;
      const right = K.shuffle(yes).slice(0, need), no = [];
      const sim = W.filter(x => x.pos[p] === SIM[s]); if (sim.length) no.push({ ...K.pick(sim), tag: 'similarSound' });
      if (lv < 3) { const other = W.filter(x => x.pos[p] !== s && x.pos[lv === 1 ? 1 : 0] === s && !no.some(n => n.w === x.w)); if (other.length) no.push({ ...K.pick(other), tag: 'firstLast' }); }
      const fill = W.filter(x => x.pos[p] !== s && !no.some(n => n.w === x.w)); while (no.length < (lv === 3 ? 2 : 2)) no.push({ ...K.pick(fill), tag: lv === 3 ? 'vowel' : 'other' });
      return { s, lv, right, all: K.shuffle([...right.map(x => ({ ...x, ok: true })), ...no]) };
    }
  }
  const sayS = s => SAY[s] || s;
  K.game({ id: 'sauti-sokoni', levels: 3, skill: () => 'fls', icon: K.pic('basket', 110),
    items(lv) { return Array.from({ length: 8 }, () => makeItem(lv)); },
    render(spec, it, root) {
      const call = () => K.say('call' + spec.lv, { s: sayS(spec.s) }); K.setPrompt(call); call(); if (it.n === 0) K.say('tapname');
      root.innerHTML = `<svg viewBox="0 0 320 70" width="100%" style="max-width:420px"><path d="M10 64h300" stroke="#8B5A3C" stroke-width="6"/><path d="M20 20h280l-14-16H34z" fill="#E8577A"/><path d="M20 20q14 10 28 0t28 0 28 0 28 0 28 0 28 0 28 0 28 0 28 0 28 0" fill="#C23B5A"/><rect x="24" y="22" width="6" height="42" fill="#8B5A3C"/><rect x="290" y="22" width="6" height="42" fill="#8B5A3C"/>
        <g transform="translate(140 22)"><circle cx="20" cy="12" r="10" fill="#6B4226"/><path d="M8 42l4-20h16l4 20z" fill="#2F9E8E"/><path d="M14 4q6-6 12 0" fill="#F2B829"/></g><text x="200" y="44" font-size="22" font-weight="800" fill="#FFF7EA">"${sayS(spec.s)}!"</text></svg>
        <div class="row" id="stall">${spec.all.map((x, i) => `<button class="card tok" data-i="${i}" aria-label="${x.w}">${K.pic(x.w, 70)}</button>`).join('')}</div>
        <div class="slot" id="kiondo" style="width:150px;height:110px" aria-label="Kiondo basket">${K.pic('basket', 96)}</div>`;
      let got = 0;
      K.dnd(root, { onTap: el => K.sayText(spec.all[+el.dataset.i].w, 'en'),
        onDrop: (el, slot) => { const x = spec.all[+el.dataset.i];
          if (x.ok) { el.classList.add('gone'); got++; if (got >= spec.right.length) it.right(); else K.say('more'); }
          else { el.classList.remove('try'); void el.offsetWidth; el.classList.add('try'); it.miss(x.tag); this.lastWrong = x; } } });
    },
    nudge(spec, it) { const x = this.lastWrong || spec.all.find(a => !a.ok); K.say('nudge' + spec.lv, { w: x.w, s: sayS(spec.s) }); },
    example(spec, it) { const x = spec.right[0]; K.example(`<div class="card">${K.pic(x.w, 80)}<span class="word">${x.w}</span></div>`, 'ex' + spec.lv, { w: x.w, s: sayS(spec.s) }, () => {
        K.$$('#stall .tok').forEach(b => { if (spec.all[+b.dataset.i].ok && !b.classList.contains('gone')) b.classList.add('glow'); }); }); },
    reveal(spec, it) { K.say('shown'); K.$$('#stall .tok').forEach(b => { if (spec.all[+b.dataset.i].ok) b.classList.add('gone'); }); it.right(false); },
  });
})();
