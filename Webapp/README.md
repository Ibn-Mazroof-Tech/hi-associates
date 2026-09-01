# Hamdan Associates — Documentation & Compliance Services Website

Next.js (App Router) + TypeScript + Tailwind CSS v4 pe bana hua website. Login/signup nahi hai.

## Sabse pehle yeh files edit karo

### 1. `data/site.ts`
Brand name, email, landline, WhatsApp number, address, **saari images ke paths** (`images`
object ke andar) — sab yahin se control hota hai. Client se details milte hi yahan update kar
do, poori website automatically reflect ho jayegi.

```ts
whatsappNumber: "919999999999", // country code + number, bina + ya space ke
```

**Image badalna ho to:** nayi photo `public/` folder mein daal do (koi bhi filename), phir
`data/site.ts` ke `images` object mein us image ka naam matching line pe likh do — kisi bhi
component ya page file mein jaake kuch dhundna/edit karna nahi padega:

```ts
images: {
  logo: "/logo.png",
  homeHero: "/hero-office-desk.jpg", // homepage hero background
  aboutHero: "/about-hero.jpg",      // About Us page intro background
  contactHero: "/contact-hero.jpg",  // Contact Us page intro background
},
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
(Yeh list hai isliye `data/site.ts` ke `images` object se alag rakha hai — har member ki apni
photo hoti hai.)

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

Koi backend/database nahi hai — form ek apni server-side API route (`/api/apply`) ke through
Google Sheets mein ek row save karta hai, jo aage `google-apps-script/Code.gs` (ek free Google
Apps Script webhook) ko call karta hai. Yeh webhook URL ek **server-only secret** hai — browser
mein kabhi expose nahi hoti (security wajah — neeche dekho). WhatsApp automatically nahi khulta;
client Sheet check karke khud user ko contact karta hai. Contact Us buttons (hero, service
pages, floating button) alag hain — woh direct WhatsApp chat khulte hain, form se unka lena-dena
nahi.

Submit hone ke baad user ko ek **unique Ticket ID** milta hai ek dedicated "Application
Submitted" page pe, screenshot lene ki guideline ke saath. Format hai `YYYYMMDDXXXX` (jaise
`202608250001`) — pehle 8 digits date, aakhri 4 digits us din ka submission sequence number.
Yeh ID **Google Apps Script (server-side) generate karta hai**, form khud nahi — isse guarantee
milta hai ki do log ek hi second mein submit karein to bhi ID clash nahi hoga. Sheet mein bhi
yehi Ticket ID save hoti hai — jab user contact kare, uski Ticket ID se hi row dhoond sakte ho.
Name aur New Name columns Sheet mein **CAPITAL LETTERS** mein save hote hain.

Dropdown mein services **category-wise grouped** hain (Gazette, GST, ITR, PAN Card, Passport,
Other Services) — yeh sirf form ke liye hai, Services listing page aur homepage cards flat hi
rehte hain.

### Setup (ek baar karna hai)

1. Naya Google Sheet banao, pehli row mein header daalo:
   `Date | Ticket ID | Service | Name | Mobile | Email | Address | Gazette Reason | New Name`
2. Sheet mein **Extensions → Apps Script** kholo, `google-apps-script/Code.gs` ka poora code
   paste kar do.
3. **Deploy → New deployment → Web app** — "Execute as: Me", "Who has access: Anyone" →
   Deploy → permissions allow karo → `/exec` URL copy karo.
4. `.env.local.example` ko `.env.local` naam se copy karo (agar pehle se nahi hai), usme
   `GOOGLE_SHEET_WEBHOOK_URL=` ke aage woh URL paste karo.
5. **Vercel pe deploy hai to** — Vercel Dashboard → Project → Settings → Environment
   Variables mein `GOOGLE_SHEET_WEBHOOK_URL` naam se yehi value add karo, phir redeploy karo.

⚠️ **Security note:** Yeh URL ab kabhi bhi GitHub repo ya browser mein visible nahi hoti — sirf
server pe (`app/api/apply/route.ts`) use hoti hai. Lekin agar tumne yeh URL kabhi pehle
`data/site.ts` mein commit karke GitHub pe push ki thi, woh purani value ab bhi repo ke **git
history** mein maujood hai (chahe current file se hata di ho). Agar wahi URL abhi tak
`.env.local` mein use kar rahe ho, koi bhi jisne woh purani commit dekh li thi, ab bhi Sheet mein
spam data bhej sakta hai. Sabse safe option: Apps Script mein **naya deployment** banao (Deploy →
New deployment, purana "Manage deployments" wala edit nahi) — isse ek bilkul naya `/exec` URL
milega jo kabhi kisi commit mein nahi tha, aur usi naye URL ko `.env.local` / Vercel mein daalo.

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
- **`.env.local` mein sahi variable name hai ya nahi** — `GOOGLE_SHEET_WEBHOOK_URL` hi hona
  chahiye, spelling match karna zaroori hai.

## Payment page (Razorpay)

Header ke right side mein "Make Payment" link hai (`/payment`) — koi bhi amount enter karke
Razorpay ke through pay kar sakta hai. Yeh Apply Now form se **alag/independent** hai — client
kisi ko amount quote kare (WhatsApp/call pe), woh is page pe aake wahi amount daal ke pay kar
sakta hai. Optional "Ticket ID / Reference" field hai taaki payment ko kisi application se
match kiya ja sake.

### Setup (ek baar karna hai)

1. [razorpay.com](https://razorpay.com) pe account banao (agar nahi hai), KYC complete karo.
2. Dashboard → **Settings → API Keys** → "Generate Test Key" (testing ke liye) ya "Generate
   Live Key" (real payments ke liye).
3. `.env.local.example` ko `.env.local` naam se copy karo, usme dono values paste karo:
   ```
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. **Vercel pe deploy kiya hai to** — `.env.local` file kabhi upload/commit nahi hoti (already
   `.gitignore` mein hai). Vercel Dashboard → Project → **Settings → Environment Variables**
   mein yehi 2 values manually add karo, phir redeploy karo.
5. `RAZORPAY_KEY_SECRET` **kabhi bhi client-side code ya publicly visible file mein nahi jaati**
   — yeh sirf `app/api/razorpay/order/route.ts` (server) mein use hoti hai. Isse kabhi Git mein
   commit mat karna.

Jab tak yeh keys nahi daali jaatin, Payment page pe "Payment is not configured yet" wala error
aayega — yeh expected hai, bas keys daalte hi kaam karne lagega. Test Key se pehle test kar
lena (Razorpay test cards docs pe available hain), phir Live Key pe switch karna.

## Structure

```
app/                        → pages (App Router)
  page.tsx                   → Homepage
  services/page.tsx          → Our Services listing (flat, sab 14 services)
  services/[slug]/           → Dynamic service detail page
  apply-now/                 → Apply Now → yahan form (category-grouped dropdown)
  application-submitted/     → Form submit hone ke baad Ticket ID page
  payment/                   → Razorpay payment page
  api/razorpay/order/        → Server-side order creation (key_secret yahin use hoti hai)
  about-us/ contact-us/ policies/
components/                 → UI components
data/                       → site.ts, services.ts, team.ts
lib/                        → helper functions (whatsapp link helper)
google-apps-script/          → Code.gs — Sheet webhook
```

## Note

`gstandassociates.com/service.php` reference site ko fetch nahi kar paya (server 409 error de
raha tha automated requests pe), isliye services list CSC/CA domain knowledge se banayi gayi
hai — 14 common services (Gazette, GST, ITR, PAN, MSME, Company Registration, Trademark, FSSAI,
ISO, DSC, Passport, IEC, Accounting). Agar exact reference list chahiye, `data/services.ts`
mein entries edit/replace kar dena — structure same rahega.

