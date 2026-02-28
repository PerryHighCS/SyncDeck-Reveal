# AGENTS.md

This file applies to the `vendor/SyncDeck-Reveal/js/` submodule.

## Scope

- Runtime files here are plain IIFE scripts. Do not introduce a production build
  step just to support tests.
- Shared runtime behavior lives primarily in `reveal-iframe-sync.js`,
  `reveal-storyboard.js`, and the vendored `chalkboard/` integration points.
- `TESTING_PLAN.md` may exist as a temporary implementation plan while the test
  harness is being built, but this policy must remain valid even after that
  file is removed.

## Testing Policy

- Testing is mandatory for behavior changes in this submodule.
- Any change to navigation, boundaries, role behavior, postMessage handling,
  storyboard rendering, keyboard mapping, touch/swipe behavior, or chalkboard
  sync must include automated test coverage in the same change.
- Do not merge or commit behavior changes here with "tests later" as the plan.
- If a bug fix reproduces a regression, add a test that fails before the fix and
  passes after it.
- If code is refactored without intended behavior change, run the relevant test
  coverage anyway and expand tests if the refactor changes control flow in a way
  that was previously uncovered.

## Coverage Expectations

- Prefer fixture-driven browser tests that load the runtime scripts directly.
- Coverage must expand with the code you touch. Avoid adding new uncovered
  branches to `reveal-iframe-sync.js` or `reveal-storyboard.js`.
- Changes in covered areas must not reduce the existing coverage baseline once a
  harness is in place.
- Add direct coverage for affected behavior areas rather than relying only on
  incidental or indirect execution.

## Minimum Covered Areas

- Boundary lifecycle and release-region behavior.
- Navigation policy, including horizontal, vertical, and fragment movement.
- Safety-net enforcement for direct API movement or other boundary bypass paths.
- Keyboard mapping and blocked-key behavior for students.
- Touch/swipe behavior at and within released boundaries.
- Storyboard rendering, announcements, and boundary-marker updates.
- Chalkboard sync behavior when a change touches host/iframe coordination.

## Required Workflow For Runtime Changes

1. Identify which covered behavior area the change affects.
2. Add or update automated tests before finishing the implementation.
3. Run the relevant test command(s) and any coverage command(s).
4. If a real-browser/manual check is still required, document it in the change
   notes and keep the manual scope narrow.

## Temporary Exception Rule

- If a change truly cannot be covered yet because the harness is missing a
  needed fixture or capability, the same change must add that harness support or
  explicitly document the blocker in the active work notes or change summary.
- "No test harness exists yet" is not, by itself, an acceptable reason to skip
  tests for new runtime behavior.

## Guardrails

- Keep test tooling isolated from runtime code. Tests may add fixtures and
  runner infrastructure, but production scripts should remain directly loadable
  without bundling.
- Do not weaken navigation or storyboard assertions to make tests pass.
- Do not replace the vendored chalkboard copy with a CDN version.
- Do not enable `chalkboard.storage`; the host remains the source of truth for
  drawing state.
