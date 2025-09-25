import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVT2YuAJqoHE2m5nznwHHK0_jgMBQJzk0",
  authDomain: "math-fest-display.firebaseapp.com",
  projectId: "math-fest-display",
  storageBucket: "math-fest-display.firebasestorage.app",
  messagingSenderId: "252365377355",
  appId: "1:252365377355:web:e6469d667723bfb0594e2ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// For production, you should secure your database with Firebase Rules.
// A good starting point for this app would be:
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /photos/{photoId} {
      // Allow any authenticated user to read and create photos
      allow read, create: if request.auth != null;
      // Only allow updates/deletes in the future if needed, e.g., by the user who created it
      allow update, delete: if false; 
    }
  }
}

service firebase.storage {
  match /b/{bucket}/o {
    match /photos/{photoId} {
      // Allow any authenticated user to upload photos
      allow write: if request.auth != null;
      // Allow anyone to read photos
      allow read;
    }
  }
}
*/
