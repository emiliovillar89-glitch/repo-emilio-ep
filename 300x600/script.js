const QUESTIONS = [
  {
    text: '¿Cómo termina el próximo partido de Uruguay?',
    ariaLabel: 'Elegí cómo termina el próximo partido de Uruguay',
    options: [
      { label: 'Gana Uruguay', country: 'Uruguay' },
      { label: 'Empata' },
      { label: 'Pierde Uruguay', country: 'Uruguay' },
    ],
  },
  {
    text: '¿Quién gana el Mundial?',
    ariaLabel: 'Elegí quién gana el Mundial',
    options: [
      { label: 'Uruguay', country: 'Uruguay' },
      { label: 'Argentina', country: 'Argentina' },
      { label: 'Francia', country: 'Francia' },
    ],
  },
  {
    text: '¿Hasta dónde llega Uruguay?',
    ariaLabel: 'Elegí hasta dónde llega Uruguay',
    options: [
      { label: 'Fase de grupos', country: 'Uruguay' },
      { label: 'Octavos o cuartos', country: 'Uruguay' },
      { label: 'Semifinal o más', country: 'Uruguay' },
    ],
  },
  {
    text: '¿Quién hace el primer gol celeste?',
    ariaLabel: 'Elegí quién hace el primer gol celeste',
    options: [
      { label: 'Darwin' },
      { label: 'Valverde' },
      { label: 'Otro jugador' },
    ],
  },
];

const COUNTRY_FLAGS = {
  Argentina: { code: 'ar', alt: 'Bandera de Argentina' },
  Francia: { code: 'fr', alt: 'Bandera de Francia' },
  Uruguay: { code: 'uy', alt: 'Bandera de Uruguay' },
};

const QUESTIONS_PER_ROUND = 3;
const banner = document.querySelector('#banner');
const questionPanel = document.querySelector('#questionPanel');
const questionCounter = document.querySelector('#questionCounter');
const questionText = document.querySelector('#questionText');
const choices = document.querySelector('#choices');
const dots = [...document.querySelectorAll('.progress-dot')];
const resultPanel = document.querySelector('#resultPanel');
const summary = document.querySelector('#summary');
const resetButton = document.querySelector('#resetQuiz');

let rotationOffset = Math.floor(Date.now() / 10000) % QUESTIONS.length;
let roundQuestions = getRoundQuestions();
let currentStep = 0;
let answers = [];

function getRoundQuestions() {
  return Array.from({ length: QUESTIONS_PER_ROUND }, (_, index) => {
    return QUESTIONS[(rotationOffset + index) % QUESTIONS.length];
  });
}

function getOptionFlag(option) {
  return option.flag || COUNTRY_FLAGS[option.country] || COUNTRY_FLAGS[option.label] || null;
}

function createFlagImage(flagData) {
  const image = document.createElement('img');
  image.className = 'choice-flag';
  image.src = `https://flagcdn.com/w40/${flagData.code}.png`;
  image.srcset = `https://flagcdn.com/w80/${flagData.code}.png 2x`;
  image.alt = flagData.alt;
  image.width = 22;
  image.height = 22;
  image.loading = 'lazy';
  return image;
}

function shouldShowFlags(question) {
  const optionCountries = question.options.map((option) => option.country || option.label);
  const knownCountries = optionCountries.filter((country) => COUNTRY_FLAGS[country]);
  const uniqueCountries = new Set(knownCountries);
  return knownCountries.length > 0 && uniqueCountries.size !== 1;
}

function createOptionButton(option, showFlags) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'choice';
  button.dataset.answer = option.label;

  const optionFlag = showFlags ? getOptionFlag(option) : null;
  if (optionFlag) {
    button.append(createFlagImage(optionFlag));
  }

  const label = document.createElement('span');
  label.textContent = option.label;
  button.append(label);

  return button;
}

function renderQuestion() {
  const question = roundQuestions[currentStep];
  questionPanel.dataset.step = String(currentStep);
  questionCounter.textContent = `Pregunta ${currentStep + 1} de ${QUESTIONS_PER_ROUND}`;
  questionText.textContent = question.text;
  choices.setAttribute('aria-label', question.ariaLabel);
  const showFlags = shouldShowFlags(question);
  choices.replaceChildren(...question.options.map((option) => createOptionButton(option, showFlags)));
}

function showStep(step) {
  currentStep = step;
  resultPanel.classList.remove('is-active');
  questionPanel.classList.add('is-active');
  renderQuestion();
  dots.forEach((dot, index) => {
    dot.classList.toggle('is-active', index <= step);
  });
}

function showResult() {
  questionPanel.classList.remove('is-active');
  dots.forEach((dot) => dot.classList.add('is-active'));
  resultPanel.classList.add('is-active');
  summary.textContent = `Elegiste ${answers.join(' · ')}. Ahora hacé tus pronósticos reales en la app.`;
  resultPanel.focus({ preventScroll: true });
}

function pickAnswer(button) {
  const step = Number(questionPanel.dataset.step);
  answers[step] = button.dataset.answer;

  choices.querySelectorAll('button').forEach((item) => item.classList.remove('is-picked'));
  button.classList.add('is-picked');

  window.setTimeout(() => {
    if (step >= QUESTIONS_PER_ROUND - 1) {
      showResult();
      return;
    }

    showStep(step + 1);
  }, 280);
}

banner.addEventListener('click', (event) => {
  const button = event.target.closest('.choice');
  if (!button) return;
  pickAnswer(button);
});

resetButton.addEventListener('click', () => {
  answers = [];
  rotationOffset = (rotationOffset + QUESTIONS_PER_ROUND) % QUESTIONS.length;
  roundQuestions = getRoundQuestions();
  showStep(0);
});

showStep(currentStep);
