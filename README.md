# Studio — Sito Vetrina

Sito one-page per studio multi-professionista. Stack: HTML5 + CSS3 + JavaScript vanilla, nessuna dipendenza, nessun build step. Apribile su qualsiasi hosting statico (GitHub Pages, Netlify, Vercel, ecc.).

---

## Come personalizzare

Tutto il contenuto editabile si trova in **`script.js`**, nei primi due blocchi.

### 1 · Dati dello studio (`STUDIO`)

```js
const STUDIO = {
  name:           "Il nome del tuo studio",
  tagline:        "La tua tagline",
  intro:          "Breve presentazione in hero.",
  studioTitle:    "Titolo della sezione 'Lo studio'",
  manifesto:      "Prima frase del manifesto.",
  manifestoLine2: "Seconda frase del manifesto.",
  address:        "Via Garibaldi 12, 20121 Milano",
  email:          "ciao@tuostudio.it",
  phone:          "+39 02 1234567",
  vatNumber:      "P.IVA 12345678901",
  location:       "Milano, Italia",
};
```

### 2 · Aggiungere / modificare un professionista (`PROFESSIONALS`)

Ogni professionista è un oggetto nell'array. Per **aggiungere** uno, incolla un oggetto in coda:

```js
{
  id:      "nome-cognome",           // stringa URL-safe, unica (es. "giulia-rossi")
  name:    "Giulia Rossi",
  role:    "Fotografa",
  bio:     "Due o tre frasi di presentazione.",
  photo:   "https://tuosito.it/foto-giulia.jpg",  // ritratto ~600x750 px
  website: "https://giuliarossi.it",  // oppure null per nascondere il bottone
},
```

Il resto (directory desktop, card mobile, select del form) si aggiorna da solo.

### 3 · Rimuovere un professionista

Elimina il suo oggetto dall'array `PROFESSIONALS` in `script.js`. Nient'altro da toccare.

### 4 · Configurare l'endpoint del form (`FORM_ENDPOINT`)

```js
const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
```

**Formspree** (consigliato): crea un form su formspree.io, copia l'URL e incollalo qui.

**Netlify Forms**: aggiungi `data-netlify="true"` al tag `<form>` in `index.html` e lascia `FORM_ENDPOINT` come placeholder — Netlify intercetta il form automaticamente.

Finche `FORM_ENDPOINT` e il placeholder `"[FORM_ENDPOINT]"`, il sito entra in **modalita demo**: simula un invio di 1,2 secondi e mostra il messaggio di conferma senza inviare nulla.

### 5 · Sezione Servizi

Modifica l'array `SERVICES` in `script.js`. Per **nascondere** l'intera sezione, lascialo vuoto: `const SERVICES = [];`

### 6 · Link legali

In `index.html` cerca i placeholder `[LINK_PRIVACY_POLICY]` e `[LINK_COOKIE_POLICY]` e sostituiscili con gli URL reali (presenti nella nav, nel form e nel footer).

### 7 · Open Graph e SEO

In `index.html` aggiorna:
- `<meta property="og:url">` con il tuo dominio
- `<meta property="og:image">` con un'immagine 1200x630 px

---

## Struttura file

```
index.html   — struttura HTML semantica (scheletro, popolato da JS)
style.css    — tutti gli stili, variabili CSS, responsive, animazioni
script.js    — dati configurabili + tutta la logica interattiva
README.md    — questa guida
```

---

## Pubblicare su GitHub Pages

1. Pubblica il repository su GitHub
2. Vai su Settings > Pages > Source: seleziona branch `main`, cartella `/ (root)`
3. Salva — il sito sara live su `https://tuonomeutente.github.io` in pochi minuti

---

## Palette colori (variabili CSS)

Tutte le variabili di colore sono in cima a `style.css`:

| Variabile              | Valore default | Uso                         |
|------------------------|----------------|-----------------------------|
| `--color-bg`           | `#FAF8F4`      | sfondo avorio caldo         |
| `--color-ink`          | `#1C1917`      | testo principale            |
| `--color-accent`       | `#C06033`      | terracotta — accento unico  |
| `--color-accent-deep`  | `#A04E26`      | accento hover               |
| `--color-muted`        | `#78716C`      | testi secondari             |
| `--color-border`       | `#E8E3DA`      | bordi e divisori            |

Per cambiare il colore accento basta modificare `--color-accent` e `--color-accent-deep`.
