# IROCLEAR SOLUTIONS - website package

Everything in this folder is your finished website. Three pages, your own
domain, private email. No coding needed from you - just the clicks listed in
this file.

---

## 1. What is in this folder

| File / folder | What it is | You need to touch it? |
|---|---|---|
| `index.html` | Home page | No |
| `about.html` | About page | No |
| `contact.html` | Contact page with the enquiry form | No |
| `404.html` | The "page not found" screen | No |
| `assets/css/style.css` | All the colours, spacing and layout | No |
| `assets/js/main.js` | Menu button + form sending | **Yes - one line (Step E)** |
| `assets/js/404.js` | Small script for the 404 page | No |
| `assets/img/logo.svg` | Your logo mark | No |
| `assets/img/favicon.svg` | The little icon in the browser tab | No |
| `CNAME` | Tells GitHub your domain name | No |
| `robots.txt`, `sitemap.xml` | Help Google find you | No |
| `README.md` | This file | - |

**Never edit these files in Notepad.** Notepad can silently change line
endings and break the page. If you need a change, ask me instead.

---

## 2. THE DNS RECORDS - what to add at Namecheap

Log in to Namecheap, then: **Domain List -> your domain -> Manage ->
Advanced DNS** tab.

> **Before you start:** delete any existing entries of the same type that you
> are replacing. One `A` record stays, four `A` records go in. Namecheap's
> default parking records (often a `CNAME` for `www` pointing at
> `parkingpage.namecheap.com`, or a `URL Redirect`) must be removed or they
> will fight with the new ones.

### A) Website records

| Type | Host | Value | TTL |
|---|---|---|---|
| A Record | `@` | `185.199.108.153` | Automatic |
| A Record | `@` | `185.199.109.153` | Automatic |
| A Record | `@` | `185.199.110.153` | Automatic |
| A Record | `@` | `185.199.111.153` | Automatic |
| CNAME Record | `www` | `too-too-cloud.github.io` | Automatic |

`@` means "your main domain" (`iroclearsolutions.online`). The `www` CNAME
makes `www.iroclearsolutions.online` work and redirect to the main domain.
Type `too-too-cloud.github.io` with **no** `https://`, **no** trailing slash,
and **no** `/iroclear-website` on the end.

### B) Email records (Namecheap Private Email)

Your email lives on the *same* domain as your website. That is fine - `A`
records (website) and `MX` records (email) never clash, because they are
different types.

| Type | Host | Value | Priority |
|---|---|---|---|
| MX Record | `@` | `mx1.privateemail.com` | 10 |
| MX Record | `@` | `mx2.privateemail.com` | 10 |
| TXT Record | `@` | `v=spf1 include:spf.privateemail.com ~all` | - |
| TXT Record | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@iroclearsolutions.online` | - |

> **Important:** Namecheap usually adds the MX and SPF records for you when
> you order Private Email. Compare what is already there with the table above
> rather than blindly adding duplicates. If your Private Email control panel
> shows *different* values, **the control panel wins** - copy those exactly.

Your **DKIM** record is generated inside the Private Email control panel
(it is unique to your domain, so nobody can give you the value in advance).
In the panel: **Private Email -> your domain -> DNS Settings / DKIM** - it
will show the exact TXT record name and value. Add it exactly as shown.

### C) Optional but recommended - stop domain hijacking

In GitHub: **Settings -> Pages -> Custom domain**, click **Verify**, and
GitHub will hand you a TXT record like this:

| Type | Host | Value |
|---|---|---|
| TXT Record | `_github-pages-challenge-too-too-cloud` | *(the long code GitHub shows you)* |

---

## 3. Time-sensitive things - read this

| What | When |
|---|---|
| Namecheap Private Email **30-day free trial** | Auto-converts to a paid 1-year plan unless you cancel first. **Set a phone reminder for day 25.** |
| Cost if you keep it | Launch plan renews at roughly **$14.88/year** for 1 mailbox, 5 GB. Cancel and you lose the mailbox (and the address). |
| Trial limits | 5 Launch trials per Namecheap account, 1 per domain. You cannot trial twice on the same domain. |
| Free trial eligibility | Not available on `.tk .ml .ga .cf .gq .za.com .ru .by .su` domains - `.online` is fine. |
| GitHub Pages HTTPS | The **Enforce HTTPS** tick box can take up to 24 hours to appear after DNS is correct. That is normal, not an error. |

---

## 4. Things you still need to personalise

- [ ] **Phone number** - there is none on the site yet (we agreed not to invent one). Tell me the number and I will add it to all three pages plus the contact page.
- [ ] **Opening hours** - same as above.
- [ ] **Service area** - the About page says "the local area". Replace it with your real towns or counties.
- [ ] **Your story** - the first paragraph of the About page is written about how you work, not how you started. Two sentences about your background would make it much stronger.
- [ ] **Photos of real jobs** - the single biggest upgrade available. The site currently uses no photos on purpose: stock photos of somebody else's work would be dishonest. Send me a handful and I will build a gallery.
- [ ] **Insurance / trade memberships** - only add these if they are genuinely true. I have deliberately not claimed any.
- [ ] **Web3Forms access key** - see Step E below. The form will not work until this is done.
