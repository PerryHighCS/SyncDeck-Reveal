import Reveal from 'reveal.js/dist/reveal.esm.js';
import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js';

import 'reveal.js/dist/reveal.css';
import '../chalkboard/chalkboard.css';
import '../chalkboard/chalkboard.js';
import '../reveal-storyboard.js';
import '../reveal-iframe-sync.js';
import '../syncdeck-bootstrap.js';

if (typeof window !== 'undefined') {
  if (RevealNotes && !RevealNotes.id) {
    RevealNotes.id = 'notes';
  }
  window.Reveal = window.Reveal || Reveal;
  window.RevealNotes = window.RevealNotes || RevealNotes;
}
