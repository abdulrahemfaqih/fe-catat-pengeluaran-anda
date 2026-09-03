# DESIGN.md — Keuangan App Redesign
### Industrial Brutalism / Anti-AI-Slop Design System

> **Untuk siapa dokumen ini:** AI coding agent yang akan mengeksekusi redesign total dari aplikasi "Keuangan" (React + Tailwind v4). Dokumen ini adalah satu-satunya sumber kebenaran untuk warna, tipografi, spacing, komponen, dan aturan interaksi. Jangan improvisasi di luar sistem ini — setiap keputusan visual harus bisa ditelusuri ke token di bawah.

---

## 0. Konteks Proyek

Aplikasi ini adalah **personal finance tracker**: mencatat pemasukan/pengeluaran bulanan, budget per kategori, transaksi harian, dan wishlist barang (dengan harga & gambar). Dua halaman utama yang sudah ada: **Dashboard** dan **Wishlist**, plus **Login/Register** yang perlu dibuat/diredesign dari nol dengan sistem yang sama.

Stack: React 19, React Router 7, Tailwind CSS v4 (`@tailwindcss/vite`), `react-hot-toast`, `jspdf`.

---

## 1. Apa yang Salah dari Desain Sekarang (Diagnosis)

Sebelum membangun yang baru, agent harus paham *kenapa* desain lama terasa "AI slop":

1. **Emoji sebagai ikon fungsional** (💰✨🎉🔥) — emoji bukan design system, dan terlihat murah/tidak konsisten di setiap OS/browser.
2. **Setiap card diberi warna pastel acak** (pink, kuning, biru, ungu bergantian tanpa arti) — warna tidak membawa informasi, cuma dekorasi, dan saling bertabrakan.
3. **Border-radius besar + shadow lembut + gradient tipis** di mana-mana — ini adalah default template generator, bukan keputusan desain.
4. **Tidak ada hierarki tipografi** — semua teks kira-kira sama beratnya, judul dan angka tidak dibedakan.
5. **Badge status berbentuk pill warna-warni** ("Hampir Melebihi 95%", "Melebihi Budget 174%") tanpa sistem warna semantik yang konsisten.
6. **Dekorasi tanpa fungsi** — bulatan-bulatan sudut card, sticker-like shapes — menambah noise visual tanpa menyampaikan data apapun.

Prinsip perbaikan: **setiap piksel warna harus punya alasan fungsional.** Kalau tidak bisa dijelaskan kenapa elemen itu berwarna X, elemen itu harus jadi hitam/putih/paper.

---

## 2. Arah Desain: Dual-Mode Brutalism

Aplikasi ini punya toggle Dark/Light — kita manfaatkan itu untuk menerapkan **dua varian brutalism yang sudah established**, bukan mencampur keduanya di layar yang sama:

| Mode | Archetype | Nuansa |
|---|---|---|
| **Light** | Swiss Industrial Print | Kertas dokumentasi, tinta karbon, satu warna alert. Seperti manual mesin tahun 60an. |
| **Dark** | Tactical Telemetry | Terminal CRT, monospace dominan, phosphor glow. Seperti dashboard kokpit/HUD. |

**Aturan keras:** satu mode = satu substrate. Jangan pernah pakai background gelap dengan aksen "kertas terang" atau sebaliknya dalam satu tampilan.

Ini juga menjawab akar "vibe Saweria" yang kamu mau di awal: energi bold, satu warna aksen tegas, kontras tinggi, tombol yang terasa bisa "ditekan" — tapi dieksekusi dengan disiplin (tanpa random pastel, tanpa border-radius, tanpa gradient) supaya tidak jatuh ke AI slop lagi.

---

## 3. Design Tokens

### 3.1 Warna — Light Mode (Swiss Industrial Print)

```
--color-bg:            #F4F4EE   /* paper — dokumentasi, bukan putih polos */
--color-surface:       #FFFFFF   /* card / panel di atas paper */
--color-ink:            #0A0A0A  /* teks utama, border utama */
--color-ink-muted:      #57534E  /* teks sekunder / label */
--color-border:         #0A0A0A  /* semua border, tanpa terkecuali */

--color-accent:          #FFC800  /* Signal Yellow — SATU-SATUNYA warna brand/CTA */
--color-accent-ink:      #0A0A0A  /* teks di atas accent, selalu hitam (kontras) */

--color-positive:        #1B7A3D  /* income, di bawah budget, sukses */
--color-warning:         #B45309  /* mendekati limit budget */
--color-negative:        #E61919  /* expense besar, melebihi budget, delete/danger */
```

### 3.2 Warna — Dark Mode (Tactical Telemetry)

```
--color-bg:              #0A0A0A  /* jangan pernah pure #000000 */
--color-surface:         #141414
--color-ink:              #EAEAEA  /* "white phosphor" — teks utama */
--color-ink-muted:        #8A8A8A
--color-border-strong:    #EAEAEA  /* border card, divider utama */
--color-border-subtle:    #2E2E2E  /* divider internal/tabel */

--color-accent:            #FFC800  /* sama seperti light — konsistensi brand */
--color-accent-ink:        #0A0A0A

--color-positive:          #4AF626  /* terminal green — PAKAI HANYA untuk 1 indikator: saldo/income aktif. Jangan jadi warna teks umum. */
--color-warning:           #FFB020
--color-negative:          #FF2A2A
```

> Kenapa income = hijau, expense = merah, warning = amber: ini bukan dekorasi, ini kode warna akuntansi yang sudah universal. Selain 3 warna semantik ini + 1 accent kuning, **tidak ada warna lain yang boleh muncul di UI.**

### 3.3 Tipografi

Tiga lapis, jangan dicampur perannya:

| Lapis | Font | Dipakai untuk |
|---|---|---|
| **Macro** | Archivo Black / Inter (900) | Judul halaman, angka statistik besar (Total Budget, Total Wishlist) |
| **Micro/Data** | JetBrains Mono / IBM Plex Mono | **Semua nominal Rupiah, tanggal, ID, label kategori, badge status, nomor tabel** |
| **Body** | Inter (400–600) | Deskripsi, isi form, paragraf panjang — satu-satunya teks yang boleh non-uppercase |

**Aturan penting untuk app ini secara spesifik:** karena ini finance app, **semua angka (Rupiah, persentase, tanggal) wajib pakai font monospace.** Ini secara instan memberi kesan "ledger/terminal" dan menyelesaikan setengah masalah hierarki tanpa perlu warna tambahan.

```css
--font-macro: "Archivo Black", "Inter", sans-serif;
--font-mono: "JetBrains Mono", "IBM Plex Mono", monospace;
--font-body: "Inter", sans-serif;
```

Import di `index.html` atau via `@import` di CSS:
```css
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
```

Skala & tracking:
- Judul halaman (H1): `clamp(2.5rem, 6vw, 5rem)`, `font-weight: 900`, `letter-spacing: -0.03em`, `line-height: 0.9`, UPPERCASE.
- Judul section (H2): `1.5rem–2rem`, weight 800, UPPERCASE.
- Label/meta (mono): `0.7rem–0.8rem`, `letter-spacing: 0.08em`, UPPERCASE.
- Angka statistik besar (mono): `2rem–3rem`, weight 700, tabular-nums.
- Body text: `0.9rem–1rem`, weight 400–500, normal case.

### 3.4 Geometri, Border, Shadow

```
--radius: 0px               /* TIDAK ADA border-radius. Titik. */
--border-width: 2px         /* border standar semua elemen interaktif */
--border-width-thick: 3px   /* card utama, panel besar */

--shadow-flat: 4px 4px 0 var(--color-ink)   /* hard offset shadow — TIDAK blur */
--shadow-flat-sm: 3px 3px 0 var(--color-ink)
--shadow-flat-active: 0px 0px 0 var(--color-ink) /* saat ditekan, shadow hilang + element bergeser */
```

Kenapa hard offset shadow (bukan soft shadow) boleh dipakai: ini bukan `box-shadow: 0 4px 12px rgba(0,0,0,0.1)` yang blur dan "melayang" ala Material Design — ini shadow solid tanpa blur yang mensimulasikan lapisan fisik/dicap (seperti stempel di atas kertas). Ini elemen sinyal-interaktivitas pengganti hover-glow yang biasa dipakai desain generic AI.

**Pola interaksi standar untuk semua elemen clickable:**
```
Default : border 2px solid ink, shadow-flat, translate(0,0)
Hover   : shadow membesar sedikit (6px 6px 0), translate(-2px,-2px)
Active  : shadow hilang (0 0 0), translate(4px,4px) — efek "ditekan"
Disabled: opacity 0.4, no shadow, cursor not-allowed
Focus   : outline 2px solid var(--color-accent), outline-offset 2px (WAJIB untuk aksesibilitas)
```

Transisi: `transition: transform 100ms linear, box-shadow 100ms linear;` — linear, bukan ease-in-out/bounce. Brutalism bergerak mekanis, bukan lembut.

### 3.5 Spacing & Grid

- Base unit 4px, gunakan skala Tailwind default (4, 8, 12, 16, 24, 32, 48, 64...) tanpa nilai custom aneh.
- Container utama: max-width terstruktur, padding konsisten `px-6 md:px-12`.
- Card grid pakai `display: grid; gap: 2px;` dengan background `var(--color-border)` di parent dan `var(--color-surface)` di child — ini trik menghasilkan divider garis tipis presisi tanpa border individual bertumpuk (lihat §8 Directive teknis).
- Jangan pakai negative space "asal lega" — tiap gap harus align ke grid.

---

## 4. Tailwind v4 Setup (CSS-first config)

Karena pakai Tailwind v4 (`@tailwindcss/vite`), config warna & font didefinisikan lewat `@theme` di file CSS utama (`index.css` / `App.css`), bukan `tailwind.config.js`.

```css
@import "tailwindcss";

@theme {
  /* Light mode tokens (default) */
  --color-bg: #F4F4EE;
  --color-surface: #FFFFFF;
  --color-ink: #0A0A0A;
  --color-ink-muted: #57534E;
  --color-border: #0A0A0A;

  --color-accent: #FFC800;
  --color-accent-ink: #0A0A0A;

  --color-positive: #1B7A3D;
  --color-warning: #B45309;
  --color-negative: #E61919;

  --font-macro: "Archivo Black", "Inter", sans-serif;
  --font-mono: "JetBrains Mono", "IBM Plex Mono", monospace;
  --font-body: "Inter", sans-serif;

  --radius-none: 0px;
}

.dark {
  --color-bg: #0A0A0A;
  --color-surface: #141414;
  --color-ink: #EAEAEA;
  --color-ink-muted: #8A8A8A;
  --color-border: #EAEAEA;

  --color-positive: #4AF626;
  --color-warning: #FFB020;
  --color-negative: #FF2A2A;
}

* {
  border-radius: 0 !important; /* enforce zero radius secara global sebagai safety net */
}
```

Pakai class `.dark` di `<html>` atau `<body>` (toggle dengan JS seperti biasa). Semua komponen di bawah pakai `bg-[var(--color-bg)]`, `text-[var(--color-ink)]` dsb, atau daftarkan sebagai warna Tailwind biasa lewat `@theme` (`bg-bg`, `text-ink`, dst — Tailwind v4 otomatis generate utility dari nama token `--color-*`).

---

## 5. Ikon: Hapus Semua Emoji

**Larangan mutlak:** 💰✨🎉🔥📊🔍 dan sejenisnya — di navbar, card header, button, tips box, mana pun.

Ganti dengan salah satu (boleh campur sesuai konteks):
1. **Tanpa ikon sama sekali** — cukup label teks uppercase mono. Paling brutalist-pure, pakai ini untuk mayoritas kasus.
2. **Line icon monokrom** — tambahkan `lucide-react` sebagai dependency baru. Icon di-stroke `1.5–2px`, ukuran fix (16px/20px), warna selalu `currentColor` (ikut warna teks/ink), **tidak pernah berwarna sendiri**. Dipakai hanya untuk aksi fungsional: search, filter, edit, delete/trash, export, close, chevron pagination.
3. **ASCII marker** untuk status/framing (opsional, sesuai selera brutalist): `[ ]`, `>>>`, `///`, `▲` `●` `■` sebagai penanda status alih-alih emoji.

Contoh instalasi:
```bash
npm install lucide-react
```

---

## 6. Spesifikasi Komponen

### 6.1 Button

```jsx
// Primary — accent fill, dipakai untuk aksi utama (Simpan, Tambah Item, Login)
<button className="
  font-mono uppercase text-sm tracking-wide font-bold
  bg-[var(--color-accent)] text-[var(--color-accent-ink)]
  border-2 border-[var(--color-ink)]
  px-5 py-2.5
  shadow-[4px_4px_0_var(--color-ink)]
  transition-transform duration-100 ease-linear
  hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)]
  active:translate-x-1 active:translate-y-1 active:shadow-none
  disabled:opacity-40 disabled:pointer-events-none
">
  SIMPAN
</button>

// Secondary — outline saja, dipakai untuk aksi netral (Reset Filter, Cancel)
<button className="
  font-mono uppercase text-sm tracking-wide font-bold
  bg-[var(--color-surface)] text-[var(--color-ink)]
  border-2 border-[var(--color-ink)]
  px-5 py-2.5
  shadow-[4px_4px_0_var(--color-ink)]
  hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)]
  active:translate-x-1 active:translate-y-1 active:shadow-none
">
  RESET
</button>

// Danger — dipakai untuk Delete/Hapus/Logout
<button className="
  font-mono uppercase text-sm tracking-wide font-bold
  bg-[var(--color-surface)] text-[var(--color-negative)]
  border-2 border-[var(--color-negative)]
  px-5 py-2.5
  shadow-[4px_4px_0_var(--color-negative)]
  hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-negative)]
  active:translate-x-1 active:translate-y-1 active:shadow-none
">
  HAPUS
</button>
```

Semua CTA teks **UPPERCASE**, tidak ada teks kalimat panjang di button.

### 6.2 Navbar

- Background `var(--color-surface)`, `border-b-[3px] border-[var(--color-ink)]`. Tidak floating, tidak ada shadow blur.
- Logo/brand: teks besar `font-macro uppercase`, TANPA icon api/emoji — kalau mau simbol, garis/kotak solid kecil di sebelah teks, bukan emoji.
- Nav item (Dashboard/Wishlist/Logout): jadi **tab berbentuk kotak outline**, bukan pill warna-warni. Item aktif = fill `var(--color-accent)`, item non-aktif = outline saja.
- Dark mode toggle: kotak switch 2 state (bukan pill rounded), label `LIGHT` / `DARK` mono uppercase, bukan icon bulan/matahari berwarna.

### 6.3 Card / Panel (komponen dasar)

Semua card pakai template sama: `bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] shadow-[4px_4px_0_var(--color-ink)]`. **Tidak ada lagi warna background pastel acak per card.** Warna hanya boleh muncul sebagai:
- Border-left tebal 6px dengan warna semantik (misal kategori pengeluaran), ATAU
- Badge kecil di pojok, ATAU
- Teks angka (positive/negative)

### 6.4 Stat Card (Total Wishlist, Total Budget, Total Pengeluaran, dll.)

Header nomor urut `#1 #2 #3` dari desain lama itu ide bagus — pertahankan tapi jadikan kotak monospace kecil di pojok kiri-atas, bukan sticker bulat.

```
┌──[ #1 ]────────────────────────┐
│ TOTAL BUDGET                    │  ← label, font-mono uppercase, ink-muted
│                                  │
│ Rp 1.000.000                    │  ← angka besar, font-macro/mono, ink
└──────────────────────────────────┘
```
- Border 3px, shadow-flat, no radius.
- Kalau nilainya negatif (Sisa Uang minus), teks angka pakai `var(--color-negative)` — ini satu-satunya alasan warna dipakai di sini.

### 6.5 Budget Category Card + Progress Bar

Ganti progress bar rounded-gradient dengan **segmented bar bergaya gauge/telemetry**: kotak-kotak kecil berbaris (10 segmen = 10%), terisi solid sesuai persentase, warna solid sesuai status (positive/warning/negative), sisanya outline kosong.

```jsx
<div className="flex gap-[2px] h-4 w-full">
  {Array.from({ length: 10 }).map((_, i) => (
    <div key={i} className={`flex-1 border border-[var(--color-ink)] ${
      i < filledSegments ? statusColorClass : 'bg-[var(--color-surface)]'
    }`} />
  ))}
</div>
```

Badge status (ganti "Hampir Melebihi 95%" dsb): kotak kecil outline, bukan pill.
```
[ ▲ MELEBIHI BUDGET 174% ]   → border + text var(--color-negative)
[ ● HAMPIR MELEBIHI 95% ]    → border + text var(--color-warning)
[ ✓ DALAM BATAS 16% ]        → border + text var(--color-positive)
```
Font mono, uppercase, `border-2`, padding kecil, background tetap `var(--color-surface)` (tidak fill warna).

### 6.6 Wishlist Item Card

- Gambar: `aspect-[4/3] object-cover border-b-[3px] border-[var(--color-ink)]`, opsional `grayscale hover:grayscale-0 transition duration-150` untuk sentuhan brutalist-editorial (foto jadi B&W, warna muncul saat hover — opsional tapi elegan, boleh di-skip kalau agent anggap kompleks).
- Nomor item (`#1`–`#9`): kotak mono kecil pojok kanan-atas card, background accent.
- Harga: tampilkan sebagai **badge terpisah di atas gambar**, bukan cuma field form — `font-mono font-bold text-lg`, misal `RP 170.050`.
- Field Harga/Deskripsi/Link: **hilangkan gaya "form input" palsu di dalam card display-only.** Kalau bukan mode edit, tampilkan sebagai teks biasa dengan label mono kecil di atasnya (definition list style: `<dt>`/`<dd>`), bukan `<input>` yang terlihat seperti field editable padahal read-only — ini salah satu sumber kebingungan visual di desain lama.
- Tombol Edit/Delete: pakai spec §6.1 (secondary/danger), align kanan-bawah card.

### 6.7 Tabel Transaksi

- Header tabel: `bg-[var(--color-ink)] text-[var(--color-bg)]` (invert), `font-mono uppercase text-xs tracking-wide`.
- Border antar baris: `border-b border-[var(--color-border)]` tipis (1px), bukan zebra-stripe warna-warni.
- Kolom Nominal: **selalu monospace, rata kanan, tabular-nums.**
- Kolom Kategori: badge outline kecil per kategori (1 warna border per kategori dari palet terbatas — max 6 kategori = 6 warna border yang didefinisikan sekali di token, bukan random).
- Baris hover: `hover:bg-[var(--color-bg)]` (subtle), bukan highlight warna terang.
- Aksi Edit/Hapus: ikon (lucide `Pencil`/`Trash2`) monokrom, bukan button besar bertuliskan penuh, untuk hemat ruang dalam tabel padat.

### 6.8 Filter Panel

- Header panel: `bg-[var(--color-ink)] text-[var(--color-bg)]` label uppercase mono (`FILTER TRANSAKSI`) — bukan gradient ungu.
- Input & select: `border-2 border-[var(--color-ink)] bg-[var(--color-surface)] px-3 py-2 font-mono text-sm`, focus state pakai outline accent (§3.4).
- Dropdown custom (Operator ≤/≥/=): styling native select tapi border tegas, tanpa rounded.

### 6.9 Pagination

Kotak nomor halaman `border-2 border-ink`, halaman aktif = fill accent. Tombol prev/next pakai chevron icon monokrom (lucide `ChevronLeft`/`ChevronRight`), bukan simbol `‹ ›` default browser yang inconsistent.

### 6.10 Toast (react-hot-toast override)

```js
toast.success('Tersimpan', {
  style: {
    background: 'var(--color-surface)',
    color: 'var(--color-ink)',
    border: '2px solid var(--color-positive)',
    borderRadius: 0,
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    boxShadow: '4px 4px 0 var(--color-ink)',
  },
  iconTheme: { primary: 'var(--color-positive)', secondary: 'var(--color-surface)' },
});
```
Sama untuk `toast.error` pakai `var(--color-negative)`. Tidak ada rounded corner, tidak ada shadow blur bawaan library.

### 6.11 Modal / Dialog (untuk form Edit/Tambah)

- Overlay: `bg-[var(--color-ink)]/60` (solid semi-transparan hitam, bukan blur/backdrop-blur bergradasi).
- Modal box: `border-[3px] border-ink shadow-[8px_8px_0_var(--color-ink)]`, no radius, muncul dengan `scale` instan/cepat (150ms), bukan slide bounce.
- Header modal: uppercase mono, tombol close = `X` icon monokrom pojok kanan-atas dalam kotak border, bukan icon bulat melayang.

---

## 7. Login & Register Page

Layout dua kolom (desktop), stack di mobile:

**Kolom kiri (branding, ~45%)**
- Background `var(--color-ink)` (invert — kolom ini pakai "mode gelap" secara sengaja sebagai statement visual meski body app light, ini bukan pelanggaran aturan substrate karena berupa panel branding terpisah, bukan campur di elemen yang sama).
- Teks brand raksasa `KEUANGAN` — `font-macro`, uppercase, `clamp(3rem,8vw,7rem)`, warna `var(--color-bg)` (paper) di atas ink.
- Tagline pendek 1 baris, mono, uppercase, warna accent.
- Elemen dekoratif: garis-garis horizontal tipis / angka referensi acak ala blueprint (`REV 01`, `EST. 2026`) — opsional, sangat tipis, di pojok bawah.

**Kolom kanan (form, ~55%)**
- Background `var(--color-bg)`.
- Judul form: `LOGIN` / `DAFTAR AKUN` — uppercase mono, dengan garis bawah tebal 3px accent.
- Input fields: full width, `border-2 border-ink`, label di atas input (bukan placeholder-only, bukan floating label animasi) — label mono uppercase kecil, input value pakai `font-body`.
- Tombol submit: primary button spec §6.1, full width.
- Link "Belum punya akun? Daftar" — teks biasa, link accent underline, bukan button kedua yang bersaing visual dengan submit.
- Google OAuth button (`@react-oauth/google`): render default Google button apa adanya (jangan dipaksa restyle — Google OAuth button punya guideline sendiri), tapi beri container `border-2 border-ink p-px` supaya tetap terasa menyatu dengan sistem kotak-kotak brutalist di sekitarnya. Beri divider `── ATAU ──` (mono, uppercase) di antara form manual dan tombol Google.

---

## 8. Checklist Anti-Slop (Self-Audit untuk Agent)

Sebelum agent menganggap redesign selesai, cek satu-satu:

- [ ] Tidak ada satupun emoji di codebase (`grep -r "[emoji-ranges]"` atau cek visual manual tiap file).
- [ ] Tidak ada `border-radius` selain `0` di manapun (kecuali avatar foto profil jika ada, itupun harus dipertimbangkan ulang — brutalism murni: tetap kotak).
- [ ] Tidak ada `box-shadow` dengan blur (`blur-radius > 0`) — semua shadow adalah hard offset.
- [ ] Tidak ada dua card bersebelahan dengan warna background pastel berbeda tanpa alasan semantik.
- [ ] Semua angka Rupiah pakai `font-mono` dan format tabular.
- [ ] Semua label/nav/button pakai `uppercase` + `font-mono` atau `font-macro`, body text tetap normal case.
- [ ] Palet warna yang benar-benar dipakai di seluruh app cuma: ink, bg/surface, accent (kuning), positive (hijau), warning (amber), negative (merah). Tidak lebih.
- [ ] Dark mode dan light mode masing-masing konsisten sebagai satu substrate, tidak ada elemen "ketinggalan" dari mode lain.
- [ ] Setiap elemen interaktif (button, card clickable, nav item) punya state hover/active/focus yang jelas mengikuti pola §3.4.
- [ ] Tidak ada gradient di manapun.

---

## 9. Ringkasan Prioritas Eksekusi

Urutan yang disarankan untuk agent saat mengerjakan:

1. Setup token (`@theme` di CSS, import font, `.dark` class).
2. Bangun komponen dasar reusable: `Button`, `Card`, `Badge`, `Input`, `ProgressSegmented`.
3. Redesign Navbar (dipakai di semua halaman).
4. Redesign Dashboard: Stat cards → Budget category cards → Filter panel → Tabel transaksi → Pagination.
5. Redesign Wishlist: Stat cards → Filter panel → Wishlist item cards.
6. Bangun Login & Register dari nol dengan layout §7.
7. Override styling `react-hot-toast` global.
8. Audit akhir pakai checklist §8.

---

*Dokumen ini adalah spesifikasi desain, bukan kode final — agent tetap perlu menyesuaikan implementasi detail dengan struktur komponen React yang sudah ada di codebase, tapi setiap keputusan warna/tipografi/spacing/shadow harus merujuk balik ke dokumen ini.*
