const navToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

const askBox = document.querySelector('.search-box');

if (askBox) {
  const askInput = askBox.querySelector('textarea, input');
  const askButton = askBox.querySelector('button');

  const toggleAskButton = () => {
    if (!askButton || !askInput) return;
    askButton.disabled = askInput.value.trim().length === 0;
  };

  if (askInput) {
    askInput.addEventListener('input', toggleAskButton);
    toggleAskButton();
  }
}

const whyCarousel = document.querySelector('.why-carousel');

if (whyCarousel) {
  const windowEl = whyCarousel.querySelector('.carousel-window');
  const track = whyCarousel.querySelector('.carousel-track');
  const prevBtn = whyCarousel.querySelector('.carousel-arrow.left');
  const nextBtn = whyCarousel.querySelector('.carousel-arrow.right');
  const cards = track?.querySelectorAll('.why-card');

  let currentIndex = 0;

  const scrollToIndex = (index) => {
    if (!windowEl || !track || !cards || cards.length === 0) return;
    const normalizedIndex = (index + cards.length) % cards.length;
    currentIndex = normalizedIndex;
    const targetCard = cards[normalizedIndex];
    const offset = targetCard.offsetLeft - track.offsetLeft;
    windowEl.scrollTo({ left: offset, behavior: 'smooth' });
  };

  const stepIndex = (direction) => {
    if (!cards || cards.length === 0) return;
    scrollToIndex(currentIndex + direction);
  };

  prevBtn?.addEventListener('click', () => stepIndex(-1));
  nextBtn?.addEventListener('click', () => stepIndex(1));
  window.addEventListener('resize', () => scrollToIndex(currentIndex));
  scrollToIndex(0);
}

const calcForm = document.querySelector('.calc-form');
if (calcForm) {
  const resultEl = document.querySelector('.calc-result');
  const updateEstimate = () => {
    const vcpus = Number(calcForm.querySelector('[name="vcpus"]').value) || 0;
    const ram = Number(calcForm.querySelector('[name="ram"]').value) || 0;
    const storage = Number(calcForm.querySelector('[name="storage"]').value) || 0;
    const egress = Number(calcForm.querySelector('[name="egress"]').value) || 0;

    const computeCost = vcpus * 1200 + ram * 350; // monthly INR estimates
    const storageCost = storage * 6; // per GB/month
    const egressCost = egress * 4; // per GB
    const total = computeCost + storageCost + egressCost;

    resultEl.textContent = `Estimated monthly: ₹${total.toLocaleString('en-IN')}`;
  };

  calcForm.addEventListener('input', updateEstimate);
  updateEstimate();
}
