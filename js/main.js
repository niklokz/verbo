/** Main page composition / integration point. */
document.addEventListener('verbo:submit', (event) => {
  const { prompt } = event.detail;
  // Initial behavior: capture only. Add forwarding (fetch/webhook/API) here later.
  console.log('[verbo] prompt received:', prompt);
});