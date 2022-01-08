#  Studydesk

The ultimate student dashboard.
Uses Next.js and Chakra UI.

##  Setting up local development

  Create a ``.env.local`` file to hold required Firebase environment variables. This file should be in the following form,
  ``` 
FIREBASE_DATABASE_URL=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=
```
> **Warning:**  Make sure this file is not committed to the repository. The gitignore should handle this but please double check.

##  Running the website
To run the development server:

```bash
npm run dev

# or

yarn dev

```
Open [http://localhost:3000](http://localhost:3000) with your browser.