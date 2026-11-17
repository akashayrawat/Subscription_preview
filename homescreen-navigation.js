const previewUrl = new URL(window.location.href);
const isEmbedded = window.parent !== window && previewUrl.searchParams.get('embedded') === '1';

if (isEmbedded) {
  previewUrl.searchParams.set('fullscreen', '1');
  history.replaceState(history.state, '', previewUrl);

  function closePreview() {
    window.parent.postMessage('skidos:subscription-back', window.location.origin);
  }

  document.addEventListener('click', event => {
    if (!event.target.closest?.('.navigation button[aria-label="Back"]')) return;
    event.preventDefault();
    event.stopPropagation();
    closePreview();
  }, true);

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || document.querySelector('.chooser-sheet')) return;
    event.preventDefault();
    event.stopPropagation();
    closePreview();
  }, true);
} else {
  const app = document.getElementById('app');
  function linkHomescreen() {
    const toolbar = app.querySelector('header[aria-label="Preview controls"]');
    if (!toolbar || toolbar.querySelector('.homescreen-preview-link')) return;
    const link = document.createElement('a');
    link.className = 'homescreen-preview-link';
    link.href = './homescreen/';
    link.textContent = 'Homescreen preview';
    toolbar.append(link);
  }
  new MutationObserver(linkHomescreen).observe(app, { childList: true, subtree: true });
  linkHomescreen();
}
