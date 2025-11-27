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
