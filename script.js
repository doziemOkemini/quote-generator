const quoteConatiner = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteConatiner.hidden = true;
}

function removeLoadingSpinner() {
    quoteConatiner.hidden = false;
    loader.hidden = true;
}

//show new Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() *apiQuotes.length)];
    // Check if author field is blank and replace with 'Unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check the Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes () {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch Err
        Console.log("Whoops: ", error);
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Evnt Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on Load
getQuotes();
