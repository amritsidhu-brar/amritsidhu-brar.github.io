# amritsidhubrar.me.uk

Personal site for Amrit Sidhu-Brar. Plain HTML and CSS, no build step, served by
GitHub Pages at [amritsidhubrar.me.uk](https://amritsidhubrar.me.uk).

Migrated off WordPress / SiteGround in August 2026.

## Layout

```
index.html                              Home
about/index.html                        About
me-in-other-places-on-the-internet/     Elsewhere  (old URL kept deliberately)
contact/index.html                      Contact
404.html                                Not-found page
style.css                               All the styling
favicon.svg
images/
CNAME                                   Tells GitHub Pages the custom domain
.nojekyll                               Skip Jekyll processing
```

## Editing

Open any `.html` file and edit the text between the tags. To preview locally,
double-click `index.html` — but note that links starting with `/` will only
resolve properly when served, so for a faithful preview run:

```
python -m http.server 8000
```

and visit <http://localhost:8000>.

Nearly all the visual design is controlled by the custom properties at the top
of `style.css` — colours, fonts, and the content width. Changing those changes
the whole site.

## Workflow

This folder is the working copy. Changes are made and previewed **here**, and
nothing reaches the public site until it is pushed.

1. Edit files locally.
2. Preview with `python -m http.server 8000` (see above).
3. When happy, and only then, publish.

Committing is safe and private-ish in the sense that it changes nothing public,
but **pushing makes it live**, so treat `git push` as the "make it live" step.

## Publishing

```
git add -A
git commit -m "Describe the change"
git push
```

GitHub Pages rebuilds within about a minute.

## Note on the nav

Every page carries its own copy of the header nav, because there is no build
step or templating. If you add or rename a nav item, update it in all five HTML
files.
