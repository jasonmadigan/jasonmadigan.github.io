# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Hugo source for jasonmadigan.com, using the local Ledger theme in `themes/ledger`. `README.md` is the source for local preview, the Docker image, Projects page front matter, the design prototype and the retired `m10c` submodule.

## Commands

Hugo 0.140.2, matching CI. When `hugo` is not on `PATH`, use `./.tools/hugo` (gitignored, a per-machine binary).

```sh
hugo server --bind 127.0.0.1 --port 1313 --disableFastRender   # preview on http://localhost:1313/
hugo --minify --printPathWarnings                               # build into public/
```

There are no tests, linters or Node tooling. Check a change with a build that prints no `WARN` or `ERROR` lines, then look at the affected pages in the preview.

## Deploy

Every push to `main` goes live: `.github/workflows/deploy.yml` builds with Hugo extended and publishes `public/` to the `gh-pages` branch, which GitHub Pages serves. `static/CNAME` carries the custom domain into each deploy.

Hugo's version appears in the workflow, `HUGO_VERSION` in the `Dockerfile` and `min_version` in `themes/ledger/theme.toml`; change them together. The `Dockerfile` installs the standard edition, so anything needing extended Hugo (LibSass, WebP encoding) passes CI and fails the container build.

## Posts

- One file per post, `content/posts/YYYY-MM-DD-slug.md`. Front matter: `title`, `date` (`2026-01-31T09:00:00`, no offset, read as UTC), and optionally `categories` or `tags` (lowercase single words), `description` (meta and Open Graph; the summary otherwise) and `aliases`.
- The URL is `/posts/<filename>/`. Published URLs are kept: a renamed post lists its old path in `aliases`.
- Hugo silently leaves out a post marked `draft: true` (the archetype default) or dated after the build. CI runs only on push or manual dispatch, so a future-dated post stays missing until the next run.
- Images live in `static/images/<topic>/` and are linked as `/images/<topic>/<file>`; a third-party image keeps its licence beside it.
- Raw HTML renders (`unsafe = true`). A `#` heading renders as `<h2>` (`_markup/render-heading.html`), as the page title is the only `<h1>`.
- Highlighting emits Chroma classes; colours come from the `.chroma` rules in `ledger.css`, so a Hugo highlight `style` changes nothing.

## Ledger theme

- No pagination. Lists render every matching post, grouped by year, through `partials/post-list.html`. Old paginated URLs from `m10c` survive as `aliases` in the `_index.md` files.
- `_default/list.html` renders both `/posts/` (the archive) and taxonomy term pages; `$archive` tells them apart.
- Archive search has no index file. On `/posts/`, each post's title, full plain text, date and topics (categories and tags merged) go into `data-search` and `data-topics` attributes; `assets/js/archive.js` filters them in the browser and mirrors the query in `?q=` and `?topic=`. The form stays `hidden` until the script runs, so without JavaScript the full list shows.
- `partials/head.html` sends CSS and JS through `minify | fingerprint` with SRI hashes, and loads `archive.js` only on `/posts/`.
- `_default/rss.xml` limits every feed to posts.
- `content/projects.md` picks `_default/projects.html` via `layout: projects`. A project's first `links` entry is where its title and image point.

## Snag

`static/snag/` is a separate hand-written site for the Snag app, copied verbatim. Its support and privacy pages back the App Store listing, so their URLs stay put. `static/snag-privacy/` and `static/snag-support/` redirect the URLs those pages had until April 2026, which the listing may still use.
