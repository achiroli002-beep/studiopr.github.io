/* ============================================================
   ╔══════════════════════════════════════════════════════════╗
   ║  CONFIGURAZIONE — modifica solo questi oggetti           ║
   ╚══════════════════════════════════════════════════════════╝
   ============================================================ */

/**
 * Endpoint del form. Sostituisci con l'URL reale:
 *   Formspree  →  "https://formspree.io/f/xxxxxxxx"
 *   Netlify    →  lascia action="" nel form e usa data-netlify="true"
 *                 (in quel caso lascia questo valore come placeholder)
 */
const FORM_ENDPOINT = "[FORM_ENDPOINT]";

/* ────────────────────────────────────────────────────────────
   DATI DELLO STUDIO
   Aggiorna tutti i campi con i dati reali.
──────────────────────────────────────────────────────────── */
const STUDIO = {
  name:           "[NOME STUDIO]",
  tagline:        "[Tagline incisiva — una frase che definisce lo studio]",
  intro:          "[Breve presentazione: cosa fate e per chi. Una o due frasi.] ",
  studioTitle:    "Un collettivo di talenti, un'unica visione.",
  manifesto:      "[Prima frase del manifesto: la vostra filosofia o approccio distintivo verso il lavoro e i clienti.]",
  manifestoLine2: "[Seconda frase: il valore che nasce dall'unione di professionisti indipendenti sotto un unico tetto.]",
  address:        "[Via e numero, CAP Città]",
  email:          "[email@studio.it]",
  phone:          "[+39 000 0000000]",
  vatNumber:      "P.IVA [00000000000]",
  location:       "[Città, Paese]",  // usato nell'eyebrow hero
};

/* ────────────────────────────────────────────────────────────
   PROFESSIONISTI
   Per aggiungere un professionista: aggiungi un oggetto in coda.
   Per modificarne uno: cambia i valori dei campi.
   Regola: `website: null` → il bottone "Visita il sito" è nascosto.
──────────────────────────────────────────────────────────── */
const PROFESSIONALS = [
  {
    id:      "elena-marchetti",         // identificatore URL-safe, unico
    name:    "Elena Marchetti",
    role:    "Architetta d'Interni",
    bio:     "Specializzata in spazi residenziali e retail con un approccio che mette la luce e i materiali al centro del progetto. Ogni ambiente è pensato per durare nel tempo e per emozionare chi lo abita.",
    photo:   "https://placehold.co/600x750/C4A882/5C3D1E?text=E.M.",  // URL foto ritratto (ideale: 600×750 px)
    website: "https://example.com/elena",  // URL sito personale — oppure null
  },
  {
    id:      "luca-ferrari",
    name:    "Luca Ferrari",
    role:    "Consulente di Comunicazione",
    bio:     "Strategia e narrazione per brand che vogliono comunicare con autenticità e chiarezza. Dalla definizione del posizionamento alla produzione dei contenuti, ogni progetto è una storia da raccontare bene.",
    photo:   "https://placehold.co/600x750/A8B8A4/1E3020?text=L.F.",
    website: null,  // Nessun sito: il bottone "Visita il sito" sarà nascosto automaticamente
  },
  {
    id:      "sara-bianchi",
    name:    "Sara Bianchi",
    role:    "Graphic Designer",
    bio:     "Identità visive che parlano di chi le indossa. Lavora con piccole imprese e studi professionali per costruire immagini coordinate coerenti, riconoscibili e destinate a durare.",
    photo:   "https://placehold.co/600x750/B8A8C4/2A1E3A?text=S.B.",
    website: "https://example.com/sara",
  },
];

/* ────────────────────────────────────────────────────────────
   SERVIZI (opzionale)
   Lascia l'array vuoto [] per nascondere l'intera sezione.
──────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    name: "Architettura & Interior",
    desc: "Progettazione di spazi residenziali, retail e uffici con approccio su misura.",
  },
  {
    name: "Brand Identity",
    desc: "Dalla strategia al logo: sistemi visivi coerenti per brand che durano.",
  },
  {
    name: "Comunicazione Strategica",
    desc: "Posizionamento, narrativa e contenuti per aziende con storie da raccontare.",
  },
  {
    name: "Consulenza & Mentoring",
    desc: "Supporto per professionisti e PMI in fase di crescita o riposizionamento.",
  },
];


/* ============================================================
   INIZIALIZZAZIONE
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  populateStudio();
  populateProfessionals();
  populateServices();
  populateFormSelect();
  initDirectoryInteraction();
  initFormHandling();
  initScrollReveal();
  initNavBehavior();
  initMobileNav();
  initSmoothScroll();

  // Anno corrente nel footer
  document.getElementById("footer-year").textContent = new Date().getFullYear();
});


/* ============================================================
   POPOLA: DATI STUDIO
   ============================================================ */

function populateStudio() {
  // Titolo pagina e meta
  document.title = `${STUDIO.name} — Professionisti Indipendenti`;
  setAttr("#meta-desc", "content", STUDIO.tagline);
  setAttr("#og-title",  "content", STUDIO.name);
  setAttr("#og-desc",   "content", STUDIO.tagline);

  // Nav e footer
  setText("#nav-studio-name",       STUDIO.name);
  setText("#footer-studio-name",    STUDIO.name);
  setText("#footer-studio-name-copy", STUDIO.name);
  setText("#footer-vat",            STUDIO.vatNumber);

  // Hero
  buildHeroTitle();
  setText("#hero-location", `Studio Professionale · ${STUDIO.location}`);
  setText("#hero-tagline",  STUDIO.tagline);
  setText("#hero-intro",    STUDIO.intro);

  // Sezione Studio
  setText("#studio-heading",    STUDIO.studioTitle);
  setText("#studio-manifesto",  STUDIO.manifesto);
  setText("#studio-manifesto-2", STUDIO.manifestoLine2);

  // Contatti
  setText("#contact-address", STUDIO.address);

  const emailLink = document.getElementById("contact-email-link");
  emailLink.textContent = STUDIO.email;
  emailLink.href = `mailto:${STUDIO.email}`;

  const phoneLink = document.getElementById("contact-phone-link");
  phoneLink.textContent = STUDIO.phone;
  phoneLink.href = `tel:${STUDIO.phone.replace(/\s/g, "")}`;

  // Rivela il contenuto hero subito dopo averlo popolato,
  // senza aspettare l'IntersectionObserver (che è asincrono).
  revealHeroElements();
}

function revealHeroElements() {
  document.querySelectorAll("#hero [data-reveal]").forEach(el => {
    const delay = Number(el.dataset.revealDelay ?? 0);
    setTimeout(() => el.classList.add("is-visible"), delay + 60);
  });
}

/* Titolo hero: divide l'ultima parola del nome studio e la mette in <em> */
function buildHeroTitle() {
  const el = document.getElementById("hero-title");
  const words = STUDIO.name.trim().split(/\s+/);

  if (words.length > 1) {
    const lastWord = words.pop();
    el.innerHTML = `${words.join(" ")}<br><em>${lastWord}</em>`;
  } else {
    el.textContent = STUDIO.name;
  }
}


/* ============================================================
   POPOLA: PROFESSIONISTI
   ============================================================ */

function populateProfessionals() {
  buildDesktopDirectory();
  buildMobileCards();
}

/** Ritorna un DocumentFragment con i bottoni Contattami / Visita il sito */
function createProfButtons(prof) {
  const frag = document.createDocumentFragment();

  // Bottone "Contattami" → scroll al form e pre-seleziona il professionista
  const btnContact = document.createElement("button");
  btnContact.type = "button";
  btnContact.className = "btn btn-primary js-contact-trigger";
  btnContact.dataset.profId = prof.id;
  btnContact.setAttribute("aria-label", `Contatta ${prof.name}`);
  btnContact.textContent = "Contattami";
  frag.appendChild(btnContact);

  // Bottone "Visita il sito" — visibile solo se website è valorizzato
  if (prof.website) {
    const btnSite = document.createElement("a");
    btnSite.className = "btn btn-outline";
    btnSite.href = prof.website;
    btnSite.target = "_blank";
    btnSite.rel = "noopener noreferrer";
    btnSite.setAttribute("aria-label", `Visita il sito di ${prof.name} (apre in una nuova scheda)`);
    btnSite.textContent = "Visita il sito";
    frag.appendChild(btnSite);
  }

  return frag;
}

function buildDesktopDirectory() {
  const namesEl  = document.getElementById("directory-names");
  const panelEl  = document.getElementById("directory-panel");

  PROFESSIONALS.forEach((prof, i) => {
    /* ── Bottone nome ── */
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dir-name-btn" + (i === 0 ? " is-active" : "");
    btn.dataset.profId = prof.id;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected",  i === 0 ? "true" : "false");
    btn.setAttribute("aria-controls",  `detail-${prof.id}`);
    btn.id = `tab-${prof.id}`;

    const nameSpan = document.createElement("span");
    nameSpan.textContent = prof.name;

    const roleSpan = document.createElement("span");
    roleSpan.className = "dir-name-role";
    roleSpan.setAttribute("aria-hidden", "true");
    roleSpan.textContent = prof.role;

    btn.append(nameSpan, roleSpan);
    namesEl.appendChild(btn);

    /* ── Pannello dettaglio ── */
    const detail = document.createElement("div");
    detail.className = "prof-detail" + (i === 0 ? " is-active" : "");
    detail.id = `detail-${prof.id}`;
    detail.setAttribute("role", "tabpanel");
    detail.setAttribute("aria-labelledby", `tab-${prof.id}`);

    const img = document.createElement("img");
    img.src = prof.photo;
    img.alt = `Ritratto di ${prof.name}, ${prof.role}`;
    img.className = "prof-portrait";
    img.loading = "lazy";
    img.width = 600;
    img.height = 750;

    const name = document.createElement("h3");
    name.className = "prof-detail-name";
    name.textContent = prof.name;

    const role = document.createElement("p");
    role.className = "prof-detail-role";
    role.setAttribute("aria-label", `Ruolo: ${prof.role}`);
    role.textContent = prof.role;

    const bio = document.createElement("p");
    bio.className = "prof-detail-bio";
    bio.textContent = prof.bio;

    const actions = document.createElement("div");
    actions.className = "prof-actions";
    actions.appendChild(createProfButtons(prof));

    detail.append(img, name, role, bio, actions);
    panelEl.appendChild(detail);
  });
}

function buildMobileCards() {
  const container = document.getElementById("professionals-cards");

  PROFESSIONALS.forEach(prof => {
    const card = document.createElement("article");
    card.className = "prof-card";
    card.setAttribute("data-reveal", "fade-up");

    const img = document.createElement("img");
    img.src = prof.photo;
    img.alt = `Ritratto di ${prof.name}, ${prof.role}`;
    img.className = "prof-card-img";
    img.loading = "lazy";
    img.width = 130;
    img.height = 163;

    const body = document.createElement("div");
    body.className = "prof-card-body";

    const name = document.createElement("h3");
    name.className = "prof-card-name";
    name.textContent = prof.name;

    const role = document.createElement("p");
    role.className = "prof-card-role";
    role.textContent = prof.role;

    const bio = document.createElement("p");
    bio.className = "prof-card-bio";
    bio.textContent = prof.bio;

    const actions = document.createElement("div");
    actions.className = "prof-card-actions";
    actions.appendChild(createProfButtons(prof));

    body.append(name, role, bio, actions);
    card.append(img, body);
    container.appendChild(card);
  });
}


/* ============================================================
   POPOLA: SERVIZI
   ============================================================ */

function populateServices() {
  const section = document.getElementById("servizi");
  const list    = document.getElementById("services-list");

  if (!SERVICES.length) {
    section.hidden = true;
    return;
  }

  SERVICES.forEach((svc, i) => {
    const li = document.createElement("li");
    li.className = "service-item";
    li.setAttribute("data-reveal", "fade-up");
    if (i > 0) li.setAttribute("data-reveal-delay", Math.min(i * 80, 320).toString());

    const h3 = document.createElement("h3");
    h3.className = "service-name";
    h3.textContent = svc.name;

    const p = document.createElement("p");
    p.className = "service-desc";
    p.textContent = svc.desc;

    li.append(h3, p);
    list.appendChild(li);
  });
}


/* ============================================================
   POPOLA: SELECT FORM
   ============================================================ */

function populateFormSelect() {
  const select = document.getElementById("field-recipient");

  PROFESSIONALS.forEach(prof => {
    const opt = document.createElement("option");
    opt.value = prof.id;
    opt.textContent = `${prof.name} — ${prof.role}`;
    select.appendChild(opt);
  });
}


/* ============================================================
   INTERAZIONE DIRECTORY DESKTOP
   ============================================================ */

function initDirectoryInteraction() {
  const nameButtons = () => document.querySelectorAll(".dir-name-btn");
  const detailCards = () => document.querySelectorAll(".prof-detail");

  function activate(targetId) {
    nameButtons().forEach(btn => {
      const active = btn.dataset.profId === targetId;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    detailCards().forEach(card => {
      card.classList.toggle("is-active", card.id === `detail-${targetId}`);
    });
  }

  // Delegazione click: funziona anche dopo che i nodi sono creati
  document.getElementById("directory-names").addEventListener("click", e => {
    const btn = e.target.closest(".dir-name-btn");
    if (btn) activate(btn.dataset.profId);
  });

  // Hover su dispositivi con puntatore preciso
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.getElementById("directory-names").addEventListener("mouseover", e => {
      const btn = e.target.closest(".dir-name-btn");
      if (btn) activate(btn.dataset.profId);
    });
  }

  // Navigazione da tastiera: frecce su/giù tra i nomi
  document.getElementById("directory-names").addEventListener("keydown", e => {
    const btns = [...nameButtons()];
    const current = document.activeElement;
    const idx = btns.indexOf(current);
    if (idx === -1) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = btns[(idx + 1) % btns.length];
      next.focus();
      activate(next.dataset.profId);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = btns[(idx - 1 + btns.length) % btns.length];
      prev.focus();
      activate(prev.dataset.profId);
    }
  });

  // "Contattami": delegazione globale, funziona su desktop e mobile
  document.addEventListener("click", e => {
    const trigger = e.target.closest(".js-contact-trigger");
    if (trigger) scrollToContactWithProfessional(trigger.dataset.profId);
  });
}


/* ============================================================
   SCROLL AL FORM + PRE-SELEZIONE PROFESSIONISTA
   ============================================================ */

function scrollToContactWithProfessional(profId) {
  const section = document.getElementById("contatti");
  const select  = document.getElementById("field-recipient");

  section.scrollIntoView({ behavior: "smooth" });

  // Attende la fine dello scroll prima di focalizzare il campo
  setTimeout(() => {
    select.value = profId;

    // Highlight animato per richiamare l'attenzione sul campo
    const wrap = select.parentElement;
    wrap.classList.remove("is-highlighted");
    // Forza reflow per ri-avviare l'animazione se già attiva
    void wrap.offsetWidth;
    wrap.classList.add("is-highlighted");

    select.focus({ preventScroll: true });

    // Rimuovi la classe highlight al termine dell'animazione
    wrap.addEventListener("animationend", () => {
      wrap.classList.remove("is-highlighted");
    }, { once: true });
  }, 650);
}


/* ============================================================
   GESTIONE FORM (validazione + invio)
   ============================================================ */

function initFormHandling() {
  const form    = document.getElementById("contact-form");
  const btn     = document.getElementById("btn-submit");
  const status  = document.getElementById("form-status");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    clearFormStatus(status);

    if (!validateForm()) return;

    setSubmitting(btn, true);

    try {
      if (FORM_ENDPOINT === "[FORM_ENDPOINT]") {
        // Modalità demo: simula invio per 1.2 secondi
        await delay(1200);
        onFormSuccess(form, status);
      } else {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          onFormSuccess(form, status);
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
      }
    } catch {
      status.className = "form-status is-error";
      status.textContent =
        "Si è verificato un errore nell'invio. Ti preghiamo di riprovare o di scriverci direttamente via email.";
    } finally {
      setSubmitting(btn, false);
    }
  });

  // Rimuovi errore campo quando l'utente inizia a digitare
  form.querySelectorAll("input, textarea, select").forEach(el => {
    el.addEventListener("input",  () => clearFieldError(el));
    el.addEventListener("change", () => clearFieldError(el));
  });
}

function onFormSuccess(form, status) {
  form.reset();
  status.className = "form-status is-success";
  status.textContent =
    "Messaggio inviato! Ti risponderemo il prima possibile.";
  status.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function clearFormStatus(status) {
  status.className = "form-status";
  status.textContent = "";
}

function setSubmitting(btn, loading) {
  btn.disabled = loading;
  btn.classList.toggle("is-loading", loading);
}

/* ── Validazione ── */

function validateForm() {
  const rules = [
    { id: "field-name",      errId: "err-name",      check: v => v.trim().length > 0,
      msg: "Inserisci il tuo nome e cognome." },
    { id: "field-email",     errId: "err-email",      check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      msg: "Inserisci un indirizzo email valido." },
    { id: "field-recipient", errId: "err-recipient",  check: v => v !== "",
      msg: "Seleziona un professionista di riferimento." },
    { id: "field-message",   errId: "err-message",    check: v => v.trim().length > 0,
      msg: "Scrivi il tuo messaggio." },
    { id: "field-privacy",   errId: "err-privacy",    check: (_, el) => el.checked,
      msg: "Devi accettare la Privacy Policy per inviare il messaggio." },
  ];

  let valid = true;
  let firstInvalid = null;

  rules.forEach(({ id, errId, check, msg }) => {
    const el  = document.getElementById(id);
    const err = document.getElementById(errId);
    const ok  = check(el.value, el);

    err.textContent = ok ? "" : msg;
    el.setAttribute("aria-invalid", ok ? "false" : "true");

    if (!ok && !firstInvalid) firstInvalid = el;
    if (!ok) valid = false;
  });

  if (firstInvalid) firstInvalid.focus();

  return valid;
}

function clearFieldError(el) {
  el.setAttribute("aria-invalid", "false");
  const errEl = document.getElementById(`err-${el.id.replace("field-", "")}`);
  if (errEl) errEl.textContent = "";
}


/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */

function initScrollReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  // Reduced-motion: mostra tutto immediatamente, senza animazioni
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delayMs = Number(entry.target.dataset.revealDelay ?? 0);
      setTimeout(() => entry.target.classList.add("is-visible"), delayMs);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

  // requestAnimationFrame garantisce che il layout sia completato
  // prima di leggere getBoundingClientRect
  requestAnimationFrame(() => {
    targets.forEach(el => {
      if (el.classList.contains("is-visible")) return; // già rivelato
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        // Già nella viewport: rivela subito con il suo delay di stagger
        const delayMs = Number(el.dataset.revealDelay ?? 0);
        setTimeout(() => el.classList.add("is-visible"), delayMs);
      } else {
        // Sotto la fold: usa l'observer
        observer.observe(el);
      }
    });
  });
}


/* ============================================================
   COMPORTAMENTO NAVIGAZIONE (scrolled + active link)
   ============================================================ */

function initNavBehavior() {
  const header   = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  function update() {
    // Classe scrolled per backdrop blur
    header.classList.toggle("is-scrolled", window.scrollY > 50);

    // Link attivo in base alla sezione visibile
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute("href").slice(1);
      link.classList.toggle("is-active", href === current);
    });
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}


/* ============================================================
   MENU MOBILE (hamburger)
   ============================================================ */

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu   = document.getElementById("nav-menu");

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Chiudi cliccando un link
  menu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Chiudi cliccando fuori
  document.addEventListener("click", e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });

  // Chiudi con Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenu();
  });

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
}


/* ============================================================
   SMOOTH SCROLL con gestione focus (accessibilità)
   ============================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });

      // Sposta il focus per screen reader (senza alterare lo scroll)
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
}


/* ============================================================
   UTILITY
   ============================================================ */

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function setAttr(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
