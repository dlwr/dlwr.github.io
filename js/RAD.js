(function(){
  var loading = false;
  var first = true;
  var RAD_URL = 'http://219.94.245.80:3000/';
  var RAD_DEPTH = {
      TODAY: 'today',
      SINCE_BLOG: 'since_blog',
      SINCE_DIARY: 'since_diary'
  };
  var depthSelectBox = document.createElement('form');
  depthSelectBox.innerHTML = '<select name="radDepth" onchange="changeRadDepth()"><option value="today">今日</option><option value="since_blog">2011年11月7日から今日まで</option><option value="since_diary">2003年1月16日から今日まで</option></select>';
  var rad = document.querySelector('#RAD').parentNode.parentNode.parentNode;
  rad.querySelector('.entry-header').insertBefore(depthSelectBox, rad.querySelector('.entry-header .date'));
  window.goRad = function() {
    if (loading) {
      return;
    }
    loading = true;
    rad.querySelector('.entry-content').innerHTML = rad.querySelector('.entry-header .entry-title').innerHTML = "読み込みちう～～:;(∩´﹏`∩);:"
    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
      loading = false;
      if (xhr.status <= 200 && xhr.status < 300) {
        var doc = e.target.response;
        var god = doc.querySelector('#main-inner .entry-inner');
        if (!god || god.parentNode.className.match('no-entry')) {
          goRad();
          return;
        }
        rad.querySelector('.categories').innerHTML='<button href="http://djbudo.hatenablog.com/category/RAD" onclick="goRad()" style="font-size:20px;">RAD</button><span>←button or alt+r to RAD</span>';
        rad.querySelector('.entry-header .date').innerHTML = god.querySelector('.entry-header .date').innerHTML;
        rad.querySelector('.entry-header .entry-title').innerHTML = god.querySelector('.entry-header .entry-title').innerHTML;
        rad.querySelector('.entry-header .entry-title').innerHTML += '<a href="/entry/RAD">  (★RAD★)</a>';
        var card = document.createElement('iframe');
        card.setAttribute('style', 'width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;');
        card.setAttribute('title', doc.title);
        card.setAttribute('src', rad.querySelector('.entry-header .entry-title a').href.replace('entry', 'embed'));
        card.setAttribute('frameborder', '0');
        card.setAttribute('scrolling', 'no');
        rad.parentNode.insertBefore(card, rad.nextSibling);
        rad.querySelector('.entry-content').innerHTML = god.querySelector('.entry-content').innerHTML;
        rad.querySelector('.entry-content').innerHTML += '<button href="http://djbudo.hatenablog.com/category/RAD" onclick="goRad()" style="font-size:20px;" id="RAD">RAD</button>';
        rad.querySelector('.entry-footer').innerHTML = god.querySelector('.entry-footer').innerHTML;
        var commentBox = rad.querySelector('.comment-box');
        if (commentBox) commentBox.remove();
        window.scroll(0, rad.offsetTop - 72);
        if (!first) {
          var stars = document.querySelectorAll('.entry-footer .hatena-star-container');
          for (var i = 0, length = stars.length; i < length; i++) {
            stars[i].innerHTML = '';
          }
          Hatena.Star.EntryLoader();
        }
        first = false;
      } else {
        // goRad();
        return;
      }
    };
    xhr.open('GET', RAD_URL + depthSelectBox.radDepth.options[depthSelectBox.radDepth.selectedIndex].value + '?pretend=true', true);
    xhr.responseType = 'document';
    xhr.send(null);
  };
  goRad();
  var keyPress = function(e) {
    if (!e) e = window.event;
    if (e.keyCode == 174 && e.altKey && loading == false) {
      goRad();
    }
  };
  var keyUp = function(e) {
    if (e.altKey && e.keyCode == 82) {
      goRad();
    }
  };
  document.addEventListener('keypress', keyPress);
  document.addEventListener('keyup', keyUp);
}());
