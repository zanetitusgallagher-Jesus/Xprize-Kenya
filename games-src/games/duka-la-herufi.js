/* Duka la Herufi (the letter shop): sh, ch, th. Original game for Somo. */
K.meta({ id: 'duka-la-herufi', title: 'Duka la Herufi', title_sw: 'Duka la Herufi', skills: ['dig'], stages: [3], ages: [6, 9],
  description: 'The shopkeeper asks for an item. Choose sh, ch or th to finish its name on the price tag, then read it. Level 2: at the end of the word. Level 3: read the whole word and find it.',
  description_sw: 'Mwenye duka anaomba kitu. Chagua sh, ch au th kumalizia jina lake kwenye lebo ya bei, kisha ulisome.',
  thumb: { bg: '#E8577A', bg2: '#4A1020', icons: ['shop', 'ship'] } });
K.lines({
  intro1: { en: 'Welcome to my shop! Finish the name on the price tag with sh, ch or th.', sw: 'Karibu dukani kwangu! Malizia jina kwenye lebo ya bei kwa sh, ch au th.' },
  intro2: { en: 'Now the sound is at the END of the word.', sw: 'Sasa sauti iko MWISHONI mwa neno.' },
  intro3: { en: 'Now read the word on the tag and find the thing in the shop.', sw: 'Sasa soma neno kwenye lebo na utafute kitu dukani.' },
  ask: { en: 'I need a {w}. Which sound finishes the tag?', sw: 'Nahitaji {w}. Sauti ipi inamalizia lebo?' },
  find: { en: 'Read the price tag. Which thing is it?', sw: 'Soma lebo ya bei. Ni kitu gani?' },
  readit: { en: '{d} ... {w}. Asante! Here it is.', sw: '{d} ... {w}. Asante! Hiki hapa.' },
  nudge: { en: 'Two letters, one sound. Say {w} slowly. Is it shh, ch or th?', sw: 'Herufi mbili, sauti moja. Sema {w} polepole. Ni shh, ch au th?' },
  nudge3: { en: 'Look at the first two letters, or the last two. sh, ch or th?', sw: 'Angalia herufi mbili za kwanza, au za mwisho. sh, ch au th?' },
  ex: { en: '{w} has {d}: {parts}.', sw: '{w} ina {d}: {parts}.' },
});
(() => {
  const SAYD = { sh: 'shh', ch: 'ch', th: 'th' };
  const START = [['sh', 'ip', 'ship'], ['sh', 'op', 'shop'], ['sh', 'ell', 'shell'], ['ch', 'ick', 'chick'], ['ch', 'ips', 'chips'], ['th', 'umb', 'thumb'], ['th', 'ree', 'three']];
  const END = [['fi', 'sh', 'fish'], ['di', 'sh', 'dish'], ['bru', 'sh', 'brush'], ['ba', 'th', 'bath'], ['mo', 'th', 'moth'], ['ben', 'ch', 'bench']];
  const word = x => x[0] + x[1];
  const readable = x => K.canRead(word(x).replace(/sh|ch|th/, ''));
  const pool = list => { const p = list.filter(readable); return p.length >= 4 ? p : list; };
  K.game({ id: 'duka-la-herufi', levels: 3, skill: () => 'dig', icon: K.pic('shop', 110),
    items(lv) {
      if (lv === 1) return Array.from({ length: 8 }, (_, i) => { const x = K.shuffle(pool(START))[0]; return { lv, w: word(x), pre: '', post: x[1], d: x[0] }; });
      if (lv === 2) return Array.from({ length: 8 }, () => { const x = K.pick(pool(END)); return { lv, w: word(x), pre: x[0], post: '', d: x[1] }; });
      return Array.from({ length: 8 }, () => { const all = [...START, ...END].map(word), w = K.pick(all), d = w.match(/sh|ch|th/)[0]; const others = K.shuffle(all.filter(o => o !== w && o.match(/sh|ch|th/)[0] !== d)).slice(0, 2); return { lv, w, d, opts: K.shuffle([w, ...others]) }; });
    },
    render(spec, it, root) {
      const { w } = spec;
      const tag = inner => `<svg viewBox="0 0 220 90" width="250"><path d="M20 10h180l14 35-14 35H20z" fill="#FFF3D6" stroke="#C9A06A" stroke-width="3"/><circle cx="36" cy="45" r="7" fill="#C9A06A"/></svg><div class="word" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#2B1E17;padding-left:30px">${inner}</div>`;
      if (spec.lv < 3) {
        const p = () => K.say('ask', { w }); K.setPrompt(p); p();
        root.innerHTML = `<div class="card">${K.pic(w, 96)}</div><div style="position:relative">${tag(`${spec.pre}<span id="gap" style="display:inline-block;min-width:56px;border-bottom:4px solid #E8577A">&nbsp;</span>${spec.post}`)}</div>
          <div class="row">${['sh', 'ch', 'th'].map(d => `<button class="card letter" data-d="${d}" style="min-width:80px">${d}</button>`).join('')}</div>`;
        root.onclick = e => { const b = e.target.closest('[data-d]'); if (!b) return; const d = b.dataset.d; K.sayText(SAYD[d], 'en');
          if (d === spec.d) { b.classList.add('good'); K.$('#gap', root).textContent = d; K.say('readit', { d: SAYD[d], w }); it.right(false); } else { b.classList.add('try'); it.miss('digraph'); } };
      } else {
        const p = () => K.say('find'); K.setPrompt(p); p();
        root.innerHTML = `<div style="position:relative">${tag(w)}</div><div class="row">${spec.opts.map(o => `<button class="card" data-o="${o}" aria-label="${o}">${K.pic(o, 80)}</button>`).join('')}</div>`;
        root.onclick = e => { const b = e.target.closest('[data-o]'); if (!b) return; if (b.dataset.o === w) { b.classList.add('good'); K.say('readit', { d: SAYD[spec.d], w }); it.right(false); } else { b.classList.add('try'); it.miss('digraph'); } };
      }
    },
    nudge(spec) { spec.lv < 3 ? K.say('nudge', { w: spec.w }) : K.say('nudge3'); },
    example(spec) { const parts = spec.w.replace(spec.d, ' ' + spec.d + ' ').trim().split(' ').join(' + '); K.example(`<div class="card">${K.pic(spec.w, 70)}<span class="word">${spec.w.replace(spec.d, `<u>${spec.d}</u>`)}</span></div>`, 'ex', { w: spec.w, d: SAYD[spec.d], parts }); },
    reveal(spec, it) { it.right(false); },
  });
})();
