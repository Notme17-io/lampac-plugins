(function () {
    'use strict';

    var KP_API_URL = 'https://kinopoiskapiunofficial.tech/';
    var QUALITY_CACHE_KEY = 'qualview_quality_cache';
    var QUALITY_API_DOMAIN = 'jr.maxvol.pro';

    function _b64raw(str) {
        if (typeof atob === 'function') { try { return atob(str); } catch (e) { logErr(e); } }
        var b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        str = String(str).replace(/=+$/, '').replace(/[^A-Za-z0-9+/]/g, '');
        var out = '', bits = 0, acc = 0;
        for (var i = 0; i < str.length; i++) {
            acc = (acc << 6) | b.indexOf(str.charAt(i)); bits += 6;
            if (bits >= 8) { bits -= 8; out += String.fromCharCode((acc >> bits) & 0xFF); }
        }
        return out;
    }

    function _decodeAllohaServers() {
        var _d = 'OBpQET0aR0hOCQ0XEQFeYFkEAgVPGBMDBwMuGglcAxMeQU1QECAdABxOW1tbBRNVLE8HFwgAQFZVR1V4QldEWAUaWgdEVy5BUhZOHFUYQwcWI1RfUAQVDRMSSEtgAxUcQhINFg0eSjcPH1BAQw0MChcKbUxHFl9QTldVQ1d6TwBHXFQaUFVBB31GU0EJBRpaVhdTbQs4';
        var _k = 'cardOverlay';
        try {
            var raw = _b64raw(_d), out = '';
            for (var i = 0; i < raw.length; i++) out += String.fromCharCode(raw.charCodeAt(i) ^ _k.charCodeAt(i % _k.length));
            return JSON.parse(out);
        } catch (e) { return []; }
    }

    var ALLOHA_API_SERVERS = _decodeAllohaServers();
    var CACHE_TTL = 24 * 60 * 60 * 1000;
    var CACHE_EMPTY_TTL = 3 * 60 * 60 * 1000;
    var CACHE_NETWORK_ERROR_TTL = 45 * 1000;

    var DEBUG = false;
    function logErr(e) {
        if (!DEBUG) return;
        try { console.error('[cards_style]', e); } catch (e2) {}
    }

    var ratingCache = {
        caches: {},
        get: function (source, key) {
            var cache = this.caches[source] || (this.caches[source] = loadPersistentCache(source));
            var data = cache[key];
            if (!data) return null;
            var ttl = data._failed ? CACHE_NETWORK_ERROR_TTL : (data._empty ? CACHE_EMPTY_TTL : CACHE_TTL);
            if (Date.now() - data.timestamp > ttl) {
                delete cache[key];
                debouncedSave(source, cache);
                return null;
            }
            return data;
        },
        set: function (source, key, value) {
            var cache = this.caches[source] || (this.caches[source] = loadPersistentCache(source));
            value.timestamp = Date.now();
            cache[key] = value;
            debouncedSave(source, cache);
            return value;
        }
    };

    function getPersistentCacheKey(source) { return 'cards_style_cache_' + source; }
    function loadPersistentCache(source) {
        var stored = null;
        try { stored = Lampa.Storage.get(getPersistentCacheKey(source), null); } catch (e) { logErr(e); }
        return (stored && typeof stored === 'object') ? stored : {};
    }

    var _saveStates = Object.create(null);
    function debouncedSave(source, cache) {
        var key = getPersistentCacheKey(source);
        var state = _saveStates[key] || (_saveStates[key] = { timer: 0, cache: cache });
        state.cache = cache;
        if (state.timer) clearTimeout(state.timer);
        state.timer = setTimeout(function () {
            state.timer = 0;
            try { Lampa.Storage.set(key, state.cache); } catch (e) { logErr(e); }
        }, 2000);
    }

    var requestPool = [];
    function getRequest() { return requestPool.pop() || new Lampa.Reguest(); }
    function releaseRequest(req) { req.clear(); if (requestPool.length < 5) requestPool.push(req); }

    function getKpApiKey() {
        return String(Lampa.Storage.get('rating_kp_api_key', '') || Lampa.Storage.get('source_api_key', '') || '').trim();
    }

    function formatRating(value) {
        var n = parseFloat(value);
        if (isNaN(n) || n <= 0) return '0.0';
        return n === 10 ? '10' : n.toFixed(1);
    }

    function getTmdbRating(data) {
        var rating = parseFloat(data && data.vote_average) || 0;
        return rating > 0 ? rating.toFixed(1) : '0.0';
    }

    function getKinopoiskRating(item, callback) {
        var kpKey = (item.type === 'tv' || item.name ? 'tv_' : 'movie_') + item.id;
        if (item.kp_rating > 0 || item.imdb_rating > 0) {
            callback({ kp: parseFloat(item.kp_rating) || 0, imdb: parseFloat(item.imdb_rating) || 0 });
            return;
        }
        var cached = ratingCache.get('kp_rating', kpKey);
        if (cached) { callback(cached); return; }

        var apiKey = getKpApiKey();
        if (!apiKey) { callback({ kp: 0, imdb: 0 }); return; }

        var req = getRequest();
        req.timeout(5000);
        var searchUrl = item.kinopoisk_id 
            ? KP_API_URL + 'api/v2.2/films/' + item.kinopoisk_id
            : KP_API_URL + 'api/v2.1/films/search-by-keyword?keyword=' + encodeURIComponent(item.title || item.name || '');

        req.silent(searchUrl, function (data) {
            releaseRequest(req);
            var res = { kp: 0, imdb: 0 };
            if (data && data.ratingKinopoisk) {
                res.kp = parseFloat(data.ratingKinopoisk) || 0;
                res.imdb = parseFloat(data.ratingImdb) || 0;
            } else if (data && (data.films || data.items) && (data.films || data.items).length) {
                var best = (data.films || data.items)[0];
                res.kp = parseFloat(best.rating || best.ratingKinopoisk) || 0;
                res.imdb = parseFloat(best.ratingImdb) || 0;
            }
            ratingCache.set('kp_rating', kpKey, res);
            callback(res);
        }, function () {
            releaseRequest(req);
            callback({ kp: 0, imdb: 0 });
        }, false, { headers: { 'X-API-KEY': apiKey } });
    }

    function normalizeQuality(val) {
        var text = String(val || '').toLowerCase();
        if (/2160|4k|uhd/.test(text)) return '4K';
        if (/1080|full\s*hd|fhd/.test(text)) return 'FHD';
        if (/720|hd/.test(text)) return 'HD';
        if (/480|360|sd/.test(text)) return 'SD';
        return null;
    }

    function fetchQuality(item, callback) {
        var cacheKey = 'q_' + item.id;
        var cached = ratingCache.get('quality', cacheKey);
        if (cached) { callback(cached.quality); return; }

        var releaseYear = (item.release_date || item.first_air_date || '').substring(0, 4);
        var uniqueId = Lampa.Storage.get('lampac_unic_id', '');
        var jacUrl = 'https://' + QUALITY_API_DOMAIN + '/api/v2.0/indexers/all/results?apikey=&uid=' + uniqueId + '&year=' + releaseYear + '&title=' + encodeURIComponent(item.title || item.name || '');

        var req = getRequest();
        req.timeout(6000);
        req.silent(jacUrl, function (resp) {
            releaseRequest(req);
            var quality = null;
            try {
                var data = typeof resp === 'string' ? JSON.parse(resp) : resp;
                var releases = (data && data.Results) || [];
                var maxRes = 0;
                for (var i = 0; i < releases.length; i++) {
                    var r = (releases[i].info && releases[i].info.quality) || 0;
                    if (r > maxRes) maxRes = r;
                }
                if (maxRes >= 2160) quality = '4K';
                else if (maxRes >= 1080) quality = 'FHD';
                else if (maxRes >= 720) quality = 'HD';
                else if (maxRes > 0) quality = 'SD';
            } catch (e) {}

            if (!quality && ALLOHA_API_SERVERS.length) {
                var server = ALLOHA_API_SERVERS[0];
                var allohaUrl = server.url + '?token=' + server.token + '&tmdb=' + encodeURIComponent(item.id);
                var reqA = getRequest();
                reqA.timeout(4000);
                reqA.silent(allohaUrl, function (aResp) {
                    releaseRequest(reqA);
                    try {
                        var aData = typeof aResp === 'string' ? JSON.parse(aResp) : aResp;
                        if (aData && aData.data) {
                            quality = aData.data.uhd ? '4K' : normalizeQuality(aData.data.quality);
                        }
                    } catch (e) {}
                    ratingCache.set('quality', cacheKey, { quality: quality });
                    callback(quality);
                }, function () {
                    releaseRequest(reqA);
                    ratingCache.set('quality', cacheKey, { quality: null });
                    callback(null);
                });
            } else {
                ratingCache.set('quality', cacheKey, { quality: quality });
                callback(quality);
            }
        }, function () {
            releaseRequest(req);
            callback(null);
        });
    }

    function addTypeLabel(card) {
        var view = card.querySelector('.card__view');
        if (!view) return;
        var data = card.card_data || {};
        var isTV = data.type === 'tv' || data.name || data.first_air_date || data.number_of_seasons > 0 || card.classList.contains('card--tv');

        var old = view.querySelector('.card__clean-type');
        if (old) old.remove();

        var label = document.createElement('div');
        label.className = 'card__clean-type ' + (isTV ? 'clean-type--tv' : 'clean-type--movie');
        label.textContent = isTV ? 'Сериал' : 'Фильм';
        view.appendChild(label);
    }

    function updateCardQuality(card) {
        var view = card.querySelector('.card__view');
        if (!view || !card.card_data || !card.card_data.id) return;

        var old = view.querySelector('.card__clean-quality');
        if (old) old.remove();

        fetchQuality(card.card_data, function (quality) {
            if (!quality || !document.body.contains(card)) return;
            var qEl = document.createElement('div');
            qEl.className = 'card__clean-quality';
            qEl.textContent = quality;
            view.appendChild(qEl);
        });
    }

    function updateCardRating(card) {
        var view = card.querySelector('.card__view');
        if (!view || !card.card_data || !card.card_data.id) return;

        var old = view.querySelector('.card__clean-votes');
        if (old) old.remove();

        var wrap = document.createElement('div');
        wrap.className = 'card__clean-votes';
        view.appendChild(wrap);

        var tmdbVal = getTmdbRating(card.card_data);
        if (tmdbVal !== '0.0') {
            var tmdbEl = document.createElement('div');
            tmdbEl.className = 'vote-item rate--tmdb';
            tmdbEl.innerHTML = tmdbVal + ' <span>TMDB</span>';
            wrap.appendChild(tmdbEl);
        }

        getKinopoiskRating(card.card_data, function (res) {
            if (!document.body.contains(wrap)) return;
            if (res.kp > 0) {
                var kpEl = document.createElement('div');
                kpEl.className = 'vote-item rate--kp';
                kpEl.innerHTML = formatRating(res.kp) + ' <span>КП</span>';
                wrap.appendChild(kpEl);
            }
            if (res.imdb > 0) {
                var imdbEl = document.createElement('div');
                imdbEl.className = 'vote-item rate--imdb';
                imdbEl.innerHTML = formatRating(res.imdb) + ' <span>IMDb</span>';
                wrap.appendChild(imdbEl);
            }
        });
    }

    function updateCard(card) {
        if (!card || !card.card_data) return;
        addTypeLabel(card);
        updateCardQuality(card);
        updateCardRating(card);
    }

    function formatNextEpisodeDate(dateStr) {
        var d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        var months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
        return d.getDate() + ' ' + months[d.getMonth()];
    }

    function renderNextEpisodeInfo(movie, render) {
        if (!movie || !movie.next_episode_to_air || !render) return;
        var next = movie.next_episode_to_air;
        if (!next.air_date) return;

        var parts = next.air_date.split('-');
        if (parts.length < 3) return;
        var targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        var diffTime = targetDate.getTime() - today.getTime();
        var diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return;

        var details = $(render).find('.full-start-new__details, .full-start__details');
        if (!details.length) return;

        details.find('.clean-next-episode-info').remove();
        details.contents().filter(function () {
            return this.nodeType === 3 && /Следующая/i.test(this.nodeValue);
        }).remove();
        details.find('span').filter(function () {
            return /Следующая/i.test($(this).text());
        }).each(function () {
            var el = $(this);
            el.prev('.full-start-new__split, .full-start__split').remove();
            el.remove();
        });

        var dateText = formatNextEpisodeDate(next.air_date);
        var labelText = (diffDays === 0)
            ? 'Следующая серия выходит сегодня: ' + dateText
            : 'Следующая: ' + dateText + ' / Осталось дней: ' + diffDays;

        var split = $('<span class="full-start-new__split clean-next-episode-info">•</span>');
        var item = $('<span class="clean-next-episode-info">' + labelText + '</span>');

        details.append(split).append(item);
    }

    function renderDetailQuality(movie, render) {
        fetchQuality(movie, function (quality) {
            if (!quality) return;
            var target = $(render).find('.full-start-new__rate-line, .full-start__rate-line');
            if (target.length) {
                target.find('.clean-detail-quality').remove();
                target.append('<div class="full-start__status clean-detail-quality">' + quality + '</div>');
            }
        });
    }

    function initStyles() {
        if (document.getElementById('cards-style-theme')) return;
        var css = 
            '.card__clean-type{position:absolute!important;left:0!important;top:0!important;z-index:10!important;padding:0.25em 0.5em!important;font-size:0.85em!important;font-weight:700!important;color:#fff!important;border-radius:0.75em 0 0.75em 0!important;line-height:1!important;text-transform:uppercase!important;letter-spacing:0.04em!important}\n' +
            '.clean-type--tv{background:rgba(229,9,20,0.95)!important}\n' +
            '.clean-type--movie{background:rgba(33,150,243,0.95)!important}\n' +
            '.card__clean-quality{position:absolute!important;left:0!important;bottom:0!important;z-index:10!important;padding:0.25em 0.45em!important;font-size:0.9em!important;font-weight:600!important;color:#fff!important;background:rgba(0,0,0,0.7)!important;border-radius:0 0.75em 0 0.75em!important;line-height:1!important}\n' +
            '.card__clean-votes{position:absolute!important;right:0!important;bottom:0!important;z-index:10!important;display:flex!important;flex-direction:column!important;gap:2px!important;align-items:flex-end!important}\n' +
            '.card__clean-votes .vote-item{padding:0.2em 0.45em!important;font-size:0.85em!important;font-weight:600!important;color:#fff!important;background:rgba(0,0,0,0.7)!important;border-radius:0.5em 0 0 0.5em!important;line-height:1.1!important;white-space:nowrap!important}\n' +
            '.card__clean-votes .vote-item span{font-size:0.75em!important;opacity:0.8!important;margin-left:2px!important;font-weight:400!important}\n' +
            '.clean-detail-quality{background:rgba(255,255,255,0.08)!important;color:#fff!important;border:1px solid rgba(255,255,255,0.2)!important;border-radius:0.3em!important;padding:0.2em 0.5em!important;font-weight:600!important;line-height:1!important}\n' +
            '.card .card__type,.card .card__quality,.card .card__vote{display:none!important}\n' +
            '.full-start__status,.full-start-new__rate,.full-start__rate{color:#fff!important}\n';
        
        var style = document.createElement('style');
        style.id = 'cards-style-theme';
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    function init() {
        initStyles();

        Lampa.Listener.follow('card', function (e) {
            if (e.type === 'build' && e.object && e.object.card) {
                var card = e.object.card;
                var data = card.card_data || (e.object.data);
                if (data) {
                    card.card_data = data;
                    updateCard(card);
                }
            }
        });

        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'complite' && e.object && e.object.activity) {
                var render = e.object.activity.render();
                var movie = e.data && e.data.movie;
                if (render && movie) {
                    renderDetailQuality(movie, render);
                    renderNextEpisodeInfo(movie, render);
                }
            }
        });

        setInterval(function () {
            var cards = document.querySelectorAll('.card:not([data-clean-observed])');
            for (var i = 0; i < cards.length; i++) {
                cards[i].setAttribute('data-clean-observed', '1');
                if (cards[i].card_data) updateCard(cards[i]);
            }
        }, 300);
    }

    var manifest = {
        name: 'Cards Style',
        version: '1.0.1',
        description: 'Классический стиль карточек, качество и даты выхода серий'
    };

    if (Array.isArray(Lampa.Manifest.plugins)) Lampa.Manifest.plugins.push(manifest);
    else if (Lampa.Manifest.plugins) Lampa.Manifest.plugins = [Lampa.Manifest.plugins, manifest];
    else Lampa.Manifest.plugins = manifest;

    if (window.appready) init();
    else Lampa.Listener.follow('app', function (e) { if (e.type === 'ready') init(); });
})();
