# Testing Plan

This note captures the proposed automated and manual test strategy for
`reveal-iframe-sync.js` and `reveal-storyboard.js`.

## Goal

Add comprehensive regression coverage for navigation, boundary enforcement,
storyboard rendering, and input behavior without introducing a build step for
the runtime scripts themselves.

## Constraints

- The runtime scripts are plain IIFE files.
- The submodule currently has no test harness, package manifest, or test files.
- Navigation behavior depends on Reveal route semantics, DOM state, keyboard
  mapping, and touch/swipe handling.

## Proposed Approach

1. Add a minimal headless-browser test harness that loads static HTML fixtures
   and the unbundled runtime scripts directly.
2. Prefer fixture-driven tests over large mocked abstractions so Reveal-like DOM
   behavior remains visible in the assertions.
3. Keep the runtime files unbundled; any tooling should exist only to execute
   tests, not to transform production code.

## Test Areas

### 1. Boundary Lifecycle

- Follow-instructor capture sets the student boundary from instructor sync.
- Explicit boundary set and clear update status and local enforcement.
- Instructor and standalone roles report `studentBoundary: null` unless an
  explicit boundary exists.
- Released region is `null` until a real boundary/release session starts.
- Explicit boundary sessions preserve the correct released-range start/end.

### 2. Exact Pullback Behavior

- Pulling a student back behind a boundary on the same `h` exact-locks to the
  requested `v` / `f`.
- Same-`h` pullback from deeper vertical stack positions snaps to the requested
  instructor position.
- Same-`h` pullback from later fragments snaps to the requested instructor
  position.
- Exact snap-back lock clears when the boundary session is replaced or removed.

### 3. Navigation Policy

- `canGoLeft` / `canGoRight` reflect strictly horizontal movement.
- `canGoBack` / `canGoForward` reflect generic Reveal `prev()` / `next()`
  progression, including fragments and vertical stack movement when applicable.
- `canGoUp` / `canGoDown` reflect vertical movement after SyncDeck policy is
  applied.
- No-back mode prevents same-`h` rewind via fragments and vertical `up`.
- Follow-instructor mode prevents same-`h` forward drift past the captured
  instructor position.

### 4. Safety-Net Enforcement

- Direct API calls that move beyond the max boundary trigger snap-back.
- Direct API calls that move behind the last allowed position when back
  navigation is disabled trigger snap-back.
- Touch-driven or synthetic navigation that bypasses keyboard gating still
  resolves back to the last allowed position.

### 5. Keyboard Mapping

- Left/right arrows and `H` / `L` only follow `canGoLeft` / `canGoRight`.
- `PageUp` / `PageDown` and `Space` follow generic `canGoBack` /
  `canGoForward`.
- Vertical arrow keys follow `canGoUp` / `canGoDown`.
- Overview-related keys remain disabled for students.

### 6. Touch Behavior

- Horizontal swipe is allowed only when horizontal movement is allowed.
- Horizontal swipe can be translated into `next()` / `prev()` when fragments
  are allowed but horizontal movement is blocked.
- Vertical swipe continues to work inside released stacks.
- Blocked horizontal swipe does not advance past the boundary and does not rely
  solely on later snap-back for correctness.

### 7. Storyboard Behavior

- Boundary marker rendering matches explicit boundary state.
- Released-range highlighting reflects the stored released region only when a
  boundary session exists.
- Instructor/standalone sessions do not show a phantom boundary at slide 1.
- Live-region announcements fire only when the boundary value actually changes.
- Re-rendering the storyboard preserves marker state without duplicate
  announcements.

## Suggested Implementation Order

1. Add the test runner and one fixture that can load the runtime scripts.
2. Add status-payload tests for boundary and navigation semantics.
3. Add fallback-enforcement tests around direct API movement.
4. Add keyboard-map tests.
5. Add touch/swipe tests.
6. Add storyboard rendering and live-region tests.
7. Add a compact manual regression checklist for behaviors that still need
   confirmation in a real browser.

## Manual Regression Matrix

These should still be verified in a real deck even after automated coverage is
added:

- Student at boundary `h` with remaining fragments but no horizontal release.
- Student inside a vertical stack at boundary `h`.
- Pullback from later fragment to earlier fragment on the same slide.
- Pullback from deeper stack child to earlier stack child on the same `h`.
- No-back mode with vertical `up` available.
- Instructor storyboard refreshes after boundary changes and role changes.
- Student touch interactions on mobile or responsive emulation.
