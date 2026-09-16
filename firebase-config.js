/* ===================================================================
   OPTIONAL: shared cloud sync for Ikhlas School Manager
   ===================================================================

   By default, this app stores all data with localStorage — meaning
   every browser/device has its OWN separate copy, so changes made on
   one computer do not show up on another, even at the same web link.
   That is why data appeared "out of sync" across devices.

   To make everyone using this link share the SAME live data, you can
   connect a free Firebase (Firestore) project. This file is where you
   turn that on. Until you fill it in and set FIREBASE_ENABLED to true,
   the app works exactly as before (local to each device) — nothing
   changes for you by default.

   ------------------------------------------------------------------
   IMPORTANT — please read before turning this on
   ------------------------------------------------------------------
   This app stores sensitive information, including Aadhaar numbers.
   The Management / Teacher / Fee Payments passwords inside the app are
   a simple convenience for staff — they are NOT real security, because
   this is a static website: anyone who opens the page's source code
   can see how it works. The real protection for your data has to come
   from Firebase's own sign-in + security rules, which is why turning
   on cloud sync also turns on a separate "cloud sign-in" screen before
   the app loads.

   Recommended setup (free, ~10 minutes):
   1. Go to https://console.firebase.google.com and create a project.
   2. In the project, open "Build > Firestore Database" and click
      "Create database" (production mode is fine).
   3. In Firestore, go to the "Rules" tab and paste:

        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            match /ikhlas_school/main {
              allow read, write: if request.auth != null;
            }
          }
        }

      then click "Publish". This means only someone who has signed in
      through Firebase (step 5) can read or write the data — not just
      anyone with the web link.
   4. Open "Build > Authentication", click "Get started", enable the
      "Email/Password" provider, then add one login per staff member
      (or one shared login) under the "Users" tab. These emails and
      passwords are separate from the app's own Management / Teacher /
      Fee Payments passwords — think of this as "who may load the
      shared data at all", and the in-app passwords as "what they can
      do once inside".
   5. Back in Project settings (gear icon) > General > "Your apps",
      add a Web app and copy the config object it gives you into
      FIREBASE_CONFIG below.
   6. Set FIREBASE_ENABLED to true, save, and re-deploy (e.g. push to
      the branch your GitHub Action deploys from).
   7. Share the Firebase email/password you created in step 4 with your
      staff, in addition to the in-app Management/Teacher/Fee Payments
      passwords they already use.

   Without step 3 (rules) and step 4 (authentication), do NOT enable
   this — an open Firestore database is readable by anyone on the
   internet who finds your config, which would expose student data.
   ------------------------------------------------------------------ */

const FIREBASE_CONFIG = {
   apiKey: "AIzaSyCUOJ-D_CWS5QFbzX8k69WVUv12KJ_h0Ek",
   authDomain: "iks-1-4v-db.firebaseapp.com",
   projectId: "iks-1-4v-db",
   storageBucket: "iks-1-4v-db.firebasestorage.app",
   messagingSenderId: "911159075301",
   appId: "1:911159075301:web:5d620a7914c4f9827f4f0c",
   measurementId: "G-BPQG3B30WR"
};

// Flip this to true only after completing the steps above.
const FIREBASE_ENABLED = true;

