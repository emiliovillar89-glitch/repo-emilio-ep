const track = document.querySelector('#collectiblesTrack');
const counter = document.querySelector('#collectiblesCounter');
const prevButton = document.querySelector('#prevCollectible');
const nextButton = document.querySelector('#nextCollectible');
const dotsContainer = document.querySelector('#collectiblesDots');

const collectibles = [
  {
    icon: '🏆',
    kicker: 'Leyenda',
    title: 'Copa del mundo',
    description: 'La pieza dorada para quienes aciertan al campeón antes que nadie.',
    rarity: 'Épico',
  },
  {
    icon: '👕',
    kicker: 'Selección',
    title: 'Camiseta celeste',
    description: 'Un coleccionable de hincha para acompañar cada pronóstico de Uruguay.',
    rarity: 'Raro',
  },
  {
    icon: '⭐',
    kicker: 'Figura',
    title: 'Jugador estrella',
    description: 'Guardá al crack que puede cambiar la tabla de tu grupo.',
    rarity: 'Especial',
  },
  {
    icon: '🥅',
    kicker: 'Partido',
    title: 'Atajada clave',
    description: 'Para celebrar esos puntos que se ganan con un resultado exacto.',
    rarity: 'Nuevo',
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

  const rarity = document.createElement('span');
  rarity.className = 'rarity';
  rarity.textContent = item.rarity;

  info.append(kicker, title, description, rarity);
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
