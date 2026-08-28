(function () {
  'use strict';

  if (window.nova_torrent_skin) return;
  window.nova_torrent_skin = true;

  var ICON = {
    seed: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>',
    peer: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4" stroke-linecap="round"/></svg>',
    sort: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 6h18M6 12h12M10 18h4" stroke-linecap="round"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function addCSS() {
    if (document.getElementById('nova-torrent-skin-css')) return;
    var css = 
      'body.nova-torrent-scope .explorer__left{display:none!important}\n' +
      'body.nova-torrent-scope .explorer__files{width:100%!important;left:0!important;padding:1.2em 2em!important}\n' +
      'body.nova-torrent-scope .explorer__files-head{display:none!important}\n' +
      '.nova-t-root{padding-bottom:3em}\n' +
      '.nova-t-hero{position:relative;overflow:hidden;border-radius:1.2em;margin-bottom:1.2em;background:rgba(255,255,255,0.06);min-height:9em}\n' +
      '.nova-t-hero__bg{position:absolute;top:0;left:0;right:0;bottom:0}\n' +
      '.nova-t-hero__bg img{display:block;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .35s}\n' +
      '.nova-t-hero__bg--loaded img{opacity:1}\n' +
      '.nova-t-hero__shade{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(90deg,rgba(10,11,17,0.96) 0%,rgba(10,11,17,0.75) 45%,rgba(10,11,17,0.25) 80%,rgba(10,11,17,0) 100%)}\n' +
      '.nova-t-hero__body{position:relative;padding:1.6em 2em;max-width:75%}\n' +
      '.nova-t-hero__title{font-size:2.2em;font-weight:700;line-height:1.15;margin-bottom:.3em;color:#fff;text-shadow:0 .06em .5em rgba(0,0,0,.8)}\n' +
      '.nova-t-hero__meta{display:flex;flex-wrap:wrap;align-items:center;gap:.8em;font-size:1.05em;margin-bottom:.5em;color:#fff;opacity:.85}\n' +
      '.nova-t-hero__genres{font-size:.95em;color:rgba(255,255,255,0.65);margin-bottom:.6em}\n' +
      '.nova-t-hero__descr{font-size:.95em;line-height:1.4;color:rgba(255,255,255,0.75);max-height:8em;overflow-y:auto}\n' +
      
      '.nova-t-toolbar{display:flex;align-items:center;gap:.8em;margin-bottom:1.2em;flex-wrap:wrap}\n' +
      '.nova-t-chip{display:inline-flex;align-items:center;gap:.6em;padding:.5em 1.1em;border-radius:2em;background:rgba(255,255,255,0.08);color:#fff;font-size:1em;cursor:pointer;white-space:nowrap}\n' +
      '.nova-t-chip.focus{background:rgba(255,255,255,0.16)!important;box-shadow:inset 0 0 0 2px #fff!important;color:#fff!important}\n' +
      '.nova-t-chip svg{width:1.15em!important;height:1.15em!important;max-width:1.15em!important;max-height:1.15em!important;flex-shrink:0!important}\n' +
      
      '.nova-t-card{position:relative;display:flex;align-items:flex-start;padding:1em 1.2em;border-radius:.9em;background:rgba(255,255,255,0.05);margin-bottom:.8em;color:#fff;box-sizing:border-box}\n' +
      '.nova-t-card.focus{background:rgba(255,255,255,0.14)!important;box-shadow:inset 0 0 0 2px #fff!important;color:#fff!important}\n' +
      
      '.nova-t-card__thumb{position:relative;width:8.5em;height:5.2em;flex-shrink:0;border-radius:.5em;overflow:hidden;background:rgba(0,0,0,0.45);margin-right:1.2em;margin-top:.2em}\n' +
      '.nova-t-card__thumb img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:.65}\n' +
      '.nova-t-card__num{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font-size:1.2em;font-weight:700;color:#fff;text-shadow:0 .05em .2em rgba(0,0,0,.9);z-index:2}\n' +
      '.nova-t-card__num>span{display:inline-block;padding:.08em .4em;border-radius:.35em;background:rgba(10,11,17,0.65);box-shadow:0 .12em .45em rgba(0,0,0,.5)}\n' +
      
      '.nova-t-card__main{flex:1;min-width:0}\n' +
      '.nova-t-card__title{font-size:1.12em;font-weight:600;line-height:1.45;margin-bottom:.6em;word-break:break-word;color:#fff}\n' +
      '.nova-t-card__tags{display:flex;align-items:center;flex-wrap:wrap;gap:.45em;margin-bottom:.6em}\n' +
      
      '.nova-t-card__footer{display:flex;align-items:center;justify-content:space-between;font-size:.9em;opacity:.8;border-top:1px solid rgba(255,255,255,0.08);padding-top:.6em;margin-top:.3em}\n' +
      '.nova-t-card.focus .nova-t-card__footer{opacity:0.95;border-top-color:rgba(255,255,255,0.15)}\n' +
      '.nova-t-card__info{display:flex;align-items:center;gap:.9em}\n' +
      '.nova-t-card__stats{display:flex;align-items:center;gap:1.1em}\n' +
      '.nova-t-stat{display:inline-flex;align-items:center;gap:.3em;font-weight:600}\n' +
      '.nova-t-stat svg{width:1.1em!important;height:1.1em!important;max-width:1.1em!important;max-height:1.1em!important;flex-shrink:0!important}\n' +
      '.nova-t-stat--seeds{color:#4ade80}\n' +
      '.nova-t-stat--peers{color:#f87171}\n' +
      '.nova-t-size{font-size:1.05em;font-weight:700;padding:.2em .55em;border-radius:.35em;background:rgba(255,255,255,0.12);line-height:1}\n' +
      '.torrent-item{display:none!important}\n';

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

    var origHead = explorer.find('.explorer__files-head');
    var toolbar = $('<div class="nova-t-toolbar"></div>');

    // Кнопка поиска / уточнить
    var searchBtn = origHead.find('.filter--search, .filter--filter_search, .torrent-filter--search').first();
    if (searchBtn.length) {
      var sText = searchBtn.find('div:not(.hide)').last().text().trim() || searchBtn.text().trim() || (movie && (movie.title || movie.name)) || 'Поиск';
      var sChip = $('<div class="nova-t-chip selector">' + ICON.search + '<span>' + sText + '</span></div>');
      sChip.on('hover:enter', function () { searchBtn.trigger('hover:enter'); });
      toolbar.append(sChip);
    }

    // Сортировка и Фильтр
    origHead.find('.filter--sort, .filter--filter').each(function () {
      var btn = $(this);
      var isSort = btn.hasClass('filter--sort');
      var label = isSort ? 'Сортировать' : 'Фильтр';
      var val = btn.find('div:not(.hide)').last().text().trim() || btn.text().replace(label, '').trim();
      var fullText = val ? label + ': ' + val : label;
      var icon = isSort ? ICON.sort : ICON.filter;

      var chip = $('<div class="nova-t-chip selector">' + icon + '<span>' + fullText + '</span></div>');
      chip.on('hover:enter', function () { btn.trigger('hover:enter'); });
      toolbar.append(chip);
    });

    if (toolbar.children().length) root.append(toolbar);

    var list = $('<div class="nova-t-list"></div>');
    var idx = 1;

    torrentItems.each(function () {
      var item = $(this);
      var rawTitle = item.find('.torrent-item__title').text().trim();
      var size = item.find('.torrent-item__size').text().trim();
      var seeds = item.find('.torrent-item__seeds').text().trim() || '0';
      var peers = item.find('.torrent-item__grabs').text().trim() || '0';
      var tracker = item.find('.torrent-item__tracker').text().trim();
      var date = item.find('.torrent-item__date').text().trim();
      var bitrate = item.find('.torrent-item__bitrate').text().trim();

      // Клонируем оригинальные бейджи раздачи из нативной Lampa
      var origDetails = item.find('.torrent-item__details, .torrent-serial, .torrent-item__spec');
      var clonedTags = '';
      if (origDetails.length) {
        clonedTags = origDetails.clone().html();
      }

      var seasonStr = parseSeasonEpisode(rawTitle);
      var badgeNum = seasonStr || (idx < 10 ? '0' + idx : '' + idx);

      var card = $('<div class="nova-t-card selector">' +
        '<div class="nova-t-card__thumb">' +
        '<img src="' + thumbBg + '" alt="">' +
        '<div class="nova-t-card__num"><span>' + badgeNum + '</span></div>' +
        '</div>' +
        '<div class="nova-t-card__main">' +
        '<div class="nova-t-card__title">' + rawTitle + '</div>' +
        (clonedTags ? '<div class="nova-t-card__tags">' + clonedTags + '</div>' : '') +
        '<div class="nova-t-card__footer">' +
        '<div class="nova-t-card__info">' +
        (tracker ? '<span>' + tracker + '</span>' : '') +
        (date ? '<span>' + date + '</span>' : '') +
        (bitrate ? '<span>' + bitrate + '</span>' : '') +
        '</div>' +
        '<div class="nova-t-card__stats">' +
        '<div class="nova-t-stat nova-t-stat--seeds">' + ICON.seed + '<span>' + seeds + '</span></div>' +
        '<div class="nova-t-stat nova-t-stat--peers">' + ICON.peer + '<span>' + peers + '</span></div>' +
        '<div class="nova-t-size">' + size + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');

      card.on('hover:enter', function () { item.trigger('hover:enter'); });
      card.on('hover:long', function () { item.trigger('hover:long'); });

      list.append(card);
      idx++;
    });

    root.append(list);
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
