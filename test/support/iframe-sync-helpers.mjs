export async function sendCommand(page, name, payload = {}, deckId = 'fixture-deck') {
  await page.evaluate(
    ({ commandName, commandPayload, currentDeckId }) => {
      window.postMessage({
        type: 'reveal-sync',
        action: 'command',
        deckId: currentDeckId,
        payload: {
          name: commandName,
          payload: commandPayload,
        },
      }, '*');
    },
    { commandName: name, commandPayload: payload, currentDeckId: deckId },
  );
}
