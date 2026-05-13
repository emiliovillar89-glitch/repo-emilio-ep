const banner = document.querySelector('#banner');
const panels = [...document.querySelectorAll('.question-panel')];
const dots = [...document.querySelectorAll('.progress-dot')];
const resultPanel = document.querySelector('#resultPanel');
const summary = document.querySelector('#summary');
const resetButton = document.querySelector('#resetQuiz');

let currentStep = 0;
let answers = [];

function showStep(step) {
  panels.forEach((panel, index) => {
    panel.classList.toggle('is-active', index === step);
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle('is-active', index <= step);
  });
}

function showResult() {
  panels.forEach((panel) => panel.classList.remove('is-active'));
  dots.forEach((dot) => dot.classList.add('is-active'));
  resultPanel.classList.add('is-active');
  summary.textContent = `Elegiste ${answers.join(' · ')}. Ahora hacé tus pronósticos reales en la app.`;
  resultPanel.focus({ preventScroll: true });
}

function pickAnswer(button) {
  const panel = button.closest('.question-panel');
  const step = Number(panel.dataset.step);
  answers[step] = button.dataset.answer;

  panel.querySelectorAll('button').forEach((item) => item.classList.remove('is-picked'));
  button.classList.add('is-picked');

  window.setTimeout(() => {
    if (step >= panels.length - 1) {
      showResult();
      return;
    }

    currentStep = step + 1;
    showStep(currentStep);
  }, 280);
}

banner.addEventListener('click', (event) => {
  const button = event.target.closest('.choice, .score');
  if (!button) return;
  pickAnswer(button);
});

resetButton.addEventListener('click', () => {
  answers = [];
  currentStep = 0;
  resultPanel.classList.remove('is-active');
  document.querySelectorAll('.is-picked').forEach((item) => item.classList.remove('is-picked'));
  showStep(currentStep);
});

showStep(currentStep);
