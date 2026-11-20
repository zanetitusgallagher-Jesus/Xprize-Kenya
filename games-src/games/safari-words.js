/* Safari Words: vocabulary (meanings, groups, opposites and same meanings). Original game for Somo. */
K.meta({ id: 'safari-words', title: 'Safari Words', title_sw: 'Maneno ya Safari', skills: ['voc'], stages: [1, 2], ages: [5, 8],
  description: 'Hear what a word means ("an animal with a very long neck") and find it in the savanna or the village. Level 2: sort things into animals, food and tools. Level 3: opposites and words that mean the same.',
  description_sw: 'Sikiliza maana ya neno ("mnyama mwenye shingo ndefu sana") na ulitafute porini au kijijini. Kiwango 2: panga vitu kuwa wanyama, chakula na vifaa. Kiwango 3: kinyume na maneno yenye maana sawa.',
  thumb: { bg: '#E8923A', bg2: '#3A1E0A', icons: ['giraffe', 'zebra', 'elephant'] } });
K.lines({
  intro1: { en: 'Welcome to the safari! Listen to what I describe, then find it in the picture.', sw: 'Karibu safarini! Sikiliza ninachoeleza, kisha kitafute kwenye picha.' },
  intro2: { en: 'Now sort things into groups: animals, food and tools.', sw: 'Sasa panga vitu katika makundi: wanyama, chakula na vifaa.' },
  intro3: { en: 'Now opposites, and words that mean the same.', sw: 'Sasa vinyume, na maneno yenye maana sawa.' },
  where: { en: 'Where is the group for {w}?', sw: 'Kundi la {w} liko wapi?' },
  animals: { en: 'Animals', sw: 'Wanyama' }, food: { en: 'Food', sw: 'Chakula' }, tools: { en: 'Tools', sw: 'Vifaa' },
  opp: { en: 'What is the opposite of {w}?', sw: 'Kinyume cha {w} ni nini?' }, same: { en: 'Which word means the same as {w}?', sw: 'Neno lipi lina maana sawa na {w}?' },
  nudge1: { en: 'Listen again: {d}', sw: 'Sikiliza tena: {d}' }, nudge2: { en: 'Is it an animal, a food or a tool?', sw: 'Ni mnyama, chakula au kifaa?' }, nudge3: { en: 'Think: {w}. Is it the same, or the opposite?', sw: 'Fikiria: {w}. Ni sawa, au kinyume?' },
  ex1: { en: 'This is the {w}. {d}', sw: 'Hiki ni {w}. {d}' }, ex2: { en: '{w} goes with the {g}.', sw: '{w} inaenda na {g}.' }, ex3: { en: '{a} and {b}.', sw: '{a} na {b}.' },
});
(() => {
  const DEF = { giraffe: 'an animal with a very, very long neck', elephant: 'the biggest animal, with a long trunk', zebra: 'an animal like a horse, with black and white stripes', lion: 'a big wild cat that roars', goat: 'a farm animal that says meh', hen: 'a bird that lays eggs', cow: 'a farm animal that gives us milk',
    fish: 'it lives in water and swims', tree: 'it is tall, with leaves and branches', hut: 'a small house with a grass roof', matatu: 'a small bus that carries people', bucket: 'you carry water in it', broom: 'you sweep the floor with it', hoe: 'a jembe: you dig on the farm with it', sun: 'it shines in the sky in the day', moon: 'it shines in the sky at night', drum: 'you beat it to make music', basket: 'a woven kiondo you carry things in' };
  const SCENES = [['giraffe', 'elephant', 'zebra', 'lion', 'tree', 'sun'], ['goat', 'hen', 'cow', 'hut', 'bucket', 'broom'], ['fish', 'matatu', 'hoe', 'moon', 'drum', 'basket']];
  const GROUPS = { animals: ['goat', 'cow', 'hen', 'lion', 'zebra', 'giraffe', 'elephant', 'fish', 'dog', 'cat'], food: ['mango', 'banana', 'egg', 'chapati', 'ugali', 'tomato', 'cake'], tools: ['hoe', 'broom', 'bucket', 'hammer', 'brush', 'pot'] };
  const PAIRS = [['opp', 'hot', 'fire', 'cold', 'ice'], ['opp', 'up', 'up', 'down', 'down'], ['opp', 'happy', 'happy', 'sad', 'sad'], ['opp', 'big', 'elephant', 'small', 'mouse'], ['opp', 'day', 'sun', 'night', 'moon'],
    ['same', 'big', 'elephant', 'large', 'elephant'], ['same', 'small', 'mouse', 'little', 'mouse'], ['same', 'happy', 'happy', 'glad', 'happy'], ['same', 'sad', 'sad', 'unhappy', 'sad']];
  const WORDPIC = { cold: 'ice', down: 'down', sad: 'sad', small: 'mouse', night: 'moon', large: 'elephant', little: 'mouse', glad: 'happy', unhappy: 'sad', hot: 'fire', up: 'up', happy: 'happy', big: 'elephant', day: 'sun' };
  K.game({ id: 'safari-words', levels: 3, skill: () => 'voc', icon: K.pic('giraffe', 110),
    items(lv) {
      if (lv === 1) return Array.from({ length: 9 }, (_, i) => { const sc = SCENES[i % 3]; return { lv, sc: K.shuffle(sc), w: K.pick(sc) }; });
      if (lv === 2) return K.shuffle(Object.entries(GROUPS).flatMap(([g, l]) => K.shuffle(l).slice(0, 3).map(w => ({ lv, w, g })))).slice(0, 9);
      return K.shuffle(PAIRS).slice(0, 8).map(p => { const [kind, w, , ans] = p; const pool = Object.keys(WORDPIC).filter(x => x !== w && x !== ans && WORDPIC[x] !== WORDPIC[ans]); return { lv, kind, w, ans, opts: K.shuffle([ans, ...K.shuffle(pool).slice(0, 2)]) }; });
    },
    render(spec, it, root) {
      if (spec.lv === 1) {
        const d = DEF[spec.w], p = () => K.sayText(d.charAt(0).toUpperCase() + d.slice(1) + '.', 'en'); K.setPrompt(p); p();
        root.innerHTML = `<div style="background:linear-gradient(#F5B04A,#C2672A 60%,#6E3A1E);border-radius:20px;padding:10px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%;max-width:380px">${spec.sc.map(w => `<button class="card" data-w="${w}" style="background:rgba(255,248,236,.85)" aria-label="${w}">${K.pic(w, 72)}</button>`).join('')}</div>`;
        root.onclick = e => { const b = e.target.closest('[data-w]'); if (!b) return; K.sayText(b.dataset.w, 'en'); if (b.dataset.w === spec.w) { b.classList.add('good'); it.right(); } else { b.classList.add('try'); it.miss('other'); } };
      } else if (spec.lv === 2) {
        const p = () => K.say('where', { w: spec.w }); K.setPrompt(p); p();
        root.innerHTML = `<button class="card tok" id="thing" aria-label="${spec.w}">${K.pic(spec.w, 90)}<span>${spec.w}</span></button><div class="row">${['animals', 'food', 'tools'].map(g => `<div class="slot" data-g="${g}" style="flex-direction:column;width:110px;height:110px">${K.pic(GROUPS[g][0], 44)}<b>${K.esc(K.line(g))}</b></div>`).join('')}</div>`;
        K.dnd(root, { onTap: el => K.sayText(spec.w, 'en'), onDrop: (el, slot) => { if (slot.dataset.g === spec.g) { el.classList.add('gone'); it.right(); } else { el.classList.remove('try'); void el.offsetWidth; el.classList.add('try'); it.miss('other'); } } });
      } else {
        const p = () => K.say(spec.kind, { w: spec.w }); K.setPrompt(p); p();
        root.innerHTML = `<div class="card">${K.pic(WORDPIC[spec.w], 70)}<span class="word">${spec.w}</span></div><div class="row">${spec.opts.map(o => `<button class="card" data-o="${o}">${K.pic(WORDPIC[o], 60)}<span class="word" style="font-size:22px">${o}</span></button>`).join('')}</div>`;
        root.onclick = e => { const b = e.target.closest('[data-o]'); if (!b) return; K.sayText(b.dataset.o, 'en'); if (b.dataset.o === spec.ans) { b.classList.add('good'); it.right(); } else { b.classList.add('try'); it.miss('other'); } };
      }
    },
    nudge(spec) { if (spec.lv === 1) K.say('nudge1', { d: DEF[spec.w] }); else if (spec.lv === 2) K.say('nudge2'); else K.say('nudge3', { w: spec.w }); },
    example(spec) {
      if (spec.lv === 1) return K.example(`<div class="card">${K.pic(spec.w, 70)}<b>${spec.w}</b></div>`, 'ex1', { w: spec.w, d: DEF[spec.w] });
      if (spec.lv === 2) return K.example(`<div class="row"><div class="card">${K.pic(spec.w, 50)}</div><span class="letter">→</span><div class="card"><b>${K.esc(K.line(spec.g))}</b></div></div>`, 'ex2', { w: spec.w, g: K.line(spec.g) });
      K.example(`<div class="row"><div class="card">${K.pic(WORDPIC[spec.w], 50)}<b>${spec.w}</b></div><div class="card">${K.pic(WORDPIC[spec.ans], 50)}<b>${spec.ans}</b></div></div>`, 'ex3', { a: spec.w, b: spec.ans });
    },
    reveal(spec, it) { it.right(false); },
  });
})();
