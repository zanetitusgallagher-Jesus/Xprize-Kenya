/* ============================================================================
   FIVE MASTERY STATES (Nov 2026). Pure functions (tools/simulate.mjs runs this same file).
   0 not introduced · 1 learning · 2 practising · 3 independent · 4 mastered.
   Every answer is kept per skill as [day, right, hinted] (the last 10). An answer after a miss, with a hint or in a
   fix-it round is "hinted": it counts as practising, never as mastery.
   - learning: fewer than 3 answers.
   - independent: 3 of the last 4 right with no help.
   - mastered: 4 of the last 5 right with no help, on at least 2 different days, and the newest of them came on a
     later day than the first (a spaced review). So a skill can never be mastered in one sitting.
   The window rolls, so a skill that slips drops back a state by itself. Stars map to states: practising 1,
   independent 2, mastered 3.
   ========================================================================== */
const MSTATE = ['not introduced', 'learning', 'practising', 'independent', 'mastered'];
function masteryState(h) {
  if (!h || !h.length) return 0; if (h.length < 3) return 1;
  const alone = x => x[1] && !x[2];
  const l5 = h.slice(-5), ok5 = l5.filter(alone);
  if (l5.length >= 5 && ok5.length >= 4) { const days = [...new Set(ok5.map(x => x[0]))]; if (days.length >= 2 && ok5[ok5.length - 1][0] !== ok5[0][0]) return 4; }
  const l4 = h.slice(-4); if (l4.length >= 4 && l4.filter(alone).length >= 3) return 3;
  return 2;
}
const stateStars = s => s >= 4 ? 3 : s >= 3 ? 2 : s >= 2 ? 1 : 0;
if (typeof module !== 'undefined') module.exports = { masteryState, stateStars, MSTATE };
