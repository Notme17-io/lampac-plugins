(function () {
  'use strict';

  if (window.nova_torrent_skin) return;
  window.nova_torrent_skin = true;

  var ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4" stroke-linecap="round"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="2.2"/><polygon points="9.5,7.5 16.5,12 9.5,16.5" fill="#fff"/></svg>'
  };

  var cachedLogoUrl = '';

  function addCSS() {
    if (document.getElementById('nova-torrent-skin-css')) return;
    var css = 
      /* Скрытие стандартных блоков проводника */
      'body.nova-torrent-scope .explorer__left{display:none!important}\n' +
      'body.nova-torrent-scope .explorer__files{width:100%!important;left:0!important;padding:1.2em 2em!important}\n' +
      'body.nova-torrent-scope .explorer__files-head{display:none!important}\n' +
      
      /* Полное скрытие верхней строки истории */
      'body.nova-torrent-scope .explorer__history,\n' +
      'body.nova-torrent-scope .torrent-history,\n' +
      'body.nova-torrent-scope [class*="history"]{\n' +
      '  display:none!important;\n' +
      '}\n' +
      
      /* Полное удаление дублирующих нативных меток сезона/серий снизу и в деталях */
      'body.nova-torrent-scope .torrent-item .torrent-serial,\n' +
      'body.nova-torrent-scope .torrent-item .torrent-item__serial,\n' +
      'body.nova-torrent-scope .torrent-item [class*="serial"],\n' +
      'body.nova-torrent-scope .torrent-item .torrent-item__season,\n' +
      'body.nova-torrent-scope .torrent-item .torrent-item__episode{\n' +
      '  display:none!important;\n' +
      '}\n' +
      
      /* Верхний главный Hero-баннер */
      '.nova-t-hero{position:relative;overflow:hidden;border-radius:1.2em;margin-bottom:1.5em;background:rgba(255,255,255,0.06);min-height:12em}\n' +
      '.nova-t-hero__bg{position:absolute;top:0;left:0;right:0;bottom:0}\n' +
      '.nova-t-hero__bg img{display:block;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .35s}\n' +
      '.nova-t-hero__bg--loaded img{opacity:1}\n' +
      '.nova-t-hero__shade{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(90deg,rgba(10,11,17,0.95) 0%,rgba(10,11,17,0.7) 38%,rgba(10,11,17,0.2) 65%,rgba(10,11,17,0) 85%)}\n' +
      '.nova-t-hero__body{position:relative;padding:2.2em;max-width:72%}\n' +
      '.nova-t-hero__title{font-size:2.3em;font-weight:700;letter-spacing:2px;text-transform:uppercase;line-height:1.15;margin-bottom:.35em;color:#fff;text-shadow:0 .06em .5em rgba(0,0,0,.8);min-height:2.3em;display:flex;align-items:flex-end}\n' +
      '.nova-t-hero__logo{display:block;max-height:2.1em;max-width:70%;width:auto;height:auto;object-fit:contain;filter:drop-shadow(0 0.04em 0.12em rgba(0,0,0,0.55))}\n' +
      '.nova-t-hero__meta{display:flex;flex-wrap:wrap;align-items:center;font-size:1.1em;margin-bottom:.7em;color:#fff;text-shadow:0 .06em .5em rgba(0,0,0,.8)}\n' +
      '.nova-t-hero__meta > *{margin:0 .7em .3em 0;opacity:.8}\n' +
      '.nova-t-hero__descr{font-size:1.05em!important;line-height:1.45!important;color:#fff!important;opacity:.75!important;max-height:none!important;height:auto!important;overflow:visible!important;display:block!important;white-space:normal!important;-webkit-line-clamp:unset!important;text-shadow:0 .06em .5em rgba(0,0,0,.8)!important}\n' +
      
      /* Панель селекторов */
      '.nova-t-toolbar{display:flex;align-items:center;gap:.7em;margin-bottom:1.2em;flex-wrap:wrap}\n' +
      '.nova-t-toolbar__label{font-size:.95em;letter-spacing:.12em;text-transform:uppercase;opacity:.45;margin:0 .3em 0 0;color:#fff}\n' +
      '.nova-t-chip{display:inline-flex;align-items:center;gap:.5em;padding:.45em 1.1em;border-radius:2em;background:rgba(255,255,255,0.07);color:#fff;font-size:1.05em;cursor:pointer;white-space:nowrap}\n' +
      '.nova-t-chip.focus{background:#fff!important;color:#000!important}\n' +
      '.nova-t-chip svg{width:1em!important;height:1em!important;opacity:.7}\n' +
      
      /* Карточка раздачи */
      'body.nova-torrent-scope .torrent-item{position:relative!important;display:flex!important;flex-direction:row!important;align-items:stretch!important;height:auto!important;min-height:92px!important;max-height:none!important;padding:0!important;border-radius:.9em!important;background:rgba(255,255,255,0.05)!important;margin-bottom:.8em!important;border:none!important;overflow:hidden!important;box-shadow:none!important;box-sizing:border-box!important}\n' +
      'body.nova-torrent-scope .torrent-item.focus{background:rgba(255,255,255,0.14)!important;box-shadow:inset 0 0 0 2px #fff!important}\n' +
      
      /* Левый баннер-превью */
      'body.nova-torrent-scope .torrent-item .nova-t-thumb{position:relative!important;width:155px!important;min-width:155px!important;max-width:155px!important;min-height:92px!important;align-self:stretch!important;flex-shrink:0!important;background:rgba(0,0,0,0.45)!important;overflow:hidden!important;border-radius:.9em 0 0 .9em!important}\n' +
      'body.nova-torrent-scope .torrent-item .nova-t-thumb img.nova-t-thumb__img{position:absolute!important;top:0!important;left:0!important;width:100%!important;height:100%!important;object-fit:cover!important;opacity:0;transition:opacity .3s}\n' +
      'body.nova-torrent-scope .torrent-item .nova-t-thumb--loaded img.nova-t-thumb__img{opacity:1!important}\n' +
      'body.nova-torrent-scope .torrent-item .nova-t-thumb__shade{position:absolute!important;top:0;left:0;right:0;bottom:0;background:linear-gradient(180deg,rgba(0,0,0,0.2) 0%,transparent 40%,rgba(0,0,0,0.88) 100%)!important;z-index:1!important}\n' +
      
      /* Логотип / Название на баннере строго по центру */
      'body.nova-torrent-scope .torrent-item .nova-t-thumb__title-box{position:absolute!important;bottom:7px!important;left:6px!important;right:6px!important;display:flex!important;align-items:flex-end!important;justify-content:center!important;z-index:2!important;height:24px!important;overflow:hidden!important;text-align:center!important}\n' +
      'body.nova-torrent-scope .torrent-item .nova-t-thumb__logo{display:block!important;max-height:22px!important;max-width:92%!important;width:auto!important;height:auto!important;object-fit:contain!important;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.95))!important;margin:0 auto!important}\n' +
      'body.nova-torrent-scope .torrent-item .nova-t-thumb__text-title{font-size:11px!important;font-weight:800!important;letter-spacing:1.2px!important;text-transform:uppercase!important;color:#fff!important;text-shadow:0 1px 4px rgba(0,0,0,0.95),0 0 6px rgba(0,0,0,0.95)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;line-height:1.2!important;text-align:center!important;width:100%!important}\n' +
      
      /* Плашка Сезон/Серии в правом верхнем углу */
      'body.nova-torrent-scope .torrent-item .nova-t-thumb__overlay{position:absolute!important;top:3px!important;right:3px!important;display:flex!important;flex-direction:column!important;align-items:flex-end!important;gap:2px!important;background:rgba(10,11,17,0.55)!important;border:1px solid rgba(255,255,255,0.25)!important;padding:4px 8px!important;border-radius:4px!important;line-height:1.15!important;backdrop-filter:blur(6px)!important;z-index:3!important;text-align:right!important;box-shadow:0 2px 6px rgba(0,0,0,0.45)!important}\n' +
      'body.nova-torrent-scope .torrent-item .nova-t-thumb__s{font-size:12px!important;font-weight:800!important;color:#fff!important;white-space:nowrap!important;letter-spacing:0.3px!important}\n' +
      'body.nova-torrent-scope .torrent-item .nova-t-thumb__e{font-size:11px!important;font-weight:700!important;color:rgba(255,255,255,0.92)!important;white-space:nowrap!important}\n' +
      
      /* Индикатор просмотра */
      'body.nova-torrent-scope .torrent-item .nova-t-thumb .viewed-indicator{position:absolute!important;top:4px!important;left:4px!important;z-index:4!important;width:22px!important;height:22px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:rgba(0,0,0,0.5)!important;border-radius:50%!important;box-shadow:0 0.12em 0.35em rgba(0,0,0,0.45)!important;backdrop-filter:blur(5px)!important;padding:0!important;border:none!important}\n' +
      'body.nova-torrent-scope .torrent-item .nova-t-thumb .viewed-indicator svg{width:100%!important;height:100%!important;display:block!important}\n' +
      
      /* Основной блок информации раздачи */
      'body.nova-torrent-scope .torrent-item .nova-t-item-main{flex:1 1 auto!important;min-width:0!important;min-height:92px!important;padding:10px 14px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important;box-sizing:border-box!important;height:auto!important;gap:4px!important}\n' +
      'body.nova-torrent-scope .torrent-item .torrent-item__title{font-size:1.05em!important;font-weight:600!important;line-height:1.35!important;margin:0!important;word-break:break-word!important;white-space:normal!important;color:#fff!important;height:auto!important;max-height:none!important}\n' +
      'body.nova-torrent-scope .torrent-item .torrent-item__details{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:6px!important;margin:0!important;min-height:22px!important;height:auto!important}\n' +
      
      'body.nova-torrent-scope .torrent-item .torrent-item__size{font-size:0.92em!important;font-weight:700!important;padding:2px 6px!important;border-radius:4px!important;background:rgba(255,255,255,0.12)!important;color:#fff!important;margin-left:auto!important;flex-shrink:0!important}\n' +
      
      /* Нижняя инфо-строка */
      'body.nova-torrent-scope .torrent-item .nova-t-item-main > div:last-child{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:14px!important;border-top:1px solid rgba(255,255,255,0.08)!important;padding-top:6px!important;margin:0!important;font-size:0.82em!important;opacity:0.8!important;color:#fff!important;height:auto!important}\n' +
      'body.nova-torrent-scope .torrent-item.focus .nova-t-item-main > div:last-child{opacity:1!important;border-top-color:rgba(255,255,255,0.15)!important}\n' +
      'body.nova-torrent-scope .torrent-item .torrent-item__seeds, body.nova-torrent-scope .torrent-item .torrent-item__grabs, body.nova-torrent-scope .torrent-item .torrent-item__peers{color:#fff!important;font-weight:600!important}\n';

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
    if (cachedLogoUrl) return callback(cachedLogoUrl);

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
        cachedLogoUrl = logoPath;
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

  function cleanEpisodeStr(val) {
    if (!val) return '';
    var parts = String(val).replace(/–|~/g, '-').split('-');
    return parts.map(function (p) {
      var n = parseInt(p.trim(), 10);
      return isNaN(n) ? p.trim() : String(n);
    }).filter(Boolean).join('-');
  }

  function parseSerialData(titleText, isTV) {
    var season = '';
    var episode = '';

    /* 1. Поиск формата [01x01-04] или [1x4] или [01x04 из 10] */
    var xMatch = titleText.match(/\[(\d+)[xх]([\d\-–~]+)/i);
    if (xMatch) {
      season = String(parseInt(xMatch[1], 10));
      episode = cleanEpisodeStr(xMatch[2]);
    }

    /* 2. Поиск по явным фразам вида "(1 сезон: 1-10 серии" или "1 сезон" */
    if (!season) {
      var sMatch = titleText.match(/(\d+)\s*сезон/i) ||
                   titleText.match(/(?:сезон[:\s]*|season[:\s]*|\[s|\bs)(\d+)/i);
      if (sMatch) {
        season = String(parseInt(sMatch[1], 10));
      }
    }

    /* 3. Поиск серий по фразам "1-10 серии", "серии 1-10", "1-10 из 10" */
    if (!episode) {
      var eMatch = titleText.match(/([\d\-–~]+)\s*сери[ия]/i) ||
                   titleText.match(/(?:сери[ия][:\s]*|эпизод[ы]?[:\s]*|episode[s]?[:\s]*|ep[:\s]*|\[e|\be)([\d\-–~\s]+)/i) ||
                   titleText.match(/([\d\-–~]+)\s+из\s+\d+/i);
      if (eMatch) {
        episode = cleanEpisodeStr(eMatch[1]);
      }
    }

    /* 4. Фолбэк: если это сериал, но сезон не распознался - считаем 1 сезоном */
    if (!season && isTV && episode) {
      season = '1';
    }

    return {
      season: season || '',
      episode: episode || ''
    };
  }

  function normalizeQualityTags(item) {
    item.find('.torrent-item__details > *').each(function() {
      var el = $(this);
      if (el.hasClass('torrent-item__size')) return;
      var text = el.text().trim();
      if (/^fhd$/i.test(text)) {
        el.text('1080p');
      } else if (/^hd$/i.test(text)) {
        el.text('720p');
      }
    });
  }

  function modifyTorrents(explorer, movie) {
    var backdropImg = getBackdrop(movie);
    var movieTitle = (movie && (movie.title || movie.name)) || '';
    var isTV = movie ? !!(movie.name || movie.first_air_date || movie.number_of_seasons > 0 || (movie.type === 'tv')) : false;

    explorer.find('.torrent-item:not([data-nova-mod])').each(function() {
      var item = $(this);
      item.attr('data-nova-mod', '1');
      
      var titleText = item.find('.torrent-item__title').text();
      var serial = parseSerialData(titleText, isTV);

      var viewedNative = item.find('.torrent-item__viewed, .viewed');
      var isViewed = viewedNative.length > 0;
      if (isViewed) viewedNative.remove();

      /* Удаляем абсолютно все дублирующие стандартные метки серий/сезонов */
      item.find('.torrent-serial, .torrent-item__serial, [class*="serial"], .torrent-item__season, .torrent-item__episode').remove();

      var thumb = $('<div class="nova-t-thumb">' +
        '<img class="nova-t-thumb__img" src="' + backdropImg + '" alt="">' +
        '<div class="nova-t-thumb__shade"></div>' +
        '<div class="nova-t-thumb__title-box">' +
          '<span class="nova-t-thumb__text-title">' + movieTitle + '</span>' +
        '</div>' +
      '</div>');
      var main = $('<div class="nova-t-item-main"></div>');
      
      var img = thumb.find('img.nova-t-thumb__img')[0];
      if (img) {
        img.onload = function () { thumb.addClass('nova-t-thumb--loaded'); };
        if (img.complete) thumb.addClass('nova-t-thumb--loaded');
      }

      fetchLogo(movie, function (logoUrl) {
        if (logoUrl) {
          var titleBox = thumb.find('.nova-t-thumb__title-box');
          var logoImg = $('<img class="nova-t-thumb__logo" src="' + logoUrl + '" alt="">');
          logoImg.on('load', function() {
            titleBox.empty().append(logoImg);
          });
        }
      });

      /* Плашка на постере: Сезон X / Серии Y-Z */
      if (serial.season || serial.episode) {
        var badge = $('<div class="nova-t-thumb__overlay"></div>');
        if (serial.season) badge.append('<span class="nova-t-thumb__s">Сезон ' + serial.season + '</span>');
        if (serial.episode) badge.append('<span class="nova-t-thumb__e">Сери' + (serial.episode.indexOf('-') !== -1 ? 'и ' : 'я ') + serial.episode + '</span>');
        thumb.append(badge);
      }

      /* Индикатор просмотра */
      if (isViewed) {
        thumb.append('<div class="viewed-indicator">' + ICON.play + '</div>');
      }

      /* Замена FHD -> 1080p и HD -> 720p */
      normalizeQualityTags(item);

      main.append(item.contents());
      item.empty().append(thumb).append(main);
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

    var searchBtn = origHead.find('.filter--search, .filter--filter_search, .torrent-filter--search').first();
    if (searchBtn.length) {
      var sText = searchBtn.find('div:not(.hide)').last().text().trim() || searchBtn.text().trim() || (movie && (movie.title || movie.name)) || 'Поиск';
      toolbar.append('<div class="nova-t-toolbar__label">Поиск</div>');
      var sChip = $('<div class="nova-t-chip selector"><span>' + sText + '</span>' + ICON.search + '</div>');
      sChip.on('hover:enter', function () { searchBtn.trigger('hover:enter'); });
      toolbar.append(sChip);
    }

    var sortBtn = origHead.find('.filter--sort').first();
    if (sortBtn.length) {
      var sortVal = sortBtn.find('div:not(.hide)').last().text().trim() || sortBtn.text().replace('Сортировать', '').replace(':', '').trim();
      toolbar.append('<div class="nova-t-toolbar__label">Сортировка</div>');
      var sortChip = $('<div class="nova-t-chip selector"><span>' + (sortVal || 'По умолчанию') + '</span>' + ICON.chevron + '</div>');
      sortChip.on('hover:enter', function () { sortBtn.trigger('hover:enter'); });
      toolbar.append(sortChip);
    }

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
        cachedLogoUrl = '';
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
