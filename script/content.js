const grid = document.querySelector(".grid");

const cardValues = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍋", "🥝", "🍍"];
const gameCards = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);

let flippedCards = [];
let matchedPairs = 0;

// Create card elements
gameCards.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="front">?</div>
        <div class="back">${emoji}</div>
    `;
    card.addEventListener("click", () => flipCard(card, emoji));
    grid.appendChild(card);
});

function flipCard(card, emoji) {
    if (flippedCards.length < 2 && !card.classList.contains("flip")) {
        card.classList.add("flip");
        flippedCards.push({ card, emoji });

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.emoji === card2.emoji) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardValues.length) {
            setTimeout(() => alert("🎉 You won!"), 500);
        }
    } else {
        setTimeout(() => {
            card1.card.classList.remove("flip");
            card2.card.classList.remove("flip");
            flippedCards = [];
        }, 1000);
    }
}
