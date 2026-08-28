(function () {
  'use strict';

  if (window.nova_torrent_skin) return;
  window.nova_torrent_skin = true;

  var ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4" stroke-linecap="round"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function addCSS() {
    if (document.getElementById('nova-torrent-skin-css')) return;
    var css = 
      'body.nova-torrent-scope .explorer__left{display:none!important}\n' +
      'body.nova-torrent-scope .explorer__files{width:100%!important;left:0!important;padding:1.2em 2em!important}\n' +
      'body.nova-torrent-scope .explorer__files-head{display:none!important}\n' +
      
      /* Верхний баннер в стиле Nova Skin */
      '.nova-t-hero{position:relative;overflow:hidden;border-radius:1.2em;margin-bottom:1.5em;background:rgba(255,255,255,0.06);min-height:12em}\n' +
      '.nova-t-hero__bg{position:absolute;top:0;left:0;right:0;bottom:0}\n' +
      '.nova-t-hero__bg img{display:block;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .35s}\n' +
      '.nova-t-hero__bg--loaded img{opacity:1}\n' +
      '.nova-t-hero__shade{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(90deg,rgba(10,11,17,0.95) 0%,rgba(10,11,17,0.7) 38%,rgba(10,11,17,0.2) 65%,rgba(10,11,17,0) 85%)}\n' +
      '.nova-t-hero__body{position:relative;padding:2.2em;max-width:72%}\n' +
      '.nova-t-hero__title{font-size:2.3em;font-weight:600;line-height:1.15;margin-bottom:.35em;color:#fff;text-shadow:0 .06em .5em rgba(0,0,0,.8);min-height:2.3em;display:flex;align-items:flex-end}\n' +
      '.nova-t-hero__logo{display:block;max-height:2.1em;max-width:70%;width:auto;height:auto;object-fit:contain;filter:drop-shadow(0 0.04em 0.12em rgba(0,0,0,0.55))}\n' +
      '.nova-t-hero__meta{display:flex;flex-wrap:wrap;align-items:center;font-size:1.1em;margin-bottom:.7em;color:#fff;text-shadow:0 .06em .5em rgba(0,0,0,.8)}\n' +
      '.nova-t-hero__meta > *{margin:0 .7em .3em 0;opacity:.8}\n' +
      '.nova-t-hero__descr{font-size:1.05em;line-height:1.45;color:#fff;opacity:.75;max-height:2.9em;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;text-shadow:0 .06em .5em rgba(0,0,0,.8)}\n' +
      
      /* Панель фильтров (Селекторы) */
      '.nova-t-toolbar{display:flex;align-items:center;gap:.7em;margin-bottom:1.2em;flex-wrap:wrap}\n' +
      '.nova-t-toolbar__label{font-size:.95em;letter-spacing:.12em;text-transform:uppercase;opacity:.45;margin:0 .3em 0 0;color:#fff}\n' +
      '.nova-t-chip{display:inline-flex;align-items:center;gap:.5em;padding:.45em 1.1em;border-radius:2em;background:rgba(255,255,255,0.07);color:#fff;font-size:1.05em;cursor:pointer;white-space:nowrap;transition:all .2s}\n' +
      '.nova-t-chip.focus{background:#fff!important;color:#000!important}\n' +
      '.nova-t-chip svg{width:1em!important;height:1em!important;opacity:.7}\n' +
      
      /* Модифицированная карточка торрента (всё содержимое сохранено) */
      'body.nova-torrent-scope .torrent-item{padding:0!important;border-radius:.9em!important;background:rgba(255,255,255,0.05)!important;margin-bottom:.8em!important;border:none!important;overflow:hidden!important;display:block!important;box-shadow:none!important}\n' +
      'body.nova-torrent-scope .torrent-item.focus{background:rgba(255,255,255,0.14)!important;box-shadow:inset 0 0 0 2px #fff!important}\n' +
      'body.nova-torrent-scope .nova-t-item-wrap{display:flex;align-items:stretch;width:100%}\n' +
      
      /* Левый баннер Серия/Сезон */
      'body.nova-torrent-scope .nova-t-item-left{display:flex;flex-direction:column;justify-content:center;align-items:center;background:rgba(0,0,0,0.3);min-width:5em;padding:.5em;border-right:1px solid rgba(255,255,255,0.05);flex-shrink:0}\n' +
      'body.nova-torrent-scope .nova-t-badge-s{font-size:1.3em;font-weight:700;color:#fff;line-height:1;background:rgba(255,255,255,0.15);padding:.2em .4em;border-radius:.3em;margin-bottom:.3em}\n' +
      'body.nova-torrent-scope .nova-t-badge-e{font-size:1.05em;font-weight:600;color:rgba(255,255,255,0.8)}\n' +
      'body.nova-torrent-scope .nova-t-badge-icon svg{width:1.8em;height:1.8em;opacity:.4;color:#fff}\n' +
      
      /* Основной контент торрента */
      'body.nova-torrent-scope .nova-t-item-main{flex-grow:1;padding:1.1em 1.3em;min-width:0;display:flex;flex-direction:column}\n' +
      'body.nova-torrent-scope .torrent-item__title{font-size:1.15em!important;font-weight:600!important;line-height:1.45!important;margin-bottom:.65em!important;word-break:break-word!important;white-space:normal!important;color:#fff!important;height:auto!important;max-height:none!important;overflow:visible!important}\n' +
      'body.nova-torrent-scope .torrent-item__details{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:.45em!important;margin-bottom:.7em!important}\n' +
      'body.nova-torrent-scope .torrent-item__size{font-size:1.05em!important;font-weight:700!important;padding:.2em .55em!important;border-radius:.35em!important;background:rgba(255,255,255,0.12)!important;color:#fff!important;margin-left:auto!important}\n' +
      
      /* Строгая сетка для подвала (Пиры, Сиды, Дата, Трекер) */
      'body.nova-torrent-scope .nova-t-item-main > div:last-child{display:flex;align-items:center;flex-wrap:wrap;gap:1.2em;border-top:1px solid rgba(255,255,255,0.08);padding-top:.6em;margin-top:.4em;font-size:.9em;opacity:.8;color:#fff!important}\n' +
      'body.nova-torrent-scope .torrent-item.focus .nova-t-item-main > div:last-child{opacity:1;border-top-color:rgba(255,255,255,0.15)}\n' +
      'body.nova-torrent-scope .torrent-item__seeds, body.nova-torrent-scope .torrent-item__grabs, body.nova-torrent-scope .torrent-item__peers{color:#fff!important;font-weight:600!important}\n';

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
    }, function () { callback(''); });
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
      (genres ? '<div>' + genres + '</div>' : '') +
      '</div>' +
      (descr ? '<div class="nova-t-hero__descr">' + descr + '</div>' : '') +
      '</div>' +
      '</div>');

    var img = hero.find('.nova-t-hero__bg img')[0];
    if (img) {
      img.onload = function () { hero.find('.nova-t-hero__bg').addClass('nova-t-hero__bg--loaded'); };
      if (img.complete) hero.find('.nova-t-hero__bg').addClass('nova-t-hero__bg--loaded');
    }

    fetchLogo(movie, function (logoUrl) {
      if (logoUrl) hero.find('.nova-t-hero__title').html('<img src="' + logoUrl + '" class="nova-t-hero__logo" alt="">');
    });

    return hero;
  }

  /* Извлечение S/E и перенос в левый бадж без потери контента */
  function modifyTorrents(explorer) {
    explorer.find('.torrent-item:not([data-nova-mod])').each(function() {
      var item = $(this);
      item.attr('data-nova-mod', '1');
      
      var titleText = item.find('.torrent-item__title').text();
      
      var sMatch = titleText.match(/(?:сезон|season|s)\s*(\d+)/i) || titleText.match(/\[[Ss](\d+)\]/);
      var eMatch = titleText.match(/(?:сери[ия]|episode|ep|e)\s*([\d\-\~]+)/i) || titleText.match(/\[[Ee]([\d\-\~]+)\]/);
      
      var season = sMatch ? sMatch[1] : '';
      var episode = eMatch ? eMatch[1] : '';
      
      var wrap = $('<div class="nova-t-item-wrap"></div>');
      var left = $('<div class="nova-t-item-left"></div>');
      var main = $('<div class="nova-t-item-main"></div>');
      
      if (season || episode) {
        if (season) left.append('<div class="nova-t-badge-s">S' + season + '</div>');
        if (episode) left.append('<div class="nova-t-badge-e">' + episode + '</div>');
      } else {
        left.append('<div class="nova-t-badge-icon">' + ICON.download + '</div>');
      }
      
      main.append(item.contents());
      wrap.append(left).append(main);
      item.append(wrap);
    });
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
    modifyTorrents(explorer);

    var scrollBody = explorer.find('.explorer__files-body .scroll__body').first();
    if (!scrollBody.length) return;

    if (scrollBody.find('.nova-t-header-block').length) return;

    var movie = getMovie();
    var headerBlock = $('<div class="nova-t-header-block"></div>');
    var hero = buildHero(movie);
    headerBlock.append(hero);

    var origHead = explorer.find('.explorer__files-head');
    var toolbar = $('<div class="nova-t-toolbar"></div>');

    // Кнопка поиска
    var searchBtn = origHead.find('.filter--search, .filter--filter_search, .torrent-filter--search').first();
    if (searchBtn.length) {
      var sText = searchBtn.find('div:not(.hide)').last().text().trim() || searchBtn.text().trim() || (movie && (movie.title || movie.name)) || 'Поиск';
      toolbar.append('<div class="nova-t-toolbar__label">Поиск</div>');
      var sChip = $('<div class="nova-t-chip selector"><span>' + sText + '</span>' + ICON.search + '</div>');
      sChip.on('hover:enter', function () { searchBtn.trigger('hover:enter'); });
      toolbar.append(sChip);
    }

    // Кнопка сортировки
    var sortBtn = origHead.find('.filter--sort').first();
    if (sortBtn.length) {
      var sortVal = sortBtn.find('div:not(.hide)').last().text().trim() || sortBtn.text().replace('Сортировать', '').replace(':', '').trim();
      toolbar.append('<div class="nova-t-toolbar__label">Сортировка</div>');
      var sortChip = $('<div class="nova-t-chip selector"><span>' + (sortVal || 'По умолчанию') + '</span>' + ICON.chevron + '</div>');
      sortChip.on('hover:enter', function () { sortBtn.trigger('hover:enter'); });
      toolbar.append(sortChip);
    }

    // Кнопка фильтра
    var filterBtn = origHead.find('.filter--filter').first();
    if (filterBtn.length) {
      var filterVal = filterBtn.find('div:not(.hide)').last().text().trim() || filterBtn.text().replace('Фильтр', '').replace(':', '').trim();
      toolbar.append('<div class="nova-t-toolbar__label">Фильтр</div>');
      var filterChip = $('<div class="nova-t-chip selector"><span>' + (filterVal || 'Качество') + '</span>' + ICON.chevron + '</div>');
      filterChip.on('hover:enter', function () { filterBtn.trigger('hover:enter'); });
      toolbar.append(filterChip);
    }

    if (toolbar.children().length) headerBlock.append(toolbar);
    scrollBody.prepend(headerBlock);

    try { Lampa.Controller.collectionSet(scrollBody[0]); } catch (e) {}
  }

  function init() {
    addCSS();

    Lampa.Listener.follow('activity', function (e) {
      if (e.type === 'start' || e.type === 'archive') {
        setTimeout(renderNovaTorrents, 100);
        setTimeout(renderNovaTorrents, 400);
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
