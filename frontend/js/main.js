const { JSDOM } = require('jsdom');
const dom = new JSDOM();
const document = dom.window.document;

const heart = document.querySelector('.heart_btn');
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');

heart.addEventListener('click', function() {
  console.log('hit');
  heart.classList.toggle('on');
});

function resizeFunc() {
  if (pageYOffset >= 10) {
    let calcWidth = (window.innerWidth * 0.5) + 167;
    sidebox.style.left = calcWidth + 'px';
  }
}
function scrollFunc() {
  if (pageYOffse >= 10) {
    header.classList.add('on');
    sidebox.classList.add('on');
  } else {
    header.classList.remove('on');
    sidebox.classList.remove('on');
  }
}

window.addEventListener('scroll', scrollFunc); // 스크롤 이벤트가 발생하면 func 실행
