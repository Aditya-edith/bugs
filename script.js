const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-PasswordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers"); 
const symbols = '!@#$%^&*()_+{}:"<>?~!}{+)(*&:"?><"'; 
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateButton = document.querySelector(".generatepassword");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
let password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();

function handleSlider() {
  inputSlider.value = passwordLength ; 
  lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  // shadow
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min); 
}

function generateRandomNumber() {
  return getRndInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbols() {
  const randNum = getRndInteger(0, symbols.length);
  return symbols.charAt(randNum); }

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasLower && hasUpper && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "failed";
  }
  // to make copy span visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

function shufflePassword(array) {
  //fisher yates method
  
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
  }
  
  function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
      if (checkbox.checked) checkCount++;
    });
    // special condition
    if (passwordLength < checkCount) {
      passwordLength = checkCount;
      handleSlider();
    }
  }

  allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
  });

// Event listeners

inputSlider.addEventListener('input', (e) => {
  passwordLength = e.target.value;
  handleSlider();
})

copyBtn.addEventListener('click', () => {
  if (passwordDisplay.value) {
    copyContent();
  }
})


//   // Convert the string to an array of characters
//   const passwordArray = password.split('');

//   // Fisher-Yates Shuffle Algorithm
//   for (let i = passwordArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
//   }

//   // Convert the array back to a string
//   const shuffledPassword = passwordArray.join('');
//   return shuffledPassword;
// }



// allCheckBox.forEach((checkBox) => {compulsary
//   checkBox.addEventListener("change", handleCheckBoxChange);
// });



generateButton.addEventListener("click", () => {
  // none of the checkboxes selected
  if (checkCount == 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
  // start new journey;
  // remove old password
  password = "";

  let funcArr = [];

  if (uppercaseCheck.checked) {
    funcArr.push(generateUpperCase);
  }

  if (lowercaseCheck.checked) {
    funcArr.push(generateLowerCase);
  }

  if (numbersCheck.checked) {
    funcArr.push(generateRandomNumber);
  }

  if (symbolsCheck.checked) {
    funcArr.push(generateSymbols);
  }

  // compulsory addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  console.log("compulsary addition done")

  // remaining addition
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    console.log("randINDEX"+ randIndex);
    password += funcArr[randIndex]();
  }
  console.log("remaining addtiion done")
  // shuffle the password
  password = shufflePassword(Array.from(password));
  console.log("suffling done")
  //show in UI
  passwordDisplay.value = password;
  console.log("UI addition done")
  // calculate strength
  calcStrength();
});

// generateButton.addEventListener("click", () => {
//   // Check if at least one checkbox is selected
//   const checkedBoxes = Array.from(allCheckBox).filter((checkbox) => checkbox.checked);

//   if (checkedBoxes.length === 0) {
//     // Display an error or handle the case where no checkbox is selected
//     return;
//   }

//   // Update password length if necessary
//   if (passwordLength < checkCount) {
//     passwordLength = checkCount;
//     handleSlider();
//   }

//   // Generate password
//   password = "";
//   const selectedFunctions = [
//     uppercaseCheck.checked && generateUpperCase,
//     lowercaseCheck.checked && generateLowerCase,
//     numbersCheck.checked && generateRandomNumber,
//     symbolsCheck.checked && generateSymbols,
//   ].filter(Boolean);

//   for (let i = 0; i < passwordLength; i++) {
//     const randomFunction = selectedFunctions[Math.floor(Math.random() * selectedFunctions.length)];
//     password += randomFunction();
//   }

//   passwordDisplay.value = password;

//   // Calculate strength
//   calcStrength();
// });
