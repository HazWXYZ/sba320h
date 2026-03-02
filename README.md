# GoodNews

I made this app because I was tired of only seeing stressful news. GoodNews lets you search for any topic and browse headlines by category — you can save articles you want to read later and they'll still be there when you come back.

## Technologies Used
- **React 18** — component-based UI
- **Redux Toolkit** — global state management (articles, search, saved list)
- **GNews API** — free AJAX news data fetched from an external API
- **localStorage** — persists saved articles across browser sessions
- **Vite** — development build tool (faster than CRA)
- **CSS Modules** — scoped styles per component

## Approach
I started by figuring out what state needed to be global vs local. Articles, the active category, search query, and saved articles all live in Redux because multiple components need to read or update them. Local component state only handles the search input value.

The `fetchNews` async thunk handles the AJAX call. When it fails (like when the API key isn't set), it falls back to hardcoded sample articles so the app still looks functional.

`localStorage` is synced every time `toggleSave` runs in the reducer, and loaded once when the app first boots.


## Usage
1. Pick a category using the filter buttons
2. Or search for any topic using the search bar
3. Click "Read full story" to open the original article in a new tab
4. Click ☆ Save to bookmark an article — it'll stay saved even after you close the browser

## Getting Started Locally
```bash
npm install
# Add your free GNews API key in src/features/newsSlice.js
npm run dev
```

## Unsolved Problems
- Saved articles from a search don't re-fetch their data on reload, so the source URL needs to be valid at save time
- The GNews free tier limits requests to 100/day
- No dark mode yet (would be a fun addition)
- Live site not setup