# Nagrik Seva Kendra — CSC Services Website

Next.js (App Router) + TypeScript + Tailwind CSS v4 pe bana hua website. Login/signup nahi hai —
poori site static-first hai, sirf Apply Now form client-side WhatsApp redirect use karta hai.

## Sabse pehle yeh 2 files edit karo

### 1. `data/site.ts`
Brand name, email, landline, WhatsApp number, address — sab yahin se control hota hai.
Client se details milte hi yahan update kar do, poori website automatically reflect ho jayegi.

```ts
whatsappNumber: "919999999999", // country code + number, bina + ya space ke
```

### 2. `data/services.ts`
Har service ka data (title, description, documents required, processing time) yahan hai.
Naya service add karna ho to bas is array mein ek naya object add karo — page automatically
ban jayega `/services/<slug>` pe, kahin aur kuch chhedne ki zarurat nahi.

Gazette Notification service pe `isGazette: true` set hai — isi flag ki wajah se Apply Now form
is service ke liye alag fields (Old Name / New Name / Reason for Change) dikhata hai, baaki
services ke liye normal First Name / Last Name.

## Local mein chalane ke liye

```bash
npm install
npm run dev
```
Phir http://localhost:3000 kholo.

## Production build

```bash
npm run build
npm start
```

Ya Vercel pe deploy karo (sabse aasan): repo push karo aur vercel.com pe import kar do — Next.js
project hone ki wajah se koi extra config nahi chahiye.

## Apply Now form kaise kaam karta hai

Koi backend/database nahi hai — form seedha Google Sheets mein ek row save karta hai via
`google-apps-script/Code.gs` (ek free Google Apps Script webhook). WhatsApp automatically
nahi khulta; client Sheet check karke khud user ko contact karta hai. Contact Us buttons
(header, hero, service pages) alag hain — woh direct WhatsApp chat khulte hain, form se
unka lena-dena nahi.

### Setup (ek baar karna hai)

1. Naya Google Sheet banao, pehli row mein header daalo:
   `Timestamp | Service | Name | Mobile | Email | Address | Gazette Reason | Old Name | New Name`
2. Sheet mein **Extensions → Apps Script** kholo, `google-apps-script/Code.gs` ka poora code
   paste kar do.
3. **Deploy → New deployment → Web app** — "Execute as: Me", "Who has access: Anyone" →
   Deploy → permissions allow karo → `/exec` URL copy karo.
4. `data/site.ts` mein `googleSheetWebhookUrl` field mein woh URL paste karo.

### Agar form submit ho raha hai lekin Sheet mein data nahi aa raha

- **Sheet khud check karo** — form ab "success" tabhi dikhayega jab Apps Script se
  `{result: "success"}` wapas aaye, isliye agar form pe error dikh raha hai to yeh sabse
  pehle indicate karega ki kuch galat hai.
- **Apps Script "Executions" log check karo** — script editor ke left sidebar mein clock
  icon pe click karo, dekho `doPost` trigger hua ya nahi aur koi error to nahi aaya.
- **Deployment access "Anyone" pe hai ya nahi** confirm karo — agar "Only myself" ya
  "Anyone with Google account" hai to website se aane wali request reject ho jayegi.
- **Code edit karne ke baad naya deployment banaya?** — sirf file save karne se live `/exec`
  URL update nahi hota, Manage deployments → pencil icon → New version → Deploy karna zaroori
  hai.
- **`/exec` URL hi use kiya, `/dev` nahi** — dev URL sirf tumhare apne Google account se
  chalta hai, public form se nahi.


## Structure

```
app/                  → pages (App Router)
  page.tsx             → Homepage
  services/page.tsx    → Our Services listing
  services/[slug]/     → Dynamic service detail page (sab 14 services isi ek file se)
  apply-now/           → Buy Now → yahan form
  about-us/ contact-us/ policies/
components/           → UI components
data/                 → site.ts (config) + services.ts (services data)
lib/                  → helper functions
```

## Note

`gstandassociates.com/service.php` reference site ko fetch nahi kar paya (server 409 error de
raha tha automated requests pe), isliye services list CSC/CA domain knowledge se banayi gayi
hai — 14 common services (Gazette, GST, ITR, PAN, MSME, Company Registration, Trademark, FSSAI,
ISO, DSC, Passport, IEC, Accounting). Agar exact reference list chahiye, `data/services.ts`
mein entries edit/replace kar dena — structure same rahega.
