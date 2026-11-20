/* ============================================================================
   THE SKILL GRAPH (Nov 2026). Pure data, no browser code: tools/gen-curriculum.mjs and tools/simulate.mjs (in the
   Xprize-Kenya repo) read this same file, so CURRICULUM.md and the simulations always match the app.
   Each skill: stage (1 to 4), strand, prerequisites, names (English and Kiswahili) and its teaching steps.
   path: true = a unit on the learning path (Inspire → Interpret → Impart). path: false = a skill practised in the
   plug-in games of the games library (Michezo), opened when its prerequisites are met.
   ========================================================================== */
const SKILL_GRAPH = {
  /* numeracy */
  cnt:   { stage: 1, strand: 'Number sense', path: true, pre: [], en: 'Counting', sw: 'Kuhesabu', teach: ['Watch: touch and count each thing once', 'Together: count beans into a ten-frame', 'You: how many?'] },
  rec:   { stage: 1, strand: 'Number sense', path: true, pre: ['cnt'], en: 'Big numbers', sw: 'Namba kubwa', teach: ['Watch: tens and ones make a number', 'Together: build it with bundles', 'You: find the number you hear'] },
  facts: { stage: 2, strand: 'Adding and taking away', path: true, pre: ['cnt'], en: 'Quick sums', sw: 'Hesabu za haraka', teach: ['Watch: count on from the first number', 'Together: fingers and a number line', 'You: add and take away to 20'] },
  bond:  { stage: 2, strand: 'Adding and taking away', path: true, pre: ['facts'], en: 'Make ten', sw: 'Kufanya kumi', teach: ['Watch: partners that make ten', 'Together: fill the ten-frame', 'You: find the partner'] },
  pat:   { stage: 2, strand: 'Patterns', path: true, pre: ['cnt'], en: 'Number patterns', sw: 'Mfuatano wa namba', teach: ['Watch: find the jump', 'Together: clap and count in 2s, 5s, 10s', 'You: what comes next?'] },
  pv:    { stage: 3, strand: 'Number sense', path: true, pre: ['rec'], en: 'Tens and ones', sw: 'Makumi na mamoja', teach: ['Watch: bundles of ten', 'Together: tie sticks into tens', 'You: how many tens and ones?'] },
  mul:   { stage: 3, strand: 'Adding and taking away', path: true, pre: ['facts'], en: 'Equal groups', sw: 'Vikundi sawa', teach: ['Watch: the same in every bag', 'Together: share mangoes into cups', 'You: count the groups'] },
  add:   { stage: 4, strand: 'Adding and taking away', path: true, pre: ['facts', 'pv'], en: 'Adding', sw: 'Kujumlisha', teach: ['Watch: add the ones, then the tens', 'Together: ten ones make a new ten', 'You: add'] },
  sub:   { stage: 4, strand: 'Adding and taking away', path: true, pre: ['facts', 'pv'], en: 'Taking away', sw: 'Kutoa', teach: ['Watch: take away the ones', 'Together: open a ten when you need more', 'You: take away'] },
  wp:    { stage: 4, strand: 'Adding and taking away', path: true, pre: ['facts'], en: 'Story sums', sw: 'Hesabu za hadithi', teach: ['Watch: coming means adding, going means taking away', 'Together: act it out with beans', 'You: solve the story'] },
  mad:   { stage: 3, strand: 'Adding and taking away', path: false, pre: ['facts'], en: 'Missing number in a sum (7 + ? = 10)', sw: 'Namba inayokosekana (7 + ? = 10)', teach: ['Watch: count on from 7 up to 10', 'Together: sow seeds until you reach 10', 'You: how many did we add?'] },
  eq:    { stage: 4, strand: 'Adding and taking away', path: false, pre: ['facts'], en: 'Equal: both sides the same (5 + 3 = ? + 2)', sw: 'Sawa: pande zote mbili sawa', teach: ['Watch: a balance scale stays level when both sides are the same', 'Together: add sacks to the light side', 'You: find the number that balances'] },
  /* literacy */
  voc:   { stage: 1, strand: 'Oral language', path: false, pre: [], en: 'Word meanings (vocabulary)', sw: 'Maana ya maneno', teach: ['Watch: hear what a word means', 'Together: find it in the picture', 'You: sort words, opposites and same meanings'] },
  syl:   { stage: 1, strand: 'Sounds in words', path: false, pre: [], en: 'Syllables (beats in words)', sw: 'Silabi (mapigo katika maneno)', teach: ['Watch: clap ma-ta-tu', 'Together: tap the drum for each beat', 'You: how many beats? join two parts'] },
  fls:   { stage: 1, strand: 'Sounds in words', path: false, pre: [], en: 'First, last and middle sounds', sw: 'Sauti ya kwanza, ya mwisho na ya kati', teach: ['Watch: mmm is the first sound in mango', 'Together: say it slowly and listen', 'You: find things that start, end or have that sound'] },
  snd:   { stage: 1, strand: 'Letters and sounds', path: true, pre: [], en: 'Letter sounds', sw: 'Sauti za herufi', teach: ['Watch: trace the letter and say its sound', 'Together: s a t p i n first, then more', 'You: hear a sound, find the letter'] },
  abc:   { stage: 1, strand: 'Letters and sounds', path: true, pre: ['snd'], en: 'Letter partners (capital and small)', sw: 'Herufi kubwa na ndogo', teach: ['Watch: B and b are partners', 'Together: match the pairs', 'You: find the partner'] },
  seq:   { stage: 2, strand: 'Comprehension', path: false, pre: [], en: 'Story order and retelling', sw: 'Mpangilio wa hadithi na kusimulia', teach: ['Watch: first, next, last', 'Together: put the pictures in order', 'You: who, where and why?'] },
  rhy:   { stage: 2, strand: 'Sounds in words', path: true, pre: [], en: 'Rhyming', sw: 'Maneno yanayofanana mwisho', teach: ['Watch: cat and hat end the same', 'Together: rhyme songs', 'You: find the rhyme'] },
  seg:   { stage: 2, strand: 'Sounds in words', path: false, pre: ['fls'], en: 'Segmenting (pulling a word into its sounds)', sw: 'Kugawa neno katika sauti zake', teach: ['Watch: c-a-t has three sounds', 'Together: a bead in a box for each sound', 'You: count the sounds, then use letters'] },
  cvc:   { stage: 2, strand: 'Decoding', path: true, pre: ['snd'], en: 'Blending and spelling short words', sw: 'Kuunganisha sauti na kuandika maneno mafupi', teach: ['Watch: say each sound, push them together', 'Together: blend on the matatu', 'You: read and spell'] },
  sight: { stage: 3, strand: 'Decoding', path: true, pre: ['snd'], en: 'Tricky words', sw: 'Maneno magumu', teach: ['Watch: look at every letter of the', 'Together: say it, spell it, say it', 'You: find the tricky word'] },
  nonw:  { stage: 3, strand: 'Decoding', path: false, pre: ['cvc'], en: 'Reading made-up words (true decoding)', sw: 'Kusoma maneno ya kubuni', teach: ['Watch: zim is not a real word, but we can read it', 'Together: sound out each letter', 'You: real or silly?'] },
  fam:   { stage: 3, strand: 'Decoding', path: false, pre: ['cvc'], en: 'Word families (-at, -an, -ig, -op)', sw: 'Familia za maneno', teach: ['Watch: c + at = cat, h + at = hat', 'Together: change the first letter', 'You: make real words'] },
  dig:   { stage: 3, strand: 'Decoding', path: false, pre: ['cvc'], en: 'sh, ch, th', sw: 'sh, ch, th', teach: ['Watch: s and h together say sh', 'Together: sh-o-p, ch-i-p, th-i-n', 'You: finish the word and read it'] },
  pic:   { stage: 3, strand: 'Decoding', path: true, pre: ['cvc'], en: 'Read and find', sw: 'Soma na utafute', teach: ['Watch: read the word, find its picture', 'Together: sound it out', 'You: read and find'] },
  sent:  { stage: 4, strand: 'Comprehension', path: true, pre: ['pic', 'sight'], en: 'Sentences', sw: 'Sentensi', teach: ['Watch: small words change the picture', 'Together: read on, in, by', 'You: read the sentence, find the picture'] },
};
/* mistake tags added with the new skills (the older tags are in core.js) */
const GRAPH_TAGS = {
  firstLast: 'Mixed up the first and the last sound', syllableCount: 'Counted the beats in a word wrongly', segCount: 'Too many or too few sounds in a word',
  digraph: 'Mixed up sh, ch and th', addedBoth: 'Added both sides instead of balancing', nonWordReal: 'Called a made-up word real (or a real word made-up)',
  sequence: 'Put story events out of order',
};
if (typeof module !== 'undefined') module.exports = { SKILL_GRAPH, GRAPH_TAGS };
