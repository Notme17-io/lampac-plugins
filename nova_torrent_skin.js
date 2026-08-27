(function () {
  'use strict';

  if (window.nova_torrent_skin) return;
  window.nova_torrent_skin = true;

  var ICON = {
    play: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>',
    seed: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>',
    peer: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>',
    sort: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M6 12h12M10 18h4" stroke-linecap="round"/></svg>',
    filter: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function addCSS() {
    if (document.getElementById('nova-torrent-skin-css')) return;
    var css = 
      'body.nova-torrent-scope .explorer__left{display:none!important}\n' +
      'body.nova-torrent-scope .explorer__files{width:100%!important;left:0!important;padding:1.5em 2em!important}\n' +
      'body.nova-torrent-scope .explorer__files-head{display:none!important}\n' +
      '.nova-t-root{padding-bottom:3em}\n' +
      '.nova-t-hero{position:relative;overflow:hidden;border-radius:1.2em;margin-bottom:1.5em;background:rgba(255,255,255,0.06);min-height:13em}\n' +
      '.nova-t-hero__bg{position:absolute;top:0;left:0;right:0;bottom:0}\n' +
      '.nova-t-hero__bg img{display:block;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .35s}\n' +
      '.nova-t-hero__bg--loaded img{opacity:1}\n' +
      '.nova-t-hero__shade{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(90deg,rgba(10,11,17,0.95) 0%,rgba(10,11,17,0.7) 40%,rgba(10,11,17,0.2) 75%,rgba(10,11,17,0) 100%)}\n' +
      '.nova-t-hero__body{position:relative;padding:2.2em;max-width:70%}\n' +
      '.nova-t-hero__title{font-size:2.3em;font-weight:700;line-height:1.15;margin-bottom:.35em;color:#fff;text-shadow:0 .06em .5em rgba(0,0,0,.8)}\n' +
      '.nova-t-hero__meta{display:flex;flex-wrap:wrap;align-items:center;gap:.7em;font-size:1.1em;margin-bottom:.7em;color:#fff;opacity:.85}\n' +
      '.nova-t-hero__descr{font-size:1.05em;line-height:1.45;color:rgba(255,255,255,0.7);margin-bottom:1.2em;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n' +
      '.nova-t-hero__btn{display:inline-flex;align-items:center;gap:.6em;padding:.7em 1.5em;border-radius:2.4em;background:rgba(255,255,255,0.85);color:#000;font-size:1.15em;font-weight:600;cursor:pointer}\n' +
      '.nova-t-hero__btn.focus{background:#fff;box-shadow:0 .25em .9em rgba(0,0,0,.45);color:#000}\n' +
      '.nova-t-toolbar{display:flex;align-items:center;gap:.7em;margin-bottom:1.2em}\n' +
      '.nova-t-chip{display:inline-flex;align-items:center;gap:.5em;padding:.55em 1.1em;border-radius:2em;background:rgba(255,255,255,0.08);color:#fff;font-size:1.05em;cursor:pointer}\n' +
      '.nova-t-chip.focus{background:#fff;color:#000}\n' +
      '.nova-t-card{position:relative;display:flex;align-items:center;justify-content:space-between;padding:1em 1.2em;border-radius:.9em;background:rgba(255,255,255,0.05);margin-bottom:.7em;color:#fff}\n' +
      '.nova-t-card.focus{background:#fff;color:#000}\n' +
      '.nova-t-card__body{flex:1;min-width:0;padding-right:1.5em}\n' +
      '.nova-t-card__title{font-size:1.2em;font-weight:600;line-height:1.35;margin-bottom:.4em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n' +
      '.nova-t-card__meta{display:flex;align-items:center;gap:.8em;font-size:.9em;opacity:.7}\n' +
      '.nova-t-card__side{display:flex;align-items:center;gap:1.2em;flex-shrink:0}\n' +
      '.nova-t-badge{display:inline-block;padding:.2em .55em;border-radius:.35em;background:rgba(255,255,255,0.18);font-size:.78em;font-weight:700;letter-spacing:.04em;line-height:1.4}\n' +
      '.nova-t-card.focus .nova-t-badge{background:rgba(0,0,0,0.15);color:#000}\n' +
      '.nova-t-stat{display:inline-flex;align-items:center;gap:.25em;font-weight:600}\n' +
      '.nova-t-stat--seeds{color:#4ade80}\n' +
      '.nova-t-stat--peers{color:#f87171}\n' +
      '.nova-t-card.focus .nova-t-stat--seeds{color:#15803d}\n' +
      '.nova-t-card.focus .nova-t-stat--peers{color:#b91c1c}\n' +
      '.nova-t-size{font-size:1.1em;font-weight:700;min-width:4.5em;text-align:right}\n' +
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

  function parseQuality(title) {
    var t = String(title || '').toLowerCase();
    if (/camrip|ts|telecine|telesync|тс/i.test(t)) return 'TS';
    if (/2160|4k|uhd/.test(t)) return '4K';
    if (/1080|full\s*hd|fhd/.test(t)) return '1080p';
    if (/720|hd/.test(t)) return '720p';
    return 'SD';
  }

  function buildHero(movie, firstTorrent) {
    var bg = getBackdrop(movie);
    var title = (movie && (movie.title || movie.name)) || 'Торренты';
    var descr = (movie && movie.overview) || '';
    var year = (movie && (movie.release_date || movie.first_air_date || '')).substring(0, 4);
    var rate = (movie && movie.vote_average) ? '★ ' + parseFloat(movie.vote_average).toFixed(1) : '';

    var hero = $('<div class="nova-t-hero">' +
      '<div class="nova-t-hero__bg"><img src="' + bg + '" alt=""></div>' +
      '<div class="nova-t-hero__shade"></div>' +
      '<div class="nova-t-hero__body">' +
      '<div class="nova-t-hero__title">' + title + '</div>' +
      '<div class="nova-t-hero__meta">' +
      (year ? '<div>' + year + '</div>' : '') +
      (rate ? '<div>' + rate + '</div>' : '') +
      '</div>' +
      (descr ? '<div class="nova-t-hero__descr">' + descr + '</div>' : '') +
      '<div class="nova-t-hero__actions">' +
      '<div class="nova-t-hero__btn selector" data-action="top-play">' + ICON.play + '<span>Смотреть раздачу</span></div>' +
      '</div>' +
      '</div>' +
      '</div>');

    var img = hero.find('.nova-t-hero__bg img')[0];
    if (img) {
      img.onload = function () { hero.find('.nova-t-hero__bg').addClass('nova-t-hero__bg--loaded'); };
      if (img.complete) hero.find('.nova-t-hero__bg').addClass('nova-t-hero__bg--loaded');
    }

    hero.find('[data-action="top-play"]').on('hover:enter', function () {
      if (firstTorrent) firstTorrent.trigger('hover:enter');
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
    var root = $('<div class="nova-t-root"></div>');

    var hero = buildHero(movie, torrentItems.first());
    root.append(hero);

    var origHead = explorer.find('.explorer__files-head');
    var toolbar = $('<div class="nova-t-toolbar"></div>');

    origHead.find('.filter--sort, .filter--filter, .simple-button').each(function () {
      var btn = $(this);
      var text = btn.text().trim();
      var icon = btn.hasClass('filter--sort') ? ICON.sort : ICON.filter;
      var chip = $('<div class="nova-t-chip selector">' + icon + '<span>' + text + '</span></div>');
      chip.on('hover:enter', function () { btn.trigger('hover:enter'); });
      toolbar.append(chip);
    });
    if (toolbar.children().length) root.append(toolbar);

    var list = $('<div class="nova-t-list"></div>');
    torrentItems.each(function () {
      var item = $(this);
      var title = item.find('.torrent-item__title').text().trim();
      var size = item.find('.torrent-item__size').text().trim();
      var seeds = item.find('.torrent-item__seeds').text().trim() || '0';
      var peers = item.find('.torrent-item__grabs').text().trim() || '0';
      var tracker = item.find('.torrent-item__tracker').text().trim();
      var date = item.find('.torrent-item__date').text().trim();
      var bitrate = item.find('.torrent-item__bitrate').text().trim();
      var quality = parseQuality(title);

      var card = $('<div class="nova-t-card selector">' +
        '<div class="nova-t-card__body">' +
        '<div class="nova-t-card__title">' + title + '</div>' +
        '<div class="nova-t-card__meta">' +
        '<span class="nova-t-badge">' + quality + '</span>' +
        (tracker ? '<span>' + tracker + '</span>' : '') +
        (date ? '<span>' + date + '</span>' : '') +
        (bitrate ? '<span>' + bitrate + '</span>' : '') +
        '</div>' +
        '</div>' +
        '<div class="nova-t-card__side">' +
        '<div class="nova-t-stat nova-t-stat--seeds">' + ICON.seed + seeds + '</div>' +
        '<div class="nova-t-stat nova-t-stat--peers">' + ICON.peer + peers + '</div>' +
        '<div class="nova-t-size">' + size + '</div>' +
        '</div>' +
        '</div>');

      card.on('hover:enter', function () { item.trigger('hover:enter'); });
      card.on('hover:long', function () { item.trigger('hover:long'); });

      list.append(card);
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
