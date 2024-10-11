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
    Copy.textContent = "copied"

    setTimeout(() => {
      Copy.textContent = "copy"
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
  const symbolChars = "~`!@#$%^&*()_-+=<>,.''?/:;{{}}|";

  let allowedChars = "";
  let password = "";

  allowedChars += includeLowercase ? lowercaseChars : "";
  allowedChars += includeUppercase ? upercaseChars : "";
  allowedChars += includeNumbers ? numberChars : "";
  allowedChars += includeSybmols ? symbolChars : "";

  if (allowedChars.length === 0) {
    toast.classList.add("error")
    toast.textContent = "Select at least one requirement";
    return "";
  } else {
    toast.classList.remove("error")
    toast.textContent = "";
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }
  return password;
}
