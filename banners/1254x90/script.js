// Conexión directa pendiente: no se inventan parámetros de búsqueda.
const destination = 'https://inmuebles.elpais.com.uy/';
const banner = document.querySelector('.banner');
const form = document.querySelector('.search');
const input = document.querySelector('#query');
input.addEventListener('focus', () => banner.classList.add('interacting'));
form.addEventListener('submit', async event => {
  event.preventDefault();
  // Abrir durante el gesto del usuario evita bloqueos de ventanas emergentes.
  window.open(destination, '_blank', 'noopener,noreferrer');
  const query = input.value.trim();
  let copied = false;
  if (query && navigator.clipboard) {
    try { await navigator.clipboard.writeText(query); copied = true; } catch {}
  }
  const notice = copied ? 'Consulta copiada. Pegala en el buscador del sitio.' : 'El sitio se abrió. Escribí o pegá allí tu consulta.';
  // Mensaje externo al banner en la página de revisión.
  window.parent.postMessage({type:'gallito-preview-status', message:notice}, window.location.origin);
});
