/*
 * Create a list that holds all of your cards
 */
const symbols = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf",
"fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

const cardsContainer = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//create the game board function
function createGameBoard() {
    //shuffle the card
    const shuffledCards = shuffle(symbols);

    //create card
    for (let i = 0; i < shuffledCards.length; i++) {
        const card = document.createElement('li');
        card.classList.add("card");
        card.innerHTML = `<i class="${shuffledCards[i]}"></i>`;
        cardsContainer.appendChild(card);

        //call click function on the card
        click(card);
    }
}

//call the createGameBoard function
createGameBoard();

//create the click function
function click(card) {
    card.addEventListener('click', function() {
        const currentCard = this;
        const previousCard = openCards[0];

        //check for an existing opened cards
        if (openCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openCards.push(this);

            //compare our two opened card
            compare(currentCard, previousCard);

        } else {
            //check for no existing opened cards
            currentCard.classList.add("open", "show", "disable");
            openCards.push(this);
        }
    });
}

