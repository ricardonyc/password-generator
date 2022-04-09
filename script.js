// * Buttons
const generateBtn = document.querySelector(".generate");
const copyBtn = document.querySelector(".copy");

// * Input Elements
const passwordLengthEl = document.querySelector(".length");
const uppercaseLettersEl = document.querySelector(".uppercase");
const lowercaseLettersEl = document.querySelector(".lowercase");
const includeNumbersEl = document.querySelector(".numbers");
const includeSymbolsEl = document.querySelector(".symbols");

// * Displaying
const displayScreen = document.querySelector(".readonly");

// * Error
const errorMsg = document.querySelector(".error-msg");

// prettier-ignore
const symbolsArr = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*","(",")","-", "+", "=", "{","[", "}", "]", "|", "\'",":", ";", "\"", "<", ",", ">", ".", "?", "/",]

// prettier-ignore
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const minPasswordLength = 8;

class UserInputs {
  #passwordLength;
  #uppercase;
  #lowercase;
  #numbers;
  #symbols;

  constructor(passwordLength, uppercase, lowercase, numbers, symbols) {
    this.#passwordLength = Number(passwordLength);
    this.#uppercase = uppercase;
    this.#lowercase = lowercase;
    this.#numbers = numbers;
    this.#symbols = symbols;
  }

  getPasswordLength() {
    return this.#passwordLength;
  }

  getUppercase() {
    return this.#uppercase;
  }

  getLowercase() {
    return this.#lowercase;
  }

  getNumbers() {
    return this.#numbers;
  }

  getSymbols() {
    return this.#symbols;
  }

  minLengthError() {
    passwordLengthEl.classList.add("error");
    errorMsg.classList.remove("hidden");
  }

  removeMinLengthError() {
    passwordLengthEl.classList.remove("error");
    errorMsg.classList.add("hidden");
  }
}

let userData;

generateBtn.addEventListener("click", function () {
  userData = new UserInputs(
    passwordLengthEl.value,
    uppercaseLettersEl.checked,
    lowercaseLettersEl.checked,
    includeNumbersEl.checked,
    includeSymbolsEl.checked
  );

  generatePassword(
    userData.getUppercase(),
    userData.getLowercase(),
    userData.getNumbers(),
    userData.getSymbols()
  );
});

const generatePassword = function (uppercase, lowercase, nums, symbols) {
  if (userData.getPasswordLength() < minPasswordLength)
    return userData.minLengthError();

  userData.removeMinLengthError();

  let arr = [...letters];
  const password = [];

  if (nums && symbols) {
    arr = [...arr, ...numbers, ...numbers, ...symbolsArr];
  } else if (nums) {
    arr = [...arr, ...numbers, ...numbers];
  } else if (symbols) {
    arr = [...arr, ...symbolsArr];
  }

  for (let i = 0; i < userData.getPasswordLength(); i++) {
    password.push(arr[Math.floor(Math.random() * arr.length)]);
  }

  const upperAndLower = password.map((el, i) =>
    i % 2 === 0 && typeof el !== "number" ? el.toUpperCase() : el
  );

  const allUppercased = password.map((el) =>
    typeof el !== "number" ? el.toUpperCase() : el
  );

  // * FOR WHEN ONLY EITHER NUMBERS OR SYMBOLS OR BOTH ARE SELECTED
  const defaultPass =
    typeof password[0] !== "number"
      ? password[0].toUpperCase() + password.slice(1).join("")
      : password.join("");

  displayScreen.value = defaultPass;

  // * ALL LOWERCASE
  lowercase ? (displayScreen.value = password.join("")) : null;

  // * ALL UPPERCASE
  uppercase ? (displayScreen.value = allUppercased.join("")) : null;

  // * LOWERCASE AND UPPERCASE
  lowercase && uppercase
    ? (displayScreen.value = upperAndLower.join(""))
    : null;

  // * NONE SELECTED
  !uppercase && !lowercase && !nums && !symbols
    ? (displayScreen.value =
        password[0].toUpperCase() + password.slice(1).join(""))
    : null;
};
