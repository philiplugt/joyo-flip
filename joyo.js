
// Implement card flip functionality
const container = document.querySelector('.container');


function flipCard() {
    this.classList.toggle('card-flip');
}

const go = document.querySelector('.go');
document.addEventListener('DOMContentLoaded', setGrades);

function setGrades() {
    const data = [];
    for (var k in kanjis) {
        data.push(kanjis[k])
    }
    const grade1 = data.filter(d => d['grade'] === '1')
    const gradechars = grade1.map((char) => {
        console.log(char)
        return `
        <div class="card">
            <div class="card-face card-front">
                <div class="content-front">${char.new_shinjitai}</div>
            </div>
            <div class="card-face card-back">
                <div class="content-back">${char.english_meaning}</div>
            </div>
        </div>
        `;
    }).join('');
    container.innerHTML = gradechars;

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', flipCard));
}