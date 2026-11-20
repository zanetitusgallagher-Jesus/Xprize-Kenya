/* Mizani (the market balance scale): equal and the missing number. Original game for Somo. */
K.meta({ id: 'mizani', title: 'Mizani', title_sw: 'Mizani', skills: ['eq'], stages: [3, 4], ages: [6, 9],
  description: 'At the market scale, add sacks to make both sides balance. Level 2: 5 + 3 = ? + 2. Level 3: take sacks away to balance.',
  description_sw: 'Kwenye mizani ya sokoni, ongeza magunia ili pande zote mbili zilingane. Kiwango 2: 5 + 3 = ? + 2. Kiwango 3: toa magunia kusawazisha.',
  thumb: { bg: '#2F9E8E', bg2: '#0E3A34', icons: ['sack', 'sack'] } });
K.lines({
  intro1: { en: 'This is the market scale. Add sacks to the light side until both sides are the same. Then tap Check.', sw: 'Hii ni mizani ya sokoni. Ongeza magunia upande mwepesi hadi pande zote mbili zilingane. Kisha gusa Angalia.' },
  intro2: { en: 'Now find the number that makes both sides the same.', sw: 'Sasa tafuta namba inayofanya pande zote mbili zilingane.' },
  intro3: { en: 'Now take sacks AWAY from the heavy side to balance it.', sw: 'Sasa ONDOA magunia upande mzito kuisawazisha.' },
  add1: { en: 'This side has {a}. That side has {b}. Add sacks to make them the same.', sw: 'Upande huu una {a}. Ule una {b}. Ongeza magunia ili zilingane.' },
  eq2: { en: '{a} plus {b} is the same as what plus {c}?', sw: '{a} jumlisha {b} ni sawa na nini jumlisha {c}?' },
  take3: { en: 'This side has {a}. That side has {b}. Tap sacks on the heavy side to take them away.', sw: 'Upande huu una {a}. Ule una {b}. Gusa magunia upande mzito kuyaondoa.' },
  check: { en: 'Check', sw: 'Angalia' }, balanced: { en: 'Balanced! Both sides are {n}.', sw: 'Imesawazika! Pande zote ni {n}.' },
  nudge1: { en: 'Count both sides. Which side needs more?', sw: 'Hesabu pande zote. Upande upi unahitaji zaidi?' },
  nudge2: { en: 'First add {a} and {b}. Then think: what plus {c} makes that?', sw: 'Kwanza jumlisha {a} na {b}. Kisha fikiria: nini jumlisha {c} inafanya hivyo?' },
  ex: { en: '{a} on one side, {b} on the other. {c} more makes them the same.', sw: '{a} upande mmoja, {b} upande mwingine. {c} zaidi zinazifanya zilingane.' },
  ex2: { en: '{a} plus {b} is {s}. {d} plus {c} is {s} too.', sw: '{a} jumlisha {b} ni {s}. {d} jumlisha {c} pia ni {s}.' },
});
(() => {
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  /* a sack drawn at grid cell i of a pan (4 per row, rows stack upwards) */
  const sack = (n, i, k = '') => { const x = (i % 4) * 26 + 4, y = -Math.floor(i / 4) * 24; return `<g transform="translate(${x} ${y})" ${k ? `data-k="${k}" style="cursor:pointer"` : ''}><path d="M4 14q-5 12 0 20h18q5-8 0-20l-3-4H7z" fill="#D9B07A" stroke="#8B5A3C"/><path d="M7 10h12" stroke="#8B5A3C" stroke-width="2"/>${n != null ? `<text x="13" y="29" font-size="11" text-anchor="middle" font-weight="800" fill="#2B1E17">${n}</text>` : ''}</g>`; };
  function scale(L, R, tilt) {
    const t = Math.max(-10, Math.min(10, tilt * 2.5));
    return `<svg viewBox="0 0 340 210" width="100%" style="max-width:420px"><path d="M170 70v120M120 196h100" stroke="#7D8890" stroke-width="8" stroke-linecap="round"/><g transform="rotate(${t} 170 70)"><path d="M40 70h260" stroke="#555F66" stroke-width="6" stroke-linecap="round"/>
      <path d="M40 70l-28 74M40 70l68 74M300 70l-68 74M300 70l28 74" stroke="#9AA6AE" stroke-width="2"/>
      <g transform="translate(-4 104)">${L}</g><rect x="4" y="142" width="112" height="7" rx="3.5" fill="#9AA6AE"/>
      <g transform="translate(224 104)">${R}</g><rect x="224" y="142" width="112" height="7" rx="3.5" fill="#9AA6AE"/></g><circle cx="170" cy="70" r="8" fill="#F2B829"/></svg>`;
  }
  const sacks = (n, k) => Array.from({ length: n }, (_, i) => sack(null, i, k ? k + i : '')).join('');
  K.game({ id: 'mizani', levels: 3, skill: () => 'eq', icon: K.pic('sack', 110),
    items(lv) { return Array.from({ length: 8 }, () => { if (lv === 1) { const a = ri(4, 9), b = ri(1, a - 1); return { lv, a, b }; } if (lv === 2) { const a = ri(2, 6), b = ri(1, 4), c = ri(1, a + b - 1); return { lv, a, b, c, d: a + b - c }; } const a = ri(6, 10), b = ri(2, a - 1); return { lv, a, b }; }); },
    render(spec, it, root) {
      if (spec.lv === 2) {
        const { a, b, c, d } = spec, p = () => K.say('eq2', { a, b, c }); K.setPrompt(p); p();
        const opts = K.shuffle([...new Set([d, a + b + c, d + 1, Math.max(1, d - 1)])]).slice(0, 3); if (!opts.includes(d)) opts[0] = d;
        root.innerHTML = `<div id="sc">${scale(sack(a, 0) + sack(b, 1), sack('?', 0) + sack(c, 1), 0)}</div><div class="word">${a} + ${b} = ? + ${c}</div><div class="row">${K.shuffle(opts).map(o => `<button class="card letter" data-o="${o}">${o}</button>`).join('')}</div>`;
        root.onclick = e => { const el = e.target.closest('[data-o]'); if (!el) return; const o = +el.dataset.o; K.$('#sc', root).innerHTML = scale(sack(a, 0) + sack(b, 1), sack(o, 0) + sack(c, 1), (o + c) - (a + b));
          if (o === d) { el.classList.add('good'); K.say('balanced', { n: a + b }); it.right(false); } else { el.classList.add('try'); it.miss(o === a + b + c ? 'addedBoth' : Math.abs(o - d) === 1 ? 'offByOne' : 'other'); } };
        return;
      }
      const take = spec.lv === 3; let L = spec.a, R = spec.b; const p = () => K.say(take ? 'take3' : 'add1', { a: spec.a, b: spec.b }); K.setPrompt(p); p();
      const draw = () => { K.$('#sc', root).innerHTML = scale(sacks(L, take ? 'L' : ''), sacks(R), R - L); K.$('#cnt', root).textContent = `${L}  ${L === R ? '=' : L > R ? '>' : '<'}  ${R}`; };
      root.innerHTML = `<div id="sc"></div><div class="word" id="cnt"></div><div class="row">${take ? '' : `<button class="card letter" id="minus">−</button><button class="card letter" id="plus">+</button>`}<button class="big" id="chk">${K.esc(K.line('check'))}</button></div>`;
      draw();
      if (!take) { K.$('#plus', root).onclick = () => { if (R < 12) { R++; draw(); K.sayText(String(R), 'en'); } }; K.$('#minus', root).onclick = () => { if (R > spec.b) { R--; draw(); } }; }
      else root.addEventListener('click', e => { const g = e.target.closest('[data-k]'); if (!g || L <= 1) return; L--; draw(); K.sayText(String(L), 'en'); });
      K.$('#chk', root).onclick = () => { const ok = L === R; if (ok) { K.say('balanced', { n: L }); it.right(false); } else { it.miss(Math.abs(L - R) === 1 ? 'offByOne' : 'other'); L = spec.a; R = spec.b; draw(); } };
    },
    nudge(spec) { spec.lv === 2 ? K.say('nudge2', { a: spec.a, b: spec.b, c: spec.c }) : K.say('nudge1'); },
    example(spec) { if (spec.lv === 2) return K.example(`<div class="word">${spec.a} + ${spec.b} = ${spec.d} + ${spec.c}</div>`, 'ex2', { a: spec.a, b: spec.b, c: spec.c, d: spec.d, s: spec.a + spec.b });
      K.example(`<div class="word">${spec.a} − ${spec.b} = ${spec.a - spec.b}</div>`, 'ex', { a: spec.a, b: spec.b, c: spec.a - spec.b }); },
    reveal(spec, it) { it.right(false); },
  });
})();
