/* Story Strip: listening, story order and retelling (who, where, why). Level 3: the child reads a decodable story.
   All stories are original, written for Somo. */
K.meta({ id: 'story-strip', title: 'Story Strip', title_sw: 'Mstari wa Hadithi', skills: ['seq'], stages: [2, 3], ages: [5, 9],
  description: 'Hear a short Kenyan story, put the picture cards in order (first, next, last), then answer who, where or why. Level 3: read the story yourself.',
  description_sw: 'Sikiliza hadithi fupi ya Kenya, panga picha kwa mpangilio (kwanza, kisha, mwisho), kisha jibu nani, wapi au kwa nini. Kiwango 3: soma hadithi mwenyewe.',
  thumb: { bg: '#56B4E9', bg2: '#123A5A', icons: ['girl', 'market', 'mango'] } });
K.lines({
  intro1: { en: 'Listen to the story. Then put the pictures in order: first, next, last.', sw: 'Sikiliza hadithi. Kisha panga picha kwa mpangilio: kwanza, kisha, mwisho.' },
  intro2: { en: 'Longer stories now, with four pictures.', sw: 'Hadithi ndefu zaidi sasa, zenye picha nne.' },
  intro3: { en: 'Now YOU read the story. Then put the pictures in order.', sw: 'Sasa WEWE soma hadithi. Kisha panga picha kwa mpangilio.' },
  listen: { en: 'Listen.', sw: 'Sikiliza.' }, readnow: { en: 'Read the story. Tap the ear only if you need help.', sw: 'Soma hadithi. Gusa sikio ukihitaji msaada tu.' },
  order: { en: 'Put the pictures in order. What happened first?', sw: 'Panga picha kwa mpangilio. Nini kilitokea kwanza?' },
  first: { en: 'First', sw: 'Kwanza' }, next: { en: 'Next', sw: 'Kisha' }, last: { en: 'Last', sw: 'Mwisho' },
  nudge: { en: 'What happened at the very start of the story?', sw: 'Nini kilitokea mwanzoni kabisa mwa hadithi?' },
  nudgeq: { en: 'Think about the story again. {q}', sw: 'Fikiria hadithi tena. {q}' },
  ex: { en: 'The story goes: {s}', sw: 'Hadithi inaenda hivi: {s}' },
});
(() => {
  /* each story: sentences, a picture card per sentence [icon, icon], and one question with picture answers */
  const LISTEN = [
    { s: ['Amina goes to the market with Grandma.', 'They buy mangoes and tomatoes.', 'On the way home it starts to rain.', 'They run home and eat the mangoes together.'], c: [['grandma', 'market'], ['mango', 'tomato'], ['rain', 'girl'], ['mango', 'happy']], q: 'Who went to the market with Amina?', a: 'grandma', o: ['grandma', 'boy', 'dog'] },
    { s: ["Baraka's goat runs away.", 'He looks behind the tree.', 'He looks inside the hut.', 'He finds the goat with the hens!'], c: [['goat', 'boy'], ['tree', 'boy'], ['hut', 'boy'], ['goat', 'hen']], q: 'Where was the goat?', a: 'hen', o: ['hen', 'tree', 'bus'] },
    { s: ['Wanjiru plants a seed.', 'She waters it every day.', 'A little green plant grows.', 'Soon there is a big sunflower.'], c: [['seed', 'girl'], ['water', 'girl'], ['flowers', 'sun'], ['sunflower', 'happy']], q: 'Why did the plant grow?', a: 'water', o: ['water', 'ball', 'cake'] },
    { s: ['Kuku the hen lays an egg.', 'The egg cracks.', 'Out comes a little chick!', 'Kuku is so happy.'], c: [['hen', 'egg'], ['egg', 'hammer'], ['chick', 'egg'], ['hen', 'happy']], q: 'Who came out of the egg?', a: 'chick', o: ['chick', 'duck', 'cat'] },
    { s: ['It is a very hot day.', 'Otieno is thirsty.', 'He gets water from the tap.', 'Now he feels better.'], c: [['sun', 'fire'], ['boy', 'sad'], ['tap', 'water'], ['boy', 'happy']], q: 'Where did Otieno get water?', a: 'tap', o: ['tap', 'tree', 'bus'] },
    { s: ['The matatu stops on the road.', 'A wheel is flat.', 'The conductor fixes it with a hammer.', 'Everyone claps and the matatu goes on.'], c: [['matatu', 'stop'], ['matatu', 'sad'], ['boy', 'hammer'], ['matatu', 'happy']], q: 'Why did the matatu stop?', a: 'sad', o: ['sad', 'happy', 'cake'], alab: ['a flat wheel', 'everyone was happy', 'to buy cake'] },
  ];
  /* decodable stories: only taught letters (s a t p i n m d g o c k e u r h b f l) and tricky words */
  const TRICKY = ['the', 'a', 'is', 'to', 'he', 'she', 'was', 'and', 'on', 'in', 'his', 'has'];
  const READ = [
    { s: ['Sam has a cap.', 'Sam sits on a mat.', 'A cat naps on the mat.', 'Sam pats the cat.'], c: [['cap', 'boy'], ['mat', 'boy'], ['cat', 'mat'], ['boy', 'cat']], q: 'Who naps on the mat?', a: 'cat', o: ['cat', 'dog', 'hen'] },
    { s: ['Mum has a big pot.', 'She puts an egg in the pot.', 'The pot gets hot.', 'Mum and Ben get the egg.'], c: [['grandma', 'pot'], ['egg', 'pot'], ['pot', 'fire'], ['egg', 'happy']], q: 'What is in the pot?', a: 'egg', o: ['egg', 'hat', 'cup'] },
    { s: ['A dog digs in the mud.', 'The dog is a big mess.', 'Dad gets a tub.', 'The dog is in the tub.'], c: [['dog', 'water'], ['dog', 'sad'], ['boy', 'bucket'], ['dog', 'bath']], q: 'Where is the dog at the end?', a: 'bath', o: ['bath', 'hut', 'bus'], alab: ['in the tub', 'in the hut', 'on the bus'] },
    { s: ['Tom has a red bus.', 'The bus is on the rug.', 'The cat sits on the bus.', 'Tom and the cat nap.'], c: [['boy', 'bus'], ['bus', 'rug'], ['cat', 'bus'], ['boy', 'cat']], q: 'What is on the rug?', a: 'bus', o: ['bus', 'pot', 'fan'] },
  ];
  /* a build-time check: every word in a READ story is decodable or a tricky word */
  const LET = 'satpinmdgockeurhbfl';
  for (const st of READ) for (const sen of st.s) for (const w of sen.toLowerCase().replace(/[^a-z ]/g, '').split(' ')) if (!TRICKY.includes(w) && ![...w].every(c => LET.includes(c))) throw new Error('story-strip: "' + w + '" is not decodable');
  const card = (c, i) => `<button class="card tok" data-c="${i}" style="min-width:96px;min-height:84px;flex-direction:row;padding:4px">${K.pic(c[0], 40)}${K.pic(c[1], 40)}</button>`;
  K.game({ id: 'story-strip', levels: 3, skill: () => 'seq', icon: K.pic('girl', 110),
    items(lv) {
      /* level 3 reads only stories whose every word uses letters this child has learned (or tricky words); else it listens */
      const canRead = st => st.s.every(sen => sen.toLowerCase().replace(/[^a-z ]/g, '').split(' ').every(w => TRICKY.includes(w) || K.canRead(w)));
      let src = lv === 3 ? READ.filter(canRead) : LISTEN; let read = lv === 3; if (lv === 3 && src.length < 2) { src = READ; read = false; }
      const stories = K.shuffle(src).slice(0, 4); const out = [];
      for (const st of stories) { out.push({ lv, kind: 'order', st, n: lv === 1 ? 3 : 4, read }); out.push({ lv, kind: 'q', st }); }
      return out;
    },
    render(spec, it, root) {
      const st = spec.st;
      if (spec.kind === 'order') {
        const n = spec.n, pics = st.c.slice(0, n), sent = st.s.slice(0, n);
        const tell = () => K.sayText(sent.join(' '), 'en');   /* one line: Somo speaks one line a second, so a story goes as one */
        if (spec.read) { K.setPrompt(() => K.say('readnow')); K.say('readnow'); } else { K.setPrompt(() => tell()); tell(); }
        root.innerHTML = `${spec.read ? `<div class="card" style="text-align:left;align-items:flex-start;font-size:22px;max-width:380px;padding:10px">${sent.map(x => `<span>${K.esc(x)}</span>`).join('')}</div><button class="ib" id="ear" aria-label="Hear the story">🔊</button>` : ''}
          <div class="row" id="slots">${pics.map((_, i) => `<div class="slot" data-s="${i}" style="flex-direction:column;min-width:100px"><small>${K.esc(K.line(i === 0 ? 'first' : i === n - 1 ? 'last' : 'next'))}</small></div>`).join('')}</div>
          <div class="row" id="cards">${K.shuffle(pics.map((c, i) => [c, i])).map(([c, i]) => card(c, i)).join('')}</div>`;
        if (spec.read) K.$('#ear', root).onclick = () => tell();
        let k = 0; const S = K.$$('#slots .slot', root);
        K.dnd(root, { onTap: el => K.sayText(sent[+el.dataset.c], 'en'), onDrop: (el, slot) => {
          const i = +el.dataset.c; if (i === k) { S[k].appendChild(el); el.classList.add('good'); el.dataset.off = '1'; k++; if (k === n) it.right(); } else { el.classList.remove('try'); void el.offsetWidth; el.classList.add('try'); it.miss('sequence'); } } });
      } else {
        const p = () => K.sayText(st.q, 'en'); K.setPrompt(p); p();
        root.innerHTML = `<div class="card" style="font-size:22px;padding:10px 14px">${K.esc(st.q)}</div><div class="row">${st.o.map((o, i) => `<button class="card" data-o="${o}">${K.pic(o, 76)}${st.alab ? `<small>${K.esc(st.alab[i])}</small>` : ''}</button>`).join('')}</div>`;
        root.onclick = e => { const b = e.target.closest('[data-o]'); if (!b) return; if (b.dataset.o === st.a) { b.classList.add('good'); it.right(); } else { b.classList.add('try'); it.miss('other'); } };
      }
    },
    nudge(spec) { spec.kind === 'order' ? K.say('nudge') : K.say('nudgeq', { q: spec.st.q }); },
    example(spec) { const st = spec.st; if (spec.kind === 'order') K.example(`<div class="row">${st.c.slice(0, spec.n).map(c => `<span class="card" style="min-width:0;flex-direction:row">${K.pic(c[0], 30)}${K.pic(c[1], 30)}</span>`).join('')}</div>`, 'ex', { s: st.s.slice(0, spec.n).join(' ') });
      else K.example(`<div class="card">${K.esc(st.s.join(' '))}</div>`, 'ex', { s: st.s.join(' ') }); },
    reveal(spec, it) { it.right(false); },
  });
})();
