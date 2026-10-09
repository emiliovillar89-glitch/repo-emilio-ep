const destination = window.clickTag || 'https://inmuebles.elpais.com.uy/';
const queryText = document.querySelector('#typed-query');
const searchLinks = document.querySelectorAll('.query-preview, .search-button');
searchLinks.forEach(link => { link.href = destination; });
const examples = [
  'Una casa con jardín',
  'Un apartamento en Pocitos',
  'Un alquiler de 2 dormitorios'
];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let timer;
let index = 0;
let length = 0;
let deleting = false;
let running = false;
function tick() {
  if (!running) return;
  const text = examples[index];
  length += deleting ? -1 : 1;
  queryText.textContent = text.slice(0, length);
  let delay = deleting ? 35 : 65;
  if (!deleting && length === text.length) { deleting = true; delay = 1900; }
  else if (deleting && length === 0) { deleting = false; index = (index + 1) % examples.length; delay = 450; }
  timer = setTimeout(tick, delay);
}
function start() {
  clearTimeout(timer);
  running = !reducedMotion.matches && !document.hidden;
  if (reducedMotion.matches) { queryText.textContent = examples[0]; return; }
  if (running) timer = setTimeout(tick, 7200);
}
// Se suspende fuera de pantalla; no hay consultas a API ni portapapeles.
reducedMotion.addEventListener('change', () => {
  index = 0; length = 0; deleting = false; queryText.textContent = ''; start();
});
document.addEventListener('visibilitychange', start);
start();
