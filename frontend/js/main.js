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
    let pk = elem.getAttribute('name');
    $.ajax({
      Method: 'POST',
      url: 'data/like.json',
      data: {pk},
      dataType: 'json',
      success: function(response) {
        let likeCount = document.querySelector('#like-count-37');
        likeCount.innerHTML = '좋아요' + response.like_count + '개';
      },
      error: function(request, status, error) {
        alert('로그인이 필요합니다');
        window.location.replace('https://www.naver.com');
      },
    })
  } else if (elem.matches('[data-name="bookmark"]')) {
    let pk = elem.getAttribute('name');
    $.ajax({
      Method: 'POST',
      url: 'data/bookmark.json',
      data: {pk},
      dataType: 'json',
      success: function(response) {
        let bookmarkCount = document.querySelector('#bookmark-count-37');
        bookmarkCount.innerHTML = '북마크' + response.bookmark_count + '개';
      },
      error: function(request, status, error) {
        alert('로그인이 필요합니다');
        window.location.replace('https://www.naver.com');
      },
    })
  } else if (elem.matches('[data-name="share"]')) {
    console.log("공유야!");
  } else if (elem.matches('[data-name="more"]')) {
    console.log("더보기야!");
  } else if (elem.matches('[data-name="comment"]')) {
    let content = document.querySelector('#add-comment-post37 > input[type=text]').value;
    console.log(content);

    if (content.length > 140) {
      alert('댓글은 최대 140자 입력 가능합니다. 현재 글자수: ' + content.length);
      return;
    }

    $.ajax({
      Method: 'POST',
      url: './comment.html',
      data: {
        'pk': 37,
        'content': content,
      },
      dataType: 'html',
      success: function(data) {
        document.querySelector('#comment-list-ajax-post37').insertAdjacentHTML('afterbegin', data);
      },
      error: function(request, status, error) {
        alert('문제가 발생하였습니다');
      }
    });
    document.querySelector('#add-comment-post37>input[type=text]').value = '';
  } else if (elem.matches('[data-name="comment_delete"]')) {
    $.ajax({
      Method: 'POST',
      url: 'data/delete.json',
      data: {
        'pk': 37,
      },
      dataType: 'json',
      success: function(response) {
        if (response.status) {
          let comment = document.querySelector('.comment-detail');
          comment.remove();
        }
      },
      error: function(request, status, error) {
        alert('문제가 발생했습니다');
        window.location.replace('https://www.naver.com');
      }
    })
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
