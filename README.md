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

- **Students** — add, search and filter by class. Each student has a full profile page with the admission number, student/father/mother Aadhaar numbers, and contact details. Search matches on the whole word or number you type (not just the first character). Teachers see an extended list (with date of birth and all Aadhaar numbers) for admin tasks like ID proofs, but can't edit or delete a record once added — only Management can edit or delete students.
- **Fees** — one fee record per student per fee type (Tuition, Transport, Hostel, Exam, Previous year outstanding due, or a custom "Other" type you name), with an amount, an optional discount (with a reason, e.g. "merit scholarship" or "staff ward"), and a due date. The net amount, amount paid and balance are calculated automatically from recorded payments.
- **Payments** — record a payment against any fee (search by student name or admission no., optionally narrow by fee type first); the balance is recalculated instantly. Every payment can be printed as a receipt with the school logo and spaces for a stamp and signature, or sent to the parent as a WhatsApp or SMS message.
- **Messaging** — send a WhatsApp or SMS message to any parent, individually or as a class-wide (or whole-school) announcement, and automatically after recording a payment. See "Messaging parents" below for how this works and its limits.
- **Accounts** — a combined ledger of income (automatically pulled from fee payments) and manually entered expenses, with totals and a net balance.
- **Reports** — pending and partial fees, a fee collection report by payment method, a discount/scholarship report, and a class-wise student list.
- **Settings** (management only) — edit school details, upload a school logo, change the Management and Fee Payments passwords, download a full backup as a `.json` file, restore from a backup, or reset to the original example data.
- **Print** — every list page (Students, Fees, Payments, Accounts, Reports) and the student profile page have a Print button. Each opens a clean, letterhead-styled printout (school logo, name and address, plus the current table or profile) in a new tab and opens your browser's print dialog automatically. Search boxes, filters and action buttons are left out of the printed page automatically.

## Messaging parents (WhatsApp & SMS)

The app can prepare a WhatsApp or SMS message for any parent with one click — but it's important to understand what this does and doesn't do, since there's no paid messaging service or backend behind it:

**How it actually works:** every "Send WhatsApp" or "Send SMS" button builds the message text and opens WhatsApp (web or the app) or your phone's messaging app in a new tab, with the message already typed in. A person still has to press the final Send button there. This works with no account, no API key, and no monthly cost — but it is not a silent, fully-automatic send. Browsers (and WhatsApp itself) don't allow a webpage to message multiple people with one click with nobody involved, so:

- **Payment confirmations** — right after a payment is recorded, the app offers to send a confirmation (fee type, amount paid, total fee, and balance due) to that parent. Every payment row also keeps its own Send WhatsApp / Send SMS buttons, so a confirmation can be sent again later.
- **Individual messages** — click the message icon next to any student to write and send them a one-off message.
- **Announcements** — click Announcement on the Students page to message many parents at once: choose all students or one class, write a message (optionally using `{name}` to personalize it), then click Send next to each recipient in turn. Each click opens that parent's chat ready to go; sent recipients are marked so it's easy to track progress through a long list.

**Phone numbers:** messages use the phone number on each student's record, combined with the school's country code (Settings → School details → Country code, default `91` for India). A student with no phone number on file is skipped with a note instead of a broken link.

**If your school later wants a fully automated, no-click bulk sender** (e.g. scheduled reminders sent with nobody pressing anything), that requires a paid provider such as the WhatsApp Business API, Twilio, or MSG91, plus a small backend to hold the API credentials safely — a static site like this one cannot store such credentials without exposing them to anyone who views the page's source. This is the same reason cloud sync (above) needs its own Firebase setup rather than working "out of the box".

## Alerts (internal Management notifications)

A separate **Alerts** tab (Management only, bell icon in the sidebar) logs internal activity as it happens \u2014 this is different from the **Notifications** tab, which sends messages to parents. Alerts covers:

- **Student enrolled** \u2014 a new student is added.
- **Fees billed** \u2014 a new fee record is created for a student.
- **Fees collected** \u2014 a payment is recorded against a fee (one alert per payment).
- **Pending balance (bi-weekly)** \u2014 a summary of total outstanding fees and how many students owe money, generated automatically about once every two weeks.
- **Fee record deleted** and **Payment record deleted** \u2014 whenever Management deletes one of these.

Each type has its own on/off switch at the top of the Alerts tab \u2014 turn off anything you don't want logged or popped up. There's also a **"Show pop-up on this device"** switch: when it's on and the browser has granted permission (the tab will offer an "Allow pop-up notifications" button the first time), an alert also shows as a device notification while the app is open, using the same install/PWA setup described above \u2014 tapping it brings the app to the front. This is a live, in-app pop-up, not a push notification the phone can receive while the app is fully closed; a static site with no backend can't do that (the same limitation described under "Messaging parents" above for a fully automated sender).

Alerts are stored with the rest of your data (`alertLog` / `alertSettings` in the backup `.json`), so they're included in backups and, if cloud sync is on, shared across every signed-in device.

## Parent Portal app

A second, separate, read-only app lives in the `parent-app/` folder, for parents rather than staff. It shows only their own child — never other students — and needs no password to set up per-parent:

- **What a parent sees:** their child's profile (name, class, DOB, parents' names, phone, address, admission date — no Aadhaar numbers), a fee summary per fee type with net/paid/balance and a Paid/Partial/Pending status, a full payment history, and a Notices tab for fee reminders and announcements sent from the main app.
- **How a parent logs in:** Admission No. + the student's date of birth. No account or password to create per parent.
- **Requires cloud sync to already be on** (see "Keeping data in sync" above) — this app has no local/offline mode, since its whole point is showing data entered on a different device. It reads the same Firebase project as the main app, just a separate, deliberately limited slice of it (see "How this stays scoped to one student" below).

### Setting it up

1. Turn on cloud sync in the main app first (see "Keeping data in sync" above), including the **updated security rules** in `firebase-config.js` — they now include a few extra sections for the Parent Portal (`parent_portal`, `parent_portal_meta`, `notifications`). If you set cloud sync up before these were added, open Firestore → Rules and paste the current version from `firebase-config.js` again.
2. Open `parent-app/firebase-config.js` and paste in the **same** `FIREBASE_CONFIG` values you used in the main app's `firebase-config.js` — same Firebase project, no second project needed.
3. Host the `parent-app/` folder as its own static site — a separate GitHub Pages repo/branch, a different Netlify/Vercel site, or a subfolder on your own web host all work. Share that link with parents (it can be installed on Android the same way as the main app — see "Installing as an app on Android" above; Chrome will offer to install this one too, with its own gold-colored icon so it's easy to tell apart from the staff app).
4. In a student's profile in the main app, management can see the exact Admission No. + date of birth to give that student's parent (there's a "Parent app access" note right on the profile page). A student needs a date of birth on file for this to work — the profile page will flag it if one's missing.
5. Data appears in the Parent Portal automatically: every time the main app saves (adding a payment, editing a student, etc.), it also pushes an updated, parent-safe summary for each student to Firestore.

### Sending fee reminders and announcements

Management gets a new **Notifications** tab in the main app (requires cloud sync to be on and signed in):

- **Fee reminder** — choose all parents, a specific class, or a specific student; the app automatically limits "all"/"class" to students who currently have a pending or partial balance (so parents who've already paid don't get pinged), and shows the total outstanding before you send.
- **General announcement** — free-form message to all parents or a specific class (e.g. a holiday notice, an event).
- Both appear instantly in the Parent Portal app's Notices tab for anyone they're addressed to, and a "Recently sent" list on the Notifications tab keeps a running history.

### How notifications actually arrive (and their limits)

Notices show up **live while the Parent Portal app is open** (including running in the background as an installed app) — there's no separate push-notification service involved, so nothing to configure. If the app hasn't been opened in a while, the notice is waiting there the next time it is, plus a browser system-notification popup fires for anything new if the parent has allowed notifications (asked the first time they open the Notices tab). This is different from a phone's regular app-store notifications that can wake a closed app — getting that would need a paid push setup (Firebase Cloud Messaging + a small server component), which is more infrastructure than this project uses.

### How this stays scoped to one student

The main app's own data lives in one single Firestore document (`ikhlas_school/main`) containing every student — deliberately not exposed to parents. Each parent instead gets their own small, separate Firestore document containing only their child's summary, and — since parents don't get a Firebase sign-in of their own like staff do — the security rules make that document's ID do double duty as the "password": the ID is built from the Admission No. **and** the date of birth together (e.g. a student with Admission No. `101` and DOB `2012-05-14` gets the document ID `101__20120514`), and a parent can only fetch a document if they already know its exact ID. The collection itself can't be browsed or listed, so there's no way to enumerate students.

This is the same "convenience over hardened security" model already described below in "Security note" — good enough to stop casual access with just an admission number, but a determined person with scripting knowledge could brute-force a specific student's date of birth if they already know their admission number. If that risk matters for your school (e.g. a public or easily-guessable admission numbering scheme), keep admission numbers less predictable, or treat this the same as any other convenience password and weigh it against your students' privacy needs.

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

## Installing as an app on Android (no Play Store, no APK)

This project now includes a `manifest.json`, `sw.js` (service worker) and app icons, which turn it into an installable **Progressive Web App (PWA)**. This is the practical way to get an app icon and full-screen app experience on Android from a plain static site — a real `.apk` isn't something these files alone can become without a separate build process (see the note at the end of this section).

1. Host the files as usual (GitHub Pages, Netlify, Vercel, etc.) — PWA installing requires the site be served over `https://`, so a plain `file://` open of `index.html` won't offer the install prompt (it still works as a normal desktop app either way).
2. Open the link on the Android phone in **Chrome**.
3. Tap the **⋮** menu → **Install app** (or you may see an automatic "Add Ikhlas School Manager to Home screen" banner).
4. It installs with the school's icon, opens full-screen with no browser bar, and works offline for anything already loaded (your data itself is still stored per-device via local storage, or synced live if you've turned on the optional Firebase cloud sync above).

**If you specifically need a `.apk` file** (e.g. to side-load without Chrome, or list on a Play Store-style store), the standard free route is [PWABuilder.com](https://www.pwabuilder.com): paste in your hosted app's URL, and it packages this same manifest/service-worker setup into a signed Android APK/AAB for you, entirely in the browser — no coding needed. That step needs your app to already be hosted online at a URL PWABuilder can fetch.

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
