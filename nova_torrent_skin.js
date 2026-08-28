(function () {
  'use strict';

  if (window.nova_torrent_skin) return;
  window.nova_torrent_skin = true;

  var ICON = {
    seed: '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>',
    peer: '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>',
    sort: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M6 12h12M10 18h4" stroke-linecap="round"/></svg>',
    filter: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mic: '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>',
    sub: '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-9 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/></svg>'
  };

  function addCSS() {
    if (document.getElementById('nova-torrent-skin-css')) return;
    var css = 
      'body.nova-torrent-scope .explorer__left{display:none!important}\n' +
      'body.nova-torrent-scope .explorer__files{width:100%!important;left:0!important;padding:1.2em 2em!important}\n' +
      'body.nova-torrent-scope .explorer__files-head{display:none!important}\n' +
      '.nova-t-root{padding-bottom:3em}\n' +
      '.nova-t-hero{position:relative;overflow:hidden;border-radius:1.2em;margin-bottom:1.2em;background:rgba(255,255,255,0.06);min-height:10em}\n' +
      '.nova-t-hero__bg{position:absolute;top:0;left:0;right:0;bottom:0}\n' +
      '.nova-t-hero__bg img{display:block;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .35s}\n' +
      '.nova-t-hero__bg--loaded img{opacity:1}\n' +
      '.nova-t-hero__shade{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(90deg,rgba(10,11,17,0.96) 0%,rgba(10,11,17,0.75) 45%,rgba(10,11,17,0.25) 80%,rgba(10,11,17,0) 100%)}\n' +
      '.nova-t-hero__body{position:relative;padding:1.8em 2.2em;max-width:75%}\n' +
      '.nova-t-hero__title{font-size:2.2em;font-weight:700;line-height:1.15;margin-bottom:.35em;color:#fff;text-shadow:0 .06em .5em rgba(0,0,0,.8)}\n' +
      '.nova-t-hero__meta{display:flex;flex-wrap:wrap;align-items:center;gap:.8em;font-size:1.05em;margin-bottom:.6em;color:#fff;opacity:.85}\n' +
      '.nova-t-hero__genres{font-size:.95em;color:rgba(255,255,255,0.65);margin-bottom:.8em}\n' +
      '.nova-t-hero__descr{font-size:.98em;line-height:1.45;color:rgba(255,255,255,0.75);max-height:8.5em;overflow-y:auto}\n' +
      '.nova-t-toolbar{display:flex;align-items:center;gap:.8em;margin-bottom:1.2em;flex-wrap:wrap}\n' +
      '.nova-t-chip{display:inline-flex;align-items:center;gap:.5em;padding:.5em 1.1em;border-radius:2em;background:rgba(255,255,255,0.08);color:#fff;font-size:1em;cursor:pointer}\n' +
      '.nova-t-chip.focus{background:#fff;color:#000}\n' +
      '.nova-t-chip>svg{flex-shrink:0}\n' +
      '.nova-t-card{position:relative;display:block;padding:1.1em 1.3em;border-radius:.9em;background:rgba(255,255,255,0.05);margin-bottom:.8em;color:#fff}\n' +
      '.nova-t-card.focus{background:#fff;color:#000}\n' +
      '.nova-t-card__header{font-size:1.15em;font-weight:600;line-height:1.4;margin-bottom:.65em;word-break:break-word}\n' +
      '.nova-t-card__middle{display:flex;align-items:center;flex-wrap:wrap;gap:.5em;margin-bottom:.75em}\n' +
      '.nova-t-season-box{display:inline-flex;align-items:center;border-radius:.4em;overflow:hidden;background:rgba(255,255,255,0.12);font-weight:700;font-size:.85em;line-height:1}\n' +
      '.nova-t-season-box__s{background:rgba(255,255,255,0.22);padding:.4em .6em;color:#fff}\n' +
      '.nova-t-season-box__e{padding:.4em .65em;color:#fff}\n' +
      '.nova-t-card.focus .nova-t-season-box{background:rgba(0,0,0,0.12)}\n' +
      '.nova-t-card.focus .nova-t-season-box__s{background:rgba(0,0,0,0.25);color:#000}\n' +
      '.nova-t-card.focus .nova-t-season-box__e{color:#000}\n' +
      '.nova-t-tag{display:inline-flex;align-items:center;gap:.35em;padding:.3em .6em;border-radius:.35em;background:rgba(255,255,255,0.12);font-size:.8em;font-weight:600;line-height:1}\n' +
      '.nova-t-tag--quality{border:1px solid rgba(255,255,255,0.3);background:transparent}\n' +
      '.nova-t-card.focus .nova-t-tag{background:rgba(0,0,0,0.12);color:#000}\n' +
      '.nova-t-card.focus .nova-t-tag--quality{border-color:rgba(0,0,0,0.4)}\n' +
      '.nova-t-card__footer{display:flex;align-items:center;justify-content:space-between;font-size:.9em;opacity:.75;border-top:1px solid rgba(255,255,255,0.08);padding-top:.65em;margin-top:.3em}\n' +
      '.nova-t-card.focus .nova-t-card__footer{border-top-color:rgba(0,0,0,0.1);opacity:.9}\n' +
      '.nova-t-card__info{display:flex;align-items:center;gap:1em}\n' +
      '.nova-t-card__stats{display:flex;align-items:center;gap:1.2em}\n' +
      '.nova-t-stat{display:inline-flex;align-items:center;gap:.3em;font-weight:600}\n' +
      '.nova-t-stat--seeds{color:#4ade80}\n' +
      '.nova-t-stat--peers{color:#f87171}\n' +
      '.nova-t-card.focus .nova-t-stat--seeds{color:#15803d}\n' +
      '.nova-t-card.focus .nova-t-stat--peers{color:#b91c1c}\n' +
      '.nova-t-size{font-size:1.1em;font-weight:700;padding:.2em .6em;border-radius:.35em;background:rgba(255,255,255,0.12);line-height:1}\n' +
      '.nova-t-card.focus .nova-t-size{background:rgba(0,0,0,0.15);color:#000}\n' +
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

  function parseTorrentMeta(rawTitle) {
    var title = String(rawTitle || '');
    var tags = [];
    var season = '';
    var episode = '';

    var sMatch = title.match(/\[(\d{1,2})x(\d{1,2}(?:-\d{1,2})?)\s*(?:из\s*\d+)?\]/i) ||
                 title.match(/сезон\s*[:\s]*(\d+).*?сери[ия]\s*[:\s]*(\d+(?:-\d+)?)/i);
    if (sMatch) {
      season = 'S' + sMatch[1];
      episode = sMatch[2];
    } else {
      var sOnly = title.match(/сезон\s*[:\s]*(\d+)/i) || title.match(/\bS(\d{1,2})\b/i);
      if (sOnly) season = 'S' + sOnly[1];
    }

    if (/2160|4k|uhd/i.test(title)) tags.push({ text: '4K', type: 'quality' });
    else if (/1080|full\s*hd|fhd/i.test(title)) tags.push({ text: '1080p', type: 'quality' });
    else if (/720|hd/i.test(title)) tags.push({ text: '720p', type: 'quality' });
    else if (/camrip|telesync|ts/i.test(title)) tags.push({ text: 'TS', type: 'quality' });

    if (/hdr10\+/i.test(title)) tags.push({ text: 'HDR10+', type: 'tech' });
    else if (/hdr10|hdr/i.test(title)) tags.push({ text: 'HDR', type: 'tech' });
    if (/dolby\s*vision|dovi|\bdv\b/i.test(title)) tags.push({ text: 'DV', type: 'tech' });

    var voices = [
      'HDRezka', 'LostFilm', 'Red Head Sound', 'RHS', 'NewComers', 'TVShows', 
      'Кубик в Кубе', 'ViruseProject', 'LE-Production', 'LineFilm', 'Яроцкий', 
      'DniproFilm', 'UaFlix', 'BaibaKo', 'AlexFilm', 'Jaskier', 'ColdFilm', 'Дубляж', 'MVO', 'DVO', 'VO'
    ];

    voices.forEach(function (v) {
      var regex = new RegExp('(^|[^a-zA-Zа-яА-Я0-9])' + v + '([^a-zA-Zа-яА-Я0-9]|$)', 'i');
      if (regex.test(title)) tags.push({ text: v, type: 'voice' });
    });

    if (/sub|субтитр/i.test(title)) tags.push({ text: 'SUB', type: 'sub' });

    return {
      season: season,
      episode: episode,
      tags: tags
    };
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
    var root = $('<div class="nova-t-root"></div>');

    var hero = buildHero(movie);
    root.append(hero);

    var origHead = explorer.find('.explorer__files-head');
    var toolbar = $('<div class="nova-t-toolbar"></div>');

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
    torrentItems.each(function () {
      var item = $(this);
      var rawTitle = item.find('.torrent-item__title').text().trim();
      var size = item.find('.torrent-item__size').text().trim();
      var seeds = item.find('.torrent-item__seeds').text().trim() || '0';
      var peers = item.find('.torrent-item__grabs').text().trim() || '0';
      var tracker = item.find('.torrent-item__tracker').text().trim();
      var date = item.find('.torrent-item__date').text().trim();
      var bitrate = item.find('.torrent-item__bitrate').text().trim();

      var parsed = parseTorrentMeta(rawTitle);

      var seasonHtml = '';
      if (parsed.season) {
        seasonHtml = '<div class="nova-t-season-box">' +
          '<div class="nova-t-season-box__s">' + parsed.season + '</div>' +
          (parsed.episode ? '<div class="nova-t-season-box__e">' + parsed.episode + '</div>' : '') +
          '</div>';
      }

      var tagsHtml = parsed.tags.map(function (tag) {
        var icon = tag.type === 'voice' ? ICON.mic : (tag.type === 'sub' ? ICON.sub : '');
        var cls = tag.type === 'quality' ? 'nova-t-tag nova-t-tag--quality' : 'nova-t-tag';
        return '<div class="' + cls + '">' + icon + '<span>' + tag.text + '</span></div>';
      }).join('');

      var card = $('<div class="nova-t-card selector">' +
        '<div class="nova-t-card__header">' + rawTitle + '</div>' +
        '<div class="nova-t-card__middle">' +
        seasonHtml +
        tagsHtml +
        '</div>' +
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
