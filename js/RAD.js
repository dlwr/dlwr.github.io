(function(){
  var loading = false;
  var first = true;
  document.write('<div id="RAD"></div>');
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
        var rad = document.querySelector('#RAD').parentNode.parentNode.parentNode;
        if (!god || god.parentNode.className.match('no-entry')) {
          goRad();
          return;
        }
        rad.querySelector('.entry-header .date').innerHTML = god.querySelector('.entry-header .date').innerHTML;
        rad.querySelector('.entry-header .entry-title').innerHTML = god.querySelector('.entry-header .entry-title').innerHTML;
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
