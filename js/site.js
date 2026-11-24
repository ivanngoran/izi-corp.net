/* IZIcorp v2 — interactions du site (aucune dépendance) */
(() => {
"use strict";
const doc = document.documentElement;
doc.classList.add("js");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => n.toLocaleString("fr-FR").replace(/ /g, " ");
const WA = "2250544058484";

/* ---------- Année ---------- */
const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

/* ---------- Menu mobile : se ferme au clic ---------- */
const burger = $(".burger");
if (burger) $$("a", burger).forEach(a => a.addEventListener("click", () => burger.removeAttribute("open")));

/* ---------- Révélations au défilement ---------- */
if ("IntersectionObserver" in window && !reduce) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .15, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach(el => io.observe(el));
} else $$(".reveal").forEach(el => el.classList.add("in"));

/* ---------- Lien actif dans la navigation ---------- */
const navLinks = $$(".nav a");
if ("IntersectionObserver" in window && navLinks.length) {
  const map = new Map(navLinks.map(a => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { navLinks.forEach(a => a.classList.remove("active")); map.get(e.target.id)?.classList.add("active"); }
  }), { rootMargin: "-45% 0px -50% 0px" });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
}

/* ---------- Maquette du hero : inclinaison à la souris + notifications ---------- */
const mock = $("#mock");
if (mock && !reduce && window.matchMedia("(hover:hover) and (min-width:981px)").matches) {
  const hero = $(".hero");
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y2 = (e.clientY - r.top) / r.height - .5;
    mock.style.transform = `rotateY(${-9 + x * 10}deg) rotateX(${5 - y2 * 8}deg)`;
  });
  hero.addEventListener("pointerleave", () => { mock.style.transform = ""; });
}
const toast = $("#toast"), toastTxt = $("#toastTxt");
const notes = ["Rapport du mois résumé par l'IA", "Nouvelle commande #1043 · 27 000 FCFA", "Relance envoyée à 14 clients", "Stock mis à jour automatiquement"];
if (toast && !reduce) {
  let i = 0;
  setInterval(() => {
    toast.classList.add("swap");
    setTimeout(() => { i = (i + 1) % notes.length; toastTxt.textContent = notes[i]; toast.classList.remove("swap"); }, 350);
  }, 3200);
}

/* ---------- Bouton WhatsApp flottant (après le hero) ---------- */
const waf = $(".wa-float"), heroEl = $(".hero"), contactEl = $("#contact");
if (waf && "IntersectionObserver" in window) {
  let pastHero = false, inContact = false;
  const upd = () => waf.classList.toggle("show", pastHero && !inContact);
  new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; upd(); }).observe(heroEl);
  new IntersectionObserver(([e]) => { inContact = e.isIntersecting; upd(); }, { threshold: .2 }).observe(contactEl);
} else if (waf) waf.classList.add("show");

/* ---------- Avant / après ---------- */
const baList = $("#baList"), bBefore = $("#baBefore"), bAfter = $("#baAfter");
function setBA(after) {
  baList.dataset.state = after ? "after" : "before";
  bAfter.classList.toggle("on", after); bBefore.classList.toggle("on", !after);
  bAfter.setAttribute("aria-pressed", after); bBefore.setAttribute("aria-pressed", !after);
}
if (baList) {
  bBefore.addEventListener("click", () => setBA(false));
  bAfter.addEventListener("click", () => setBA(true));
  // Démarre sur « Avant » puis bascule une fois quand la section entre à l'écran
  if ("IntersectionObserver" in window && !reduce) {
    setBA(false);
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setBA(true), 900); o.disconnect(); }
    }, { threshold: .45 });
    o.observe(baList);
  }
}

/* ---------- Méthode : la ligne se remplit au défilement ---------- */
const steps = $("#steps");
if (steps) {
  const items = $$("li", steps);
  const onScroll = () => {
    const r = steps.getBoundingClientRect(), vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * .6 - r.top) / r.height));
    steps.style.setProperty("--p", p.toFixed(3));
    items.forEach((li, k) => li.classList.toggle("lit", p >= k / (items.length - 1) - .02));
  };
  if (reduce) { steps.style.setProperty("--p", 1); items.forEach(li => li.classList.add("lit")); }
  else { window.addEventListener("scroll", onScroll, { passive: true }); onScroll(); }
}

/* ---------- Compteurs (engagements) ---------- */
function countUp(el, to, dur = 1200) {
  if (reduce) { el.textContent = to; return; }
  const from = to > 1000 ? to - 40 : 0, t0 = performance.now();
  const step = t => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.round(from + (to - from) * e); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
if ("IntersectionObserver" in window) {
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { countUp(e.target, +e.target.dataset.num); co.unobserve(e.target); }
  }), { threshold: .6 });
  $$("[data-num]").forEach(el => co.observe(el));
}

/* ---------- Effet projecteur sur les cartes ---------- */
$$(".card").forEach(c => c.addEventListener("pointermove", e => {
  const r = c.getBoundingClientRect();
  c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px");
}));

/* =========================================================
   ESTIMATEUR — grille tarifaire indicative (FCFA), modifiable ici
   ========================================================= */
const GRILLE = {
  vitrine:   { min: 175000, max: 300000,  delai: "3 semaines" },
  web:       { min: 450000, max: 750000,  delai: ["6 semaines", "8 semaines"] },
  mobile:    { min: 600000, max: 1000000, delai: ["8 semaines", "10 semaines"] },
  ecommerce: { min: 375000, max: 600000,  delai: ["5 semaines", "6 semaines"] }
};
/* Surcoût par option (FCFA) : + modeste · ++ moyen · +++ élevé */
const OPT_PLUS = { langues: [50000, 75000], paiement: [100000, 175000], ia: [200000, 325000] };
const NOMS = { vitrine: "un site vitrine", web: "une application web", mobile: "une application mobile", ecommerce: "un site e-commerce" };
const OPTN = { paiement: "paiement mobile", langues: "multilingue", ia: "IA intégrée" };

const typesEl = $("#types"), optsEl = $("#opts"), rangeEl = $("#range"), hintEl = $("#hint"),
  delaiEl = $("#delai"), btnEl = $("#devisBtn"), waEl = $("#waEstim"), msgEl = $("#cmsg");
let type = "vitrine", opts = new Set(), curMin = 175000, curMax = 300000;

function setMessage(txt) {
  if (msgEl && !msgEl.dataset.touched) msgEl.value = txt;
  waEl.href = `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`;
}
function paintRange(a, b) { rangeEl.innerHTML = `${fmt(a)} – ${fmt(b)} <small>FCFA</small>`; }
function setRange(mn, mx) {
  const fMin = curMin, fMax = curMax; curMin = mn; curMax = mx;
  if (reduce) return paintRange(mn, mx);
  const t0 = performance.now(), D = 550;
  const step = t => { const k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 3);
    paintRange(Math.round((fMin + (mn - fMin) * e) / 500) * 500, Math.round((fMax + (mx - fMax) * e) / 500) * 500);
    if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
function render() {
  $$("button", typesEl).forEach(b => { const on = b.dataset.t === type; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
  $$("button", optsEl).forEach(b => { const on = opts.has(b.dataset.o); b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); b.disabled = type === "vitrine"; });
  const g = GRILLE[type], n = opts.size;
  btnEl.firstChild.textContent = "Recevoir mon devis détaillé";

  if (type === "vitrine") {
    hintEl.textContent = "Site vitrine : tarif unique, options réservées aux applications et au e-commerce.";
    delaiEl.textContent = "Livraison en " + g.delai;
    setRange(g.min, g.max);
    setMessage(`Bonjour IZIcorp,\nJe souhaite ${NOMS[type]}.\nD'après votre estimateur : ${fmt(g.min)} à ${fmt(g.max)} FCFA, livraison en ${g.delai}.\nMerci de me transmettre un devis détaillé.`);
    return;
  }
  if (n > 1) {
    hintEl.textContent = "Plusieurs options : votre projet mérite un chiffrage sur mesure.";
    delaiEl.textContent = "Délai sur mesure";
    rangeEl.innerHTML = `<span class="sur">Projet sur mesure</span> <small>parlons-en</small>`;
    btnEl.firstChild.textContent = "Demander un chiffrage";
    setMessage(`Bonjour IZIcorp,\nMon projet : ${NOMS[type]} avec ${[...opts].map(o => OPTN[o]).join(" + ")}.\nMerci de me recontacter pour un chiffrage sur mesure.`);
    return;
  }
  let mn = g.min, mx = g.max, dl = g.delai[0];
  if (n === 1) {
    const key = [...opts][0], pl = OPT_PLUS[key];
    mn += pl[0]; mx += pl[1]; dl = g.delai[1];
    hintEl.textContent = `Option incluse : ${OPTN[key]}. Ajoutez-en une autre pour un chiffrage sur mesure.`;
    setMessage(`Bonjour IZIcorp,\nJe souhaite ${NOMS[type]} avec ${OPTN[key]}.\nD'après votre estimateur : ${fmt(mn)} à ${fmt(mx)} FCFA, livraison en ${dl}.\nMerci de me transmettre un devis détaillé.`);
  } else {
    hintEl.textContent = "Ajoutez une option si besoin : paiement mobile, multilingue ou IA.";
    setMessage(`Bonjour IZIcorp,\nJe souhaite ${NOMS[type]} (sans option).\nD'après votre estimateur : ${fmt(mn)} à ${fmt(mx)} FCFA, livraison en ${dl}.\nMerci de me transmettre un devis détaillé.`);
  }
  delaiEl.textContent = "Livraison en " + dl;
  setRange(mn, mx);
}
if (typesEl) {
  typesEl.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; type = b.dataset.t; if (type === "vitrine") opts.clear(); render(); });
  optsEl.addEventListener("click", e => { const b = e.target.closest("button"); if (!b || b.disabled) return; const o = b.dataset.o; opts.has(o) ? opts.delete(o) : opts.add(o); render(); });
  msgEl?.addEventListener("input", () => { msgEl.dataset.touched = "1"; });
  render();
}

/* ---------- Formulaire (Web3Forms) ---------- */
const form = $("#cform");
if (form) form.addEventListener("submit", async e => {
  e.preventDefault();
  const note = $("#formnote"), btn = $("button[type=submit]", form);
  let bad = null;
  $$("[required]", form).forEach(f => { const ko = !f.value.trim(); f.setAttribute("aria-invalid", ko); if (ko && !bad) bad = f; });
  if (bad) { note.textContent = "Merci de remplir votre nom, votre téléphone et votre besoin."; note.classList.add("err"); bad.focus(); return; }
  const f = new FormData(form), mail = String(f.get("email") || "").trim();
  btn.disabled = true; btn.firstChild.textContent = "Envoi en cours…";
  const payload = {
    access_key: "ee76747f-455c-422e-8bd1-18835ee63442",
    subject: "Demande de devis — " + (f.get("nom") || "Site IZIcorp"),
    from_name: "Site IZIcorp", name: String(f.get("nom") || ""),
    message: "Nom : " + f.get("nom") + "\nTéléphone : " + f.get("tel") + (mail ? "\nEmail : " + mail : "") + "\n\n" + f.get("msg"),
    botcheck: f.get("botcheck") || ""
  };
  if (mail) payload.email = mail;
  try {
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "refusé");
    form.innerHTML = '<div class="formok"><div class="pay-ok"><svg class="ic"><use href="#i-tick"/></svg></div><h3>Message envoyé</h3><p>Merci ! On vous répond sous 24 h ouvrées avec un prix ferme et un délai écrit.</p></div>';
  } catch (err) {
    btn.disabled = false; btn.firstChild.textContent = "Envoyer ma demande";
    note.classList.add("err");
    note.textContent = "L'envoi a échoué. Écrivez-nous sur WhatsApp au 05 44 05 84 84 ou à contact@izi-corp.net.";
  }
});
})();
