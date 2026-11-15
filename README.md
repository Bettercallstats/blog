# BetterCallStats blog

Quarto website, published to https://bettercallstats.github.io/blog by GitHub Actions on every push to `main`.

## Writing a post

1. Copy `posts/template-live-demo/` to `posts/<slug>/` and edit `index.qmd`. The folder name is the URL.
2. Keep `draft: true` while writing. Drafts show in `quarto preview` and are left out of the live site.
3. Preview with `quarto preview`.
4. If the post runs code (`{python}` or `{r}` cells), render it locally (`quarto render posts/<slug>/index.qmd`)
   and commit the `_freeze/` folder along with the post. The site build has no Python or R; it reuses those stored results.
5. Remove `draft: true`, open a pull request (the build runs as a check), merge to `main` to publish.

## Kinds of code

- `{pyodide}` cells run in the reader's browser (small numpy/pandas demos). Needs `format: live-html` in the post header.
- `{python}` / `{r}` cells run on your machine at render time; results are frozen.

## Layout

- `_quarto.yml` site settings · `styles/` theme · `posts/_metadata.yml` post defaults
- `_extensions/r-wasm/live` the quarto-live extension (vendored)
