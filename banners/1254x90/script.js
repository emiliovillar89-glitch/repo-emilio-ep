// API existente. Servir en este origen, sin iframe sandbox de origen opaco.
const siteOrigin = 'https://inmuebles.elpais.com.uy';
const banner = document.querySelector('.banner');
const form = document.querySelector('.search');
const input = form.querySelector('input');
const operationDialog = document.querySelector('.operations');
const operationOptions = [...operationDialog.querySelectorAll('[data-operation]')];
let pendingQuery = '';
operationDialog.querySelector('.operation-close').addEventListener('click', () => operationDialog.close());
operationDialog.addEventListener('close', () => input.focus());
operationOptions.forEach(option => option.addEventListener('click', () => {
  const selectedOperation = option.dataset.operation;
  operationDialog.close();
  executeSearch(pendingQuery, selectedOperation);
}));
const button = form.querySelector('button');
const status = form.querySelector('.search-status');
let busy = false;
form.addEventListener('focusin', () => banner.classList.add('interacting'));
function notify(message) {
  status.textContent = message;
  window.parent.postMessage({type:'gallito-preview-status', message}, window.location.origin);
}
form.addEventListener('submit', event => {
  event.preventDefault();
  if (busy) return;
  const query = input.value.trim();
  if (!query) { input.focus(); return; }
  pendingQuery = query;
  status.textContent = '';
  operationDialog.showModal();
});
async function executeSearch(query, selectedOperation) {
  if (busy) return;
  if (window.location.origin !== siteOrigin) {
    notify('La conexión de búsqueda para Google Ad Manager está pendiente.');
    return;
  }
  const resultTab = window.open('about:blank', '_blank');
  if (!resultTab) { notify('Permití abrir una pestaña para ver los resultados.'); return; }
  resultTab.opener = null;
  busy = true;
  button.disabled = true;
  button.textContent = 'Buscando…';
  notify('Gallito está interpretando tu búsqueda…');
  const body = new FormData();
  body.append('message', query);
  body.append('transactionType', selectedOperation);
  body.append('userLanguage', 'es');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 180000);
  try {
    const response = await fetch(siteOrigin + '/api/chat/init', {
      method:'POST', body, credentials:'include',
      headers:{'X-Brand':'elpais'}, signal:controller.signal
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error('No se pudo iniciar la búsqueda. Probá desde el sitio.');
    if (payload.needsFollowUp) throw new Error('Gallito necesita más información. Continuá la búsqueda desde el sitio.');
    const chatId = payload.data?.chatId;
    if (!/^[a-zA-Z0-9-]{1,80}$/.test(chatId || '')) throw new Error('La búsqueda no devolvió una conversación válida.');
    if (payload.needsOperationClarification || payload.data?.needsOperationClarification) {
      const resolution = await fetch(siteOrigin + '/api/chat/' + chatId + '/resolve-operation', {
        method:'POST', credentials:'include',
        headers:{'Content-Type':'application/json','X-Brand':'elpais'},
        body:JSON.stringify({transactionType:selectedOperation}), signal:controller.signal
      });
      const resolved = await resolution.json();
      if (!resolution.ok || !resolved.success) throw new Error('No se pudo confirmar el tipo de operación.');
    }
    resultTab.location.replace(siteOrigin + '/dashboard/' + chatId);
    notify('Tu búsqueda se abrió en una nueva pestaña.');
  } catch (error) {
    resultTab.close();
    notify(error.name === 'AbortError' ? 'La búsqueda demoró demasiado. Intentá nuevamente.' : error.message || 'No se pudo conectar con Gallito.');
  } finally {
    clearTimeout(timer);
    busy = false;
    button.disabled = false;
    button.textContent = 'Buscar';
  }
}
