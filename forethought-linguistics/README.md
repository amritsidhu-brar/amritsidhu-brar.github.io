# PARODY — this is not Forethought Research

Everything in this folder is a joke. It is **not** affiliated with, endorsed by, or operated by
[Forethought Research](https://www.forethought.org), and nothing in it is a real statement by that
organisation or by any person named in it.

The real Forethought Research is an AI-futures research nonprofit in Oxford. This is a private joke
by Amrit Sidhu-Brar, who works there, imagining that he and a colleague had repurposed it into a
historical linguistics think tank. It came out of a Slack thread.

The articles in `research/` are real writing, republished here with their authors' words intact:
two posts by Mia Taylor from [Stamp Collecting](https://juststampcollecting.substack.com), one post
by Amrit Sidhu-Brar from [The Heart-Shaped Grape](https://theheartshapedgrape.substack.com), and
Amrit's 2018 undergraduate dissertation. Only the framing around them is invented.

## Not indexed

The pages carry `noindex, nofollow, noarchive, nosnippet, noimageindex`, the path is disallowed in
the site's `robots.txt`, it is absent from `sitemap.xml`, and nothing on the site links to it. Each
page also carries a screen-reader-visible parody notice, a JSON-LD `CreativeWork` record marking it
as parody, an HTML source comment, and a visible line in the footer.

## Editing

The generator lives outside this repo, in `ClaudeCode/forethought-linguistics/build/`. Edit the
copy in `build/content.py` there, run `python build.py`, then copy `index.html`, `research/` and
`assets/` back into this folder.
