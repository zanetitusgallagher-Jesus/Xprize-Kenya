/* Ngoma Beats: syllables (beats in words). Original game for Somo. */
K.meta({ id: 'ngoma-beats', title: 'Ngoma Beats', title_sw: 'Mdundo wa Ngoma', skills: ['syl'], stages: [1, 2], ages: [5, 7],
  description: 'Hear a word and tap the drum once for each beat (ma-ta-tu is 3). Level 2: find the picture with that many beats. Level 3: join two word parts into one word.',
  description_sw: 'Sikiliza neno na upige ngoma mara moja kwa kila pigo (ma-ta-tu ni 3). Kiwango 2: tafuta picha yenye mapigo hayo. Kiwango 3: unganisha sehemu mbili kuwa neno moja.',
  thumb: { bg: '#7A3E8E', bg2: '#2A1238', icons: ['drum', 'matatu'] } });
K.lines({
  intro1: { en: 'Listen to the word. Tap the drum once for every beat. Then tap Done.', sw: 'Sikiliza neno. Piga ngoma mara moja kwa kila pigo. Kisha gusa Tayari.' },
  intro2: { en: 'I say a number of beats. Find the picture with that many beats.', sw: 'Ninasema idadi ya mapigo. Tafuta picha yenye mapigo hayo.' },
  intro3: { en: 'Listen to two parts. Put them together and find the whole word.', sw: 'Sikiliza sehemu mbili. Ziunganishe na utafute neno zima.' },
  tap1: { en: '{w}. Tap the drum for each beat.', sw: '{w}. Piga ngoma kwa kila pigo.' },
  find2: { en: 'Which one has {n} beats?', sw: 'Kipi kina mapigo {n}?' },
  join3: { en: '{a} ... {b}. Put them together. Which word is it?', sw: '{a} ... {b}. Ziunganishe. Ni neno gani?' },
  done: { en: 'Done', sw: 'Tayari' }, again: { en: 'Start again', sw: 'Anza tena' },
  count: { en: '{n}', sw: '{n}' },
  nudge1: { en: 'Say it slowly and clap: {s}.', sw: 'Sema polepole na upige makofi: {s}.' },
  nudge2: { en: 'Clap each picture name slowly. Count the claps.', sw: 'Piga makofi kwa kila jina polepole. Hesabu makofi.' },
  nudge3: { en: 'Say the two parts close together: {a}{b}.', sw: 'Sema sehemu mbili karibu karibu: {a}{b}.' },
  ex1: { en: '{s}. That is {n} beats.', sw: '{s}. Hiyo ni mapigo {n}.' },
  ex3: { en: '{a} and {b} make {w}.', sw: '{a} na {b} zinafanya {w}.' },
});
(() => {
  /* word, beats (spoken with hyphens), picture */
  const WORDS = [['sun', 'sun', 'sun'], ['goat', 'goat', 'goat'], ['cat', 'cat', 'cat'], ['fish', 'fish', 'fish'], ['drum', 'drum', 'drum'], ['mango', 'man-go', 'mango'], ['tembo', 'tem-bo', 'elephant'],
    ['twiga', 'twi-ga', 'giraffe'], ['simba', 'sim-ba', 'lion'], ['rabbit', 'rab-bit', 'rabbit'], ['pencil', 'pen-cil', 'pencil'], ['basket', 'bas-ket', 'basket'], ['matatu', 'ma-ta-tu', 'matatu'],
    ['banana', 'ba-na-na', 'banana'], ['chapati', 'cha-pa-ti', 'chapati'], ['ugali', 'u-ga-li', 'ugali'], ['tomato', 'to-ma-to', 'tomato'], ['butterfly', 'but-ter-fly', 'butterfly'], ['elephant', 'el-e-phant', 'elephant']]
    .map(([w, s, p]) => ({ w, s, p, n: s.split('-').length }));
  const COMP = [['foot', 'ball', 'football'], ['sun', 'flower', 'sunflower'], ['cup', 'cake', 'cupcake'], ['star', 'fish', 'starfish'], ['tooth', 'brush', 'toothbrush'], ['hand', 'bag', 'handbag']];
  const beatsSay = s => s.replace(/-/g, '... ');
  const drum = `<svg viewBox="0 0 64 64" width="150" height="150">${ICON.drum}</svg>`;
  K.game({ id: 'ngoma-beats', levels: 3, skill: () => 'syl', icon: K.pic('drum', 110),
    items(lv) {
      if (lv === 1) return K.shuffle(WORDS).slice(0, 8).map(x => ({ lv, x }));
      if (lv === 2) return Array.from({ length: 8 }, () => { const n = K.pick([1, 2, 3]); const yes = K.pick(WORDS.filter(x => x.n === n)); const no = [1, 2, 3].filter(k => k !== n).map(k => K.pick(WORDS.filter(x => x.n === k && x.p !== yes.p))); return { lv, n, yes, all: K.shuffle([yes, ...no]) }; });
      return K.shuffle(COMP).concat(K.shuffle(COMP)).slice(0, 8).map(c => ({ lv, c, all: K.shuffle([c[2], c[0], c[1]]) }));
    },
    render(spec, it, root) {
      if (spec.lv === 1) {
        const x = spec.x, p = () => K.say('tap1', { w: x.w }); K.setPrompt(p); p(); let n = 0;
        root.innerHTML = `<div class="card">${K.pic(x.p, 90)}<span class="word">${x.w}</span></div><button id="drum" class="card" style="background:none;border:0" aria-label="Drum">${drum}</button><div class="row" id="beats" style="min-height:40px"></div><div class="row"><button class="big ghost" id="clr">${K.esc(K.line('again'))}</button><button class="big" id="ok">${K.esc(K.line('done'))}</button></div>`;
        const show = () => { K.$('#beats', root).innerHTML = Array.from({ length: n }, () => `<span style="width:30px;height:30px;border-radius:50%;background:var(--accent);display:inline-block"></span>`).join(''); };
        K.$('#drum', root).onclick = () => { if (n < 6) { n++; show(); K.sayText(String(n)); const d = K.$('#drum svg', root); d.classList.remove('pop'); void d.offsetWidth; d.classList.add('pop'); } };
        K.$('#clr', root).onclick = () => { n = 0; show(); };
        K.$('#ok', root).onclick = () => { if (!n) return; if (n === x.n) it.right(); else { n = 0; show(); it.miss('syllableCount'); } };
      } else if (spec.lv === 2) {
        const p = () => K.say('find2', { n: spec.n }); K.setPrompt(p); p();
        root.innerHTML = `<div class="row">${'<span class="letter" style="color:var(--accent)">●</span>'.repeat(spec.n)}</div><div class="row">${spec.all.map((x, i) => `<button class="card" data-i="${i}" aria-label="${x.w}">${K.pic(x.p, 76)}<span>${x.w}</span></button>`).join('')}</div>`;
        root.onclick = e => { const b = e.target.closest('[data-i]'); if (!b) return; const x = spec.all[+b.dataset.i]; K.sayText(beatsSay(x.s), 'en'); if (x === spec.yes) { b.classList.add('good'); it.right(); } else { b.classList.add('try'); it.miss('syllableCount'); } };
      } else {
        const [a, b, w] = spec.c, p = () => K.say('join3', { a, b }); K.setPrompt(p); p();
        root.innerHTML = `<div class="row"><div class="card">${K.pic(a, 60)}<span>${a}</span></div><span class="letter">+</span><div class="card">${K.pic(b, 60)}<span>${b}</span></div></div><div class="row">${spec.all.map((x, i) => `<button class="card" data-i="${i}" aria-label="${x}">${K.pic(x, 80)}<span>${x}</span></button>`).join('')}</div>`;
        root.onclick = e => { const el = e.target.closest('[data-i]'); if (!el) return; const x = spec.all[+el.dataset.i]; K.sayText(x, 'en'); if (x === w) { el.classList.add('good'); it.right(); } else { el.classList.add('try'); it.miss('syllableCount'); } };
      }
    },
    nudge(spec) { if (spec.lv === 1) K.say('nudge1', { s: beatsSay(spec.x.s) }); else if (spec.lv === 2) K.say('nudge2'); else K.say('nudge3', { a: spec.c[0], b: spec.c[1] }); },
    example(spec) {
      if (spec.lv === 3) return K.example(`<div class="card">${K.pic(spec.c[2], 70)}<span class="word">${spec.c[0]} + ${spec.c[1]}</span></div>`, 'ex3', { a: spec.c[0], b: spec.c[1], w: spec.c[2] });
      const x = spec.lv === 1 ? spec.x : spec.yes;
      K.example(`<div class="card">${K.pic(x.p, 60)}<span class="word">${x.s}</span><span>${'● '.repeat(x.n)}</span></div>`, 'ex1', { s: beatsSay(x.s), n: x.n });
    },
    reveal(spec, it) { it.right(false); },
  });
})();
