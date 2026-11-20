/* Real or Silly? Reading real and made-up words (true decoding). Original game for Somo. */
K.meta({ id: 'real-or-silly', title: 'Real or Silly?', title_sw: 'Kweli au Kichekesho?', skills: ['nonw'], stages: [3], ages: [6, 9],
  description: 'Mangoes carry words. Read each one and put it in the real-word basket or the silly-word basket. Made-up words like zim test true sounding-out.',
  description_sw: 'Maembe yamebeba maneno. Soma kila moja na uliweke kwenye kikapu cha maneno halisi au cha maneno ya kuchekesha.',
  thumb: { bg: '#3FA34D', bg2: '#123A1C', icons: ['mango', 'happy'] } });
K.lines({
  intro1: { en: 'Read the word on the mango. Is it a real word, or a silly word? Put it in the right basket.', sw: 'Soma neno kwenye embe. Ni neno halisi, au la kuchekesha? Liweke kwenye kikapu sahihi.' },
  intro2: { en: 'More letters now. Sound out every letter.', sw: 'Herufi zaidi sasa. Taja sauti ya kila herufi.' },
  intro3: { en: 'Longer words now. Read carefully!', sw: 'Maneno marefu sasa. Soma kwa makini!' },
  read: { en: 'Read this word. Real or silly?', sw: 'Soma neno hili. Halisi au la kuchekesha?' },
  real: { en: 'Real word', sw: 'Neno halisi' }, silly: { en: 'Silly word', sw: 'Neno la kuchekesha' },
  isreal: { en: '{w} is a real word.', sw: '{w} ni neno halisi.' }, issilly: { en: '{w} is a silly word. We can still read it!', sw: '{w} ni neno la kuchekesha. Bado tunaweza kulisoma!' },
  nudge: { en: 'Sound out every letter, then push them together. Now you can tap the ear to hear it.', sw: 'Taja sauti ya kila herufi, kisha ziunganishe. Sasa unaweza kugusa sikio kusikia.' },
  ex: { en: '{s}... {w}. {verdict}', sw: '{s}... {w}. {verdict}' },
});
(() => {
  const SAY = { a: 'ah', b: 'buh', c: 'kuh', d: 'duh', e: 'eh', f: 'fff', g: 'guh', h: 'huh', i: 'ih', j: 'juh', k: 'kuh', l: 'lll', m: 'mmm', n: 'nnn', o: 'aw', p: 'puh', r: 'rrr', s: 'sss', t: 'tuh', u: 'uh', v: 'vvv', w: 'wuh', x: 'ks', z: 'zzz' };
  const REAL3 = ['sat', 'pat', 'tap', 'sip', 'tin', 'pin', 'nap', 'pan', 'man', 'mat', 'map', 'dad', 'dig', 'dog', 'cot', 'cat', 'cap', 'pot', 'top', 'mop', 'kid', 'sun', 'cup', 'hen', 'bed', 'red', 'rat', 'hut', 'hug', 'bus', 'fan', 'fun', 'leg', 'log', 'pet', 'ten', 'net', 'big', 'bag', 'hot', 'hit', 'mud', 'rug', 'bin', 'fin'];
  const SILLY3 = ['zim', 'vop', 'tib', 'mup', 'dop', 'gid', 'nup', 'bim', 'fot', 'kep', 'mib', 'rop', 'sut', 'tep', 'lom', 'fep', 'hib', 'sap', 'pid', 'nim', 'tas', 'dap', 'mog', 'kan', 'nis', 'pim', 'sop', 'tud', 'gan', 'hap', 'rif', 'lut', 'bod', 'nop'].filter(w => !['sap'].includes(w));
  const REAL4 = ['frog', 'drum', 'flag', 'nest', 'crab', 'desk', 'hand', 'plum', 'stop', 'lamp', 'tent', 'milk', 'spot', 'step', 'swim', 'trip', 'clap', 'grin'];
  const SILLY4 = ['frim', 'drob', 'flep', 'nost', 'crim', 'dask', 'hund', 'plim', 'stog', 'lomp', 'tunt', 'molk', 'spet', 'blap', 'trin', 'clom', 'grop', 'snib'];
  const ALL_REAL = new Set([...REAL3, ...REAL4]);
  const near = w => [...ALL_REAL].some(r => r.length === w.length && [...r].filter((c, i) => c !== w[i]).length === 1 && 'aeiou'.includes([...r].find((c, i) => c !== w[i])));
  K.game({ id: 'real-or-silly', levels: 3, skill: () => 'nonw', icon: K.pic('mango', 110),
    items(lv) {
      const ok = l => l.filter(w => K.canRead(w)), r = lv === 3 ? ok(REAL4) : ok(REAL3), s = lv === 3 ? ok(SILLY4) : ok(SILLY3);
      const R = r.length >= 4 ? r : (lv === 3 ? REAL4 : REAL3), Sl = s.length >= 4 ? s : (lv === 3 ? SILLY4 : SILLY3);
      return K.shuffle([...K.shuffle(R).slice(0, 4), ...K.shuffle(Sl).slice(0, 4)].map(w => ({ lv, w, real: ALL_REAL.has(w) })));
    },
    render(spec, it, root) {
      const w = spec.w, p = () => K.say('read'); K.setPrompt(p); p(); this.heard = false;
      root.innerHTML = `<button class="card tok" id="mango" style="background:none;border:0;position:relative" aria-label="Mango with a word"><svg viewBox="0 0 120 100" width="210" height="175"><ellipse cx="60" cy="56" rx="54" ry="40" fill="#F6A623" stroke="#C9781A" stroke-width="3"/><path d="M66 18q14-20 32-12-12 16-32 12z" fill="#3E7D32"/></svg><span class="word" style="position:absolute;left:0;right:0;top:78px;text-align:center;color:#2B1E17;font-size:38px">${w}</span></button>
        <button class="ib" id="ear" style="visibility:hidden" aria-label="Hear the word">🔊</button>
        <div class="row"><div class="slot" data-b="real" style="width:150px;height:120px;flex-direction:column">${K.pic('basket', 64)}<b>${K.esc(K.line('real'))}</b></div><div class="slot" data-b="silly" style="width:150px;height:120px;flex-direction:column">${K.pic('happy', 54)}<b>${K.esc(K.line('silly'))}</b></div></div>`;
      K.$('#ear', root).onclick = () => K.sayText(w, 'en');
      K.dnd(root, { onDrop: (el, slot) => {
        const said = slot.dataset.b === 'real';
        if (said === spec.real) { el.classList.add('gone'); K.say(spec.real ? 'isreal' : 'issilly', { w }); it.right(false); }
        else { el.classList.remove('try'); void el.offsetWidth; el.classList.add('try'); K.$('#ear', root).style.visibility = 'visible'; it.miss(spec.real ? 'nonWordReal' : near(w) ? 'vowel' : 'firstLetter'); } } });
    },
    nudge() { K.say('nudge'); },
    example(spec) { K.example(`<div class="row">${spec.w.split('').map(c => `<span class="letter">${c}</span>`).join(' ')}</div><div class="word">${spec.w}</div>`, 'ex', { s: spec.w.split('').map(c => SAY[c]).join('... '), w: spec.w, verdict: K.line(spec.real ? 'isreal' : 'issilly', { w: spec.w }) }); },
    reveal(spec, it) { it.right(false); },
  });
})();
