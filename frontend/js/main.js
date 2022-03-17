'use strict';

const heart = document.querySelector( '.heart_btn');
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const deligation = document.querySelector('.contents_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');

// heart.addEventListener('click', function() {
//   console.log('hit');
//   heart.classList.toggle('on');
// });

function deligationFunc (e) {
  let elem = e.target;

  while (!elem.getAttribute('data-name')) {
    elem = elem.parentNode;
    if (elem.nodeName === 'BODY') {
      elem = null;
      return;
    }
  }

  if (elem.matches('[data-name="heartbeat"]')) {
    console.log("하트야!");
  } else if (elem.matches('[data-name="bookmark"]')) {
    console.log("북마크다!");
  } else if (elem.matches('[data-name="share"]')) {
    console.log("공유야!");
  } else if (elem.matches('[data-name="more"]')) {
    console.log("더보기야!");
  }
  elem.classList.toggle('on');
}

function resizeFunc() {
  if (pageYOffset >= 10) {
    let calcWidth = (window.innerWidth * 0.5) + 167;
    sidebox.style.left = calcWidth + 'px';
  }

  if (matchMedia('screen and (max-width:800px)').matches) {
    for (let i = 0; i < variableWidth.length; i += 1) {
      variableWidth[i].style.width = window.innerWidth - 20 + 'px';
    }
  } else {
    for (let i = 0; i < variableWidth.length; i += 1) {
      if (window.innerWidth > 600) {
        variableWidth[i].removeAttribute('style');
      }
    }
  }
}
function scrollFunc() {
  if (pageYOffset >= 10) {
    header.classList.add('on');
    if (sidebox) sidebox.classList.add('on');
    resizeFunc();
  } else {
    header.classList.remove('on');
    if (sidebox) {
      sidebox.classList.remove('on');
      sidebox.removeAttribute('style');

    }
  }
}

setTimeout(function () {
  scrollTo(0, 0);
}, 100);

if (deligation) {
  deligation.addEventListener('click', deligationFunc);
}
window.addEventListener('resize', resizeFunc);
window.addEventListener('scroll', scrollFunc); // 스크롤 이벤트가 발생하면 func 실행
