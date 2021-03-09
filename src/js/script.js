// * DATA
const user = {};

// * DOM ELEMENTS
// Sections
const sectionWelcome = document.querySelector('.welcome');
const sectionInformation = document.querySelector('.information');
const sectionExamValues = document.querySelector('.exam-values');

// Inputs
const inputName = document.querySelector('input[name="name"]');
const inputGrade = document.querySelector('input[name="grade"]');
const inputField = document.querySelector('select[name="field"]');
const inputTarget = document.querySelector('input[name="target"]');
const inputStatusPlacement = document.querySelector(
  '[name="status-placement"]' // Return first radio
);

// Forms
const formWelcome = document.querySelector('.welcome__form');
const formInformation = document.querySelector('.information__form');

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
function welcomeNext(e) {
  e.preventDefault();

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
  if (inputGrade.value && inputGroupGrade.querySelector('.error')) {
    inputGroupGrade.querySelector('.error').remove();
  }

  if (inputField.value && inputGroupField.querySelector('.error')) {
    inputGroupField.querySelector('.error').remove();
  }

  if (inputTarget.value && inputGroupTarget.querySelector('.error')) {
    inputGroupTarget.querySelector('.error').remove();
  }
};

const InformationNext = function () {
  sectionInformation.classList.add('hidden');
  sectionExamValues.classList.remove('hidden');
  currentSection = 'examValues';
  console.log(user);
};

const checkInformations = function () {
  // let errorText = 'Eksik bilgi';
  // let errorHTML = `<p class='error'>${errorText}</p>`;
  const errorMessages = [];
  const generateErrorElement = text => `<p class='error'>${text}</p>`;

  // Check inputs
  if (
    inputGrade.value === '' ||
    inputField.value === '' ||
    inputTarget.value === ''
  ) {
    if (inputGrade.value === '') {
      // Guard Clause
      if (inputGroupGrade.querySelector('.error')) return;

      errorMessages[0] = 'Diploma notunuzu girin';
      const errorElement = generateErrorElement(errorMessages[0]);
      inputGroupGrade.insertAdjacentHTML('beforeend', errorElement);
    }

    if (inputField.value === '') {
      // Guard Clause
      if (inputGroupField.querySelector('.error')) return;

      errorMessages[1] = 'Alanınızı seçin';
      const errorElement = generateErrorElement(errorMessages[1]);
      inputGroupField.insertAdjacentHTML('beforeend', errorElement);
    }

    if (inputTarget.value === '') {
      // Guard Clause
      if (inputGroupTarget.querySelector('.error')) return;

      errorMessages[2] = 'Hedef puanınızı belirleyin';
      const errorElement = generateErrorElement(errorMessages[2]);
      inputGroupTarget.insertAdjacentHTML('beforeend', errorElement);
    }
  } else {
    // Set Status Placement
    inputStatusPlacement.checked
      ? (user.statusPlacement = true)
      : (user.statusPlacement = false);

    // Next: Exam Values Section
    InformationNext();
  }
};

// Event Listeners

// Welcome Section
formWelcome.addEventListener('submit', welcomeNext);

// Getting Information Section
formInformation.addEventListener('submit', function (e) {
  e.preventDefault();
  removeErrorMessage();
  checkInformations();
});
