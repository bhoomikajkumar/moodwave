/* Moodwave - every sound is synthesized live in the browser (Web Audio API). No audio files. */

// 7-note scales used for chords and melodies
var SC = {
  dor:  [0,2,3,5,7,9,10],
  lyd:  [0,2,4,6,7,9,11],
  nmin: [0,2,3,5,7,8,10],
  ion:  [0,2,4,5,7,9,11],
  mix:  [0,2,4,5,7,9,10]
};

// Mood data: name, emoji, group, tagline, colour a, colour b, breathing pattern, why, tip, tracks
// A track is [title, BPM, root MIDI note, scale]
function M(n,e,g,s,a,b,br,why,tip,tr){return {n:n,e:e,g:g,s:s,a:a,b:b,br:br,why:why,tip:tip,tr:tr};}
var moods = [
  M("Focus","🎧","Daily","Calm and steady","#3a56ff","#00c2ff",0,
    "A steady tempo with no lyrics helps you stay on one task.","Work in 25 minute blocks with 5 minute breaks.",
    [["Night Desk",100,52,"nmin"],["Paper Lanterns",86,62,"mix"],["Deep Work",72,57,"dor"],["Quiet Library",60,53,"lyd"]]),
  M("Chill","☀️","Daily","Slow and sunny","#ff7ab8","#ffb86b",0,
    "Slow, sunny sounds help you relax after a busy day.","Take a short screen break and stretch.",
    [["Lemon Light",100,60,"lyd"],["Slow Sunday",88,55,"ion"],["Soft Landing",76,57,"dor"],["Hammock",64,50,"ion"]]),
  M("Energy","⚡","Daily","Fast and loud","#ff3d3d","#ffb000",0,
    "A fast beat can help you get started when you feel sluggish.","Keep the volume moderate to protect your hearing.",
    [["Main Stage",160,55,"nmin"],["Sprint",144,57,"nmin"],["Last Lap",128,59,"mix"],["Turbo Chai",112,62,"dor"]]),
  M("Rainy","🌧️","Daily","Soft and wet","#2fa39f","#7a63e6",0,
    "Soft rain sound can cover distracting background noise.","Good for reading or writing in a journal.",
    [["Umbrella Walk",86,50,"nmin"],["Puddles",74,57,"dor"],["Window Seat",62,53,"nmin"],["Thunder Tea",52,55,"dor"]]),
  M("Night Drive","🌃","Daily","Neon and smooth","#b042ff","#ff2e9a",0,
    "A smooth beat suits a late-night study session.","Take a break every hour and drink some water.",
    [["Streetlamp",124,55,"nmin"],["Neon Highway",110,52,"nmin"],["Tunnel Lights",98,57,"dor"],["Midnight Exit",86,50,"nmin"]]),
  M("Sleep","🌙","Wellness","Drift off gently","#2a2f7a","#6c5ce7",[4,7,8,0],
    "Very slow music with no drums and a soft ocean sound makes it easier to relax before bed.","Dim the screen, set the sleep timer, and follow the 4-7-8 breathing circle.",
    [["Last Light",58,47,"ion"],["Slow Tide",52,50,"lyd"],["Drift",46,48,"ion"],["Moonlit",40,45,"nmin"]]),
  M("Calm Anxiety","🕊️","Wellness","Ease racing thoughts","#3ec6b0","#8fd3ff",[4,2,6,0],
    "A slow, steady pulse and long exhales help your body settle when your thoughts race.","Breathe with the circle for a few minutes. Name 5 things you can see around you.",
    [["Safe Harbor",74,53,"ion"],["Still Water",64,55,"dor"],["Soft Ground",56,50,"lyd"],["Exhale",48,52,"ion"]]),
  M("Meditate","🧘","Wellness","Quiet the mind","#a56bff","#ffd27a",0,
    "Simple, repeating sounds give your mind one thing to rest on.","Sit comfortably and follow the sound. When your mind wanders, gently come back.",
    [["Inner Garden",70,47,"ion"],["Open Sky",60,50,"lyd"],["Stillness",52,48,"lyd"],["Temple Bell",44,52,"dor"]]),
  M("Breathe","💨","Wellness","Guided box breathing","#3d8bff","#9bf6ff",[4,4,4,4],
    "Box breathing is in for 4, hold for 4, out for 4, hold for 4. The circle guides every step.","Do 4 to 6 rounds. Stop and breathe normally if you feel dizzy.",
    [["Four Counts",90,48,"dor"],["Square Calm",75,55,"ion"],["In and Out",60,53,"ion"],["Slow Tide Breath",45,50,"lyd"]]),
  M("Stress Relief","🍃","Wellness","Release the tension","#ff8a65","#ffcf70",0,
    "Warm tones and a relaxed tempo can help you let go of tension after a hard day.","Roll your shoulders and unclench your jaw as you listen.",
    [["Loosen Up",90,52,"lyd"],["Set It Down",78,50,"mix"],["Unwind",66,55,"ion"],["Warm Shower",54,57,"ion"]]),
  M("Exam Calm","📖","Wellness","Settle before a test","#4e8cff","#b6a3ff",[4,2,6,0],
    "A calm tempo and slow breathing can help steady your nerves before a test.","Listen for 10 minutes before the exam and breathe slowly. Revise before, not during.",
    [["You Got This",92,57,"ion"],["Clear Head",80,55,"lyd"],["Before the Bell",70,53,"ion"],["Steady Hands",60,50,"dor"]]),
  M("Uplift","🌻","Wellness","Lift a low mood","#ffcc33","#ff7a8a",0,
    "Bright, major-key music with a lively beat can lift your energy on a slow day.","Open a window, stand up and stretch for one song.",
    [["Sunny Steps",130,59,"ion"],["Small Wins",116,60,"lyd"],["Good Morning Sun",102,57,"ion"],["Bright Side",88,55,"ion"]]),
  M("Walk","🚶","Wellness","Steady steps outside","#8ee05a","#35c2a0",0,
    "A steady beat that matches your steps makes it easier to keep going. Pick a track near your pace: about 100 BPM for a stroll, 120 or more for a brisk walk.","Walk for 10 minutes. A short daily walk is good for body and mood.",
    [["Sunset Stride",130,53,"lyd"],["Neighborhood Loop",118,57,"ion"],["City Stroll",106,60,"ion"],["Park Path",94,55,"mix"]]),
  M("Creative Flow","🎨","Wellness","Ideas on tap","#ff6bd6","#6b8bff",0,
    "A steady groove with a gentle melody keeps you moving without distracting you.","Keep a notebook open and write down every idea, even the bad ones.",
    [["Studio Light",108,60,"mix"],["Sketchbook",96,55,"lyd"],["Blank Canvas",84,57,"dor"],["Late Idea",72,52,"dor"]]),
  M("Comfort","🤍","Wellness","For a hard day","#7a7fd6","#f2a6c0",0,
    "Soft music can keep you company on a hard day.","Talking to a friend, family member or counsellor can help even more. In India you can call Tele-MANAS on 14416.",
    [["Tomorrow",80,57,"lyd"],["Gentle Rain Day",70,50,"ion"],["Not Alone",60,53,"lyd"],["Hold On",52,55,"ion"]])
];

/* Sound design per mood. Each mood has its own instruments, rhythm, harmony, effects and ambience.
   cl      bars per chord            progs  chord progressions (scale degrees), one per track
   pd      sustained pad             ch     chords (held, or on a step pattern)
   bs      bass                      ar     arpeggio              ml  melody (generated phrases)
   eu      polyrhythm layers         dr     drums (16-step grid)
   am      ambient beds              drop/thun/crk/tan/bowl/ht  rain drops, thunder, vinyl, tanpura, bowls, heartbeat
   fx      filter cutoff, reverb send, delay [beats, feedback, wet]
   flat    no intro/outro layering   duck   sidechain pump          sw  swing           */
var STY = {
  "Focus": {cl:2, vol:1.25,
    progs:[[0,5,3,4],[0,3,5,4],[0,4,5,3],[5,3,0,4]],
    pd:{i:"string", g:.045, n:3, a:1.6, cut:900},
    bs:{i:"sub", g:.15, hold:1, a:.4},
    ar:{i:"syn", g:.065, gr:2, ord:[0,2,1,2,0,2,1,3], o:12, ty:"triangle", cut:1500, ln:3},
    dr:{k:[0,4,8,12], kg:.26, hh:[2,6,10,14], hg:.03},
    fx:{cut:2600, rev:.35, dly:[.75,.34,.26]}},

  "Chill": {cl:1, vol:1.1, sw:.75, tape:.014,
    progs:[[1,4,0,5],[3,4,2,5],[0,5,1,4],[5,1,4,0]],
    ch:{i:"ep", g:.07, n:4, pat:[0,6,10], ln:5, strum:.015},
    bs:{i:"sub", g:.2, pat:[[0,0,6],[10,1,4]]},
    ml:{i:"ep", g:.045, o:12, n:5, pent:false, grid:[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30], ln:6},
    dr:{k:[0,10], kg:.55, sn:[4,12], sg:.22, hh:[0,2,4,6,8,10,12,14], hg:.05},
    crk:.16, am:["hiss"], ag:1.6,
    fx:{cut:1900, rev:.22, dly:[.75,.25,.12]}},

  "Energy": {cl:1, vol:.95, duck:1, brk:1, riser:1, crash:1,
    progs:[[0,5,2,6],[0,6,5,6],[5,3,0,4],[0,2,5,4]],
    pd:{i:"saw", g:.035, n:3, a:.15, cut:2600},
    ch:{i:"stab", g:.06, n:3, pat:[2,6,10,14], ln:2, lv:2},
    bs:{i:"saw", g:.19, pat:[[2,0,2],[6,0,2],[10,0,2],[14,0,2]], cut:650},
    ar:{i:"lead", g:.03, gr:1, ord:[0,1,2,4,2,1,2,1,0,1,2,4,5,4,2,1], o:12, ln:1, pr:.85},
    dr:{k:[0,4,8,12], kg:.95, cl:[4,12], clg:.4, hh:[1,3,5,7,9,11,13,15], hg:.04, oh:[2,6,10,14], ohg:.08, fill:1},
    fx:{cut:7000, rev:.12, dly:[.75,.25,.16]}},

  "Rainy": {cl:2, vol:1.2, flat:1,
    progs:[[0,5,2,6],[0,3,6,2],[5,3,0,4],[0,6,5,4]],
    pd:{i:"warm", g:.025, n:3, a:2},
    ch:{i:"piano", g:.07, n:4, hold:1, ln:28, strum:.16},
    bs:{i:"sub", g:.12, hold:1, a:.3},
    ml:{i:"piano", g:.065, o:12, n:3, ln:10},
    am:["rain"], ag:1.8, drop:.3, thun:.1,
    fx:{cut:3200, rev:.6, dly:[.75,.25,.18]}},

  "Night Drive": {cl:2, vol:1, brk:1,
    progs:[[0,5,2,6],[0,6,4,5],[0,3,5,6],[5,3,6,0]],
    pd:{i:"saw", g:.04, n:3, a:.5, cut:1300},
    bs:{i:"saw", g:.15, pat:[[0,0,2],[2,0,2],[4,0,2],[6,0,2],[8,0,2],[10,0,2],[12,0,2],[14,0,2]], cut:420},
    ar:{i:"syn", g:.035, gr:1, ord:[0,1,2,1,0,2,1,2,3,2,1,2,0,1,2,4], o:12, ty:"sawtooth", cut:1700, ln:1, lv:2},
    ml:{i:"lead", g:.04, o:12, n:6, grid:[0,3,6,10,12,16,19,22,26,28], ln:6},
    dr:{k:[0,4,8,12], kg:.65, sn:[4,12], sg:.3, hh:[2,6,10,14], hg:.05, fill:1},
    fx:{cut:3400, rev:.45, dly:[.75,.38,.3]}},

  "Sleep": {cl:4, vol:1.4, flat:1,
    progs:[[0,5,3,4],[0,3,5,3],[0,4,5,3],[5,3,0,4]],
    pd:{i:"glass", g:.06, n:3, a:3.5},
    bs:{i:"sub", g:.12, hold:1, a:.8},
    ml:{i:"bell", g:.04, o:12, n:2, ln:14, pr:.4},
    am:["ocean"], ag:1.7,
    fx:{cut:1000, rev:.75}},

  "Calm Anxiety": {cl:2, vol:1.25, flat:1,
    progs:[[0,5,3,4],[0,3,4,3],[0,2,5,4],[5,3,0,4]],
    pd:{i:"string", g:.05, n:3, a:1.8, cut:1000},
    bs:{i:"sub", g:.1, hold:1, a:.6},
    ml:{i:"ooh", g:.05, o:12, n:3, grid:[0,8,16,24], ln:14, a:.6, pr:.8},
    ht:.4, hr:[76,54], am:["wind"],
    fx:{cut:1600, rev:.5}},

  "Meditate": {cl:4, vol:1.3, flat:1,
    progs:[[0,0,0,0],[0,0,4,0],[0,0,2,0],[0,0,3,0]],
    ml:{i:"flute", g:.06, o:12, n:5, grid:[0,4,6,8,12,16,20,24,28], ln:10, pr:.9},
    tan:.06, bowl:[2,0], bg:.11,
    fx:{cut:2200, rev:.55, dly:[.75,.2,.12]}},

  "Breathe": {cl:2, vol:1.3, flat:1, cue:1, bh:[.02,.11],
    progs:[[0,5,3,4],[0,3,5,4],[0,4,3,5],[5,3,0,4]],
    pd:{i:"glass", g:.03, n:3, a:2.5},
    ar:{i:"bell", g:.016, gr:4, ord:[0,2,1,2], o:12, ln:6, r:3.5},
    fx:{cut:1500, rev:.6, dly:[.75,.2,.1]}},

  "Stress Relief": {cl:2, vol:1.2,
    progs:[[0,4,5,3],[0,5,3,4],[0,3,0,4],[3,0,4,5]],
    pd:{i:"warm", g:.03, n:3, a:1},
    bs:{i:"sub", g:.12, pat:[[0,0,14]], a:.02},
    ar:{i:"ks", g:.09, gr:2, ord:[0,2,3,2,1,2,3,2], o:0, dur:1.6, sm:2},
    ml:{i:"ks", g:.08, o:12, n:3, grid:[0,4,8,16,20,24], ln:8, pr:.8, dur:1.8, sm:2},
    dr:{sh:[2,6,10,14], shg:.03, lv:1},
    fx:{cut:4200, rev:.32, dly:[.75,.22,.12]}},

  "Exam Calm": {cl:2, vol:1.15,
    progs:[[0,5,3,4],[0,3,5,4],[0,4,5,3],[0,2,3,4]],
    pd:{i:"string", g:.04, n:3, a:1.2, cut:1300},
    bs:{i:"sub", g:.13, hold:1, a:.2},
    ar:{i:"mal", g:.075, gr:4, ord:[0,1,2,4], o:12, ln:4},
    dr:{tk:[0,4,8,12], tkg:.05, lv:1},
    fx:{cut:2600, rev:.3, dly:[.75,.2,.14]}},

  "Uplift": {cl:1, vol:1, brk:1, lift:2,
    progs:[[0,4,5,3],[0,3,4,3],[5,3,0,4],[0,5,3,4]],
    pd:{i:"warm", g:.03, n:3, a:.4},
    ch:{i:"syn", g:.05, n:3, pat:[0,6,8,14], ln:3, ty:"square", cut:2600},
    bs:{i:"sub", g:.19, pat:[[0,0,3],[6,0,2],[8,1,3],[14,0,2]]},
    ml:{i:"bell", g:.07, o:12, n:9, grid:[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30], ln:3, r:4.2},
    dr:{k:[0,8], kg:.5, cl:[4,12], clg:.28, sh:[2,6,10,14], shg:.06},
    fx:{cut:5000, rev:.22, dly:[.75,.2,.12]}},

  "Walk": {cl:1, vol:1.05, sw:.15,
    progs:[[0,3,4,0],[0,4,3,4],[0,5,3,4],[0,3,0,4]],
    ch:{i:"ks", g:.075, n:3, pat:[4,6,12,14], ln:3, strum:.025, dur:.9, sm:1},
    bs:{i:"sub", g:.2, pat:[[0,0,3],[8,1,3]]},
    ml:{i:"whis", g:.05, o:12, n:6, grid:[0,4,6,8,12,16,20,22,24,28], ln:5, pr:.9},
    dr:{k:[0,4,8,12], kg:.4, cl:[4,12], clg:.22, sh:[0,2,4,6,8,10,12,14], shg:.04, tk:[2,6,10,14], tkg:.05},
    fx:{cut:4800, rev:.2}},

  "Creative Flow": {cl:2, vol:1.1, sw:.2,
    progs:[[1,4,0,5],[0,3,1,4],[2,5,1,4],[0,1,3,4]],
    pd:{i:"warm", g:.035, n:4, a:.9},
    bs:{i:"sub", g:.15, pat:[[0,0,5],[6,0,3],[10,1,4]]},
    eu:[{i:"kal", g:.075, k:5, n:16, degs:[0,2,1,4,2,3], o:12, rot:0},
        {i:"mal", g:.06, k:3, n:12, degs:[2,4,0,3], o:0, rot:1},
        {i:"bell", g:.035, k:7, n:20, degs:[4,2,5,3,6], o:12, rot:3, ln:6}],
    dr:{k:[0,7,10], kg:.35, rm:[3,9,14], rmg:.05, sh:[2,6,10,14], shg:.035, lv:1},
    fx:{cut:3200, rev:.3, dly:[.75,.3,.2]}},

  "Comfort": {cl:2, vol:1.2, flat:1,
    progs:[[0,5,3,4],[0,3,0,4],[0,4,5,3],[5,3,0,4]],
    pd:{i:"string", g:.035, n:3, a:1.5, cut:1000},
    ch:{i:"piano", g:.06, n:3, hold:1, ln:28, strum:.2},
    bs:{i:"sub", g:.11, hold:1, a:.5},
    ml:{i:"bell", g:.05, o:12, n:6, ln:6, r:4.2, pr:.9},
    fx:{cut:2200, rev:.5, dly:[.75,.2,.14]}}
};

var $ = function (id) { return document.getElementById(id); };
var mi = 0, ti = 0, grp = "All", playing = false, started = false, bStart = 0, sleepT = null;
var ctx, master, comp, an, conv, noiseBuf, timer, T = null, C = null, step = 0, nextT = 0, KSC = {};

// ---------- Mood groups and tiles ----------
$("groups").innerHTML = ["All","Daily","Wellness"].map(function (g) {
  var n = moods.filter(function (m) { return g === "All" || m.g === g; }).length;
  return '<button type="button" aria-pressed="' + (g === grp) + '">' + g + " (" + n + ")</button>";
}).join("");
$("groups").onclick = function (e) {
  var b = e.target.closest("button"); if (!b) return;
  grp = b.textContent.split(" ")[0];
  [].forEach.call($("groups").children, function (x) { x.setAttribute("aria-pressed", x === b); });
  renderTiles();
};
function renderTiles() {
  $("moods").innerHTML = moods.map(function (m, i) {
    if (grp !== "All" && m.g !== grp) return "";
    return '<button type="button" data-i="' + i + '" style="--c1:' + m.a + ';--c2:' + m.b + '" aria-pressed="' + (i === mi) + '"><em>' + m.e + "</em>" + m.n + "<small>" + m.s + "</small></button>";
  }).join("");
}
$("moods").onclick = function (e) { var b = e.target.closest("button"); if (b) setMood(+b.dataset.i, true); };
function setMood(i, go) {
  mi = i; ti = 0;
  document.documentElement.style.setProperty("--a", moods[i].a);
  document.documentElement.style.setProperty("--b", moods[i].b);
  renderTiles(); renderList(); showHelp();
  if (go) load(0);
  $("nMood").textContent = moods[i].n;
  if (!go) $("nTrack").textContent = "Press play";
}
function showHelp() {
  var m = moods[mi];
  $("help").innerHTML = "<div><h3>Why " + m.n + " helps</h3><p>" + m.why + "</p></div><div><h3>Try this</h3><p>" + m.tip + "</p></div>";
}
function renderList() {
  $("list").innerHTML = moods[mi].tr.map(function (t, i) {
    var on = i === ti && started;
    return '<li class="' + (on ? "on" : "") + '"><button type="button" data-i="' + i + '">' + (on ? "<u><i></i><i></i><i></i></u>" : "") + t[0] + "<span>" + tempoBars(i) + tempoWord(i) + " &middot; " + t[1] + " BPM</span></button></li>";
  }).join("");
}
$("list").onclick = function (e) { var b = e.target.closest("button"); if (b) load(+b.dataset.i); };

// ---------- Tempo labels ----------
// Each mood's 4 tracks are sorted fastest to slowest, so position in the list = relative speed.
var TL = ["Fastest", "Fast", "Slow", "Slowest"];
function tempoWord(i) { return TL[i] || ""; }
function tempoBars(i) { var o = "", k; for (k = 0; k < 4; k++) o += "<b" + (k < 4 - i ? ' class="f"' : "") + "></b>"; return "<s>" + o + "</s>"; }

// ---------- Helpers ----------
function mf(m) { return 440 * Math.pow(2, (m - 69) / 12); }                       // MIDI note to Hz
function dg(sc, i) { var L = sc.length; return sc[((i % L) + L) % L] + 12 * Math.floor(i / L); } // scale degree to semitones
function fit(m, lo, hi) { while (m < lo) m += 12; while (m > hi) m -= 12; return m; }
function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
function has(a, v) { return !!a && a.indexOf(v) >= 0; }
function hs(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function euc(k, n) { var a = [], i; for (i = 0; i < n; i++) a.push(((i * k) % n) < k ? 1 : 0); return a; }
function snap(x, d0, L) { var best = x, bd = 99, j, q, c; for (j = 0; j < 3; j++) for (q = -1; q <= 1; q++) { c = d0 + 2 * j + q * L; if (Math.abs(c - x) < bd) { bd = Math.abs(c - x); best = c; } } return best; }

// ---------- Audio graph ----------
function makeIR(sec) {
  var n = (ctx.sampleRate * sec) | 0, b = ctx.createBuffer(2, n, ctx.sampleRate), c, i, d, lp, w;
  for (c = 0; c < 2; c++) { d = b.getChannelData(c); lp = 0; for (i = 0; i < n; i++) { w = Math.random() * 2 - 1; lp += (w - lp) * .35; d[i] = lp * Math.pow(1 - i / n, 2.6); } }
  return b;
}
function build() {
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  master = ctx.createGain(); master.gain.value = +$("vol").value;
  comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.knee.value = 12; comp.ratio.value = 3; comp.attack.value = .01; comp.release.value = .25;
  an = ctx.createAnalyser(); an.fftSize = 256; an.smoothingTimeConstant = .8;
  master.connect(comp); comp.connect(an); an.connect(ctx.destination);
  conv = ctx.createConvolver(); conv.buffer = makeIR(3.8); conv.connect(master);
  noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
  var d = noiseBuf.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  timer = setInterval(tick, 30);
}
// Every track gets its own mixer so the previous track can be faded out cleanly.
function mkTrack(st) {
  var o = {srcs: []}, fx = st.fx, fb, wet, dr;
  o.tg = ctx.createGain(); o.tg.gain.value = st.vol || 1; o.tg.connect(master);
  o.ib = ctx.createGain(); o.duck = ctx.createGain(); o.filt = ctx.createBiquadFilter();
  o.filt.type = "lowpass"; o.filt.frequency.value = fx.cut; o.filt.Q.value = .4;
  o.ib.connect(o.duck); o.duck.connect(o.filt); o.filt.connect(o.tg);
  o.rs = ctx.createGain(); o.rs.gain.value = fx.rev; o.filt.connect(o.rs); o.rs.connect(conv);
  o.dl = ctx.createDelay(2); fb = ctx.createGain(); wet = ctx.createGain();
  fb.gain.value = fx.dly ? fx.dly[1] : 0; wet.gain.value = fx.dly ? fx.dly[2] : 0;
  o.filt.connect(o.dl); o.dl.connect(fb); fb.connect(o.dl); o.dl.connect(wet); wet.connect(o.tg);
  o.db = ctx.createGain(); o.db.connect(o.tg);                      // drums skip the filter
  dr = ctx.createGain(); dr.gain.value = .1; o.db.connect(dr); dr.connect(conv);
  o.ag = ctx.createGain(); o.ag.connect(o.tg);                      // ambience
  return o;
}
function kill(o, fade) {
  var n = ctx.currentTime;
  [o.ib, o.db, o.ag].forEach(function (g) { g.gain.cancelScheduledValues(n); g.gain.setValueAtTime(g.gain.value, n); g.gain.linearRampToValueAtTime(.0001, n + fade); });
  setTimeout(function () {
    o.srcs.forEach(function (s) { try { s.stop(); } catch (e) {} });
    try { o.tg.disconnect(); o.rs.disconnect(); } catch (e) {}
  }, (fade + 4) * 1000);
}

// ---------- Ambient beds ----------
function bed(o, type, f, q, g, mod, mu) {
  mu = mu || 1; g *= mu; if (mod) mod = [mod[0], mod[1] * mu, mod[2]];
  var s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), ga = ctx.createGain(), l, lg, lf;
  s.buffer = noiseBuf; s.loop = true; fl.type = type; fl.frequency.value = f; fl.Q.value = q;
  ga.gain.value = g; s.connect(fl); fl.connect(ga); ga.connect(o.ag); s.start(0, Math.random() * 3); o.srcs.push(s);
  if (mod) {
    l = ctx.createOscillator(); l.frequency.value = mod[0]; lg = ctx.createGain(); lg.gain.value = mod[1];
    l.connect(lg); lg.connect(ga.gain);
    if (mod[2]) { lf = ctx.createGain(); lf.gain.value = mod[2]; l.connect(lf); lf.connect(fl.frequency); }
    l.start(); o.srcs.push(l);
  }
}
function startAmb(o, st) {
  var n = ctx.currentTime;
  o.ag.gain.setValueAtTime(.0001, n); o.ag.gain.linearRampToValueAtTime(1, n + 2);
  var mu = st.ag || 1;
  (st.am || []).forEach(function (k) {
    if (k === "ocean") { bed(o, "lowpass", 520, .6, .05, [.09, .04, 260], mu); bed(o, "lowpass", 1500, .5, .012, [.13, .01, 500], mu); }
    else if (k === "rain") { bed(o, "bandpass", 3600, .4, .07, 0, mu); bed(o, "lowpass", 700, .5, .03, 0, mu); }
    else if (k === "wind") bed(o, "bandpass", 500, 1.2, .035, [.05, .02, 220], mu);
    else if (k === "hiss") bed(o, "highpass", 5000, .5, .008, 0, mu);
  });
}

// ---------- Instruments ----------
function padV(f, t, d, g, ty, att, cut, det) {
  var a = ctx.createGain(), fl = ctx.createBiquadFilter(), hold = Math.max(t + att + .01, t + d), end = hold + Math.min(2.5, d * .4);
  fl.type = "lowpass"; fl.frequency.value = cut; fl.Q.value = .3;
  g = g / Math.sqrt(det.length);
  a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(g, t + att); a.gain.setValueAtTime(g, hold); a.gain.linearRampToValueAtTime(.0001, end);
  fl.connect(a); a.connect(T.ib);
  det.forEach(function (c) { var o = ctx.createOscillator(); o.type = ty; o.frequency.value = f; o.detune.value = c; o.connect(fl); o.start(t); o.stop(end + .05); });
}
function bassV(f, t, d, g, ty, cut, att) {
  var o = ctx.createOscillator(), fl = ctx.createBiquadFilter(), a = ctx.createGain(), ah = t + Math.max(att + .02, d * .75), rl = Math.max(.08, d * .25);
  o.type = ty; o.frequency.value = f; fl.type = "lowpass"; fl.Q.value = 1;
  fl.frequency.setValueAtTime(cut * 2.2, t); fl.frequency.exponentialRampToValueAtTime(cut, t + .15);
  a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(g, t + att); a.gain.setValueAtTime(g, ah); a.gain.exponentialRampToValueAtTime(.0001, ah + rl);
  o.connect(fl); fl.connect(a); a.connect(T.ib); o.start(t); o.stop(ah + rl + .05);
}
function synV(f, t, d, g, ty, cut) {          // filtered synth pluck
  var o = ctx.createOscillator(), fl = ctx.createBiquadFilter(), a = ctx.createGain(), dur = Math.max(.15, d);
  o.type = ty; o.frequency.value = f; fl.type = "lowpass"; fl.Q.value = 1.5;
  fl.frequency.setValueAtTime(cut * 3.2, t); fl.frequency.exponentialRampToValueAtTime(cut, t + .18);
  a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(g, t + .006); a.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.connect(fl); fl.connect(a); a.connect(T.ib); o.start(t); o.stop(t + dur + .05);
}
function leadV(f, t, d, g) {                  // detuned saw lead with filter sweep
  var fl = ctx.createBiquadFilter(), a = ctx.createGain(), end = t + d + .12;
  fl.type = "lowpass"; fl.Q.value = 3; fl.frequency.setValueAtTime(4200, t); fl.frequency.exponentialRampToValueAtTime(900, t + Math.max(.1, d));
  a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(g, t + .01); a.gain.setValueAtTime(g, Math.max(t + .02, t + d * .6)); a.gain.linearRampToValueAtTime(.0001, end);
  fl.connect(a); a.connect(T.ib);
  [-9, 9].forEach(function (c) { var o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = f; o.detune.value = c; o.connect(fl); o.start(t); o.stop(end + .05); });
}
function stabV(f, t, d, g) {                  // short supersaw chord stab
  var fl = ctx.createBiquadFilter(), a = ctx.createGain(), dur = Math.max(.14, d);
  fl.type = "lowpass"; fl.Q.value = 2; fl.frequency.setValueAtTime(5000, t); fl.frequency.exponentialRampToValueAtTime(1400, t + .12);
  a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(g / 1.7, t + .004); a.gain.exponentialRampToValueAtTime(.0001, t + dur);
  fl.connect(a); a.connect(T.ib);
  [-12, 0, 12].forEach(function (c) { var o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = f; o.detune.value = c; o.connect(fl); o.start(t); o.stop(t + dur + .05); });
}
function pianoV(f, t, d, g) {                 // additive felt piano
  var dur = clamp(d * 1.3, 1.4, 5), a = ctx.createGain(), fl = ctx.createBiquadFilter();
  fl.type = "lowpass"; fl.frequency.value = clamp(f * 6, 1500, 5000); a.connect(fl); fl.connect(T.ib);
  a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(g, t + .005); a.gain.exponentialRampToValueAtTime(g * .3, t + .5); a.gain.exponentialRampToValueAtTime(.0001, t + dur);
  [[1, 1, "triangle"], [2, .3, "sine"], [3, .12, "sine"], [4, .05, "sine"]].forEach(function (p, k) {
    var o = ctx.createOscillator(), pg = ctx.createGain(); o.type = p[2]; o.frequency.value = f * p[0];
    pg.gain.setValueAtTime(p[1], t); pg.gain.exponentialRampToValueAtTime(.001, t + dur / (1 + k * .9));
    o.connect(pg); pg.connect(a); o.start(t); o.stop(t + dur + .05);
  });
}
function fmV(f, t, g, r, i0, i1, ti, dur, att) {   // FM voice: electric piano, bells, marimba, kalimba
  var c = ctx.createOscillator(), m = ctx.createOscillator(), mg = ctx.createGain(), a = ctx.createGain();
  c.frequency.value = f; m.frequency.value = f * r;
  mg.gain.setValueAtTime(i0 * f * r, t); mg.gain.exponentialRampToValueAtTime(Math.max(.01, i1 * f * r), t + ti);
  m.connect(mg); mg.connect(c.frequency);
  a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(g, t + att); a.gain.exponentialRampToValueAtTime(.0001, t + dur);
  c.connect(a); a.connect(T.ib); c.start(t); m.start(t); c.stop(t + dur + .05); m.stop(t + dur + .05);
}
function bellV(f, t, d, g, r) { var dur = clamp(d, 1.2, 4); fmV(f, t, g, r || 3.5, 1.5, .05, dur * .6, dur, .003); }
function ksBuf(f, dur, sm) {                  // Karplus-Strong plucked string
  var key = Math.round(f) + "|" + dur + "|" + sm;
  if (KSC[key]) return KSC[key];
  var sr = ctx.sampleRate, n = (sr * dur) | 0, p = Math.max(2, Math.round(sr / f)), b = ctx.createBuffer(1, n, sr), d = b.getChannelData(0), i, j, mx = 0;
  for (i = 0; i <= p; i++) d[i] = Math.random() * 2 - 1;
  for (j = 0; j < sm; j++) for (i = 1; i < p; i++) d[i] = (d[i - 1] + d[i] + d[i + 1]) / 3;
  for (i = 0; i <= p; i++) mx = Math.max(mx, Math.abs(d[i]));
  for (i = 0; i <= p; i++) d[i] /= (mx || 1);
  var loss = clamp(.004 * Math.sqrt(f / 220), .002, .012);
  for (i = p + 1; i < n; i++) d[i] = (1 - loss) * .5 * (d[i - p] + d[i - p - 1]);
  KSC[key] = b; return b;
}
function ksV(f, t, g, dur, sm) {
  var s = ctx.createBufferSource(), a = ctx.createGain(), fl = ctx.createBiquadFilter();
  s.buffer = ksBuf(f, dur, sm); fl.type = "lowpass"; fl.frequency.value = 4200;
  a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(g, t + .002); a.gain.setValueAtTime(g, t + dur - .2); a.gain.linearRampToValueAtTime(.0001, t + dur);
  s.connect(fl); fl.connect(a); a.connect(T.ib); s.start(t); s.stop(t + dur + .02);
}
function fluteV(f, t, d, g, vib, att) {        // flute / whistle with vibrato
  var o = ctx.createOscillator(), o2 = ctx.createOscillator(), l = ctx.createOscillator(), lg = ctx.createGain(), a = ctx.createGain(), g2 = ctx.createGain();
  var hold = Math.max(t + att + .02, t + d), end = hold + .35;
  o.type = "sine"; o2.type = "triangle"; o.frequency.value = f; o2.frequency.value = f; g2.gain.value = .12;
  l.frequency.value = 5.2; lg.gain.value = f * vib; l.connect(lg); lg.connect(o.frequency); lg.connect(o2.frequency);
  a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(g, t + att); a.gain.setValueAtTime(g, hold); a.gain.linearRampToValueAtTime(.0001, end);
  o.connect(a); o2.connect(g2); g2.connect(a); a.connect(T.ib);
  [o, o2, l].forEach(function (x) { x.start(t); x.stop(end + .05); });
}
function bowlV(f, t, g) {                      // singing bowl: inharmonic partials with slow decay
  [[1, 1, 11], [1.004, .6, 10], [2.71, .45, 7], [5.15, .2, 4.5], [8.69, .09, 3]].forEach(function (p) {
    var o = ctx.createOscillator(), a = ctx.createGain(); o.frequency.value = f * p[0];
    a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(g * p[1], t + .006); a.gain.exponentialRampToValueAtTime(.0001, t + p[2]);
    o.connect(a); a.connect(T.ib); o.start(t); o.stop(t + p[2] + .05);
  });
}
function tanV(f, t, g) {                       // tanpura string
  var o = ctx.createOscillator(), o2 = ctx.createOscillator(), fl = ctx.createBiquadFilter(), a = ctx.createGain();
  o.type = "sawtooth"; o2.type = "triangle"; o.frequency.value = f; o2.frequency.value = f * 2; o2.detune.value = 4;
  fl.type = "lowpass"; fl.Q.value = 2.5; fl.frequency.setValueAtTime(2400, t); fl.frequency.exponentialRampToValueAtTime(700, t + 2.5);
  a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(g, t + .015); a.gain.exponentialRampToValueAtTime(.0001, t + 4.2);
  o.connect(fl); o2.connect(fl); fl.connect(a); a.connect(T.ib); o.start(t); o2.start(t); o.stop(t + 4.3); o2.stop(t + 4.3);
}
// Play an instrument by name. X holds the layer options.
function pl(i, f, t, d, g, X) {
  if (C.st.tape) f *= 1 + (Math.random() - .5) * C.st.tape;      // lo-fi tape wobble
  switch (i) {
    case "glass":  padV(f, t, d, g, "sine", X.a || 3, 1800, [-6, 6]); padV(f * 2, t, d, g * .2, "sine", (X.a || 3) * .8, 3200, [0]); break;
    case "string": padV(f, t, d, g, "sawtooth", X.a || 1.2, X.cut || 1100, [-9, 0, 9]); break;
    case "warm":   padV(f, t, d, g, "triangle", X.a || .8, 1900, [-5, 5]); break;
    case "saw":    padV(f, t, d, g, "sawtooth", X.a || .35, X.cut || 1800, [-14, -5, 5, 14]); break;
    case "ooh":    padV(f, t, d, g, "triangle", X.a || .5, 1200, [-9, 9]); break;
    case "piano":  pianoV(f, t, d, g); break;
    case "ep":     fmV(f, t, g, 1, 1.6, .1, .6, clamp(d * 1.2, .8, 3.2), .006); break;
    case "bell":   bellV(f, t, d, g, X.r); break;
    case "mal":    fmV(f, t, g, 4, .8, .02, .12, .8, .002); break;
    case "kal":    fmV(f, t, g, 5.4, .6, .01, .08, 1.3, .002); break;
    case "ks":     ksV(f, t, g, X.dur || 1.5, X.sm == null ? 2 : X.sm); break;
    case "syn":    synV(f, t, d, g, X.ty || "triangle", X.cut || 1400); break;
    case "lead":   leadV(f, t, d, g); break;
    case "stab":   stabV(f, t, d, g); break;
    case "flute":  fluteV(f, t, d, g, .008, .15); break;
    case "whis":   fluteV(f, t, d, g, .012, .04); break;
  }
}
function bassN(X, d0, t, d, w, r) {
  var c = C, m = r + dg(c.sc, d0 + (w === 1 ? 4 : w === 3 ? 2 : 0)) + (w === 2 ? 12 : 0) + (X.o == null ? -12 : X.o);
  bassV(mf(fit(m, 31, 55)), t, d, X.g, X.i === "saw" ? "sawtooth" : X.i === "pulse" ? "square" : "sine", X.cut || 700, X.a == null ? .012 : X.a);
}

// ---------- Drums and sound effects ----------
function nzBurst(t, dur, ft, f, q, g, out) {
  var s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), a = ctx.createGain();
  s.buffer = noiseBuf; fl.type = ft; fl.frequency.value = f; fl.Q.value = q;
  a.gain.setValueAtTime(g, t); a.gain.exponentialRampToValueAtTime(.0001, t + dur);
  s.connect(fl); fl.connect(a); a.connect(out || T.db); s.start(t, Math.random() * 2); s.stop(t + dur + .02);
}
function oscEnv(type, f0, f1, t, dur, g, out) {
  var o = ctx.createOscillator(), a = ctx.createGain(); o.type = type;
  o.frequency.setValueAtTime(f0, t); if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + Math.min(.15, dur));
  a.gain.setValueAtTime(g, t); a.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.connect(a); a.connect(out || T.db); o.start(t); o.stop(t + dur + .02);
}
function kickV(t, g) { oscEnv("sine", 150, 45, t, .28, g); }
function snareV(t, g) { nzBurst(t, .16, "bandpass", 1900, .8, g); oscEnv("triangle", 185, 185, t, .09, g * .5); }
function clapV(t, g) { var j; for (j = 0; j < 3; j++) nzBurst(t + j * .011, .05, "bandpass", 1300, 1.2, g * .7); nzBurst(t + .033, .18, "bandpass", 1300, 1.2, g); }
function hatV(t, g, open) { nzBurst(t, open ? .22 : .04, "highpass", 7500, .7, g); }
function shkV(t, g) { nzBurst(t, .06, "bandpass", 6500, 1.5, g); }
function rimV(t, g) { oscEnv("triangle", 1100, 1100, t, .035, g); }
function tickV(t, g) { oscEnv("sine", 1700, 1700, t, .025, g); }
function thumpV(t, g) { oscEnv("sine", 64, 40, t, .22, g); }                      // heartbeat
function dropV(t) { oscEnv("sine", 900 + Math.random() * 2200, 500, t, .07, .008 + Math.random() * .012, T.ib); } // rain drop
function clickV(t) { nzBurst(t, .004, "highpass", 2500, .7, .03 + Math.random() * .04, T.ag); }  // vinyl crackle
function thunderV(t) {
  var s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), a = ctx.createGain();
  s.buffer = noiseBuf; s.loop = true; fl.type = "lowpass"; fl.frequency.value = 140; fl.Q.value = .7;
  a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(.09, t + 1.2); a.gain.exponentialRampToValueAtTime(.0001, t + 5);
  s.connect(fl); fl.connect(a); a.connect(T.ag); s.start(t, Math.random() * 3); s.stop(t + 5.1);
}

function riserV(t, dur, g) {                   // noise sweep before the drop
  var s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), a = ctx.createGain();
  s.buffer = noiseBuf; fl.type = "bandpass"; fl.Q.value = 1.2;
  fl.frequency.setValueAtTime(400, t); fl.frequency.exponentialRampToValueAtTime(9000, t + dur);
  a.gain.setValueAtTime(.0001, t); a.gain.linearRampToValueAtTime(g, t + dur); a.gain.linearRampToValueAtTime(.0001, t + dur + .05);
  s.connect(fl); fl.connect(a); a.connect(T.db); s.start(t, Math.random() * 1.5); s.stop(t + dur + .1);
}

// ---------- Composition ----------
function genPhrase(c, Mx) {                    // a 2-bar melody phrase, generated from the track's own seed
  var rnd = c.rnd, L = c.sc.length, grid = (Mx.grid || [0, 4, 8, 12, 16, 20, 24, 28]).slice(), n = Math.min(Mx.n || 6, grid.length), i, j, tmp, pos, out = [], x,
      pset = L === 7 ? (c.sc[2] === 4 ? [0, 1, 2, 4, 5] : [0, 2, 3, 4, 6]) : null;
  for (i = grid.length - 1; i > 0; i--) { j = (rnd() * (i + 1)) | 0; tmp = grid[i]; grid[i] = grid[j]; grid[j] = tmp; }
  pos = grid.slice(0, n).sort(function (a, b) { return a - b; });
  x = [0, 2, 4][(rnd() * 3) | 0];
  pos.forEach(function (st0, k) {
    var nx = k + 1 < pos.length ? pos[k + 1] : 32, ds = [-2, -1, -1, 0, 1, 1, 2][(rnd() * 7) | 0], tries = 0;
    x = clamp(x + ds, 0, L + 2);
    while (Mx.pent !== false && pset && pset.indexOf(((x % L) + L) % L) < 0 && tries++ < 3) x = clamp(x + 1, 0, L + 2);
    out.push([st0, x, Math.max(2, Math.min(nx - st0, Mx.ln || 8))]);
  });
  return out;
}
function lvl(c, bar) {                         // 0 intro, 1 build / breakdown / outro, 2 full
  var st = c.st;
  if (st.flat) return 2;
  if (bar < 2) return 0;
  if (bar < 4) return 1;
  if (st.brk && (bar % 16) >= 14) return 1;
  if (bar >= c.bars - 2) return 1;
  return 2;
}
function startBreath() {                       // a drone that swells with the on-screen breathing circle
  var br = C.m.br; if (!br) return;
  var tot = br[0] + br[1] + br[2] + br[3], t0 = ctx.currentTime + .12, dur = C.bars * 16 * 15 / C.bpm, n = Math.ceil(dur / tot) + 1;
  var bh = C.st.bh || [.015, .09], lo = bh[0], hi = bh[1], g = ctx.createGain(), fl = ctx.createBiquadFilter(), base = fit(C.root - 12, 40, 52), end = t0 + dur + 3, k, a;
  fl.type = "lowpass"; fl.Q.value = .5; fl.connect(g); g.connect(T.ib);
  [[base, "sine"], [base + 7, "sine"], [base + 12, "triangle"], [base + 19, "sine"]].forEach(function (v, j) {
    var o = ctx.createOscillator(), og = ctx.createGain(); o.type = v[1]; o.frequency.value = mf(v[0]); og.gain.value = j === 3 ? .35 : 1;
    o.connect(og); og.connect(fl); o.start(t0); o.stop(end); T.srcs.push(o);
  });
  g.gain.setValueAtTime(lo, t0); fl.frequency.setValueAtTime(380, t0);
  for (k = 0; k < n; k++) {
    a = t0 + k * tot;
    g.gain.linearRampToValueAtTime(hi, a + br[0]); fl.frequency.linearRampToValueAtTime(1700, a + br[0]);
    if (br[1]) { g.gain.linearRampToValueAtTime(hi * .92, a + br[0] + br[1]); fl.frequency.linearRampToValueAtTime(1800, a + br[0] + br[1]); }
    g.gain.linearRampToValueAtTime(lo, a + br[0] + br[1] + br[2]); fl.frequency.linearRampToValueAtTime(380, a + br[0] + br[1] + br[2]);
    if (br[3]) { g.gain.linearRampToValueAtTime(lo, a + tot); fl.frequency.linearRampToValueAtTime(380, a + tot); }
    if (C.st.cue) { bellV(mf(C.root + 19), a, 1.8, .032, 3.5); bellV(mf(C.root + 12), a + br[0] + br[1], 2.2, .028, 3.5); }
  }
}
function sched(s, t) {                         // schedule one 16th-note step
  var c = C, st = c.st, sc = c.sc, bar = s >> 4, r = c.root + ((st.lift && bar >= ((c.bars * .6) | 0)) ? st.lift : 0), p = s & 15, beat = 60 / c.bpm, sx = beat / 4,
      cl = st.cl || 2, d0 = c.prog[Math.floor(bar / cl) % c.prog.length], cs = (p === 0 && bar % cl === 0), lv = lvl(c, bar), rnd = c.rnd, k, X, ph, sp, ix;
  // pad
  if ((X = st.pd) && cs) for (k = 0; k < (X.n || 3); k++) pl(X.i, mf(fit(r + dg(sc, d0 + 2 * k) + (X.o || 0), 46, 76)), t, cl * 16 * sx + .3, X.g, X);
  // chords
  if ((X = st.ch) && lv >= (X.lv || 0) && (X.pat ? has(X.pat, p) : cs))
    for (k = 0; k < (X.n || 3); k++) pl(X.i, mf(fit(r + dg(sc, d0 + 2 * k) + (X.o || 0), 50, 80)), t + k * (X.strum || 0), (X.ln || cl * 16) * sx, X.g, X);
  // bass
  if ((X = st.bs) && lv >= 1) {
    if (X.hold) { if (cs) bassN(X, d0, t, cl * 16 * sx, 0, r); }
    else X.pat.forEach(function (e) { if (e[0] === p) bassN(X, d0, t, e[2] * sx, e[1], r); });
  }
  // arpeggio
  if ((X = st.ar) && lv >= (X.lv || 1) && p % X.gr === 0 && (!X.pr || rnd() < X.pr)) {
    ix = X.ord[(s / X.gr | 0) % X.ord.length];
    pl(X.i, mf(fit(r + dg(sc, d0 + 2 * ix) + (X.o || 0), 50, 90)), t, (X.ln || X.gr) * sx, X.g, X);
  }
  // melody
  if ((X = st.ml) && lv >= (X.lv || 2)) {
    ph = c.ph["AABA".charAt((bar >> 1) % 4)]; sp = (bar & 1) * 16 + p;
    for (k = 0; k < ph.length; k++) if (ph[k][0] === sp && (!X.pr || rnd() < X.pr)) {
      ix = ph[k][1]; if (p % 4 === 0) ix = snap(ix, d0, sc.length);
      pl(X.i, mf(fit(r + dg(sc, ix) + (X.o == null ? 12 : X.o), 55, 92)), t, ph[k][2] * sx, X.g, X);
    }
  }
  // polyrhythm layers
  if (st.eu && lv >= 1) st.eu.forEach(function (e, j) {
    if (c.ep[j][(s + (e.rot || 0)) % e.n]) { var cnt = c.ec[j]++; pl(e.i, mf(fit(r + dg(sc, d0 + e.degs[cnt % e.degs.length]) + (e.o || 0), 48, 90)), t, (e.ln || 3) * sx, e.g, e); }
  });
  // drums
  if ((X = st.dr) && lv >= (X.lv || 2)) {
    var hv = .8 + .4 * Math.random();
    if (has(X.k, p)) { kickV(t, X.kg); if (st.duck) { var dp = T.duck.gain; dp.cancelScheduledValues(t); dp.setValueAtTime(.35, t); dp.linearRampToValueAtTime(1, t + beat * .5); } }
    if (has(X.sn, p)) snareV(t, X.sg);
    if (has(X.cl, p)) clapV(t, X.clg);
    if (has(X.hh, p)) hatV(t, X.hg * hv, 0);
    if (has(X.oh, p)) hatV(t, X.ohg, 1);
    if (has(X.rm, p)) rimV(t, X.rmg);
    if (has(X.sh, p)) shkV(t, X.shg * hv);
    if (has(X.tk, p)) tickV(t, X.tkg);
    if (X.fill && bar % 8 === 7 && p >= 12) snareV(t, .12 + (p - 12) * .05);
  }
  // special sounds
  if (st.ht) {                                  // heartbeat that slowly settles
    if (c.hn == null) c.hn = t;
    while (c.hn < t + sx) {
      var hr = st.hr[0] + (st.hr[1] - st.hr[0]) * Math.min(1, s / (c.bars * 16)), hb = 60 / hr;
      thumpV(c.hn, st.ht); thumpV(c.hn + hb * .3, st.ht * .65); c.hn += hb;
    }
  }
  if (st.riser && lv === 2 && bar % 8 === 7 && p === 0) riserV(t, 16 * sx, .09);
  if (st.crash && lv === 2 && bar % 8 === 0 && p === 0 && bar >= 4) nzBurst(t, 1.4, "highpass", 5000, .5, .1);
  if (st.drop && rnd() < st.drop) dropV(t + rnd() * sx);
  if (st.thun && p === 0 && bar % 2 === 0 && rnd() < st.thun) thunderV(t);
  if (st.crk && rnd() < st.crk) clickV(t + rnd() * sx);
  if (st.tan && p % 4 === 0) { var q4 = (s >> 2) % 4; tanV(mf(q4 === 0 ? r - 5 : q4 === 3 ? r - 12 : r), t, st.tan); }
  if (st.bowl && p === 0 && bar % st.bowl[0] === st.bowl[1]) bowlV(mf(r + 12 + [0, 7, 12, 4][(bar / st.bowl[0] | 0) % 4]), t, st.bg || .07);
}
function tick() {
  if (!playing || !C) return;
  var d = 15 / C.bpm, total = C.bars * 16, sw = C.st.sw || 0, ahead = document.hidden ? 1.5 : .2, tt;
  while (nextT < ctx.currentTime + ahead) {
    tt = nextT + ((step % 4 >= 2) ? sw * .667 * d : 0);
    sched(step, tt); nextT += d; step++;
    if (step >= total) { load((ti + 1) % moods[mi].tr.length, true); return; }
  }
}
function load(i, auto) {
  ti = i; if (!ctx) build();
  if (T) kill(T, auto ? 2.5 : .3);
  var m = moods[mi], tr = m.tr[ti], st = STY[m.n];
  C = {m: m, st: st, name: tr[0], bpm: tr[1], root: tr[2], sc: SC[tr[3]], prog: st.progs[ti % st.progs.length],
       bars: Math.max(16, Math.round(100 * tr[1] / 240 / 8) * 8), rnd: rng(hs(m.n + "|" + tr[0]))};
  if (st.ml) C.ph = {A: genPhrase(C, st.ml), B: genPhrase(C, st.ml)};
  C.ep = (st.eu || []).map(function (e) { return euc(e.k, e.n); });
  C.ec = (st.eu || []).map(function () { return 0; });
  KSC = {};
  T = mkTrack(st);
  T.dl.delayTime.value = st.fx.dly ? 60 / C.bpm * st.fx.dly[0] : .3;
  startAmb(T, st); startBreath();
  step = 0; nextT = ctx.currentTime + .12; C.t0 = nextT; started = true; playing = true; bStart = performance.now() + 120;
  ctx.resume();
  $("nMood").textContent = m.n; $("nTrack").textContent = C.name;
  $("nMeta").textContent = tempoWord(ti) + " · " + C.bpm + " BPM · composed live" + (m.br ? " · follow the circle" : "");
  $("pp").innerHTML = "&#10074;&#10074;"; $("pp").setAttribute("aria-label", "Pause"); document.body.classList.add("playing");
  renderList();
}

// ---------- Controls ----------
$("pp").onclick = toggle;
function toggle() {
  if (!started) { setMood(mi, true); return; }
  playing = !playing;
  if (playing) ctx.resume(); else ctx.suspend();
  document.body.classList.toggle("playing", playing);
  $("pp").innerHTML = playing ? "&#10074;&#10074;" : "&#9654;";
  $("pp").setAttribute("aria-label", playing ? "Pause" : "Play");
}
$("next").onclick = function () { load((ti + 1) % moods[mi].tr.length); };
$("prev").onclick = function () { load((ti + moods[mi].tr.length - 1) % moods[mi].tr.length); };
$("vol").oninput = function () { if (master) master.gain.value = +this.value; };
$("sleep").onchange = function () {
  clearTimeout(sleepT); var mins = +this.value; if (!mins) return;
  sleepT = setTimeout(function () {
    if (!ctx || !playing) return;
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(.0001, ctx.currentTime + 8);
    setTimeout(function () { toggle(); master.gain.value = +$("vol").value; $("sleep").value = "0"; }, 8500);
  }, mins * 60000);
};
document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && !/BUTTON|INPUT|SELECT/.test(e.target.tagName)) { e.preventDefault(); toggle(); }
});

// ---------- Visualizer with breathing guide ----------
var parts = []; for (var q = 0; q < 70; q++) parts.push({x: Math.random(), y: Math.random(), r: 1 + Math.random() * 2.5, s: .0004 + Math.random() * .001});
var PV = {"Rainy": -4, "Energy": 3.5, "Night Drive": 2.2, "Uplift": 2, "Walk": 1.2, "Sleep": .25, "Calm Anxiety": .35, "Meditate": .35, "Breathe": .3, "Comfort": .4};
var cv = $("viz"), g = cv.getContext("2d"), W, H, data = new Uint8Array(128);
function size() { var r = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1; W = cv.width = r.width * d; H = cv.height = r.height * d; }
window.addEventListener("resize", size); size();
function breath(br) {
  var tot = br[0] + br[1] + br[2] + br[3], t = (Math.max(0, performance.now() - bStart) / 1000) % tot, p = br, f, lab, left;
  if (t < p[0]) { f = .7 + .5 * t / p[0]; lab = "Breathe in"; left = p[0] - t; }
  else if (t < p[0] + p[1]) { f = 1.2; lab = "Hold"; left = p[0] + p[1] - t; }
  else if (t < p[0] + p[1] + p[2]) { f = 1.2 - .5 * (t - p[0] - p[1]) / p[2]; lab = "Breathe out"; left = p[0] + p[1] + p[2] - t; }
  else { f = .7; lab = "Hold"; left = tot - t; }
  return {f: f, lab: lab + "  " + Math.ceil(left)};
}
function draw(ms) {
  var t = ms / 1000, live = playing && an;
  if (live) an.getByteFrequencyData(data);
  g.clearRect(0, 0, W, H);
  var cx = W / 2, cy = H * .45, R = Math.min(W, H) * .2, N = 96, bass = 0, i, m = moods[mi], bt = null;
  for (i = 0; i < 6; i++) bass += (live ? data[i] : 90 + 30 * Math.sin(t * 2)) / 255;
  bass /= 6;
  if (m.br && started && playing) { bt = breath(m.br); R *= bt.f; }
  // Visible beat: the orb and a ring pulse once per beat, so a faster BPM visibly pulses faster.
  var pulse = 0, bph = 0;
  if (live && C && ctx.currentTime >= C.t0) { bph = ((ctx.currentTime - C.t0) * C.bpm / 60) % 1; pulse = Math.exp(-bph * 5); R *= 1 + pulse * .07; }
  g.fillStyle = "#fff";
  for (i = 0; i < parts.length; i++) {
    var p = parts[i], pvm = PV[m.n] == null ? 1 : PV[m.n];
    p.y -= p.s * pvm * (1 + bass * 5); if (p.y < 0) { p.y = 1; p.x = Math.random(); } if (p.y > 1) { p.y = 0; p.x = Math.random(); }
    g.globalAlpha = .15 + p.r / 5 * .4; g.beginPath();
    if (pvm < 0) { g.strokeStyle = "#fff"; g.lineWidth = 1.2; g.moveTo(p.x * W, p.y * H); g.lineTo(p.x * W, p.y * H - 16 * (W / 700 + .5)); g.stroke(); }
    else { g.arc(p.x * W, p.y * H, p.r * (W / 700 + .5), 0, 6.283); g.fill(); }
  }
  g.globalAlpha = 1;
  var grad = g.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, m.a); grad.addColorStop(1, m.b);
  var orb = g.createRadialGradient(cx, cy, 0, cx, cy, R * (1 + bass * .25));
  orb.addColorStop(0, "#ffffff"); orb.addColorStop(.35, m.b); orb.addColorStop(1, "rgba(0,0,0,0)");
  g.globalAlpha = .85; g.fillStyle = orb; g.beginPath(); g.arc(cx, cy, R * (1 + bass * .25), 0, 6.283); g.fill(); g.globalAlpha = 1;
  if (live && C) { g.save(); g.globalAlpha = (1 - bph) * .55; g.strokeStyle = m.b; g.lineWidth = Math.max(2, W / 330); g.beginPath(); g.arc(cx, cy, R * (1.05 + bph * .9), 0, 6.283); g.stroke(); g.restore(); }
  g.strokeStyle = grad; g.lineWidth = Math.max(3, W / 260); g.lineCap = "round"; g.shadowColor = m.b; g.shadowBlur = 14;
  for (i = 0; i < N; i++) {
    var v = live ? data[Math.floor(i / N * 72)] / 255 : .12 + .08 * Math.sin(t * 2 + i * .35),
        a = i / N * 6.283 - 1.5708, len = R * .12 + v * R * 1.1;
    g.beginPath(); g.moveTo(cx + Math.cos(a) * (R * 1.12), cy + Math.sin(a) * (R * 1.12));
    g.lineTo(cx + Math.cos(a) * (R * 1.12 + len), cy + Math.sin(a) * (R * 1.12 + len)); g.stroke();
  }
  g.shadowBlur = 0;
  if (bt) {
    g.fillStyle = "#fff"; g.textAlign = "center"; g.font = "800 " + Math.max(18, W / 26) + "px Sora, sans-serif";
    g.fillText(bt.lab, cx, H * .1);
  }
  if (started && C) {
    var pr = Math.min(1, step / (C.bars * 16)), secs = step * 15 / C.bpm;
    $("fill").style.width = pr * 100 + "%";
    $("tm").textContent = Math.floor(secs / 60) + ":" + ("0" + Math.floor(secs % 60)).slice(-2);
  }
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
setMood(0, false);
