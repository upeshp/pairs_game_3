/* MAKE CARDS FLIP */

/* first need to make a list of all memory card elements and store it inside our 'constant' named cards */
const cards = document.querySelectorAll('.memory-card');

/* then going to loop through the list, and to each card attach an event listener, listen for a click event... */
/* ...whenever that event happens, execute a function named flip card */
cards.forEach(card => card.addEventListener('click', flipCard));

let moves = 0;
let counter = document.querySelector(".moves");

let matches = 0;
let logger = document.querySelector(".matches");



 // *** 12. declare modal
 let modal = document.getElementById("popup1")

 // declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("flip");

/* we have to know if it's first or second card clicked, in order to perform matching logic, declare variable */
let hasFlippedCard = false; //* When we click the first card, it needs to wait until another card is flipped. The variables hasFlippedCard and flippedCard will manage the flip state. In case there is no card flipped, hasFlippedCard is set to true and flippedCard is set to the clicked card *//
let firstCard, secondCard; //* declaring 1st 2nd card variables *//
let lockBoard = false; //* When the player clicks the second card, lockBoard will be set to true and the condition if (lockBoard) return; will prevent any card flipping before the cards are hidden or match *//


/* declare the flipCard function */ 
function flipCard() {
    if (lockBoard) return; /* if true executes next bit? */
    if (this === firstCard) return; /* to prevent same card being clicked twice remaining flipped... */

    /* want to access the class list of the memory card, and to 'toggle' it - this means if the class is there, remove it, if not, add it */
    this.classList.add('flip'); /* Let’s also switch the toggle method to add */
    
    if (!hasFlippedCard) {
        /* i.e. hasn't flipped card, first click */
            hasFlippedCard = true;
            firstCard = this;

            return; /* return instead of else, if true, stops function execution there, if not executes the next bit */
        } 
        /* i.e. second click */
            hasFlippedCard = false;
            secondCard = this;

            checkForMatch();     
            moveCounter(); /****added move counter, code modified from https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript ****/
            
}



/* TIDY UP CODE EACH BIT HAS OWN FUNCTION */
/* A more elegant way of writing the matching condition is to use a ternary operator. It’s composed by three blocks. The first block is the condition to be evaluated. The second block is executed if the condition returns true, otherwise the executed block is the third: */ 
/*function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
} */

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        matchLogger();
    }
    else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
        }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/* shuffle board */
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})()


/****added move counter, code modified from https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript ****/

// Select the class moves-counter and change it's HTML  


/*
Increment the moves counter.  To be called at each
comparison for every two cards compared add one to the count
*/
function moveCounter(){    
    moves++;    
    counter.innerHTML = moves;
}

function matchLogger(){    
    matches++;    
    logger.innerHTML = matches;
}

// 12. congratulations when all cards match, show modal and moves, time and rating
// 12. The congratulations function checks to see if all cards are matched, if they are matched then it stops the timer. gets number of moves, star rating and time spent. and displays on the congratulation modal. There are also some functions that close the modal and reset the game on clicking the close icon and play again button provided in the modal.
function congratulations(){
    if (matchedCard.length === 12){
       
        modal.classList.add("show");

        
    };
}


