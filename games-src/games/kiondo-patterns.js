/* Kiondo Patterns: repeating bead patterns (AB, ABB, ABC), then growing number patterns. Original game for Somo. */
K.meta({ id: 'kiondo-patterns', title: 'Kiondo Patterns', title_sw: 'Mifumo ya Kiondo', skills: ['pat'], stages: [1, 2], ages: [5, 8],
  description: 'Finish the bead pattern on the kiondo strap: AB, ABB, ABC. Level 3: growing number patterns like 2, 4, 6.',
  description_sw: 'Malizia mfumo wa shanga kwenye kamba ya kiondo: AB, ABB, ABC. Kiwango 3: mifumo ya namba inayokua kama 2, 4, 6.',
  thumb: { bg: '#C2452B', bg2: '#4A1408', icons: ['basket'], extra: '<g>' + [20, 40, 60, 80, 100, 120, 140].map((x, i) => `<circle cx="${x}" cy="90" r="7" fill="${['#E8577A', '#2F6FB0'][i % 2]}"/>`).join('') + '</g>' } });
K.lines({
  intro1: { en: 'Beads for the kiondo strap! Look at the pattern and choose the next bead.', sw: 'Shanga za kamba ya kiondo! Angalia mfumo na uchague shanga inayofuata.' },
  intro2: { en: 'Harder patterns now. Say the colours out loud.', sw: 'Mifumo migumu zaidi sasa. Taja rangi kwa sauti.' },
  intro3: { en: 'Now number patterns that grow. Find the jump.', sw: 'Sasa mifumo ya namba inayokua. Tafuta kuruka.' },
  next: { en: 'Which bead comes next?', sw: 'Shanga ipi inafuata?' }, nextn: { en: 'Which number comes next?', sw: 'Namba ipi inafuata?' },
  red: { en: 'red', sw: 'nyekundu' }, blue: { en: 'blue', sw: 'buluu' }, yellow: { en: 'yellow', sw: 'njano' }, green: { en: 'green', sw: 'kijani' }, white: { en: 'white', sw: 'nyeupe' },
  nudge: { en: 'Say the pattern out loud: {p}. What comes next?', sw: 'Taja mfumo kwa sauti: {p}. Nini kinafuata?' },
  nudgen: { en: 'How much bigger is each number? Count the jump.', sw: 'Kila namba ni kubwa kwa kiasi gani? Hesabu kuruka.' },
  ex: { en: 'The part that repeats is {u}. So next is {a}.', sw: 'Sehemu inayojirudia ni {u}. Kwa hiyo inayofuata ni {a}.' },
  exn: { en: 'Each time it goes up by {j}. {last} and {j} more is {a}.', sw: 'Kila mara inaongezeka kwa {j}. {last} na {j} zaidi ni {a}.' },
});
(() => {
  const COL = { red: '#D63A3A', blue: '#2F6FB0', yellow: '#F2C230', green: '#3FA34D', white: '#F4F4F4' };
  const UNITS = { 1: ['AB'], 2: ['ABB', 'AAB', 'ABC'] };
  const bead = (c, k = '') => `<svg width="46" height="46" viewBox="0 0 46 46" ${k}><circle cx="23" cy="23" r="19" fill="${COL[c]}" stroke="#2B1E17" stroke-width="2"/><circle cx="16" cy="16" r="5" fill="#fff" opacity=".45"/></svg>`;
  K.game({ id: 'kiondo-patterns', levels: 3, skill: () => 'pat', icon: K.pic('basket', 110),
    items(lv) {
      return Array.from({ length: 8 }, () => {
        if (lv === 3) { const j = K.pick([1, 2, 2, 5, 10]), st = j * Math.floor(Math.random() * 4) + (j === 1 ? 3 : 0); const seq = [0, 1, 2, 3].map(i => st + i * j); const a = st + 4 * j; return { lv, nums: seq, a, j, opts: K.shuffle([...new Set([a, a + 1, a - 1, st + 3 * j + 1])]).slice(0, 3).concat([]).filter((v, i, x) => x.indexOf(v) === i) }; }
        const unit = K.pick(UNITS[lv]), cols = K.shuffle(Object.keys(COL)).slice(0, 3), map = { A: cols[0], B: cols[1], C: cols[2] };
        const len = lv === 1 ? 5 : 7, seq = Array.from({ length: len }, (_, i) => map[unit[i % unit.length]]), a = map[unit[len % unit.length]];
        return { lv, unit: unit.split('').map(x => map[x]), seq, a, opts: K.shuffle([...new Set(cols.slice(0, unit.includes('C') ? 3 : 2).concat(cols[2]))]) };
      }).map(s => { if (s.lv === 3 && !s.opts.includes(s.a)) s.opts[0] = s.a; return s; });
    },
    render(spec, it, root) {
      const num = spec.lv === 3, p = () => K.say(num ? 'nextn' : 'next'); K.setPrompt(p); p();
      root.innerHTML = `<div style="background:#8B5A3C;border-radius:30px;padding:10px 12px;display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:390px">${num ? spec.nums.map(n => `<span class="card letter" style="min-width:56px;min-height:56px">${n}</span>`).join('') : spec.seq.map(c => bead(c)).join('')}<span class="slot" style="min-width:56px;min-height:56px">?</span></div>
        <div class="row">${spec.opts.map(o => `<button class="card" data-o="${o}" aria-label="${num ? o : K.line(o)}">${num ? `<span class="letter">${o}</span>` : bead(o)}</button>`).join('')}</div>`;
      root.onclick = e => { const b = e.target.closest('[data-o]'); if (!b) return; const o = num ? +b.dataset.o : b.dataset.o; if (!num) K.say(o);
        if (o === spec.a) { b.classList.add('good'); K.$('.slot', root).innerHTML = num ? `<span class="letter">${o}</span>` : bead(o); it.right(); }
        else { b.classList.add('try'); it.miss(num ? (Math.abs(o - spec.a) === 1 ? 'offByOne' : 'wrongStep') : 'other'); } };
    },
    nudge(spec) { spec.lv === 3 ? K.say('nudgen') : K.say('nudge', { p: spec.seq.map(c => K.line(c)).join(', ') }); },
    example(spec) { if (spec.lv === 3) return K.example(`<div class="word">${spec.nums.join(', ')}, <u>${spec.a}</u></div>`, 'exn', { j: spec.j, last: spec.nums[3], a: spec.a });
      K.example(`<div class="row">${spec.unit.map(c => bead(c)).join('')}</div>`, 'ex', { u: spec.unit.map(c => K.line(c)).join(', '), a: K.line(spec.a) }); },
    reveal(spec, it) { it.right(false); },
  });
})();
