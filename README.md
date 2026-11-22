# verbo

Minimal static page prototype for GitHub Pages. The prompt input is isolated in `css/prompt-input.css` and `js/prompt-input.js`; the page/artwork is in `index.html` and `css/main.css`.

## Current behavior
- Type in the prompt field.
- Press Enter to submit (Shift+Enter inserts a line break).
- The component emits a `verbo:submit` CustomEvent with `{ prompt }`.
- `js/main.js` currently logs the submitted prompt to the browser console. No network forwarding is configured yet.

## Publish with GitHub Pages
1. Push these files to the repository root of `verbo`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `master`, folder `/ (root)`, then save.
5. Wait for the deployment and open the Pages URL shown in Settings → Pages.

No framework or build step is required.