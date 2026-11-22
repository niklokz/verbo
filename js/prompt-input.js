/**
 * PromptInput component.
 * Emits a `verbo:submit` CustomEvent containing { prompt }.
 * The main application handles delivery and response rendering.
 */
(function () {
  const form = document.getElementById('prompt-form');
  const textarea = document.getElementById('prompt-text');

  if (!form || !textarea) return;

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
  });
})();
