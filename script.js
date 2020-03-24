const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-btn');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('') // Turn into an array
      .map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`) // Display the letter if it has been found
      .join('') // Back to string
    }
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, ''); // Remove the new line character
  
  // Check if user has won
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    popup.style.display = 'flex';
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Update and display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display as many parts as the length of the wrongLetters array
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block'; // "If 3 wrong letters, display 3 parts"
    } else {
      part.style.display = 'none';
    }
  });

  // Check if game is lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Oh no, you lost 🙁';
    popup.style.display = 'flex';
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) { // If the key pressed is an actual letter and not a number or something else
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification(); // Display we've already played this letter
      } 
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter); 
        updateWrongLettersEl();
      } else {
        showNotification(); // Display we've already played this letter
      }
      }
    }
  }
);

// Restart game
playAgainBtn.addEventListener('click', () => {
  // Empty the arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // Get a new word
  selectedWord = words[Math.floor(Math.random() * words.length)];
  
  // Update the UI
  displayWord(); // Display the new word
  updateWrongLettersEl(); // Remove the wrong letters and figure parts from previous game

  // Remove popup
  popup.style.display = 'none';
})

displayWord();