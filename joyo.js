const main = document.querySelector('main');
const cardsContainer = document.querySelector('.cards');
const resetButton = document.querySelector('.button-reset');
const flipAllButton = document.querySelector('.button-flip-all');
const shuffleButton = document.querySelector('.button-shuffle');
const fontRadioButtons = document.querySelectorAll('input[name=font-group]');
const gradeRadioButtons = document.querySelectorAll('input[name=grade-group]');
const sizeRadioButtons = document.querySelectorAll('input[name=size-group]');

resetButton.addEventListener('click', resetCardAll);
flipAllButton.addEventListener('click', flipCardAll);
shuffleButton.addEventListener('click', gradeShuffleHandler);
fontRadioButtons.forEach((radio) => radio.addEventListener('change', changeCardFont));
gradeRadioButtons.forEach((radio) => radio.addEventListener('click', gradeHandler));
sizeRadioButtons.forEach((radio) => radio.addEventListener('change', changeCardSize));

// Initial card settings
let lastFont = document.querySelector('input[name=font-group]:checked').value;
let lastGrade = document.querySelector('input[name=grade-group]:checked').value;
let lastSize = document.querySelector('input[name=size-group]:checked').value;


function gradeHandler() {
    setGrades(this.value);
}

function gradeShuffleHandler() {
    setGrades(lastGrade, true);
}

function flipCard() {
    this.classList.remove('no-box-shadow-delay');
    this.classList.toggle('card-flip');
}

function colorCard(e) {
    this.classList.add('no-box-shadow-delay');
    e.preventDefault();
    if (this.classList.contains('card-color-green')) {
        this.classList.remove('card-color-green');
        this.classList.add('card-color-red');
    } else if (this.classList.contains('card-color-red')) {
        this.classList.remove('card-color-red');
    } else {
        this.classList.add('card-color-green');
    }
}

function flipCardAll() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        this.classList.remove('no-box-shadow-delay');
        if (card.classList.contains('card-flip')) {
        } else {
            card.classList.add('card-flip');
        }
    });
}

function resetCardAll() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('card-color');
        card.classList.remove('card-color-green');
        card.classList.remove('card-color-red');
        card.classList.remove('no-box-shadow-delay');
        card.classList.remove('card-flip');
    });
}


function changeCardFont() {
    lastFont = this.value;
    main.classList.value = "";
    main.classList.add(`font-style-${lastFont}`);
}

function shuffle(array) {
    const result = [], itemsLeft = array.concat([]);
    while (itemsLeft.length) {
        const randomIndex = Math.floor(Math.random() * itemsLeft.length);
        const [randomItem] = itemsLeft.splice(randomIndex, 1);
        result.push(randomItem);
    }
    return result;
}

function setGrades(selectedGrade, toShuffle=false) {
    lastGrade = selectedGrade;
    let count = 0;
    let kanjiByGrade = selectedGrade === 'A' ? kanjis : kanjis.filter(k => k['grade'] === selectedGrade);
    kanjiByGrade = toShuffle ? shuffle(kanjiByGrade) : kanjiByGrade.sort();

    //<div class="content-number">${grade !== 'S' ? 'G' : ''}${grade} • #${count}</div>
    const kanjiCards = kanjiByGrade.map((kanji) => {
        count += 1;
        return `
        <div class="card ${lastSize}">
            <div class="card-face card-front">
                <div class="content-front">${kanji.new_shinjitai}</div>
                <div class="content-number">${count}</div>
            </div>
            <div class="card-face card-back">
                <div class="content-back">${kanji.english_meaning}</div>
            </div>
        </div>
        `;
    }).join('');
    cardsContainer.innerHTML = kanjiCards;

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
        card.addEventListener('contextmenu', colorCard);
    });
}

function changeCardSize() {
    lastSize = this.value;

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.classList.value = "";
        card.classList.add("card", lastSize);
    });
}

document.addEventListener('DOMContentLoaded', setGrades(lastGrade));
document.addEventListener('DOMContentLoaded', () => {
    main.classList.add(`font-style-${lastFont}`);
});