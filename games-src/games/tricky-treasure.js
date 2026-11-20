/* Tricky Treasure: tricky words, dug up at the coast. No time limit. Original game for Somo. */
K.meta({ id: 'tricky-treasure', title: 'Tricky Treasure', title_sw: 'Hazina ya Maneno', skills: ['sight'], stages: [3], ages: [6, 9],
  description: 'Dig in the sand at the coast. Somo says a tricky word (the, said, was); tap the shell with that word among look-alikes. It goes into your treasure book.',
  description_sw: 'Chimba mchangani pwani. Somo anasema neno gumu; gusa kombe lenye neno hilo kati ya yanayofanana. Linaingia kwenye kitabu chako cha hazina.',
  thumb: { bg: '#F2CC85', bg2: '#56B4E9', icons: ['shell', 'star'] } });
K.lines({
  intro1: { en: 'Treasure is hiding in the sand! Listen to the tricky word and tap the shell that has it.', sw: 'Hazina imejificha mchangani! Sikiliza neno gumu na ugusa kombe lenye neno hilo.' },
  intro2: { en: 'More tricky words now. Look at every letter.', sw: 'Maneno magumu zaidi sasa. Angalia kila herufi.' },
  intro3: { en: 'All your tricky words, mixed up. Take your time.', sw: 'Maneno yako yote magumu, yamechanganywa. Chukua muda wako.' },
  find: { en: 'Find the word: {w}.', sw: 'Tafuta neno: {w}.' },
  got: { en: '{w} goes in your treasure book!', sw: '{w} linaingia kwenye kitabu chako cha hazina!' },
  nudge: { en: 'Look at every letter. {w} is spelled {s}.', sw: 'Angalia kila herufi. {w} inaandikwa {s}.' },
  ex: { en: '{w}: {s}. Say it, spell it, say it.', sw: '{w}: {s}. Litamke, liandike, litamke.' },
});
(() => {
  const LOOK = { the: ['then', 'they', 'he'], a: ['an', 'at', 'as'], I: ['in', 'it', 'is'], is: ['in', 'it', 'his'], to: ['too', 'two', 'do'], my: ['me', 'by', 'may'], was: ['saw', 'has', 'wax'], said: ['sad', 'sand', 'slid'], he: ['the', 'her', 'she'], she: ['see', 'he', 'shy'],
    we: ['me', 'wet', 'wed'], me: ['my', 'we', 'men'], be: ['bed', 'by', 'he'], you: ['your', 'yes', 'yak'], are: ['ate', 'arm', 'art'], they: ['then', 'the', 'them'], of: ['off', 'if', 'on'], come: ['came', 'cone', 'some'], some: ['same', 'come', 'sum'], have: ['hive', 'gave', 'has'],
    were: ['where', 'wore', 'here'], what: ['that', 'when', 'hat'], where: ['were', 'there', 'here'], there: ['three', 'where', 'then'], one: ['own', 'on', 'once'], here: ['her', 'hare', 'there'], this: ['that', 'his', 'thin'], from: ['form', 'frog', 'for'], your: ['you', 'four', 'our'], saw: ['was', 'sew', 'sad'] };
  const sp = w => w.split('').join(', ');
  const tagOf = (w, c) => c.split('').reverse().join('') === w ? 'letterReversal' : c[0] === w[0] ? 'firstLetter' : 'vowel';
  K.game({ id: 'tricky-treasure', levels: 3, skill: () => 'sight', icon: K.pic('shell', 110),
    items(lv) {
      const known = K.tricky().filter(w => LOOK[w]); const n = known.length; const set = lv === 1 ? known.slice(0, Math.min(8, n)) : lv === 2 ? known.slice(Math.min(8, n) - 2) : known;
      const list = set.length >= 4 ? set : Object.keys(LOOK).slice(0, 8);
      return Array.from({ length: 8 }, (_, i) => { const w = list[i % list.length]; return { lv, w, opts: K.shuffle([w, ...LOOK[w]]) }; }).sort(() => Math.random() - .5);
    },
    render(spec, it, root) {
      const w = spec.w, p = () => K.say('find', { w }); K.setPrompt(p); p(); this.book = this.book || [];
      root.innerHTML = `<div class="row" style="min-height:36px">${this.book.slice(-6).map(b => `<span class="card" style="min-width:0;min-height:0;padding:2px 8px;background:#F2C230"><b>${b}</b></span>`).join('')}</div>
        <div style="background:linear-gradient(#F2CC85,#E0B66A);border-radius:24px;padding:16px;width:100%;max-width:380px"><div class="row">${spec.opts.map((o, i) => `<button class="card" data-o="${K.esc(o)}" style="min-width:140px;min-height:90px;background:#FFF3E6;border-radius:40px 40px 20px 20px"><span class="word">${K.esc(o)}</span></button>`).join('')}</div></div>`;
      root.onclick = e => { const b = e.target.closest('[data-o]'); if (!b) return; const o = b.dataset.o;
        if (o === w) { b.classList.add('good'); b.innerHTML = `${K.pic('star', 50)}<span class="word">${K.esc(w)}</span>`; this.book.push(w); K.say('got', { w }); it.right(false); } else { b.classList.add('try'); it.miss(tagOf(w, o)); } };
    },
    nudge(spec) { K.say('nudge', { w: spec.w, s: sp(spec.w) }); },
    example(spec) { K.example(`<div class="word" style="font-size:44px">${K.esc(spec.w)}</div>`, 'ex', { w: spec.w, s: sp(spec.w) }); },
    reveal(spec, it) { it.right(false); },
  });
})();
