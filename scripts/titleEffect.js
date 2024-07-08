document.addEventListener("DOMContentLoaded", function () {
	// Select the h1 element.
	const h1 = document.querySelector("h1");

	// Define the original and encrypted text.
	const originalText = "Text Encrypter";
	const encryptedText = "7ǝӼ7 3uɔɹʎd7ǝɹ";

	// Define the pause time and change time.
	const pauseTime = 10000; // Time to wait before switching back (in ms).
	const changeTime = 5000; // Time to wait before starting the next change (in ms).

	// Function to alternate between original and encrypted text.
	function alternateText() {
		changeTextLetterByLetter(originalText, encryptedText, h1, function () {
			setTimeout(function () {
				changeTextLetterByLetter(encryptedText, originalText, h1, function () {
					setTimeout(alternateText, changeTime);
				});
			}, pauseTime);
		});
	}

	// Start the text alternation.
	alternateText();

	// Function to change text letter by letter.
	function changeTextLetterByLetter(initialText, finalText, element, callback) {
		const interval = 70; // Interval between each letter change (in ms).
		const initialCharacters = initialText.split(''); // Split initial text into characters.
		const finalCharacters = finalText.split(''); // Split final text into characters.

		let index = 0; // Initialize index for the current character position.
		const changeInterval = setInterval(function () {
			// Create the text to be displayed.
			const showedCharacters = initialCharacters.slice(0, index).concat(finalCharacters.slice(index)).join('');
			element.textContent = showedCharacters; // Update the element's text content.
			index++; // Move to the next character.

			// If all characters are updated, clear the interval and call the callback if provided.
			if (index > finalCharacters.length) {
				clearInterval(changeInterval);
				if (callback) callback();
			}
		}, interval);
	}
});
