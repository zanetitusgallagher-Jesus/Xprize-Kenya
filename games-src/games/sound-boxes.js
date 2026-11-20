/* Sound Boxes: segmenting a word into its sounds (a bead, then a letter, in a box for each sound). Original game for Somo. */
K.meta({ id: 'sound-boxes', title: 'Sound Boxes', title_sw: 'Visanduku vya Sauti', skills: ['seg'], stages: [2], ages: [5, 8],
  description: 'Hear a word and put a bead in a box for each sound. Level 2: use letter tiles instead of beads. Level 3: four-sound words like frog and nest.',
  description_sw: 'Sikiliza neno na uweke shanga kwenye kisanduku kwa kila sauti. Kiwango 2: tumia herufi badala ya shanga. Kiwango 3: maneno ya sauti nne kama frog na nest.',
  thumb: { bg: '#2F6FB0', bg2: '#122A4A', icons: ['cat', 'three'] } });
K.lines({
  intro1: { en: 'Listen to the word. Put one bead in a box for every sound. Then tap Done.', sw: 'Sikiliza neno. Weka shanga moja kwenye kisanduku kwa kila sauti. Kisha gusa Tayari.' },
  intro2: { en: 'Now use letters. Put each letter in its box, in order.', sw: 'Sasa tumia herufi. Weka kila herufi kwenye kisanduku chake, kwa mpangilio.' },
  intro3: { en: 'Longer words now, with four sounds. Listen carefully.', sw: 'Sasa maneno marefu, yenye sauti nne. Sikiliza kwa makini.' },
  hear: { en: '{w}. How many sounds in {w}?', sw: '{w}. Kuna sauti ngapi katika {w}?' },
  spell: { en: '{w}. Put the letters for {w} in the boxes.', sw: '{w}. Weka herufi za {w} kwenye visanduku.' },
  done: { en: 'Done', sw: 'Tayari' }, clear: { en: 'Start again', sw: 'Anza tena' },
  nudge1: { en: 'Say it slowly, one sound at a time: {s}.', sw: 'Sema polepole, sauti moja kwa wakati: {s}.' },
  nudge2: { en: 'Which sound comes next in {w}? Say it slowly.', sw: 'Sauti ipi inafuata katika {w}? Sema polepole.' },
  ex: { en: '{w}: {s}. That is {n} sounds.', sw: '{w}: {s}. Hizo ni sauti {n}.' },
});
(() => {
  const SAY = { a: 'ah', b: 'buh', c: 'kuh', d: 'duh', e: 'eh', f: 'fff', g: 'guh', h: 'huh', i: 'ih', j: 'juh', k: 'kuh', l: 'lll', m: 'mmm', n: 'nnn', o: 'aw', p: 'puh', r: 'rrr', s: 'sss', t: 'tuh', u: 'uh', v: 'vvv', w: 'wuh', x: 'ks', y: 'yuh', z: 'zzz', sh: 'shh', ck: 'kuh' };
  /* word → its sounds (graphemes) */
  const W3 = { egg: ['e', 'g'], cat: ['c', 'a', 't'], dog: ['d', 'o', 'g'], sun: ['s', 'u', 'n'], pig: ['p', 'i', 'g'], hen: ['h', 'e', 'n'], cup: ['c', 'u', 'p'], bus: ['b', 'u', 's'], hat: ['h', 'a', 't'], net: ['n', 'e', 't'], pot: ['p', 'o', 't'], map: ['m', 'a', 'p'], pan: ['p', 'a', 'n'], tin: ['t', 'i', 'n'], bed: ['b', 'e', 'd'], fish: ['f', 'i', 'sh'], duck: ['d', 'u', 'ck'], rat: ['r', 'a', 't'], jug: ['j', 'u', 'g'], mop: ['m', 'o', 'p'], fan: ['f', 'a', 'n'], log: ['l', 'o', 'g'] };
  const W4 = { frog: ['f', 'r', 'o', 'g'], drum: ['d', 'r', 'u', 'm'], flag: ['f', 'l', 'a', 'g'], nest: ['n', 'e', 's', 't'], crab: ['c', 'r', 'a', 'b'], desk: ['d', 'e', 's', 'k'], hand: ['h', 'a', 'n', 'd'], plum: ['p', 'l', 'u', 'm'], stop: ['s', 't', 'o', 'p'], lamp: ['l', 'a', 'm', 'p'], tent: ['t', 'e', 'n', 't'], milk: ['m', 'i', 'l', 'k'] };
  const SIM = { b: 'd', d: 'b', p: 'b', m: 'n', n: 'm', t: 'd', a: 'u', u: 'a', e: 'i', i: 'e', o: 'a', g: 'k', s: 'z', f: 'v', l: 'r', r: 'l' };
  const sounds = g => g.map(x => SAY[x] || x).join('... ');
  const readable = (w, g) => g.every(x => x.length === 1 ? K.canRead(x) : x === 'ck' ? K.canRead('ck') : false);
  K.game({ id: 'sound-boxes', levels: 3, skill: () => 'seg', icon: K.pic('three', 110),
    items(lv) {
      if (lv === 1) return K.shuffle(Object.entries(W3)).slice(0, 8).map(([w, g]) => ({ lv, w, g, tiles: false }));
      if (lv === 2) { let pool = Object.entries(W3).filter(([w, g]) => g.every(x => x.length === 1) && readable(w, g)); if (pool.length < 8) pool = Object.entries(W3).filter(([w, g]) => g.every(x => x.length === 1)).slice(0, 10); return K.shuffle(pool).slice(0, 8).map(([w, g]) => ({ lv, w, g, tiles: true })); }
      return K.shuffle(Object.entries(W4)).slice(0, 8).map(([w, g]) => ({ lv, w, g, tiles: readable(w, g) }));
    },
    render(spec, it, root) {
      const { w, g } = spec, n = g.length;
      const p = () => K.say(spec.tiles ? 'spell' : 'hear', { w }); K.setPrompt(p); p();
      const boxes = spec.tiles ? n : 5;
      root.innerHTML = `<div class="card">${K.pic(w, 90)}</div><div class="row" id="boxes">${Array.from({ length: boxes }, (_, i) => `<div class="slot" data-b="${i}" style="min-width:60px;min-height:64px"></div>`).join('')}</div>
        ${spec.tiles ? `<div class="row" id="tray">${K.shuffle([...g, ...[SIM[g[0]], SIM[g[n - 2]]].filter(x => x && !g.includes(x))]).map((x, i) => `<button class="card tok letter" data-l="${x}" style="min-width:60px;min-height:60px">${x}</button>`).join('')}</div>`
          : `<div class="row"><button class="card tok" id="bead" style="min-width:70px" aria-label="Bead"><svg width="44" height="44"><circle cx="22" cy="22" r="18" fill="#E8577A"/><circle cx="16" cy="16" r="5" fill="#F7B3C4"/></svg></button></div><div class="row"><button class="big ghost" id="clr">${K.esc(K.line('clear'))}</button><button class="big" id="ok">${K.esc(K.line('done'))}</button></div>`}`;
      const B = K.$$('#boxes .slot', root);
      if (!spec.tiles) {
        let k = 0; const put = () => { if (k >= boxes) return; B[k].innerHTML = '<svg width="40" height="40"><circle cx="20" cy="20" r="16" fill="#E8577A"/></svg>'; k++; K.sayText(SAY[g[k - 1]] ? String(k) : String(k)); };
        K.dnd(root, { onDrop: (el, slot) => put(), onTapSlot: () => put() });
        K.$('#clr', root).onclick = () => { k = 0; B.forEach(b => b.innerHTML = ''); };
        K.$('#ok', root).onclick = () => { if (!k) return; if (k === n) { K.sayText(sounds(g), 'en'); it.right(); } else { k = 0; B.forEach(b => b.innerHTML = ''); it.miss('segCount'); } };
      } else {
        let k = 0;
        K.dnd(root, { onTap: el => K.sayText(SAY[el.dataset.l] || el.dataset.l, 'en'), onDrop: (el, slot) => {
          const l = el.dataset.l; if (l === g[k]) { B[k].innerHTML = `<span class="letter">${l}</span>`; B[k].classList.add('good'); el.classList.add('gone'); K.sayText(SAY[l], 'en'); k++; if (k === n) it.right(); }
          else { el.classList.remove('try'); void el.offsetWidth; el.classList.add('try'); it.miss('aeiou'.includes(l) ? 'vowel' : SIM[g[k]] === l ? 'similarSound' : 'segCount'); } } });
      }
    },
    nudge(spec) { spec.tiles ? K.say('nudge2', { w: spec.w }) : K.say('nudge1', { s: sounds(spec.g) }); },
    example(spec) { K.example(`<div class="row">${spec.g.map(x => `<div class="slot" style="min-width:52px;min-height:52px"><span class="letter">${spec.tiles ? x : '●'}</span></div>`).join('')}</div>`, 'ex', { w: spec.w, s: sounds(spec.g), n: spec.g.length }); },
    reveal(spec, it) { it.right(false); },
  });
})();
