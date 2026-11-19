/* Somo Games SDK, protocol version 1. Small, no dependencies. Written for Somo (owned by the Somo team).
   A game links it with a script tag whose src is "../somo-sdk.js" (Somo puts it inside the game when it loads it).
   See GAMES.md for the protocol and the rules.

   Somo.onInit(fn)          fn(config) once Somo starts the game. config = { protocol, gameLevel, skill, language,
                            voiceOn, subtitlesOn, reducedMotion, minutesLeftToday, themeColours, practice, slow, assets }
   Somo.on(type, fn)        'pause', 'resume', 'end'
   Somo.say(text, lang)     Somo speaks it (its own voice) and shows subtitles. Use it for every instruction.
   Somo.newItem(skill, id)  a tracker for one item: t.answer(isRight, mistakeTag) → true when the item is finished;
                            t.hint() asks Somo for a hint. It sends the item message for you, once.
   Somo.item(r)             send an item result yourself: { itemId, skill, correct, firstTry, hintsUsed, ms, mistakeTag }
   Somo.levelDone(r)        { level, itemsRight, itemsTotal }
   Somo.hint()              the child asked for help
   Somo.quit()              the child wants to leave
*/
(function () {
  'use strict';
  var V = 1, inited = false, ended = false, cfg = null, hs = { init: [], pause: [], resume: [], end: [] };
  var standalone = (function () { try { return window.parent === window; } catch (e) { return false; } })();
  function send(type, data) { if (ended) return; var m = { somo: 'game', v: V, type: type, data: data || {} }; if (standalone) { if (window.console) console.log('[Somo test]', type, m.data); return; } window.parent.postMessage(m, '*'); }
  function fire(type, data) { var l = hs[type] || []; for (var i = 0; i < l.length; i++) { try { l[i](data); } catch (e) { if (window.console) console.error(e); } } }
  window.addEventListener('message', function (e) {
    if (standalone || e.source !== window.parent) return; var m = e.data;
    if (!m || typeof m !== 'object' || m.somo !== 'host' || m.v !== V || typeof m.type !== 'string') return;
    if (m.type === 'init') { if (inited) return; inited = true; cfg = m.data || {}; fire('init', cfg); }
    else if (m.type === 'end') { fire('end', m.data || {}); ended = true; }
    else if (m.type === 'pause' || m.type === 'resume') fire(m.type, m.data || {});
  });
  var Somo = {
    protocol: V,
    get config() { return cfg; },
    get standalone() { return standalone; },
    onInit: function (fn) { if (inited) fn(cfg); else hs.init.push(fn); },
    on: function (type, fn) { if (hs[type]) hs[type].push(fn); },
    say: function (text, lang) { send('say', { text: String(text || '').slice(0, 240), lang: lang === 'sw' ? 'sw' : 'en' }); },
    hint: function () { send('hint', {}); },
    quit: function () { send('quit', {}); },
    item: function (r) { send('item', r); },
    levelDone: function (r) { send('levelDone', { level: r.level | 0, itemsRight: r.itemsRight | 0, itemsTotal: r.itemsTotal | 0 }); },
    newItem: function (skill, itemId) {
      var t0 = Date.now(), first = null, tag = null, hints = 0, sent = false;
      return {
        hint: function () { hints++; Somo.hint(); },
        answer: function (isRight, mistakeTag) {
          if (sent) return true;
          if (first === null) { first = !!isRight; if (!isRight && mistakeTag) tag = String(mistakeTag); }
          if (!isRight) return false;
          sent = true;
          var r = { itemId: String(itemId || skill + '-' + t0).slice(0, 40), skill: skill, correct: first, firstTry: first && hints === 0, hintsUsed: hints, ms: Date.now() - t0 };
          if (tag) r.mistakeTag = tag;
          Somo.item(r); return true;
        },
      };
    },
  };
  window.Somo = Somo;
  /* opened on its own (not from Somo): a note and a test button that fakes Somo */
  if (standalone) {
    var show = function () {
      var d = document.createElement('div');
      d.setAttribute('style', 'position:fixed;left:8px;right:8px;bottom:8px;z-index:99999;background:#2B1E17;color:#FFF7EA;font:16px system-ui,sans-serif;padding:10px;border-radius:10px;display:flex;gap:8px;align-items:center');
      d.innerHTML = '<span style="flex:1">Open this game from Somo. Testing on its own: messages go to the console.</span>';
      var b = document.createElement('button'); b.textContent = 'Test without Somo'; b.setAttribute('style', 'font:inherit;padding:8px 12px;border-radius:8px;border:0;background:#F2B829');
      b.onclick = function () { d.remove(); inited = true; cfg = { protocol: V, gameLevel: 1, skill: null, language: 'en', voiceOn: false, subtitlesOn: true, reducedMotion: false, minutesLeftToday: 20, themeColours: { bg: '#1F140E', panel: '#2E1E15', accent: '#F2B829', good: '#3FA34D', text: '#FFF7EA' }, practice: true, slow: false, assets: {} }; fire('init', cfg); };
      d.appendChild(b); document.body.appendChild(d);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
  } else {
    var ready = function () { send('ready', { protocol: V }); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else setTimeout(ready, 0);
  }
})();
