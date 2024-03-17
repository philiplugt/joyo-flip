
// Implement card flip functionality
var lastGrade = "1";
const container = document.querySelector('.container');

const buttons = document.querySelectorAll('.grades button');

buttons.forEach((button) => button.addEventListener('click', clicker));

function clicker() {
    setGrades(this.dataset.type);
}

function clicker2() {
    setGrades(lastGrade, true);
}

function flipCard() {
    this.classList.toggle('card-flip');
}

function colorCard(e) {
    e.preventDefault();
    this.classList.toggle('card-color');
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
    cards.forEach(card => card.classList.remove('card-color'));
}


function changeFont() {
    let body = document.querySelector('body');
    body.style.fontWeight = null;
    switch (parseInt(this.value)) {
    case 1:
        body.style.fontFamily = "Toppan Bunkyu Mincho";
        break;
    case 2:
        body.style.fontFamily = "Klee";
        break;
    case 3:
        body.style.fontFamily = "verdana,'ヒラギノ丸ゴ ProN W4','Hiragino Maru Gothic ProN','メイリオ','Meiryo','ＭＳ Ｐゴシック','MS PGothic',Sans-Serif";//"Yuanti TC";
        body.style.fontWeight = "lighter";
        break;
    case 4:
        body.style.fontFamily = "YuKyokasho Yoko";
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
const random = document.querySelector('.rnd');
random.addEventListener('click', clicker2);

document.addEventListener('DOMContentLoaded', setGrades(lastGrade));

function shuffle(array) {
  const result = [], itemsLeft = array.concat([]);
  while (itemsLeft.length) {
    const randomIndex = Math.floor(Math.random() * itemsLeft.length);
    const [randomItem] = itemsLeft.splice(randomIndex, 1); // take out a random item from itemsLeft
    result.push(randomItem); // ...and add it to the result
  }

  return result;
}

function setGrades(grade, toShuffle=false) {
    lastGrade = grade;
    const grade1 = kanjis.filter(k => k['grade'] === grade)
    var count = 0;
    var grade1_n;
    if (toShuffle) {
        grade1_n = shuffle(grade1);
    } else {
        grade1_n = grade1.sort();
    }
    //<div class="content-number">${grade !== 'S' ? 'G' : ''}${grade} • #${count}</div>
    const gradechars = grade1_n.map((char) => {
        count += 1;
        // console.log(char)
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
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
        card.addEventListener('contextmenu', colorCard);
    });
}

const slider = document.querySelector('.slider');
slider.addEventListener('change', changeCardSize);
// slider.addEventListener('mousemove', changeCardSize);

function changeCardSize() {
    var con = document.querySelectorAll('.container');
    container.style.gap = `${this.value * 40}px`;
    var cards = document.querySelectorAll('.card');
    var card_front = document.querySelectorAll('.content-front');
    var card_back = document.querySelectorAll('.content-back');
    card_front.forEach(front => front.style.fontSize = `${this.value * 84}px`);
    card_back.forEach(front => front.style.fontSize = `${this.value * 36}px`);

    console.log(this.value);//((this.value - 50) / 10))
    cards.forEach(card => {
        card.style.width = `${this.value * 240}px`
        // card.style.borderWidth = `${this.value * 6}px`

    }); //10 + ((this.value - 50) / 10)}%`);
}