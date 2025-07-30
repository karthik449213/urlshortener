
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('shorten-form');
  const urlInput = document.getElementById('url-input');
  const resultText = document.getElementById('result-text');
  const resultContainer = document.getElementById('result-container');
  const errorMessage = document.getElementById('error-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultText.innerHTML = '';
    errorMessage.textContent = '';

    const url = urlInput.value.trim();
    if (!url) {
      errorMessage.textContent = 'Please enter a URL.';
      return;
    }

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        resultText.innerHTML = `Short URL: <a href="${data.short_url}" target="_blank">${data.short_url}</a>`;
        urlInput.value = '';
      } else {
        errorMessage.textContent = data.error || 'An error occurred.';
      }
    } catch (err) {
      errorMessage.textContent = 'Server error. Please try again later.';
    }
  });
});

