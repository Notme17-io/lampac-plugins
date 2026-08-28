(function () {
  'use strict';

  if (window.nova_torrent_skin) return;
  window.nova_torrent_skin = true;

  var ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4" stroke-linecap="round"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'
  };

  function addCSS() {
    if (document.getElementById('nova-torrent-skin-css')) return;
    var css = 
      'body.nova-torrent-scope .explorer__left{display:none!important}\n' +
      'body.nova-torrent-scope .explorer__files{width:100%!important;left:0!important;padding:1.2em 2em!important}\n' +
      'body.nova-torrent-scope .explorer__files-head{display:none!important}\n' +
      
      /* Верхний баннер Hero (полное описание без обрезки) */
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
      '.nova-t-hero__descr{font-size:1.05em;line-height:1.45;color:#fff;opacity:.75;max-height:none!important;overflow:visible!important;display:block!important;text-shadow:0 .06em .5em rgba(0,0,0,.8)}\n' +
      
      /* Селекторы под баннером */
      '.nova-t-toolbar{display:flex;align-items:center;gap:.7em;margin-bottom:1.2em;flex-wrap:wrap}\n' +
      '.nova-t-toolbar__label{font-size:.95em;letter-spacing:.12em;text-transform:uppercase;opacity:.45;margin:0 .3em 0 0;color:#fff}\n' +
      '.nova-t-chip{display:inline-flex;align-items:center;gap:.5em;padding:.45em 1.1em;border-radius:2em;background:rgba(255,255,255,0.07);color:#fff;font-size:1.05em;cursor:pointer;white-space:nowrap}\n' +
      '.nova-t-chip.focus{background:#fff!important;color:#000!important}\n' +
      '.nova-t-chip svg{width:1em!important;height:1em!important;opacity:.7}\n' +
      
      /* Карточка торрента */
      'body.nova-torrent-scope .torrent-item{position:relative!important;padding:0!important;border-radius:.9em!important;background:rgba(255,255,255,0.05)!important;margin-bottom:.8em!important;border:none!important;overflow:hidden!important;display:block!important;box-shadow:none!important}\n' +
      'body.nova-torrent-scope .torrent-item.focus{background:rgba(255,255,255,0.14)!important;box-shadow:inset 0 0 0 2px #fff!important}\n' +
      'body.nova-torrent-scope .nova-t-item-wrap{display:flex;align-items:stretch;width:100%}\n' +
      
      /* Баннер раздачи (на всю высоту блока, фиксированная ширина) */
      'body.nova-torrent-scope .nova-t-thumb{position:relative;width:6em;min-width:6em;align-self:stretch;flex-shrink:0;background:rgba(0,0,0,0.35);overflow:hidden}\n' +
      'body.nova-torrent-scope .nova-t-thumb img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .3s}\n' +
      'body.nova-torrent-scope .nova-t-thumb--loaded img{opacity:1}\n' +
      
      /* Плашка Сезон/Серии (в правом верхнем углу постера) */
      'body.nova-torrent-scope .nova-t-thumb__overlay{position:absolute!important;top:0.35em!important;right:0.35em!important;bottom:auto!important;left:auto!important;display:flex;flex-direction:column;align-items:flex-end;gap:0.1em;background:rgba(10,11,17,0.85);border:1px solid rgba(255,255,255,0.2);padding:0.15em 0.35em;border-radius:0.3em;line-height:1.15;backdrop-filter:blur(4px);z-index:3;text-align:right}\n' +
      'body.nova-torrent-scope .nova-t-thumb__s{font-size:0.68em;font-weight:700;color:#fff;white-space:nowrap}\n' +
      'body.nova-torrent-scope .nova-t-thumb__e{font-size:0.62em;font-weight:600;color:rgba(255,255,255,0.85);white-space:nowrap}\n' +
      
      /* Контентная часть раздачи */
      'body.nova-torrent-scope .nova-t-item-main{flex-grow:1;padding:0.7em 1.1em;min-width:0;display:flex;flex-direction:column;justify-content:center}\n' +
      'body.nova-torrent-scope .torrent-item__title{font-size:1.1em!important;font-weight:600!important;line-height:1.4!important;margin-bottom:.4em!important;word-break:break-word!important;white-space:normal!important;color:#fff!important;height:auto!important;max-height:none!important;overflow:visible!important}\n' +
      'body.nova-torrent-scope .torrent-item__details{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:.35em!important;margin-bottom:.4em!important}\n' +
      
      /* Уменьшенный блок Сезон / Серии */
      'body.nova-torrent-scope .torrent-serial{display:inline-flex!important;align-items:stretch!important;border-radius:0.3em!important;overflow:hidden!important;margin-right:0.35em!important;line-height:1!important}\n' +
      'body.nova-torrent-scope .torrent-serial__season{font-size:0.78em!important;font-weight:700!important;padding:0.3em 0.45em!important;background:rgba(255,255,255,0.2)!important;color:#fff!important}\n' +
      'body.nova-torrent-scope .torrent-serial__episode{font-size:0.78em!important;font-weight:600!important;padding:0.3em 0.45em!important;background:rgba(0,0,0,0.4)!important;color:rgba(255,255,255,0.85)!important}\n' +
      
      'body.nova-torrent-scope .torrent-item__size{font-size:0.95em!important;font-weight:700!important;padding:.15em .45em!important;border-radius:.3em!important;background:rgba(255,255,255,0.12)!important;color:#fff!important;margin-left:auto!important}\n' +
      
      /* Нижняя инфо-строка */
      'body.nova-torrent-scope .nova-t-item-main > div:last-child{display:flex;align-items:center;flex-wrap:wrap;gap:1.1em;border-top:1px solid rgba(255,255,255,0.08);padding-top:.45em;margin-top:.25em;font-size:.85em;opacity:.8;color:#fff!important}\n' +
      'body.nova-torrent-scope .torrent-item.focus .nova-t-item-main > div:last-child{opacity:1;border-top-color:rgba(255,255,255,0.15)}\n' +
      'body.nova-torrent-scope .torrent-item__seeds, body.nova-torrent-scope .torrent-item__grabs, body.nova-torrent-scope .torrent-item__peers{color:#fff!important;font-weight:600!important}\n' +
      
      /* Индикатор просмотра в виде Play */
      'body.nova-torrent-scope .torrent-item__viewed, body.nova-torrent-scope .torrent-item > .viewed{position:absolute!important;top:0.35em!important;left:0.35em!important;z-index:4!important;background:rgba(0,0,0,0.65)!important;border-radius:50%!important;width:1.35em!important;height:1.35em!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;border:none!important}\n' +
      'body.nova-torrent-scope .torrent-item__viewed svg, body.nova-torrent-scope .torrent-item > .viewed svg{width:0.75em!important;height:0.75em!important;color:#fff!important;fill:currentColor!important;display:block!important}\n';

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

  function getPoster(movie) {
    if (!movie) return '';
    var path = movie.poster_path || movie.img || movie.poster || movie.backdrop_path || '';
    if (!path) return '';
    if (/^https?:/i.test(path)) return path;
    try { return Lampa.TMDB.image('t/p/w500' + path); } catch (e) { return ''; }
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

  function parseSerialData(titleText, item) {
    var sOld = item.find('.torrent-serial__season').text().replace(/[^\d]/g, '').trim();
    var eOld = item.find('.torrent-serial__episode').text().replace(/[^\d\-\~]/g, '').trim();

    var sMatch = titleText.match(/(?:сезон[:\s]*|season[:\s]*|\[s|\bs)(\d+)/i) || 
                 titleText.match(/\[(\d+)x/i) || 
                 titleText.match(/\b(\d+)\s*сезон/i);

    var eMatch = titleText.match(/(?:сери[ия][:\s]*|эпизод[ы]?[:\s]*|episode[s]?[:\s]*|ep[:\s]*|\[e|\be)([\d\-\~]+)/i) || 
                 titleText.match(/\[\d+x([\d\-\~]+)/i) || 
                 titleText.match(/\b(\d+[-–\~]\d+|\d+)\s+из\s+\d+/i);

    var season = sOld || (sMatch ? parseInt(sMatch[1], 10) : '');
    var episode = eOld || (eMatch ? eMatch[1].replace('–', '-') : '');

    return {
      season: season ? String(season) : '',
      episode: episode ? String(episode) : ''
    };
  }

  function modifyTorrents(explorer, movie) {
    var posterImg = getPoster(movie);

    explorer.find('.torrent-item:not([data-nova-mod])').each(function() {
      var item = $(this);
      item.attr('data-nova-mod', '1');
      
      var titleText = item.find('.torrent-item__title').text();
      var serial = parseSerialData(titleText, item);

      var wrap = $('<div class="nova-t-item-wrap"></div>');
      var thumb = $('<div class="nova-t-thumb"><img src="' + posterImg + '" alt=""></div>');
      var main = $('<div class="nova-t-item-main"></div>');
      
      var img = thumb.find('img')[0];
      if (img) {
        img.onload = function () { thumb.addClass('nova-t-thumb--loaded'); };
        if (img.complete) thumb.addClass('nova-t-thumb--loaded');
      }

      // Плашка сезона/серии в правом верхнем углу баннера
      if (serial.season || serial.episode) {
        var badge = $('<div class="nova-t-thumb__overlay"></div>');
        if (serial.season) badge.append('<span class="nova-t-thumb__s">Сезон ' + serial.season + '</span>');
        if (serial.episode) badge.append('<span class="nova-t-thumb__e">Сери' + (serial.episode.indexOf('-') !== -1 ? 'и ' : 'я ') + serial.episode + '</span>');
        thumb.append(badge);
      }

      // Замена точки просмотра на иконку Play
      var viewed = item.find('.torrent-item__viewed, .viewed');
      if (viewed.length) {
        viewed.html(ICON.play);
      }

      main.append(item.contents());
      wrap.append(thumb).append(main);
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

    var movie = getMovie();
    $('body').addClass('nova-torrent-scope');
    modifyTorrents(explorer, movie);

    var scrollBody = explorer.find('.explorer__files-body .scroll__body').first();
    if (!scrollBody.length) return;

    if (scrollBody.find('.nova-t-header-block').length) return;

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
