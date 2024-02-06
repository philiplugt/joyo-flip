
// Implement card flip functionality
const container = document.querySelector('.container');


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
        body.style.fontFamily = "verdana,'ヒラギノ丸ゴ ProN W4','Hiragino Maru Gothic ProN','メイリオ','Meiryo','ＭＳ Ｐゴシック','MS PGothic',Sans-Serif";
        break;
    case 2:
        body.style.fontFamily = "Yuanti TC";
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

document.addEventListener('DOMContentLoaded', setGrades);

function setGrades() {
    const data = [];
    for (var k in kanjis) {
        data.push(kanjis[k])
    }
    const grade1 = data.filter(d => d['grade'] === '1')
    const gradechars = grade1.map((char) => {
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
    cards.forEach(card => card.addEventListener('click', flipCard));
}