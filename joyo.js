
// Implement card flip functionality
var lastGrade = "1";
const container = document.querySelector('.cards');

const buttons = document.querySelectorAll('input[name=grade-group]');
buttons.forEach((button) => button.addEventListener('click', clicker));

function clicker() {
    console.log(this.value);
    setGrades(this.value);
}

function clicker2() {
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


function changeFont() {
    let main = document.querySelector('main');
    main.style.fontWeight = null;
    switch (parseInt(this.value)) {
    case 1:
        main.style.fontFamily = "Klee";
        break;
    case 2:
        main.style.fontFamily = "Toppan Bunkyu Mincho";
        break;
    case 3:
        main.style.fontFamily = "YuKyokasho Yoko";
        break;
    case 4:
        main.style.fontFamily = "verdana,'ヒラギノ丸ゴ ProN W4','Hiragino Maru Gothic ProN','メイリオ','Meiryo','ＭＳ Ｐゴシック','MS PGothic',Sans-Serif";
        break;
    case 5:
        main.style.fontFamily = "ヒラギノ角ゴ Pro W3";
        break;
    case 6:
        main.style.fontFamily = "Urbanist";
        break;
    }
}

const go = document.querySelector('.go');
go.addEventListener('click', resetCardAll);

const go2 = document.querySelector('.go2');
go2.addEventListener('click', flipCardAll);

const go3 = document.querySelectorAll('input[name=font-group]');
go3.forEach((radio) => radio.addEventListener('change', changeFont));



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
    const grade1 = grade === 'A' ? kanjis : kanjis.filter(k => k['grade'] === grade);
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
                <div class="content-number">${count}</div>
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

const slider = document.querySelectorAll('input[name=size-group]');
slider.forEach((radio) => radio.addEventListener('change', changeCardSize));

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