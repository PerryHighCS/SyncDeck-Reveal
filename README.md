# SyncDeck Reveal

SyncDeck Reveal runtime and integration scripts for synchronized instructor/student Reveal.js decks.

## GitHub Pages

- Project site: https://perryhighcs.github.io/SyncDeck-Reveal/
- Manual regression lab: https://perryhighcs.github.io/SyncDeck-Reveal/test/manual-regression-lab.html

## HTML Embed Example

Use the published runtime bundle from GitHub Pages:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SyncDeck Reveal Embed Example</title>

  <link rel="stylesheet" href="https://perryhighcs.github.io/SyncDeck-Reveal/dist/syncdeck-reveal.css" />
  <script src="https://perryhighcs.github.io/SyncDeck-Reveal/dist/syncdeck-reveal.js"></script>
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <section>Slide 1</section>
      <section>Slide 2</section>
    </div>
  </div>

  <script>
    window.addEventListener('DOMContentLoaded', function () {
      initSyncDeckReveal({
        deckId: 'example-deck',
        iframeSyncOverrides: {
          hostOrigin: '*',
          allowedOrigins: ['*'],
        },
      });
    });
  </script>
</body>
</html>
```

For production, replace `hostOrigin` and `allowedOrigins` with explicit trusted origins.
