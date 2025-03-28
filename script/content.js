const grid = document.querySelector('.grid');
const gameContainer = document.querySelector('.game-container') // Select the container
const timerDisplay = document.createElement('h2')
timerDisplay.textContent = '⏳ Time: 0 sec'
gameContainer.insertBefore(timerDisplay, grid) // Insert inside game container

// Select the existing Restart Button from HTML
const restartButton = document.getElementById("button")

const cardValues = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍋", "🥝", "🍍"]
let gameCards = [];
let flippedCards = []
let matchedPairs = 0
let timer
let secondsElapsed = 0
let gameStarted = false

// Function to Start/Restart Game
function setupGame() {
  grid.innerHTML = ""// Clear old cards
  gameCards = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5)
  flippedCards = []
  matchedPairs = 0
  secondsElapsed = 0
  gameStarted = false
  timerDisplay.textContent = '⏳ Time: 0 sec'

  gameCards.forEach((emoji) => {
    const card = document.createElement("div")
    card.classList.add("card")
    card.innerHTML = `
            <div class="front"></div>
            <div class="back">${emoji}</div>
        `;
    card.addEventListener('click', () => flipCard(card, emoji))
    grid.appendChild(card)
  })

  stopTimer()
}

function startTimer() {
  stopTimer()
  timer = setInterval(() => {
    secondsElapsed++
    timerDisplay.textContent = `⏳ Time: ${secondsElapsed} sec`
  }, 1000)
}

function stopTimer() {
  clearInterval(timer)
}

function flipCard(card, emoji) {
  if (!gameStarted) {
    gameStarted = true
    startTimer()
  }

  if (flippedCards.length < 2 && !card.classList.contains("flip")) {
    card.classList.add('flip');
    flippedCards.push({ card, emoji })

    if (flippedCards.length === 2) {
      checkMatch()
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards

  if (card1.emoji === card2.emoji) {
    matchedPairs++
    flippedCards = []
    if (matchedPairs === cardValues.length) {
      stopTimer()
      setTimeout(() => alert(`🎉 You won in ${secondsElapsed} seconds!`), 500)
    }
  } else {
    setTimeout(() => {
      card1.card.classList.remove('flip')
      card2.card.classList.remove('flip')
      flippedCards = []
    }, 1000)
  }
}

// Link the Restart Button to the `setupGame` function
restartButton.addEventListener('click', setupGame)

// Start the game on page load
setupGame()
