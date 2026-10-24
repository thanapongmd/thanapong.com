# Website translations

The site is one page (`../index.html`) in English, with Thai, Chinese, German and Japanese switched in by the globe menu.

- `en.json` holds the English HTML of every translatable element (selectors in `sel.js`).
- `th.json`, `zh.json`, `de.json`, `ja.json` and `extra.json` map each English string to its translation.
- `build.py` embeds the translations plus `runtime.js` into the page between `<!--i18n:start-->` and `<!--i18n:end-->`. It expects the page at `../site/index.html` relative to this folder, so adjust the path before running it from here.

Changing English text: edit the page as usual. Any element whose English changed shows English in every language until its entry is translated again, so the page never shows a stale translation. Add the new English string to `en.json`, add its translations, rebuild, and have each language re-checked against the English before publishing.

Every language was translated, then checked line by line against the English by a separate reviewer on 23 Oct 2026.
