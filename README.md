# Ikhlas School Manager

A student, fee and accounts management app built from your school database document. It runs as a **desktop app** (just open the file) and as a **cloud app** (host the same files on any web server).

## Files

- `index.html` — the app shell
- `style.css` — all styling
- `app.js` — all logic and data
- `firebase-config.js` — optional cloud sync settings (off by default; see "Keeping data in sync" below)

Keep all four files in the same folder. Nothing else is required — no install, no build step, no server-side code.

## Running it

**As a desktop app:** double-click `index.html`. It opens in your default browser and works fully offline (an internet connection is only used once to load the Lora/Inter fonts — if you're offline it falls back to your system font and still looks fine).

**As a cloud app (shared over the internet):** upload the files to any static web host — GitHub Pages, Netlify, Vercel, or your own web server — and share the link with staff. No database server is needed unless you turn on cloud sync (see below).

**Turning it into a real installed desktop icon (optional):** if you want a proper `.exe`/`.app` you can wrap these files with [Electron](https://www.electronjs.org/) or [Neutralino](https://neutralino.js.org/) — a developer can do this in under an hour since the app itself needs no changes.

## Logging in

- **Continue as teacher** — no password. Teachers can add, edit and look up student records, and view the class-list report. They cannot see fees, payments, accounts or settings — those tabs are hidden entirely.
- **Fee Payments login** — password protected. Starting password:

  ```
  fees123
  ```

  This role sees only **Students** and **Payments**. It can look up students and record new payments (and print receipts), but cannot add, edit or delete students, and cannot edit or delete payments — those controls are hidden. It has no access to Fees, Accounts, Reports or Settings.

- **Management login** — password protected. The starting password is:

  ```
  admin123
  ```

  **Change these passwords immediately** from Settings → Management password / Fee Payments password / Data password once you're in. Management has full access: students, fees, discounts, payments, accounts, reports and settings, including deleting records and setting the Fee Payments and Data passwords.

- **Data password** — a separate password (starting value `reset123`) required specifically to use "Reset to example data" in Settings. It's deliberately kept apart from the Management password, so resetting all data needs its own explicit confirmation even if someone is already signed in as Management. Change it from Settings → Data password.

## What's included

- **Students** — add, edit, delete, search and filter by class/status. Each student has a full profile page with the admission number, student/father/mother Aadhaar numbers, and contact details. Search matches on the whole word or number you type (not just the first character).
- **Fees** — one fee record per student per fee type (Tuition, Transport, Hostel, Exam, Previous year outstanding due, or a custom "Other" type you name), with an amount, an optional discount (with a reason, e.g. "merit scholarship" or "staff ward"), and a due date. The net amount, amount paid and balance are calculated automatically from recorded payments.
- **Payments** — record a payment against any fee (search by student name or admission no., optionally narrow by fee type first); the balance is recalculated instantly. Every payment can be printed as a receipt with the school logo and spaces for a stamp and signature.
- **Accounts** — a combined ledger of income (automatically pulled from fee payments) and manually entered expenses, with totals and a net balance.
- **Reports** — pending and partial fees, a fee collection report by payment method, a discount/scholarship report, and a class-wise student list.
- **Settings** (management only) — edit school details, upload a school logo, change the Management and Fee Payments passwords, download a full backup as a `.json` file, restore from a backup, or reset to the original example data.
- **Print** — every list page (Students, Fees, Payments, Accounts, Reports) and the student profile page have a Print button. Each opens a clean, letterhead-styled printout (school logo, name and address, plus the current table or profile) in a new tab and opens your browser's print dialog automatically. Search boxes, filters and action buttons are left out of the printed page automatically.

## Student records

Each student record uses "Admission No." as the unique identifier (shown throughout the app in place of a generic "Student ID"). Alongside the usual name, class, date of birth and contact details, the Add/Edit Student form captures:

- the student's own Aadhaar number,
- father's name and Aadhaar number,
- mother's name and Aadhaar number.

Aadhaar numbers are optional but validated: if entered, they must be exactly 12 digits, and are auto-formatted as `1234 5678 9012`. All of these fields are visible on the student's profile page.

## Finding students and fees quickly

The "Student" field in Add Fee record and the "Student" field in Record Payment are both search boxes — type a few letters of a name or an admission number and pick from the filtered list, instead of scrolling a long dropdown. In Record Payment you can also narrow the list down by Fee type first.

Fee type in both Add Fee record and Record Payment includes the usual Tuition/Transport/Hostel/Exam options plus "Other" — choosing Other reveals a text box to name the fee (e.g. "Lab fee", "Annual day fee"), which is then used as the fee's actual type.

## School logo

Go to Settings → School logo → Upload logo. PNG, JPG, SVG or WebP under 2MB works; a square image (e.g. 200×200px) looks best. Once uploaded, the logo appears:

- on the login screen,
- in the sidebar next to the school name,
- at the top of every printed page and payment receipt.

Use Replace logo to swap it out, or Remove logo to go back to the default "IS" mark. The logo is stored as part of your data (see "Where your data lives" below), so it's included automatically in your backups.

## Where your data lives

By default, all data is stored in the browser's local storage on the device you're using — there is no external database. This means:

- Data is specific to the browser and device it was entered on. If you open the app on a different computer, it starts from the example data again (this is why changes on one computer weren't showing up on another — see "Keeping data in sync" below for the fix).
- **Back up regularly**: Settings → Data backup → Download backup. Keep the `.json` file somewhere safe (e.g. shared drive, email to yourself).
- To move data to another device, download the backup on one device and restore it on the other.

If you turn on cloud sync (below), this changes: data lives in your Firebase project instead, and every device sees the same live copy. Local backups still work the same way as an extra safety net.

## Keeping data in sync across every computer using this link

**Why changes on one computer weren't showing up on another:** by default this app stores its data with the browser's local storage. That means every device that opens the link has its own separate copy — nothing is shared automatically, even though everyone uses the same GitHub Pages link. This is normal for a plain static site with no server behind it, and it's exactly why edits made in one place weren't appearing anywhere else.

**The fix: optional cloud sync.** This app includes a ready-to-use (but off by default) cloud sync layer built on Firebase (a free Google service). When it's turned on, every save is written to one shared cloud document, and every open copy of the app updates automatically within moments — no page refresh needed.

To turn it on:

1. Open `firebase-config.js` in the app's files — it has full step-by-step instructions.
2. Create a free Firebase project, enable Firestore Database and Authentication (Email/Password) as described there, and set security rules so only signed-in users can read/write.
3. Paste your project's config into `FIREBASE_CONFIG`, set `FIREBASE_ENABLED = true`, save, and redeploy (push to the branch your GitHub Action builds from).
4. Create one Firebase login (email + password) per staff member — or one shared login — from the Firebase console, and share that separately from the app's own Management/Teacher/Fee Payments passwords.

**Why there's an extra sign-in step:** this app stores sensitive information, including Aadhaar numbers. The in-app Management/Teacher/Fee Payments passwords are a convenience for staff, not real security — anyone can view a static site's code, config included. Real protection has to come from Firebase's own authentication and security rules, which is why enabling cloud sync adds a separate "cloud sign-in" screen before the usual role screen. Please don't turn this on without also setting up the security rules and authentication described in `firebase-config.js` — an open, unauthenticated cloud database would make student data readable by anyone who finds your project's config.

**If you don't set this up:** nothing changes. The app keeps working exactly as before, with data local to each device, and a "Cloud sync is off" note appears in Settings so everyone knows.

**Once it's turned on:** a green "Cloud sync on" badge appears in the sidebar for every signed-in user, and Settings shows who's currently signed in with an option to sign out of cloud sync (separate from the regular in-app "Log out", which just returns to the Teacher/Fee Payments/Management role screen).

## Security note

The Management/Teacher/Fee Payments login is a straightforward password gate suitable for a shared office computer or a small staff team, not a hardened multi-user login system — anyone with the password has full access within that role, and the password itself lives in the app's data. This is fine for controlling what a signed-in person can click inside the app, but it is not what stands between the internet and your data.

If you keep cloud sync off, your data never leaves the device it's entered on, so this mostly doesn't matter. If you turn cloud sync on, the real security boundary becomes Firebase's authentication and security rules (see above) — set those up properly before switching it on, since a public Firestore database would expose Aadhaar numbers and other student data to anyone who finds your config.

## Customizing

- School name, address and phone: Settings tab (management), or edit the `school` object at the top of `app.js`.
- Colors and fonts: the CSS variables at the top of `style.css` (`--primary`, `--accent`, `--font-display`, `--font-body`).
- Fee types, payment methods, expense categories: the `<select>` options inside `openFeeModal`, `openPaymentModal` and `openExpenseModal` in `app.js`.
- Copyright line: search for "Naseer@GitHub" in `index.html` and `app.js`.
