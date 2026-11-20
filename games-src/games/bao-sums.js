/* Bao Sums: adding by counting on, on a simple bao-style board (our own drawing). Level 3: the missing number. Original game for Somo. */
K.meta({ id: 'bao-sums', title: 'Bao Sums', title_sw: 'Hesabu za Bao', skills: ['facts', 'mad'], stages: [2, 3], ages: [6, 9],
  description: 'Sow seeds pit by pit while Somo counts aloud, then do the sum. Level 2: start from the bigger number. Level 3: the missing number (7 + ? = 10).',
  description_sw: 'Panda mbegu shimo kwa shimo huku Somo akihesabu kwa sauti, kisha fanya hesabu. Kiwango 2: anza na namba kubwa. Kiwango 3: namba inayokosekana (7 + ? = 10).',
  thumb: { bg: '#8B5A3C', bg2: '#3A2414', icons: ['seed', 'ten'] } });
K.lines({
  intro1: { en: 'Here is our bao board. Some pits are full. Tap Sow to drop one seed in the next pit, and count on with me.', sw: 'Hii ni bao letu. Mashimo mengine yamejaa. Gusa Panda kudondosha mbegu moja kwenye shimo linalofuata, na tuhesabu pamoja.' },
  intro2: { en: 'Now start from the BIGGER number. It is faster to count on from the big one.', sw: 'Sasa anza na namba KUBWA. Ni rahisi kuendelea kuhesabu kutoka kubwa.' },
  intro3: { en: 'Now find the missing number. Sow until you reach the flag.', sw: 'Sasa tafuta namba inayokosekana. Panda hadi ufike kwenye bendera.' },
  sow: { en: 'Sow', sw: 'Panda' },
  start1: { en: 'We have {a}. Sow {b} more seeds.', sw: 'Tuna {a}. Panda mbegu {b} zaidi.' },
  pick2: { en: '{a} plus {b}. Which number do we start from?', sw: '{a} jumlisha {b}. Tuanze na namba ipi?' },
  start3: { en: 'We have {a}. How many more to make {t}? Sow to the flag.', sw: 'Tuna {a}. Ngapi zaidi kufanya {t}? Panda hadi kwenye bendera.' },
  ask: { en: 'So {a} plus {b} is how many?', sw: 'Kwa hiyo {a} jumlisha {b} ni ngapi?' },
  ask3: { en: 'How many seeds did we sow? {a} plus how many is {t}?', sw: 'Tumepanda mbegu ngapi? {a} jumlisha ngapi ni {t}?' },
  big: { en: 'Yes, the bigger one. We start at {a}.', sw: 'Ndiyo, kubwa. Tunaanza na {a}.' },
  nudgebig: { en: 'Which is bigger, {a} or {b}? Start from the bigger one.', sw: 'Ipi ni kubwa, {a} au {b}? Anza na kubwa.' },
  nudge: { en: 'Look at the last pit we sowed. Its number is the answer.', sw: 'Angalia shimo la mwisho tulilopanda. Namba yake ndiyo jibu.' },
  nudge3: { en: 'Count only the new seeds, the ones we sowed.', sw: 'Hesabu mbegu mpya tu, zile tulizopanda.' },
  ex: { en: 'Start at {a}. Count on: {seq}. {a} plus {b} is {c}.', sw: 'Anza na {a}. Endelea: {seq}. {a} jumlisha {b} ni {c}.' },
});
(() => {
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const PITS = 15;
  function board(a, sown, target) {
    const cells = Array.from({ length: PITS }, (_, i) => { const n = i + 1, full = n <= a, s = n > a && n <= a + sown; const x = 10 + (i % 8) * 40, y = i < 8 ? 14 : 62;
      return `<g><circle cx="${x + 16}" cy="${y + 16}" r="16" fill="${full ? '#5A3A22' : s ? '#4A2E1A' : '#6B4226'}" stroke="${n === target ? '#F2B829' : '#3A2414'}" stroke-width="${n === target ? 4 : 2}"/>${full || s ? `<circle cx="${x + 16}" cy="${y + 16}" r="6" fill="${s ? '#F2C230' : '#D9B07A'}"/>` : ''}<text x="${x + 16}" y="${y + 44}" font-size="11" text-anchor="middle" fill="#FFF7EA" font-weight="800">${n}</text>${n === target ? `<path d="M${x + 26} ${y - 4}v-12l10 4-10 4" fill="#D63A3A" stroke="#fff"/>` : ''}</g>`; }).join('');
    return `<svg viewBox="0 0 330 116" width="100%" style="max-width:420px;background:#8B5A3C;border-radius:18px">${cells}</svg>`;
  }
  K.game({ id: 'bao-sums', levels: 3, skill: lv => lv === 3 ? 'mad' : 'facts', icon: K.pic('seed', 110),
    items(lv) { return Array.from({ length: 8 }, () => { if (lv === 1) { const a = ri(3, 7), b = ri(2, 3); return { lv, a, b }; } if (lv === 2) { const big = ri(6, 9), small = ri(2, 4); return Math.random() < .5 ? { lv, a: small, b: big, swap: true } : { lv, a: big, b: small }; } const t = K.pick([10, 10, 9, 12]), a = ri(t - 5, t - 2); return { lv, a, t, b: t - a, skill: 'mad' }; }); },
    render(spec, it, root) {
      let start = spec.lv === 2 ? null : spec.a, add = spec.lv === 2 ? null : spec.b, sown = 0;
      const draw = () => { K.$('#board', root).innerHTML = board(start || 0, sown, spec.lv === 3 ? spec.t : 0); };
      root.innerHTML = `<div id="board"></div><div id="ctl" class="row"></div>`;
      const askSum = () => {
        const c = spec.lv === 3 ? spec.b : start + add; const opts = K.shuffle([...new Set([c, c - 1, c + 1].filter(x => x > 0))]);
        if (spec.lv === 3) K.say('ask3', { a: spec.a, t: spec.t }); else K.say('ask', { a: start, b: add }); K.setPrompt(() => spec.lv === 3 ? K.say('ask3', { a: spec.a, t: spec.t }) : K.say('ask', { a: start, b: add }));
        K.$('#ctl', root).innerHTML = `<div class="word" style="width:100%;text-align:center">${spec.lv === 3 ? `${spec.a} + ? = ${spec.t}` : `${start} + ${add} = ?`}</div>${opts.map(o => `<button class="card letter" data-o="${o}">${o}</button>`).join('')}`;
        root.onclick = e => { const b = e.target.closest('[data-o]'); if (!b) return; const o = +b.dataset.o; if (o === c) { b.classList.add('good'); it.right(); } else { b.classList.add('try'); it.miss(spec.lv === 3 ? (o === c + 1 ? 'countedStart' : 'offByOne') : (o === c - 1 ? 'countedStart' : 'offByOne')); } };
      };
      const sowing = () => {
        draw(); K.$('#ctl', root).innerHTML = `<button class="big" id="sow">${K.esc(K.line('sow'))}</button>`;
        const p = () => spec.lv === 3 ? K.say('start3', { a: spec.a, t: spec.t }) : K.say('start1', { a: start, b: add }); K.setPrompt(p); p();
        K.$('#sow', root).onclick = () => { if (spec.lv === 3 ? start + sown >= spec.t : sown >= add) return; sown++; draw(); K.sayText(String(start + sown), 'en'); if (spec.lv === 3 ? start + sown >= spec.t : sown >= add) { if (spec.lv === 3) add = sown; setTimeout(askSum, 700); } };
      };
      if (spec.lv === 2) {
        const p = () => K.say('pick2', { a: spec.a, b: spec.b }); K.setPrompt(p); p(); draw();
        K.$('#ctl', root).innerHTML = [spec.a, spec.b].map(n => `<button class="card letter" data-n="${n}">${n}</button>`).join('');
        root.onclick = e => { const b = e.target.closest('[data-n]'); if (!b || start != null) return; const n = +b.dataset.n, other = n === spec.a ? spec.b : spec.a;
          if (n > other) { start = n; add = other; K.say('big', { a: n }); root.onclick = null; sowing(); } else { b.classList.add('try'); it.miss('other'); this.bigNudge = true; } };
      } else sowing();
    },
    nudge(spec) { if (spec.lv === 2 && this.bigNudge) { this.bigNudge = false; return K.say('nudgebig', { a: spec.a, b: spec.b }); } K.say(spec.lv === 3 ? 'nudge3' : 'nudge'); },
    example(spec) { const a = spec.lv === 2 ? Math.max(spec.a, spec.b) : spec.a, b = spec.lv === 2 ? Math.min(spec.a, spec.b) : spec.b, seq = Array.from({ length: b }, (_, i) => a + i + 1).join(', ');
      K.example(`<div class="word">${a} → ${seq}</div>`, 'ex', { a, b, c: a + b, seq }); },
    reveal(spec, it) { it.right(false); },
  });
})();
