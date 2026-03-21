import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes';

import 'reveal.js/reveal.css';
import '../chalkboard/chalkboard.css';
// The chalkboard bundle registers RevealChalkboard on window as a side effect.
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
