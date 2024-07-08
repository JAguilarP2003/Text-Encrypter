// Set all DOM elements.
const inputText = document.getElementById("encryptedText");
const outputText = document.getElementById("decryptedText");
const warningText = document.querySelector("p"); // Selects a <p> element for the warning text.
const encryptBtn = document.querySelector(".encryptBtn");
const decryptBtn = document.querySelector(".decryptBtn");
const img = document.querySelector(`img[alt='lock']`); // Selects an <img> element with alt attribute 'lock'.
const copyBtn = document.createElement("button"); // Creates the copy button.

// Business Rules Variables.
const upperCaseChars = /[A-Z]/g; // All uppercase characters.
const specialChars = /[~!@#$%^&*()_+|}{[\]\\/?><:"`;.,áéíóúàèìòù']/g; // Special sharacters.
const keys = { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" }; // Object mapping for text encryption.

// Envent listeners.
encryptBtn.addEventListener("click", encryptText); // Adds click listener for Encrypt button.
decryptBtn.addEventListener("click", decryptText); // Adds click listener for Decrypt button.
inputText.addEventListener("input", toggleButtons); // Adds input listener for input text changes.
window.addEventListener('load', resizeBtns); // Adds load listener to resize buttons on page load.
window.addEventListener('resize', resizeBtns); // Adds resize listener to resize buttons on window resize.

// Set buttons to be disabled by default (When the input text is empty).
if (inputText.value.trim() === "") {
    encryptBtn.disabled = true;
    decryptBtn.disabled = true;
}

// Toggle button functionality following business rules.
function toggleButtons() {
    if (inputText.value.trim() === "" || inputText.value.match(upperCaseChars) || inputText.value.match(specialChars)) {
        encryptBtn.disabled = true;
        decryptBtn.disabled = true;
        warningText.style.opacity = "1"; // Shows warning text.
    } else {
        encryptBtn.disabled = false; // Enable Encrypt button.
        decryptBtn.disabled = false; // Enable Decrypt button.
        warningText.style.opacity = "0"; // Hide warning text.
    }
}

// Set lock image in the middle of the screen.
function imgParams() {
    img.style.width = "80px";
    img.style.position = "absolute";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";
    img.style.transition = "width 0.5s ease, top 0.5s ease, left 0.5s ease";
}

// Create copy to clipboard button.
function createCopyBtn() {
    copyBtn.textContent = "Copy";
    copyBtn.classList.add("copyBtn");
    resizeBtns(); // Sets the initial position of the button.
    outputText.parentElement.appendChild(copyBtn); // Adds the button into DOM.

    copyBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(outputText.value); // Copies output text to clipboard.
    });
}

// Encrypt text.
function encryptText(e) {
    e.preventDefault(); // Prevents the page from scrolling to the top.

    setTimeout(function () {
        outputText.scrollIntoView({ behavior: 'smooth' }); // Scrolls to the output text area.
    }, 1); // Adds a slight delay to ensure the output text area is available.

    imgParams(); // Calls image parameters function.
    outputText.style.display = "block"; // Displays output textarea.

    // Prevents duplicating copy to clipboard button.
    if (!document.querySelector(".copyBtn")) {
        createCopyBtn(); // Calls the function to create copy to clipboard button.
    }

    let text = inputText.value; // Stores input text in a local variable.
    let encryptedText = ""; // Creates an empty string.

    for (letter in keys) {
        encryptedText = text.replaceAll(letter, keys[letter]); // Iterates letter by letter and replace the string values.
        text = encryptedText; // Overwrites original string to save the encrypted one.
    }

    outputText.value = text; // Displays encrypted text in output textarea.
}

// Decrypt text.
function decryptText(e) {
    e.preventDefault(); // Prevents the page from scrolling to the top.

    outputText.scrollIntoView({ behavior: 'smooth' });

    let text = inputText.value; // Set input text as a local variable.
    let decryptedText = ""; // Creates an empty string.

    for (letter in keys) {
        decryptedText = text.replaceAll(keys[letter], letter); // Iterates through values and restores letters.
        text = decryptedText; // Overwrites original string with decrypted one.
    }

    outputText.value = text; // Displays decrypted text in output text area.
}

// Resize buttons based on window width.
function resizeBtns() {
    if (window.innerWidth <= 1380) {
        copyBtn.style.position = "static"; // Sets the button position to static.
        copyBtn.style.margin = "20px";
    } else {
        copyBtn.style.position = "absolute"; // Positions the button within the text area.
        copyBtn.style.top = "495px"; // Vertical positioning for the button.
    }
}

