# Jason Madigan's website

A Hugo blog using the local Ledger theme in `themes/ledger`. Posts live in
`content/posts`; the theme groups them by year and provides a searchable archive.
The archive searches the full text of posts and filters by category or tag. It
works entirely in the browser; without JavaScript, all posts remain accessible.

## Local preview

Use Hugo **0.140.2**, the version pinned in the deployment workflow and Dockerfile.
The Ledger theme needs no Node packages or Sass compiler.

```sh
hugo server --bind 127.0.0.1 --port 1313 --disableFastRender
```

Open <http://localhost:1313/>. Hugo watches the content, theme, and configuration
for changes. For a workspace-local installation, put the Hugo binary at
`.tools/hugo` and use `./.tools/hugo` in place of `hugo`. The `.tools/` directory
is ignored by Git.

The standalone design gallery, when present at `static/design-prototype.html`,
can be served separately with `python3 -m http.server 8080 --directory static`.
The static mount in `config.toml` excludes it from Hugo builds.

## Build and deploy

```sh
hugo --minify
```

Output goes to `public/`. GitHub Actions builds and deploys to GitHub Pages on a
push to `main`; the workflow can also be triggered manually. Local builds and
preview servers do not deploy anything.

`static/snag/` is an independent static site and is copied as-is. Existing post
URLs are preserved. The `_index.md` aliases redirect the previous theme's
numbered archive URLs to their corresponding listing pages.

The former `m10c` theme remains registered as a submodule for reference. Ledger
builds without checking it out.

## Theme configuration

Edit `config.toml` to change the avatar, introduction, navigation, and contact
links. The avatar uses the existing local `static/0.jpg`. Layouts, styles, and
archive search live under `themes/ledger/layouts` and `themes/ledger/assets`.

The Projects page is maintained in `content/projects.md`. Its front matter holds
the ordered project cards, descriptions, images, and links; `featured: true`
makes a card span both columns. Cards stack on smaller screens.

The Tracefinity screenshot comes from
[`tracefinity/tracefinity`](https://github.com/tracefinity/tracefinity/blob/main/docs/screenshots/bin-editor.png).
Its MIT license is kept alongside the image in
`static/images/projects/tracefinity-LICENSE.txt`.

## Optional container preview

```sh
docker build -t jasonmadigan/blog:local .
docker run --rm -p 8081:8888 jasonmadigan/blog:local
```

Open <http://localhost:8081/>. The Dockerfile supports the `amd64` and `arm64`
target architectures and uses the same Hugo version as GitHub Actions.
