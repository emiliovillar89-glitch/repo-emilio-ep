const track = document.querySelector('#collectiblesTrack');
const counter = document.querySelector('#collectiblesCounter');
const prevButton = document.querySelector('#prevCollectible');
const nextButton = document.querySelector('#nextCollectible');
const dotsContainer = document.querySelector('#collectiblesDots');

const collectibles = [
  {
    icon: '🧩',
    kicker: 'Colección',
    title: 'Pieza inicial',
    description: 'Primer objeto de una serie independiente, listo para presentar la colección.',
    badge: 'Disponible',
  },
  {
    icon: '💎',
    kicker: 'Edición',
    title: 'Cristal premium',
    description: 'Una pieza especial para destacar dentro del set de coleccionables.',
    badge: 'Limitado',
  },
  {
    icon: '🎟️',
    kicker: 'Acceso',
    title: 'Pase dorado',
    description: 'Coleccionable destacado para comunicar beneficios o desbloqueos futuros.',
    badge: 'Especial',
  },
  {
    icon: '📦',
    kicker: 'Próximo',
    title: 'Caja sorpresa',
    description: 'Espacio preparado para sumar nuevos lanzamientos durante los próximos meses.',
    badge: 'Nuevo',
  },
];

let currentCollectible = 0;

function createCollectibleCard(item, index) {
  const card = document.createElement('article');
  card.className = 'collectible-card';
  card.setAttribute('aria-label', `${index + 1} de ${collectibles.length}: ${item.title}`);

  const art = document.createElement('div');
  art.className = 'collectible-art';
  art.setAttribute('aria-hidden', 'true');

  const icon = document.createElement('span');
  icon.textContent = item.icon;
  art.append(icon);

  const info = document.createElement('div');
  info.className = 'collectible-info';

  const kicker = document.createElement('p');
  kicker.className = 'micro';
  kicker.textContent = item.kicker;

  const title = document.createElement('h3');
  title.textContent = item.title;

  const description = document.createElement('p');
  description.textContent = item.description;

  const badge = document.createElement('span');
  badge.className = 'collectible-badge';
  badge.textContent = item.badge;

  info.append(kicker, title, description, badge);
  card.append(art, info);

  return card;
}

function createDot(item, index) {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'carousel-dot';
  dot.dataset.slide = index;
  dot.setAttribute('aria-label', `Ver coleccionable ${index + 1}: ${item.title}`);

  return dot;
}

function renderCollectibles() {
  const cards = document.createDocumentFragment();
  const dots = document.createDocumentFragment();

  collectibles.forEach((item, index) => {
    cards.append(createCollectibleCard(item, index));
    dots.append(createDot(item, index));
  });

  track.replaceChildren(cards);
  dotsContainer.replaceChildren(dots);
}

function showCollectible(index) {
  currentCollectible = (index + collectibles.length) % collectibles.length;
  track.style.transform = `translateX(-${currentCollectible * 100}%)`;
  counter.textContent = `${currentCollectible + 1}/${collectibles.length}`;

  dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === currentCollectible);
    dot.setAttribute('aria-current', dotIndex === currentCollectible ? 'true' : 'false');
  });
}

prevButton.addEventListener('click', () => showCollectible(currentCollectible - 1));
nextButton.addEventListener('click', () => showCollectible(currentCollectible + 1));

dotsContainer.addEventListener('click', (event) => {
  const dot = event.target.closest('.carousel-dot');
  if (!dot) return;
  showCollectible(Number(dot.dataset.slide));
});

renderCollectibles();
showCollectible(currentCollectible);
