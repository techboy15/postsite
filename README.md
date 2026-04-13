# Posting Website

A simple static posting website with posts, comments, and likes.

## Run locally

1. Open a terminal in this folder.
2. Run:

```bash
python3 -m http.server 8000
```

3. Open `http://localhost:8000` in your browser.

## GitHub Pages

This site is static and ready for GitHub Pages. Just publish this repository and set the Pages source to the `main` branch (or the branch you use) with `/` as the root.

## Notes

- Comments and like counts work in the browser session.
- No localStorage is used.
- Page refresh clears all posts, because there is no backend or persistent storage.
