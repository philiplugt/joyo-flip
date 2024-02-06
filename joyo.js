
// Implement card flip functionality
const container = document.querySelector('.container');

const buttons = document.querySelectorAll('.grades button');

buttons.forEach((button) => button.addEventListener('click', clicker));

function clicker() {
    setGrades(this.dataset.type);
}

function flipCard() {
    this.classList.toggle('card-flip');
}

function flipCardAll() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.classList.contains('card-flip')) {
        } else {
            card.classList.add('card-flip');
        }
    });
}

function resetCardAll() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('card-flip'));
}


function changeFont() {
    let body = document.querySelector('body');
    body.style.fontWeight = null;
    switch (parseInt(this.value)) {
    case 1:
        //BiauKaiTC
        body.style.fontFamily = "BiauKaiTC";
        break;
    case 2:
        body.style.fontFamily = "verdana,'ヒラギノ丸ゴ ProN W4','Hiragino Maru Gothic ProN','メイリオ','Meiryo','ＭＳ Ｐゴシック','MS PGothic',Sans-Serif";//"Yuanti TC";
        body.style.fontWeight = "lighter";
        break;
    case 3:
        body.style.fontFamily = "Libian TC";
        break;
    case 4:
        body.style.fontFamily = "Wawati TC";
        break;
    case 5:
        body.style.fontFamily = "ヒラギノ角ゴ Pro W3";
        break;
    case 6:
        body.style.fontFamily = null;
        break;
    }
}

const go = document.querySelector('.go');
const go2 = document.querySelector('.go2');
const go3 = document.querySelector('.go3');
go.addEventListener('click', resetCardAll);
go2.addEventListener('click', flipCardAll);
go3.addEventListener('change', changeFont);

document.addEventListener('DOMContentLoaded', setGrades("1"));



function setGrades(grade) {
    const grade1 = kanjis.filter(k => k['grade'] === grade)
    var count = 0;
    const gradechars = grade1.sort().map((char) => {
        count += 1;
        // console.log(char)
        return `
        <div class="card">
            <div class="card-face card-front">
                <div class="content-number">${count}</div>
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

const slider = document.querySelector('.slider');
slider.addEventListener('change', changeCardSize);
slider.addEventListener('mousemove', changeCardSize);

function changeCardSize() {
    var cards = document.querySelectorAll('.card');
    console.log(((this.value - 50) / 10))
    cards.forEach(card => card.style.width = `${10 + ((this.value - 50) / 10)}%`);
}