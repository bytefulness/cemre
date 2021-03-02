// * DATA
const user = {};

// * DOM ELEMENTS
// Sections
const sectionWelcome = document.querySelector('.welcome');
const sectionInformation = document.querySelector('.information');

// Inputs
const inputName = document.querySelector('input[name="name"]');
const inputGrade = document.querySelector('input[name="grade"]');
const inputField = document.querySelector('select[name="field"]');
const inputTarget = document.querySelector('input[name="target"]');
const inputStatusPlacement = document.querySelector(
  '[name="status-placement"]' // Return first radio
);

// Input Groups
const inputGroupName = document.querySelector('[data-group="name"]');
const inputGroupGrade = document.querySelector('[data-group="grade"]');
const inputGroupField = document.querySelector('[data-group="field"]');
const inputGroupTarget = document.querySelector('[data-group="target"]');

// Buttons
const buttonWelcomeNext = document.querySelector('.button--welcome');
const buttonInformationNext = document.querySelector('.button--information');

// Text
const greetingText = document.querySelector('.greeting');

// State Management
let currentSection = 'welcome';

// Functions
function welcomeNext() {
  if (inputName.value === '') {
    if (document.querySelector('.error')) {
      return;
    }
    const error = `
    <p class='error'>Lütfen bir isim giriniz</p>
    `;
    inputGroupName.insertAdjacentHTML('beforeend', error);
  } else {
    sectionWelcome.classList.add('hidden');
    sectionInformation.classList.remove('hidden');
    // Manipulate greeting text
    greetingText.textContent = `Merhaba ${inputName.value}`;
    // Update user object information
    user.name = inputName.value;
    // Update section manager
    currentSection = 'information';
  }
}

const removeErrorMessage = function () {
  // Remove error message if input is filled
  if (inputGrade.value) {
    if (inputGroupGrade.querySelector('.error'))
      inputGroupGrade.querySelector('.error').remove();
  }

  if (inputField.value) {
    if (inputGroupField.querySelector('.error'))
      inputGroupField.querySelector('.error').remove();
  }

  if (inputTarget.value) {
    if (inputGroupTarget.querySelector('.error'))
      inputGroupTarget.querySelector('.error').remove();
  }
};

const checkInformations = function () {
  let errorText = 'Eksik bilgi';
  let errorHTML = `<p class='error'>${errorText}</p>`;

  // Check inputs
  if (
    inputGrade.value === '' ||
    inputField.value === '' ||
    inputTarget.value === ''
  ) {
    if (inputGrade.value === '') {
      // Guard Clause
      if (inputGroupGrade.querySelector('.error')) return;

      errorText = 'Diploma notunuzu girin';
      errorHTML = `<p class='error'>${errorText}</p>`;
      inputGroupGrade.insertAdjacentHTML('beforeend', errorHTML);
    }

    if (inputField.value === '') {
      // Guard Clause
      if (inputGroupField.querySelector('.error')) return;

      errorText = 'Alanınızı seçin';
      errorHTML = `<p class='error'>${errorText}</p>`;
      inputGroupField.insertAdjacentHTML('beforeend', errorHTML);
    }

    if (inputTarget.value === '') {
      // Guard Clause
      if (inputGroupTarget.querySelector('.error')) return;

      errorText = 'Hedef puanınızı belirleyin';
      errorHTML = `<p class='error'>${errorText}</p>`;
      inputGroupTarget.insertAdjacentHTML('beforeend', errorHTML);
    }
  } else {
    if (inputStatusPlacement.checked) user.statusPlacement = true;
    else user.statusPlacement = false;
    console.log('Next Section');
  }
};

// Event Listeners

// Welcome Section
buttonWelcomeNext.addEventListener('click', welcomeNext);

// Getting Information Section
buttonInformationNext.addEventListener('click', function () {
  removeErrorMessage();
  checkInformations();
});

// Keyboard Events
window.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    if (currentSection === 'welcome') {
      welcomeNext();
    }
  }
});
