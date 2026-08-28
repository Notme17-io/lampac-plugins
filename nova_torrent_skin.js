(function () {
  'use strict';

  if (window.nova_torrent_skin) return;
  window.nova_torrent_skin = true;

  var ICON = {
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
      
      /* Нативная стилизация торрент-элементов Lampa */
      'body.nova-torrent-scope .torrent-item{display:block!important;position:relative!important;padding:1.1em 1.3em!important;border-radius:.9em!important;background:rgba(255,255,255,0.05)!important;margin-bottom:.8em!important;color:#fff!important;box-sizing:border-box!important;border:none!important}\n' +
      'body.nova-torrent-scope .torrent-item.focus{background:rgba(255,255,255,0.14)!important;box-shadow:inset 0 0 0 2px #fff!important;color:#fff!important}\n' +
      'body.nova-torrent-scope .torrent-item__title{font-size:1.15em!important;font-weight:600!important;line-height:1.45!important;margin-bottom:.65em!important;word-break:break-word!important;white-space:normal!important;color:#fff!important;height:auto!important;max-height:none!important;overflow:visible!important}\n' +
      'body.nova-torrent-scope .torrent-item__details{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:.45em!important;margin-bottom:.7em!important}\n' +
      'body.nova-torrent-scope .torrent-item__footer{display:flex!important;align-items:center!important;justify-content:space-between!important;font-size:.92em!important;opacity:.8!important;border-top:1px solid rgba(255,255,255,0.08)!important;padding-top:.65em!important;margin-top:.35em!important}\n' +
      'body.nova-torrent-scope .torrent-item.focus .torrent-item__footer{opacity:0.95!important;border-top-color:rgba(255,255,255,0.15)!important}\n' +
      'body.nova-torrent-scope .torrent-item__size{font-size:1.05em!important;font-weight:700!important;padding:.2em .55em!important;border-radius:.35em!important;background:rgba(255,255,255,0.12)!important;line-height:1!important;color:#fff!important}\n' +
      'body.nova-torrent-scope .torrent-item__seeds, body.nova-torrent-scope .torrent-item__grabs{color:#fff!important;font-weight:600!important}\n';

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

    if (scrollBody.find('.nova-t-header-block').length) return;

    var movie = getMovie();
    var headerBlock = $('<div class="nova-t-header-block"></div>');

    var hero = buildHero(movie);
    headerBlock.append(hero);

    var origHead = explorer.find('.explorer__files-head');
    var toolbar = $('<div class="nova-t-toolbar"></div>');

    // Кнопка поиска / Уточнить
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

    if (toolbar.children().length) headerBlock.append(toolbar);

    scrollBody.prepend(headerBlock);

    try {
      Lampa.Controller.collectionSet(scrollBody[0]);
    } catch (e) {}
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
