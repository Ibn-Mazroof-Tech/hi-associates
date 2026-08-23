# HI Associates — Documentation & Compliance Services Website

Next.js (App Router) + TypeScript + Tailwind CSS v4 pe bana hua website. Login/signup nahi hai.

## Sabse pehle yeh files edit karo

### 1. `data/site.ts`
Brand name, email, landline, WhatsApp number, address, Google Sheet webhook URL — sab yahin se
control hota hai. Client se details milte hi yahan update kar do, poori website automatically
reflect ho jayegi.

```ts
whatsappNumber: "919999999999", // country code + number, bina + ya space ke
```

### 2. `data/services.ts`
Har service ka data (title, description, documents required, processing time) yahan hai.
Naya service add karna ho to bas is array mein ek naya object add karo — page automatically
ban jayega `/services/<slug>` pe. Naye service ko Apply Now form ke dropdown mein bhi dikhana
ho to usi file ke `serviceCategories` array mein uska slug sahi category ke `slugs` list mein
daal do.

Gazette Notification service pe `isGazette: true` set hai — isi flag ki wajah se Apply Now form
is service ke liye alag fields (Old Name / New Name / Reason for Change) dikhata hai, email
optional ho jaata hai, aur baaki services ke liye normal First Name / Last Name + required email.

### 3. `data/team.ts`
About Us page ke "Our Team" section ka data — abhi placeholder names hain, apni team ke real
naam/designation daal do. Photo dikhani ho to image `/public/team/` mein daal ke `photo` field
mein path daal do (e.g. `/team/asif.jpg`); photo na dene pe naam ke initials ka avatar dikhega.

### 4. Hero background image — `/public/hero-office-desk.jpg`
Homepage ke hero section mein ek full-width background photo lagti hai (office desk pe Passport,
PAN, Aadhaar, Gazette jaise documents). Abhi yeh file maujood nahi hai — koi bhi licensed photo
(Unsplash jaisi free-to-use site se — "documents desk flatlay" ya "passport ID card paperwork"
search karo) download karke exactly `public/hero-office-desk.jpg` naam se save kar do. Component
already wired hai, bas file daalne ki zarurat hai.

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
(hero, service pages, floating button) alag hain — woh direct WhatsApp chat khulte hain, form se
unka lena-dena nahi.

Submit hone ke baad user ko ek **unique Ticket ID** milta hai ek dedicated "Application
Submitted" page pe, screenshot lene ki guideline ke saath. Yehi Ticket ID Sheet mein bhi save
hota hai — jab user contact kare, uski Ticket ID se hi row dhoond sakte ho.

Dropdown mein services **category-wise grouped** hain (Gazette, GST, ITR, PAN Card, Passport,
Other Services) — yeh sirf form ke liye hai, Services listing page aur homepage cards flat hi
rehte hain.

### Setup (ek baar karna hai)

1. Naya Google Sheet banao, pehli row mein header daalo:
   `Timestamp | Ticket ID | Service | Name | Mobile | Email | Address | Gazette Reason | New Name`
2. Sheet mein **Extensions → Apps Script** kholo, `google-apps-script/Code.gs` ka poora code
   paste kar do.
3. **Deploy → New deployment → Web app** — "Execute as: Me", "Who has access: Anyone" →
   Deploy → permissions allow karo → `/exec` URL copy karo.
4. `data/site.ts` mein `googleSheetWebhookUrl` field mein woh URL paste karo.

### Agar form submit ho raha hai lekin Sheet mein data nahi aa raha

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
app/                        → pages (App Router)
  page.tsx                   → Homepage
  services/page.tsx          → Our Services listing (flat, sab 14 services)
  services/[slug]/           → Dynamic service detail page
  apply-now/                 → Buy Now → yahan form (category-grouped dropdown)
  application-submitted/     → Form submit hone ke baad Ticket ID page
  about-us/ contact-us/ policies/
components/                 → UI components
data/                       → site.ts, services.ts, team.ts
lib/                        → helper functions (whatsapp link, ticket ID generator)
google-apps-script/          → Code.gs — Sheet webhook
```

## Note

`gstandassociates.com/service.php` reference site ko fetch nahi kar paya (server 409 error de
raha tha automated requests pe), isliye services list CSC/CA domain knowledge se banayi gayi
hai — 14 common services (Gazette, GST, ITR, PAN, MSME, Company Registration, Trademark, FSSAI,
ISO, DSC, Passport, IEC, Accounting). Agar exact reference list chahiye, `data/services.ts`
mein entries edit/replace kar dena — structure same rahega.

