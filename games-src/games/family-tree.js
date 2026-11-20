/* Family Tree: word families (-at, -an, -ig, -op). Original game for Somo. */
K.meta({ id: 'family-tree', title: 'Family Tree', title_sw: 'Mti wa Familia', skills: ['fam'], stages: [3], ages: [6, 9],
  description: 'The tree has a word ending such as -at. Drop a first-letter seed on it: a real word grows a fruit, a silly word grows a leaf. Level 3: make three new words from one family.',
  description_sw: 'Mti una mwisho wa neno kama -at. Dondosha mbegu ya herufi ya kwanza: neno halisi linazaa tunda, neno la kuchekesha linaota jani.',
  thumb: { bg: '#3FA34D', bg2: '#123A1C', icons: ['tree', 'seed'] } });
K.lines({
  intro1: { en: 'This tree is the {f} family. Drop a letter seed on the tree to make a real word.', sw: 'Mti huu ni familia ya {f}. Dondosha mbegu ya herufi kwenye mti kufanya neno halisi.' },
  intro2: { en: 'New families now. Find a seed that makes a real word.', sw: 'Familia mpya sasa. Tafuta mbegu inayofanya neno halisi.' },
  intro3: { en: 'Now make three different real words from one family!', sw: 'Sasa tengeneza maneno matatu tofauti halisi kutoka familia moja!' },
  fam: { en: 'The {f} family. Which seed makes a real word?', sw: 'Familia ya {f}. Mbegu ipi inafanya neno halisi?' },
  fam3: { en: 'The {f} family. Make three real words.', sw: 'Familia ya {f}. Tengeneza maneno matatu halisi.' },
  grew: { en: '{w}! A real word. A fruit grows.', sw: '{w}! Neno halisi. Tunda linaota.' },
  leaf: { en: '{w} is a silly word, so a leaf grows. Try another seed.', sw: '{w} ni neno la kuchekesha, kwa hiyo jani linaota. Jaribu mbegu nyingine.' },
  more: { en: '{w}! {n} more to go.', sw: '{w}! Bado {n}.' },
  nudge: { en: 'Put each seed with {f} and read it. Is it a word you know?', sw: 'Weka kila mbegu na {f} na usome. Ni neno unalolijua?' },
  ex: { en: '{l} and {f} make {w}.', sw: '{l} na {f} zinafanya {w}.' },
});
(() => {
  const FAM = { at: 'bcfhmprs', an: 'cfmprtv', ig: 'bdfjpw', op: 'hmpt', en: 'dhmpt', ug: 'bhjmrt', ot: 'cdghlnp', in: 'bfptw', et: 'bgjlmnpsw', ap: 'cglmnst' };
  const L1 = ['at', 'an', 'ig', 'op'], L2 = ['en', 'ug', 'ot', 'in', 'et', 'ap'];
  const okFam = f => K.canRead(f), seeds = (f, n, real) => { const yes = FAM[f].split('').filter(c => K.canRead(c)), no = 'bcdfghjlmnprstvwz'.split('').filter(c => !FAM[f].includes(c) && K.canRead(c)); const r = K.shuffle(yes).slice(0, real), s = K.shuffle(no).slice(0, n - r.length); return K.shuffle([...r, ...s]); };
  K.game({ id: 'family-tree', levels: 3, skill: () => 'fam', icon: K.pic('tree', 110),
    items(lv) { const goodN = f => FAM[f].split('').filter(c => K.canRead(c)).length;
      /* only families the child can make words in: level 3 needs at least 3 real words from learned letters */
      let fs = (lv === 1 ? L1 : lv === 2 ? L2 : [...L1, ...L2]).filter(f => okFam(f) && goodN(f) >= (lv === 3 ? 3 : 1));
      if (!fs.length && lv === 3) fs = [...L1, ...L2].filter(f => okFam(f) && goodN(f) >= 2); if (!fs.length) fs = lv === 1 ? L1 : L2; const n = lv === 3 ? 6 : 8; return Array.from({ length: n }, (_, i) => { const f = fs[i % fs.length]; return { lv, f, need: lv === 3 ? Math.min(3, Math.max(1, goodN(f))) : 1, seeds: seeds(f, lv === 1 ? 3 : lv === 2 ? 4 : 6, lv === 3 ? 4 : 1) }; }); },
    render(spec, it, root) {
      const f = spec.f, p = () => K.say(spec.lv === 3 ? 'fam3' : 'fam', { f: '-' + f }); K.setPrompt(p); p();
      root.innerHTML = `<div class="slot" id="tree" style="width:260px;height:220px;border:0;position:relative"><svg viewBox="0 0 64 64" width="220" height="220">${ICON.tree}</svg><span class="word" style="position:absolute;bottom:4px;left:0;right:0;text-align:center;background:var(--paper);color:var(--ink);border-radius:12px;margin:0 60px">-${f}</span><div id="grown" style="position:absolute;inset:10px 20px 60px;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-content:flex-start"></div></div>
        <div class="row" id="bag">${spec.seeds.map(l => `<button class="card tok letter" data-l="${l}" style="min-width:56px;min-height:60px;background:#D9B07A">${l}</button>`).join('')}</div>`;
      let got = 0; const g = K.$('#grown', root);
      K.dnd(root, { onTap: el => K.sayText(el.dataset.l + f, 'en'), onDrop: (el, slot) => {
        const l = el.dataset.l, w = l + f; el.classList.add('gone');
        if (FAM[f].includes(l)) { got++; g.insertAdjacentHTML('beforeend', `<span class="card pop" style="min-width:0;min-height:0;padding:2px 6px;background:#F6A623"><b>${w}</b></span>`); if (got >= spec.need) { K.say('grew', { w }); it.right(false); } else K.say('more', { w, n: spec.need - got }); }
        else { g.insertAdjacentHTML('beforeend', `<span class="pop" style="font-size:22px;color:#7FD07A" aria-label="leaf">❦</span>`); K.say('leaf', { w }); it.miss('onset'); } } });
    },
    nudge(spec) { K.say('nudge', { f: '-' + spec.f }); },
    example(spec) { const l = FAM[spec.f].split('').find(c => K.canRead(c)) || FAM[spec.f][0]; K.example(`<div class="word">${l} + ${spec.f} = ${l + spec.f}</div>`, 'ex', { l, f: spec.f, w: l + spec.f }, () => K.$$('#bag .tok').forEach(b => { if (FAM[spec.f].includes(b.dataset.l) && !b.classList.contains('gone')) b.classList.add('glow'); })); },
    reveal(spec, it) { it.right(false); },
  });
})();
