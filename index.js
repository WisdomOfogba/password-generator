const passwordForm = document.querySelector(".form");
const toast = document.getElementById("toast");
const Length = document.getElementById("length");
const Lowercase = document.getElementById("Lowercase");
const Uppercase = document.getElementById("Uppercase");
const Numbers = document.getElementById("Numbers");
const Symbols = document.getElementById("Symbols");
const Password = document.getElementById("password");
const Copy = document.getElementById("copy");
let copied = false;
const sliderEl = document.querySelector("#length");
const sliderValue = document.querySelector(".value");
const toastWraper = document.getElementById("toast-wraper");

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const length = Length.value;
  const includeLowercase = Lowercase.checked ? true : false;
  const includeUppercase = Uppercase.checked ? true : false;
  const includeNumbers = Numbers.checked ? true : false;
  const includeSybmols = Symbols.checked ? true : false;

  const password = generatePassword(
    length,
    includeLowercase,
    includeNumbers,
    includeSybmols,
    includeUppercase
  );

  Password.textContent = password;
  Copy.addEventListener("click", (event) => {
    const text = password;
    navigator.clipboard.writeText(text);
    console.log(text);
    Copy.textContent = "copied";

    setTimeout(() => {
      Copy.textContent = "copy";
    }, 3000);
  });
});

function generatePassword(
  length,
  includeLowercase,
  includeNumbers,
  includeSybmols,
  includeUppercase
) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "~`!@#$%^&*()_-+=<>,.''?/\\:;{{}}|";

  let allowedChars = "";
  let password = "";

  allowedChars += includeLowercase ? lowercaseChars : "";
  allowedChars += includeUppercase ? upercaseChars : "";
  allowedChars += includeNumbers ? numberChars : "";
  allowedChars += includeSybmols ? symbolChars : "";

  if (allowedChars.length === 0) {
    toastWraper.classList.add("fade-in");
    toastWraper.classList.remove("fade-out");
    toast.textContent = "Please Select at least one requirement!";
    return "";
  } else if (toastWraper.classList.contains("fade-in")) {
    toastWraper.classList.add("fade-out");
    toastWraper.classList.remove("fade-in");
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }
  return password;
}

sliderEl.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value;

  sliderValue.textContent = tempSliderValue;
});
