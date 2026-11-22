/** Verbo frontend ↔ Cloudflare Workers AI integration. */
(() => {
  const API_URL = 'https://verbo-api.hernani-cursino.workers.dev/chat';

  const form = document.getElementById('prompt-form');
  const textarea = document.getElementById('prompt-text');
  const button = document.getElementById('prompt-submit');
  const status = document.getElementById('prompt-status');
  const artwork = document.querySelector('.artwork');

  if (!form || !textarea || !button || !status || !artwork) return;

  // Keep the response area separate from the prompt component.
  const responseArea = document.createElement('section');
  responseArea.id = 'verbo-response';
  responseArea.className = 'response-area';
  responseArea.setAttribute('aria-live', 'polite');
  responseArea.setAttribute('aria-label', 'Resposta do Verbo');
  responseArea.hidden = true;
  artwork.insertAdjacentElement('afterend', responseArea);

  let isSending = false;

  document.addEventListener('verbo:submit', async (event) => {
    const prompt = event.detail?.prompt?.trim();
    if (!prompt || isSending) return;

    isSending = true;
    button.disabled = true;
    status.textContent = 'Texto capturado e enviado para análise...';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: prompt })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.details || result.error || `Erro HTTP ${response.status}`
        );
      }

      if (typeof result.answer !== 'string' || !result.answer.trim()) {
        throw new Error('A API retornou uma resposta vazia.');
      }

      responseArea.textContent = result.answer;
      responseArea.hidden = false;
      status.textContent = 'Resposta recebida.';

      // Clear the input only after a successful response.
      textarea.value = '';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.focus();
    } catch (error) {
      status.textContent = `Não foi possível obter resposta: ${error.message}`;
      console.error('[verbo] API request failed:', error);
    } finally {
      isSending = false;
      button.disabled = false;
    }
  });
})();
