const QUESTIONS = [
  {
    text: '¿Cómo termina el próximo partido de Uruguay?',
    ariaLabel: 'Elegí cómo termina el próximo partido de Uruguay',
    options: [
      { label: 'Gana Uruguay', flag: '🇺🇾' },
      { label: 'Empata' },
      { label: 'Pierde Uruguay', flag: '🇺🇾' },
    ],
  },
  {
    text: '¿Quién gana el Mundial?',
    ariaLabel: 'Elegí quién gana el Mundial',
    options: [
      { label: 'Uruguay', flag: '🇺🇾' },
      { label: 'Argentina', flag: '🇦🇷' },
      { label: 'Francia', flag: '🇫🇷' },
    ],
  },
  {
    text: '¿Hasta dónde llega Uruguay?',
    ariaLabel: 'Elegí hasta dónde llega Uruguay',
    options: [
      { label: 'Fase de grupos', flag: '🇺🇾' },
      { label: 'Octavos o cuartos', flag: '🇺🇾' },
      { label: 'Semifinal o más', flag: '🇺🇾' },
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

function createOptionButton(option) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'choice';
  button.dataset.answer = option.label;

  if (option.flag) {
    const flag = document.createElement('span');
    flag.className = 'choice-flag';
    flag.setAttribute('aria-hidden', 'true');
    flag.textContent = option.flag;
    button.append(flag);
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
  choices.replaceChildren(...question.options.map(createOptionButton));
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
