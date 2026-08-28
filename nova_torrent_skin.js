(function () {
  'use strict';

  if (window.nova_torrent_skin) return;
  window.nova_torrent_skin = true;

  function addCSS() {
    if (document.getElementById('nova-torrent-skin-css')) return;
    var css = 
      'body.nova-torrent-scope .explorer__left{display:none!important}\n' +
      'body.nova-torrent-scope .explorer__files{width:100%!important;left:0!important;padding:1.2em 2em!important}\n' +
      
      '.nova-t-hero{position:relative;overflow:hidden;border-radius:1.2em;margin-bottom:1.2em;background:rgba(255,255,255,0.06);min-height:9em}\n' +
      '.nova-t-hero__bg{position:absolute;top:0;left:0;right:0;bottom:0}\n' +
      '.nova-t-hero__bg img{display:block;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .35s}\n' +
      '.nova-t-hero__bg--loaded img{opacity:1}\n' +
      '.nova-t-hero__shade{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(90deg,rgba(10,11,17,0.96) 0%,rgba(10,11,17,0.75) 45%,rgba(10,11,17,0.25) 80%,rgba(10,11,17,0) 100%)}\n' +
      '.nova-t-hero__body{position:relative;padding:1.6em 2em;max-width:75%}\n' +
      '.nova-t-hero__title{font-size:2.2em;font-weight:700;line-height:1.15;margin-bottom:.3em;color:#fff;text-shadow:0 .06em .5em rgba(0,0,0,.8);min-height:2.4em;display:flex;align-items:center}\n' +
      '.nova-t-hero__logo{display:block;max-height:2.6em;max-width:80%;width:auto;height:auto;object-fit:contain;filter:drop-shadow(0 0.08em 0.35em rgba(0,0,0,0.75))}\n' +
      '.nova-t-hero__meta{display:flex;flex-wrap:wrap;align-items:center;gap:.8em;font-size:1.05em;margin-bottom:.5em;color:#fff;opacity:.85}\n' +
      '.nova-t-hero__genres{font-size:.95em;color:rgba(255,255,255,0.65);margin-bottom:.6em}\n' +
      '.nova-t-hero__descr{font-size:.95em;line-height:1.4;color:rgba(255,255,255,0.75);max-height:8em;overflow-y:auto}\n' +
      
      /* Стилизация оригинального тулбара (сохраняем иконки как есть в Lampa) */
      'body.nova-torrent-scope .explorer__files-head{display:flex!important;align-items:center!important;gap:.8em!important;margin-bottom:1.2em!important;flex-wrap:wrap!important;background:none!important;padding:0!important}\n' +
      'body.nova-torrent-scope .explorer__files-head .selector{display:inline-flex!important;align-items:center!important;gap:.6em!important;padding:.5em 1.1em!important;border-radius:2em!important;background:rgba(255,255,255,0.08)!important;color:#fff!important;font-size:1em!important;cursor:pointer!important;white-space:nowrap!important;border:none!important}\n' +
      'body.nova-torrent-scope .explorer__files-head .selector.focus{background:rgba(255,255,255,0.16)!important;box-shadow:inset 0 0 0 2px #fff!important;color:#fff!important}\n' +
      
      /* Карточки торрентов с мини-баннером слева */
      'body.nova-torrent-scope .torrent-item{display:block!important;position:relative!important;padding:1.1em 1.3em!important;padding-left:7.2em!important;border-radius:.9em!important;background:rgba(255,255,255,0.05)!important;margin-bottom:.8em!important;color:#fff!important;box-sizing:border-box!important;border:none!important}\n' +
      'body.nova-torrent-scope .torrent-item.focus{background:rgba(255,255,255,0.14)!important;box-shadow:inset 0 0 0 2px #fff!important;color:#fff!important}\n' +
      
      'body.nova-torrent-scope .torrent-item .nova-t-card__thumb{position:absolute!important;left:1.1em!important;top:1.1em!important;width:5.2em!important;height:5.2em!important;border-radius:.5em!important;overflow:hidden!important;background:rgba(0,0,0,0.45)!important}\n' +
      'body.nova-torrent-scope .torrent-item .nova-t-card__thumb img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:.75}\n' +
      'body.nova-torrent-scope .torrent-item .nova-t-card__num{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font-size:1.1em;font-weight:700;color:#fff;text-shadow:0 .05em .2em rgba(0,0,0,.9);z-index:2}\n' +
      'body.nova-torrent-scope .torrent-item .nova-t-card__num>span{display:inline-block;padding:.08em .35em;border-radius:.3em;background:rgba(10,11,17,0.65);box-shadow:0 .12em .45em rgba(0,0,0,.5)}\n' +
      
      'body.nova-torrent-scope .torrent-item__title{font-size:1.15em!important;font-weight:600!important;line-height:1.45!important;margin-bottom:.65em!important;word-break:break-word!important;white-space:normal!important;color:#fff!important;height:auto!important;max-height:none!important;overflow:visible!important}\n' +
      'body.nova-torrent-scope .torrent-item__details{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:.45em!important;margin-bottom:.7em!important}\n' +
      'body.nova-torrent-scope .torrent-item__footer{display:flex!important;align-items:center!important;justify-content:space-between!important;font-size:.92em!important;opacity:.8!important;border-top:1px solid rgba(255,255,255,0.08)!important;padding-top:.65em!important;margin-top:.35em!important}\n' +
      'body.nova-torrent-scope .torrent-item.focus .torrent-item__footer{opacity:0.95!important;border-top-color:rgba(255,255,255,0.15)!important}\n' +
      'body.nova-torrent-scope .torrent-item__size{font-size:1.05em!important;font-weight:700!important;padding:.2em .55em!important;border-radius:.35em!important;background:rgba(255,255,255,0.12)!important;line-height:1!important;color:#fff!important}\n' +
      'body.nova-torrent-scope .torrent-item__seeds, body.nova-torrent-scope .torrent-item__grabs{color:#fff!important;font-weight:600!important}\n' +
      'body.nova-torrent-scope .torrent-item__duplicate, body.nova-torrent-scope .torrent-item__info-extra{display:none!important}\n';

    var style = document.createElement('style');
    style.id = 'nova-torrent-skin-css';
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function getMovie() {
    try {
      var act = Lampa.Activity.active();
      return (act && (act.movie || act.card)) || null;
    } catch (e) {
      return null;
    }
  }

  function getBackdrop(movie) {
    if (!movie) return '';
    var path = movie.backdrop_path || movie.background_image || movie.img || movie.poster_path || '';
    if (!path) return '';
    if (/^https?:/i.test(path)) return path;
    try { return Lampa.TMDB.image('t/p/w1280' + path); } catch (e) { return ''; }
  }

  function parseSeasonEpisode(rawTitle) {
    var title = String(rawTitle || '');
    var sMatch = title.match(/\[(\d{1,2})x(\d{1,2}(?:-\d{1,2})?)\s*(?:из\s*\d+)?\]/i) ||
                 title.match(/сезон\s*[:\s]*(\d+).*?сери[ия]\s*[:\s]*(\d+(?:-\d+)?)/i);
    if (sMatch) {
      return 'S' + sMatch[1] + ' \u00b7 ' + sMatch[2];
    }
    var sOnly = title.match(/сезон\s*[:\s]*(\d+)/i) || title.match(/\bS(\d{1,2})\b/i);
    if (sOnly) {
      return 'Сезон ' + sOnly[1];
    }
    return '';
  }

  function fetchLogo(movie, callback) {
    if (!movie || !movie.id) return callback('');
    var type = (movie.name || movie.first_air_date || movie.number_of_seasons) ? 'tv' : 'movie';
    var tmdbKey = Lampa.Storage.get('tmdb_api_key', '4ef0d7355d9ffb5151e987764708ce96');
    var url = 'https://api.themoviedb.org/3/' + type + '/' + movie.id + '/images?api_key=' + tmdbKey + '&include_image_language=ru,en,null';

    var req = new Lampa.Reguest();
    req.timeout(5000);
    req.silent(url, function (data) {
        var logoPath = '';
        try {
            var logos = (data && data.logos) || [];
            if (logos.length) {
                var ruLogo = logos.find(function (l) { return l.iso_639_1 === 'ru'; });
                var enLogo = logos.find(function (l) { return l.iso_639_1 === 'en'; });
                var best = ruLogo || enLogo || logos[0];
                if (best && best.file_path) logoPath = 'https://image.tmdb.org/t/p/w500' + best.file_path;
            }
        } catch (e) {}
        callback(logoPath);
    }, function () {
        callback('');
    });
  }

  function buildHero(movie) {
    var bg = getBackdrop(movie);
    var title = (movie && (movie.title || movie.name)) || 'Торренты';
    var descr = (movie && movie.overview) || '';
    var year = (movie && (movie.release_date || movie.first_air_date || '')).substring(0, 4);
    var rate = (movie && movie.vote_average) ? '★ ' + parseFloat(movie.vote_average).toFixed(1) : '';
    
    var genres = '';
    if (movie && movie.genres && Array.isArray(movie.genres)) {
      genres = movie.genres.map(function(g){ return g.name; }).join(', ');
    }

    var hero = $('<div class="nova-t-hero">' +
      '<div class="nova-t-hero__bg"><img src="' + bg + '" alt=""></div>' +
      '<div class="nova-t-hero__shade"></div>' +
      '<div class="nova-t-hero__body">' +
      '<div class="nova-t-hero__title">' + title + '</div>' +
      '<div class="nova-t-hero__meta">' +
      (year ? '<div>' + year + '</div>' : '') +
      (rate ? '<div>' + rate + '</div>' : '') +
      '</div>' +
      (genres ? '<div class="nova-t-hero__genres">' + genres + '</div>' : '') +
      (descr ? '<div class="nova-t-hero__descr">' + descr + '</div>' : '') +
      '</div>' +
      '</div>');

    var img = hero.find('.nova-t-hero__bg img')[0];
    if (img) {
      img.onload = function () { hero.find('.nova-t-hero__bg').addClass('nova-t-hero__bg--loaded'); };
      if (img.complete) hero.find('.nova-t-hero__bg').addClass('nova-t-hero__bg--loaded');
    }

    fetchLogo(movie, function (logoUrl) {
      if (logoUrl) {
        hero.find('.nova-t-hero__title').html('<img src="' + logoUrl + '" class="nova-t-hero__logo" alt="">');
      }
    });

    return hero;
  }

  function renderNovaTorrents() {
    var act = Lampa.Activity.active();
    if (!act || !act.activity) return;
    var render = act.activity.render();
    if (!render || !render.length) return;

    var explorer = render.hasClass('explorer') ? render : render.find('.explorer');
    if (!explorer.length) return;

    var torrentItems = explorer.find('.torrent-item');
    if (!torrentItems.length) return;

    $('body').addClass('nova-torrent-scope');
    var scrollBody = explorer.find('.explorer__files-body .scroll__body').first();
    if (!scrollBody.length) return;

    if (scrollBody.find('.nova-t-root').length) return;

    var movie = getMovie();
    var thumbBg = getBackdrop(movie);
    var root = $('<div class="nova-t-root"></div>');

    var hero = buildHero(movie);
    root.append(hero);

    var idx = 1;
    torrentItems.each(function () {
      var item = $(this);
      if (item.find('.nova-t-card__thumb').length) return;

      var rawTitle = item.find('.torrent-item__title').text().trim();
      var seasonStr = parseSeasonEpisode(rawTitle);
      var badgeNum = seasonStr || (idx < 10 ? '0' + idx : '' + idx);

      var thumb = $('<div class="nova-t-card__thumb">' +
        '<img src="' + thumbBg + '" alt="">' +
        '<div class="nova-t-card__num"><span>' + badgeNum + '</span></div>' +
        '</div>');

      item.prepend(thumb);
      idx++;
    });

    scrollBody.prepend(root);

    try {
      Lampa.Controller.collectionSet(scrollBody[0]);
    } catch (e) {}
  }

  function init() {
    addCSS();

    Lampa.Listener.follow('activity', function (e) {
      if (e.type === 'start' || e.type === 'archive') {
        setTimeout(renderNovaTorrents, 100);
        setTimeout(renderNovaTorrents, 500);
      }
      if (e.type === 'destroy') {
        $('body').removeClass('nova-torrent-scope');
      }
    });

    setInterval(function () {
      var act = Lampa.Activity.active();
      if (act && act.component === 'torrents') {
        renderNovaTorrents();
      }
    }, 400);
  }

  if (window.appready) init();
  else {
    try {
      Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') init();
      });
    } catch (e) {}
  }
})();
