# Our Story - A Couple's Diary

This is a modern, romantic, and aesthetic couple's diary website designed to be a private and beautiful space for sharing memories. It features a Pinterest-style masonry grid layout, secure authentication, and a simple interface for uploading and viewing photos.

**Live Demo:** [Your Live Site URL Will Go Here]

---

## Technology Stack

- **Frontend:** React, TypeScript, TailwindCSS
- **Backend & Database:** Google Firebase
  - **Authentication:** Firebase Authentication (Email/Password)
  - **Database:** Firestore
  - **Storage:** Firebase Cloud Storage
- **Deployment:** GitHub Pages

---

## 🚀 Deployment to GitHub Pages

Your app is built to be deployed directly to GitHub Pages without any complex build steps. Follow these instructions carefully to launch your site.

### Step 1: Create a GitHub Repository

1.  Go to your GitHub account.
2.  Click the `+` icon in the top-right corner and select **"New repository"**.
3.  You will see the form from your screenshot.
    -   **Repository name:** Give it a name, for example, `our-diary` or `our-story`.
    -   **Description:** Add a short description like "A private photo diary for us."
    -   **Visibility:** Choose **Private**. This is highly recommended to keep your memories and Firebase configuration keys more secure. You can still deploy a private repository to GitHub Pages.
4.  Click **"Create repository"**.

### Step 2: Upload Your Project Files

1.  In your new repository, click the **"Add file"** button and select **"Upload files"**.
2.  Drag and drop all the project files I've provided into the upload area:
    -   `index.html`
    -   `index.tsx`
    -   `App.tsx`
    -   `metadata.json`
    -   `types.ts`
    -   `README.md` (this file)
    -   The `components` folder (including all files inside it)
    -   The `services` folder (including `firebase.ts`)
3.  Once all files are uploaded, scroll down and click **"Commit changes"**.

### Step 3: Configure GitHub Pages

1.  In your repository, click on the **"Settings"** tab.
2.  In the left sidebar, click on **"Pages"**.
3.  Under the "Build and deployment" section:
    -   For **Source**, select **"Deploy from a branch"**.
    -   For **Branch**, select `main` and `/ (root)`.
4.  Click **"Save"**.

### Step 4: Your Site is Live!

That's it! GitHub will now build and deploy your site. It can take a few minutes.

-   You will see a message on the "Pages" settings screen like "Your site is live at `https://<your-username>.github.io/<your-repo-name>/`".
-   Visit that URL to see your beautiful diary!

---

## ✅ Final Firebase Setup Checklist

Before you and your girlfriend start using the site, make sure you've done the following in your [Firebase Console](https://console.firebase.google.com/):

1.  **Enable Authentication:**
    -   Go to **Authentication** -> **Sign-in method**.
    -   Click on **"Email/Password"** and enable it.
    -   You'll need to sign up for the first account directly through the app's UI.

2.  **Set Security Rules:**
    -   Go to the **Firestore Database** section.
    -   Click on the **"Rules"** tab and paste in the following rules to ensure only logged-in users can add photos:
        ```
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            match /photos/{photoId} {
              allow read, create: if request.auth != null;
              allow update, delete: if false; 
            }
          }
        }
        ```
    -   Go to the **Storage** section.
    -   Click on the **"Rules"** tab and paste in these rules:
        ```
        service firebase.storage {
          match /b/{bucket}/o {
            match /photos/{imageId} {
              allow read;
              allow write: if request.auth != null;
            }
          }
        }
        ```
    -   Click **"Publish"** for both sets of rules.

Your diary is now fully configured, secure, and live. Enjoy creating and sharing your memories!
