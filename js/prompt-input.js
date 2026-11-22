/**
 * PromptInput component (isolated).
 * Emits a `verbo:submit` CustomEvent containing { prompt } on the document.
 * Replace/add a listener in main.js to route the prompt to your destination.
 */
(function () {
  const form = document.getElementById('prompt-form');
  const textarea = document.getElementById('prompt-text');
  const button = document.getElementById('prompt-submit');
  const status = document.getElementById('prompt-status');
  if (!form || !textarea || !button || !status) return;

  function resizeInput() {
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }

  textarea.addEventListener('input', resizeInput);
  textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const prompt = textarea.value.trim();
    if (!prompt) return;

    document.dispatchEvent(new CustomEvent('verbo:submit', {
      detail: { prompt }
    }));
    status.textContent = 'Texto capturado. Destino ainda não configurado.';
    textarea.value = '';
    resizeInput();
    textarea.focus();
  });
})();