(function(){
  var loading = false;
  var first = true;
  window.goRad = function() {
    if (loading) {
      return;
    }
    loading = true;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://219.94.245.80:3000/today?pretend=true', true);
    xhr.responseType = 'document';
    xhr.onload = function (e) {
      loading = false;
      if (xhr.status <= 200 && xhr.status < 300) {
        var doc = e.target.response;
        var god = doc.querySelector('#main-inner .entry-inner');
        document.write('<div id="RAD"></div>');
        var rad = document.querySelector('#RAD').parentNode.parentNode.parentNode;
        if (!god || god.parentNode.className.match('no-entry')) {
          goRad();
          return;
        }
        rad.querySelector('.entry-header .date').innerHTML = god.querySelector('.entry-header .date').innerHTML;
        rad.querySelector('.entry-header .entry-title').innerHTML = god.querySelector('.entry-header .entry-title').innerHTML;
        var card = document.createElement('iframe');
        card.setAttribute('style', 'width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;');
        card.setAttribute('title', doc.title);
        card.setAttribute('src', rad.querySelector('.entry-header .entry-title a').href.replace('entry', 'embed'));
        card.setAttribute('frameborder', '0');
        card.setAttribute('scrolling', 'no');
        // rad.querySelector('.entry-header').insertBefore(card);
        rad.parentNode.insertBefore(card, rad.nextSibling);
        rad.querySelector('.entry-content').innerHTML = god.querySelector('.entry-content').innerHTML;
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
    xhr.send(null);
  };
  goRad();
}());
