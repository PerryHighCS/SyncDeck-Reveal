# Manual Regression Checklist

This checklist covers the remaining behaviors that still need confirmation in a
real browser even after the Playwright fixture suite passes.

Suggested deck in the parent repo:

- `test/manual-regression-lab.html`

## Scope

Use a real deck that loads:

- `reveal-iframe-sync.js`
- `reveal-storyboard.js`
- the local `chalkboard/` plugin copy when chalkboard behavior matters

Prefer checking both:

- an instructor page that controls one or more student iframes
- a direct student iframe view in responsive/mobile emulation

## Setup

1. Open the instructor host page and at least one student iframe.
2. Confirm the student iframe has been promoted with `setRole: 'student'`.
3. Keep browser devtools open so you can inspect `postMessage` traffic or DOM
   state if something looks wrong.

Network note:

- This deck depends on external network access to `unpkg.com`,
  `fonts.googleapis.com`, and `fonts.gstatic.com`.
- If those hosts are blocked or unavailable, the manual run is not
  representative; confirm asset loads before interpreting failures.

## Boundary And Navigation

### Student at boundary `h` with remaining fragments but no horizontal release

1. Release the student to a horizontal slide that still contains fragments.
2. Advance the student to the last released horizontal slide.
3. With the instructor still before the first fragment on that slide, verify the
   student cannot reveal fragments locally.
4. Reveal a fragment from the instructor side and verify the student remains
   locked to that exact fragment position rather than running ahead locally.
5. Rewind the student locally and verify they can move forward again only up to
   the instructor's currently revealed fragment.
6. Verify horizontal advance past the boundary is blocked.
7. Verify the student does not flash onto the next horizontal slide before
   snapping back.

Expected:

- On a flat slide at the boundary `h`, the student remains locked to the
  instructor's current fragment position.
- If the student rewinds locally on that flat slide, they may move forward
  again only up to the instructor's current fragment.
- The student cannot move to the next horizontal slide.
- The storyboard continues to show the correct boundary/released range.

### Student inside a vertical stack at boundary `h`

1. Release a horizontal position that is a vertical stack.
2. Move the student down within that stack.
3. Verify vertical movement inside the released stack works as expected.
4. Verify the student still cannot move to the next horizontal slide.

Expected:

- Vertical navigation inside the released stack remains available.
- Once the stack's `h` is released, deeper child slides are locally navigable
  without the flat-slide fragment lock behavior used on the top slide.
- Horizontal escape past the boundary remains blocked.

### Pullback from later fragment to earlier fragment on the same slide

1. Let the student advance to a later fragment on a released slide.
2. Pull the boundary back to an earlier fragment on the same `h`.
3. Try to re-advance locally from the student side.

Expected:

- The student is snapped back to the requested fragment position.
- The student cannot immediately re-advance past that exact pullback point.

### Pullback from deeper stack child to earlier stack child on the same `h`

1. Let the student advance to a deeper child within a released vertical stack.
2. Pull the boundary back to an earlier child on the same `h`.
3. Try to move down again locally from the student side.

Expected:

- The student is snapped back to the requested stack child.
- The student cannot immediately re-enter deeper children past the pullback.

### No-back mode with vertical `up` available

1. Enable `studentCanNavigateBack: false`.
2. Release a vertical stack and move the student down into a later child.
3. If fragments are present, also move forward within the current child.
4. Attempt `prev()`, up-arrow navigation, and any swipe/gesture that would
   move backward within the same `h`.

Expected:

- Same-`h` backward movement is blocked.
- The student remains on the last allowed position.
- No transient rewind is visible.

## Storyboard

### Instructor storyboard refreshes after boundary changes and role changes

1. As instructor, set a boundary from the storyboard strip.
2. Change roles between instructor and student.
3. Re-open or refresh the storyboard strip if needed.

Expected:

- Boundary buttons appear only for instructors.
- Boundary markers and released-range styling remain accurate after re-render.
- Old local boundary markers do not persist after the role resets.
- Live-region announcements fire only on real boundary changes.

## Touch / Mobile

### Student touch interactions on mobile or responsive emulation

1. Open the student view in a real mobile browser or device emulation.
2. Test horizontal swipe at the boundary.
3. Test horizontal swipe on a slide where only fragment movement is still
   allowed.
4. Test vertical swipe inside a released stack.
5. Repeat with no-back mode enabled.

Expected:

- Blocked horizontal swipe does not escape the boundary.
- Fragment-only swipe behavior, if enabled by the release state, advances only
   within the allowed slide.
- Vertical swipe inside a released stack still works.
- No-back mode prevents same-`h` backward touch navigation.

## Sign-Off

Record:

- deck checked
- browser/device checked
- whether instructor/student were separate windows or iframe-based
- any mismatch between automated results and manual behavior
