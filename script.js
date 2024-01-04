'use strict';

let message = document.querySelector('.message');
let scoreDisplay = document.querySelector('.score')
let score = 5;
let highScore = 0;
let maxGuess = 40
let secretNumber = Math.trunc(Math.floor(Math.random() * maxGuess) + 1)

//! ====================== HELPER FUNCTIONS ===========================

function displayMessage(message) {
    document.querySelector('.message').textContent = message;
}

//! ...................................................................

function getElementAndUpdateText(query, newValue) {
    // Get the HTML element using the query
    const element = document.querySelector(query);

    // Check if the element exists
    if (element) {
        // Update the vlaue of the element
        element.textContent = newValue;
    } else {
        console.error(`Element with query '${query}' not found!`)
    }
}

//! ===================================================================

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);

    // When there is no input
    if (!guess) {
        displayMessage('⛔ No Number entered!');
    }
    // When the entered number in higher than max guess
    else if (guess > maxGuess) {
        alert(`Please enter a number between 1 and ${maxGuess}`);
        document.querySelector('.guess').value = '';
        document.querySelector('.guess').focus();
    }
    // When Player wins
    else if (guess === secretNumber) {
        displayMessage('🎉 Correct Number!');
        getElementAndUpdateText('.number', secretNumber)
        document.querySelector('body').style.backgroundColor = '#60b347'
        document.querySelector('.number').style.width = '30rem';
        score++;

        if (score > highScore) {
            highScore = score;
            getElementAndUpdateText('.highscore', highScore);
        }
    }
    // When guess is wrong
    else if (guess !== secretNumber) {
        // When guess is too high
        if (score > 1) {
            displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!')
            score--;
            scoreDisplay.textContent = score
        } else {
            displayMessage('💥 You lost the game!');
            scoreDisplay.textContent = 0
            document.querySelector('body').style.backgroundColor = '#b01f15'
            getElementAndUpdateText('.number', '☹️')
        }
    }
})


document.querySelector('.again').addEventListener('click', function () {
    score = 5;
    secretNumber = Math.trunc(Math.floor(Math.random() * maxGuess) + 1)
    displayMessage('Start guessing...');
    scoreDisplay.textContent = score
    getElementAndUpdateText('.number', '?')
    document.querySelector('.guess').value = ''
    document.querySelector('body').style.backgroundColor = '#222'
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.guess').focus();
})

window.onload = function () {
    document.querySelector('.guess').focus();
};