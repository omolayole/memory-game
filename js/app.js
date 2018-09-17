/*
 * Create a list that holds all of your cards
 */
const symbols = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf",
"fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

const cardsContainer = document.querySelector('.deck');

let openCards = [];
let matchedCards = [];

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

        //call startTimer function
        clearInterval(interval);
        interval = setInterval(startTimer, 1000)

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

//compare two cards
function compare(currentCard, previousCard) {
    if (currentCard.innerHTML === previousCard.innerHTML) {

        //matched
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openCards = [];

        //check if game is over 
        isGameOver();

    } else {
        currentCard.classList.add("unmatch");
        previousCard.classList.add("unmatch");

        //wait 500ms, then do this
        setTimeout(function() {
            
            currentCard.classList.remove("open", "show", "disable", "unmatch");
            previousCard.classList.remove("open", "show", "disable", "unmatch");
            openCards = [];
        }, 500);
    }

    //call the move counter function
    moveCounter();

}

//check if game is over!
function isGameOver() {
    if (matchedCards.length === symbols.length) {

        //popup congratulation message
        const modal = document.querySelector('.modal');
        const playAgain = document.querySelector('.play-again')
        modal.style.display = "block";
        playAgain.addEventListener("click", function() {
            modal.style.display = "none";

            //call restartGame function
            restartGame();
        });     
    }
}

//create the restart game function
function restartGame() {
    //Delete all cards
    cardsContainer.innerHTML = "";

    //call `createGameBoard` to create a new card
    createGameBoard();

    //reset any related variables
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;

    //reset timer 
    clearInterval(interval);
	seconds = "00";
	minutes = "00";
	appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
        
}

//restart button
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function() {
    restartGame();
});

//create move counter function
const movesContainer = document.querySelector('.moves');
let moves = 0;
movesContainer.innerHTML = 0;
function moveCounter() {
    moves++;
    movesContainer.innerHTML = moves;

    //set the star rating
    starRating();
}

//create stars rating function
const starsContainer = document.querySelector('.stars');
function starRating() {
    if (moves >= 17  && moves <= 20) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
    } else if (moves > 20) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    } else if (moves <= 16) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
    } else {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
    }
}

//create timer function
const appendSeconds = document.querySelector('#seconds');
const appendMinutes = document.querySelector('#minutes');
let seconds = 0;
let minutes = 0;
let interval;
function startTimer() {
    seconds++;
    if (seconds <= 9) {
        appendSeconds.innerHTML = "0" + seconds;
    } else {
        appendSeconds.innerHTML = seconds;
    }

    /* check if seconds is equal to 60 and add a +1 to minutes, and set seconds to 0 */ 
    if (seconds === 60) {  
        minutes++; 
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    } 

    if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
    }

}