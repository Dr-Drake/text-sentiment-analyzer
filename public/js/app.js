const inputEl = document.getElementById('s-input');
const scoreEl = document.getElementById('s-score');
const sentimentEl = document.getElementById('g-sentiment');
const emojiEl = document.getElementById('s-emote');
const cardEl = document.getElementById('s-card');

/** Variables */
let debounceTimeout;


/** Helper Function */
function displayVeryPositiveEmote(){
    
    let containsVeryPositiveClass = emojiEl.classList.contains('fa-face-grin-wide');
    emojiEl.classList.remove('fa-face-smile');
    emojiEl.classList.remove('fa-face-meh');
    emojiEl.classList.remove('fa-face-sad-cry');
    emojiEl.classList.remove('fa-face-frown');

    if (!containsVeryPositiveClass) {
        emojiEl.classList.add('fa-face-grin-wide');
    }
}

function displayPositiveEmote(){
    
    let containsPositiveClass = emojiEl.classList.contains('fa-face-smile');
    emojiEl.classList.remove('fa-face-grin-wide');
    emojiEl.classList.remove('fa-face-meh');
    emojiEl.classList.remove('fa-face-sad-cry');
    emojiEl.classList.remove('fa-face-frown');

    if (!containsPositiveClass) {
        emojiEl.classList.add('fa-face-smile');
    }
}

function displayNeutralEmote(){
    
    let containsNeutralClass = emojiEl.classList.contains('fa-face-meh');
    emojiEl.classList.remove('fa-face-grin-wide');
    emojiEl.classList.remove('fa-face-smile');
    emojiEl.classList.remove('fa-face-sad-cry');
    emojiEl.classList.remove('fa-face-frown');

    if (!containsNeutralClass) {
        emojiEl.classList.add('fa-face-meh');
    }
}

function displayNegativeEmote(){
    
    let containsNegativeClass = emojiEl.classList.contains('fa-face-frown');
    emojiEl.classList.remove('fa-face-smile');
    emojiEl.classList.remove('fa-face-meh');
    emojiEl.classList.remove('fa-face-sad-cry');
    emojiEl.classList.remove('fa-face-grin-wide');

    if (!containsNegativeClass) {
        emojiEl.classList.add('fa-face-frown');
    }
}

function displayVeryNegativeEmote(){
    
    let containsVeryNegativeClass = emojiEl.classList.contains('fa-face-sad-cry');
    emojiEl.classList.remove('fa-face-smile');
    emojiEl.classList.remove('fa-face-meh');
    emojiEl.classList.remove('fa-face-grin-wide');
    emojiEl.classList.remove('fa-face-frown');

    if (!containsVeryNegativeClass) {
        emojiEl.classList.add('fa-face-sad-cry');
    }
}

function analyzeSentiment(score) {
    scoreEl.innerText = score.toFixed(2);

    if (score > 0.5) {
        sentimentEl.innerText = 'Very positive';
        cardEl.classList.remove('positive');
        cardEl.classList.remove('neutral');
        cardEl.classList.remove('negative');
        cardEl.classList.remove('very-negative');
        cardEl.classList.contains('very-positive') ? '' : cardEl.classList.add('very-positive');
        displayVeryPositiveEmote();
    } 
    else if (score > 0) {
        sentimentEl.innerText = 'Positive';
        cardEl.classList.remove('very-positive');
        cardEl.classList.remove('neutral');
        cardEl.classList.remove('negative');
        cardEl.classList.remove('very-negative');
        cardEl.classList.contains('positive') ? '' : cardEl.classList.add('positive');
        displayPositiveEmote();

    } 
    else if (score < -0.5) {
        sentimentEl.innerText = 'Very negative';
        cardEl.classList.remove('positive');
        cardEl.classList.remove('neutral');
        cardEl.classList.remove('negative');
        cardEl.classList.remove('very-positive');
        cardEl.classList.contains('very-negative') ? '' : cardEl.classList.add('very-negative');
        displayVeryNegativeEmote();
    } 
    else if (score < 0) {
        sentimentEl.innerText = 'Negative';
        cardEl.classList.remove('positive');
        cardEl.classList.remove('neutral');
        cardEl.classList.remove('very-positive');
        cardEl.classList.remove('very-negative');
        cardEl.classList.contains('negative') ? '' : cardEl.classList.add('negative');
        displayNegativeEmote();
    } 
    else {
        sentimentEl.innerText = 'Neutral';
        cardEl.classList.remove('positive');
        cardEl.classList.remove('very-positive');
        cardEl.classList.remove('negative');
        cardEl.classList.remove('very-negative');
        cardEl.classList.contains('neutral') ? '' : cardEl.classList.add('neutral');
        displayNeutralEmote();
    }
}

/** Listeners */
function handleInput(event) {

    // Clear any existing timeout
    clearTimeout(debounceTimeout);
  
    // Get the input value
    const value = event.target.value;
  
    if (value.length > 0) {
        // Set a new timeout to send the request after 500ms
        debounceTimeout = setTimeout(() => {
            // Send the fetch request
            fetch(`/analyze?text=${encodeURIComponent(value)}`)
            .then(response => {

                // Extract the JSON data from the response
                return response.json();
            })
            .then(data => {
                // Access the sentiment score value
                const sentimentScore = data.score;
                console.log(sentimentScore);
                analyzeSentiment(sentimentScore);
            
            })
            .catch(error => {
                console.log(error);
                alert("An error occured while analysing the sentiment");
            });
            
        }, 500);
    }
}

inputEl.addEventListener('input', handleInput)