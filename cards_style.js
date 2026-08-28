(function () {
    'use strict';

    var KP_API_URL = 'https://kinopoiskapiunofficial.tech/';
    var QUALITY_CACHE_KEY = 'cards_style_q_cache_v13';
    var QUALITY_API_DOMAIN = 'jr.maxvol.pro';

    var CARD_TMDB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><text x="0" y="62" font-size="60" font-weight="bold" fill="currentColor" textLength="150" lengthAdjust="spacingAndGlyphs">TM</text><text x="0" y="128" font-size="60" font-weight="bold" fill="currentColor" textLength="150" lengthAdjust="spacingAndGlyphs">DB</text></svg>';
    var CARD_IMDB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><path fill="currentColor" d="M18.43,0h86.02c10.18,0,18.43,8.25,18.43,18.43v86.02c0,10.18-8.25,18.43-18.43,18.43H18.43C8.25,122.88,0,114.63,0,104.45l0-86.02C0,8.25,8.25,0,18.43,0z"/><path fill="#000" d="M24.96,78.72V44.16h-9.6v34.56H24.96z M45.36,44.16L43.2,60.24L42,51.6l-1.2-7.44h-12v34.56h8.16v-22.8l3.36,22.8h6l3.12-23.28v23.28h8.16V44.16H45.36z M61.44,78.72V44.16h14.88c3.6,0,6.24,2.64,6.24,6v22.56c0,3.36-2.64,6-6.24,6H61.44z M72.72,50.4l-2.16-0.24v22.56c1.2,0,2.16-0.24,2.4-0.72c0.48-0.48,0.48-1.92,0.48-4.32V54.24v-2.88L72.72,50.4z M100.56,52.8h0.72c3.36,0,6.24,2.64,6.24,6v13.92c0,3.36-2.88,6-6.24,6h-0.72c-1.92,0-3.84-0.96-5.04-2.64l-0.48,2.16H86.4V44.16h9.12V55.2C96.72,53.76,98.64,52.8,100.56,52.8z M98.64,69.6v-8.16L98.4,58.8c-0.24-0.48-0.96-0.72-1.44-0.72c-0.48,0-1.2,0.24-1.44,0.72v13.68c0.24,0.48,0.96,0.72,1.44,0.72c0.48,0,1.44-0.24,1.44-0.72L98.64,69.6z"/></svg>';
    var CARD_KP_SVG = '<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="150" cy="150" r="150" fill="currentColor"/><path d="M300 45L145.26 127.827L225.9 45H181.2L126.3 121.203V45H89.9999V255H126.3V178.92L181.2 255H225.9L147.354 174.777L300 255V216L160.776 160.146L300 169.5V130.5L161.658 139.494L300 84V45Z" fill="#000"/></svg>';
    var CARD_LAMPA_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="110" height="104" viewBox="0 0 110 104" fill="none"><path d="M81.6744 103.11C98.5682 93.7234 110 75.6967 110 55C110 24.6243 85.3757 0 55 0C24.6243 0 0 24.6243 0 55C0 75.6967 11.4318 93.7234 28.3255 103.11C14.8869 94.3724 6 79.224 6 62C6 34.938 27.938 13 55 13C82.062 13 104 34.938 104 62C104 79.224 95.1131 94.3725 81.6744 103.11Z" fill="currentColor"/><path d="M92.9546 80.0076C95.5485 74.5501 97 68.4446 97 62C97 38.804 78.196 20 55 20C31.804 20 13 38.804 13 62C13 68.4446 14.4515 74.5501 17.0454 80.0076C16.3618 77.1161 16 74.1003 16 71C16 49.4609 33.4609 32 55 32C76.5391 32 94 49.4609 94 71C94 74.1003 93.6382 77.1161 92.9546 80.0076Z" fill="currentColor"/><path d="M55 89C69.3594 89 81 77.3594 81 63C81 57.9297 79.5486 53.1983 77.0387 49.1987C82.579 54.7989 86 62.5 86 71C86 88.1208 72.1208 102 55 102C37.8792 102 24 88.1208 24 71C24 62.5 27.421 54.7989 32.9613 49.1987C30.4514 53.1983 29 57.9297 29 63C29 77.3594 40.6406 89 55 89Z" fill="currentColor"/><path d="M73 63C73 72.9411 64.9411 81 55 81C45.0589 81 37 72.9411 37 63C37 53.0589 45.0589 45 55 45C64.9411 45 73 53.0589 73 63Z" fill="currentColor"/></svg>';

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

    function getPersistentCacheKey(source) { return 'cards_style_v13_' + source; }
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

    function calculateLampaRating10(reactions) {
        var weightedSum = 0, totalCount = 0, coefs = { fire: 5, nice: 4, think: 3, bore: 2, shit: 1 };
        for (var i = 0; i < reactions.length; i++) {
            var count = parseInt(reactions[i].counter, 10) || 0;
            var coef = coefs[reactions[i].type] || 0;
            weightedSum += count * coef;
            totalCount += count;
        }
        if (totalCount === 0) return 0;
        var avg = weightedSum / totalCount;
        var r10 = (avg - 1) * 2.5;
        return r10 > 0 ? parseFloat(r10.toFixed(1)) : 0;
    }

    function fetchLampaRating(item, callback) {
        var key = (item.type === 'tv' || item.name || item.first_air_date ? 'tv_' : 'movie_') + item.id;
        var cached = ratingCache.get('lampa_rating', key);
        if (cached) { callback(cached.rating); return; }

        var req = getRequest();
        req.timeout(6000);
        req.silent('https://cubnotrip.top/api/reactions/get/' + key, function (data) {
            releaseRequest(req);
            var rating = 0;
            try {
                if (data && data.result && Array.isArray(data.result)) {
                    rating = calculateLampaRating10(data.result);
                }
            } catch (e) {}
            ratingCache.set('lampa_rating', key, { rating: rating });
            callback(rating);
        }, function () {
            releaseRequest(req);
            ratingCache.set('lampa_rating', key, { rating: 0 });
            callback(0);
        }, false);
    }

    function normalizeQuality(val) {
        var text = String(val || '').toLowerCase();
        if (/camrip|телесинк|telesync|telecine|(^|[^a-zа-яё])ts([^a-zа-яё]|$)|(^|[^а-яё])тс([^а-яё]|$)/i.test(text)) return 'TS';
        if (/2160|4k|uhd/.test(text)) return '4K';
        if (/1080|full\s*hd|fhd/.test(text)) return '1080p';
        if (/720|(^|[^a-zа-яё])hd([^a-zа-яё]|$)/.test(text)) return '720p';
        if (/480|360|(^|[^a-zа-яё])sd([^a-zа-яё]|$)/.test(text)) return 'SD';
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
                var hasCleanDigital = false;
                var hasTS = false;

                for (var i = 0; i < releases.length; i++) {
                    var title = (releases[i].Title || '').toLowerCase();
                    var isCurrentTS = /camrip|телесинк|telesync|telecine|(^|[^a-zа-яё])ts([^a-zа-яё]|$)|(^|[^а-яё])тс([^а-яё]|$)/i.test(title);
                    var isDigital = /web-?dl|web-?rip|bdrip|bluray|hdrip/i.test(title) && !isCurrentTS;

                    if (isCurrentTS) hasTS = true;
                    if (isDigital) hasCleanDigital = true;

                    var r = (releases[i].info && releases[i].info.quality) || 0;
                    if (r > maxRes) maxRes = r;
                }

                if (hasTS && !hasCleanDigital) {
                    quality = 'TS';
                } else if (maxRes >= 2160) {
                    quality = '4K';
                } else if (maxRes >= 1080) {
                    quality = '1080p';
                } else if (maxRes >= 720) {
                    quality = '720p';
                } else if (maxRes > 0) {
                    quality = 'SD';
                } else if (hasTS) {
                    quality = 'TS';
                }
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

    function updateTopLeftBadges(card) {
        var view = card.querySelector('.card__view');
        if (!view) return;
        var data = card.card_data || {};
        var isTV = data.type === 'tv' || data.name || data.first_air_date || data.number_of_seasons > 0 || card.classList.contains('card--tv');
        var year = (data.release_date || data.first_air_date || '').substring(0, 4);

        var old = view.querySelector('.card__clean-top-left');
        if (old) old.remove();

        var wrap = document.createElement('div');
        wrap.className = 'card__clean-top-left';

        var typeEl = document.createElement('div');
        typeEl.className = 'card__clean-type';
        typeEl.textContent = isTV ? 'Сериал' : 'Фильм';
        wrap.appendChild(typeEl);

        if (year) {
            var yearEl = document.createElement('div');
            yearEl.className = 'card__clean-year';
            yearEl.textContent = year;
            wrap.appendChild(yearEl);
        }

        view.appendChild(wrap);
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
            tmdbEl.className = 'vote-row rate--tmdb';
            tmdbEl.innerHTML = '<span class="vote-num">' + tmdbVal + '</span><span class="vote-icon vote-icon--tmdb">' + CARD_TMDB_SVG + '</span>';
            wrap.appendChild(tmdbEl);
        }

        getKinopoiskRating(card.card_data, function (res) {
            if (!document.body.contains(wrap)) return;
            if (res.kp > 0) {
                var kpEl = document.createElement('div');
                kpEl.className = 'vote-row rate--kp';
                kpEl.innerHTML = '<span class="vote-num">' + formatRating(res.kp) + '</span><span class="vote-icon">' + CARD_KP_SVG + '</span>';
                wrap.appendChild(kpEl);
            }
            if (res.imdb > 0) {
                var imdbEl = document.createElement('div');
                imdbEl.className = 'vote-row rate--imdb';
                imdbEl.innerHTML = '<span class="vote-num">' + formatRating(res.imdb) + '</span><span class="vote-icon">' + CARD_IMDB_SVG + '</span>';
                wrap.appendChild(imdbEl);
            }
        });

        fetchLampaRating(card.card_data, function (lRating) {
            if (!document.body.contains(wrap) || lRating <= 0) return;
            var lEl = document.createElement('div');
            lEl.className = 'vote-row rate--lampa';
            lEl.innerHTML = '<span class="vote-num">' + formatRating(lRating) + '</span><span class="vote-icon">' + CARD_LAMPA_SVG + '</span>';
            wrap.appendChild(lEl);
        });
    }

    function updateCard(card) {
        if (!card || !card.card_data) return;
        updateTopLeftBadges(card);
        updateCardQuality(card);
        updateCardRating(card);
    }

    function applyDetailRatingIcons(render, movie) {
        var scope = $(render);
        var rateLine = scope.find('.full-start-new__rate-line, .full-start__rate-line');
        if (!rateLine.length) return;

        var map = [
            { cls: 'rate--tmdb', svg: CARD_TMDB_SVG, name: 'TMDB' },
            { cls: 'rate--imdb', svg: CARD_IMDB_SVG, name: 'IMDB' },
            { cls: 'rate--kp', svg: CARD_KP_SVG, name: 'KP' }
        ];

        map.forEach(function (item) {
            rateLine.find('.' + item.cls + ', .full-start-new__rate, .full-start__rate').each(function () {
                var el = $(this);
                if (el.hasClass(item.cls) || el.find('.' + item.cls).length || el.text().indexOf(item.name) !== -1) {
                    var target = el.find('.source--name');
                    if (!target.length) {
                        target = el.children('div').filter(function () {
                            var t = (this.textContent || '').trim().toUpperCase();
                            return t === item.name || t === '★';
                        }).last();
                    }
                    if (target.length) {
                        target.html('<span class="detail-icon-svg' + (item.name === 'TMDB' ? ' detail-icon-svg--tmdb' : '') + '">' + item.svg + '</span>');
                        target.css({ display: 'inline-flex', opacity: '0.95', color: '#fff' });
                    }
                }
            });
        });

        if (movie && movie.id && !rateLine.find('.clean-detail-lampa-rate').length) {
            fetchLampaRating(movie, function (lRating) {
                if (lRating > 0 && !rateLine.find('.clean-detail-lampa-rate').length) {
                    var lEl = $('<div class="full-start-new__rate full-start__rate clean-detail-lampa-rate rate--lampa">' +
                        '<div>' + formatRating(lRating) + '</div>' +
                        '<div class="source--name" style="display:inline-flex;opacity:0.95;color:#fff;"><span class="detail-icon-svg">' + CARD_LAMPA_SVG + '</span></div>' +
                        '</div>');

                    var lastRate = rateLine.find('.full-start-new__rate:not(.clean-detail-lampa-rate), .full-start__rate:not(.clean-detail-lampa-rate)').last();
                    if (lastRate.length) {
                        lEl.insertAfter(lastRate);
                    } else {
                        var firstStatus = rateLine.find('.full-start__status, .clean-detail-quality').first();
                        if (firstStatus.length) lEl.insertBefore(firstStatus);
                        else rateLine.prepend(lEl);
                    }
                }
            });
        }
    }

    function formatNextEpisodeDate(dateStr) {
        var parts = dateStr.split('-');
        if (parts.length < 3) return dateStr;
        var day = parseInt(parts[2], 10);
        var monthIndex = parseInt(parts[1], 10) - 1;
        var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return day + ' ' + (months[monthIndex] || '');
    }

    function formatDaysLeft(days) {
        var abs = Math.abs(days);
        var d10 = abs % 10;
        var d100 = abs % 100;
        var word = 'дней';
        if (d10 === 1 && d100 !== 11) word = 'день';
        else if (d10 >= 2 && d10 <= 4 && (d100 < 10 || d100 >= 20)) word = 'дня';
        return abs + ' ' + word;
    }

    function getSimpleEpisodeText(ep, movie) {
        if (!ep) return '';
        var s = ep.season_number || 1;
        var e = ep.episode_number || 1;
        var totalInSeason = 0;

        if (movie && movie.seasons && Array.isArray(movie.seasons)) {
            for (var i = 0; i < movie.seasons.length; i++) {
                if (movie.seasons[i].season_number === s) {
                    totalInSeason = movie.seasons[i].episode_count || 0;
                    break;
                }
            }
        }

        return e + (totalInSeason > 0 ? ' из ' + totalInSeason : '');
    }

    function parseDateDiff(dateStr) {
        if (!dateStr) return null;
        var parts = dateStr.split('-');
        if (parts.length < 3) return null;
        var target = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    }

    function cleanGenrePipes(details) {
        details.contents().each(function () {
            if (this.nodeType === 3 && this.nodeValue.indexOf('|') !== -1) {
                this.nodeValue = this.nodeValue.replace(/\s*\|\s*/g, ', ');
            }
        });
        details.find('*').each(function () {
            var el = $(this);
            if (!el.hasClass('clean-next-episode-info') && el.text().indexOf('|') !== -1) {
                el.text(el.text().replace(/\s*\|\s*/g, ', '));
            }
        });
    }

    function renderNextEpisodeInfo(movie, render) {
        if (!movie || !render) return;
        var details = $(render).find('.full-start-new__details, .full-start__details');
        if (!details.length) return;

        cleanGenrePipes(details);

        details.find('.clean-next-episode-info').remove();
        details.contents().filter(function () {
            return this.nodeType === 3 && /Следующая|вышла|Сегодня/i.test(this.nodeValue);
        }).remove();
        details.find('span').filter(function () {
            return /Следующая|вышла|Сегодня/i.test($(this).text());
        }).each(function () {
            var el = $(this);
            el.prev('.full-start-new__split, .full-start__split').remove();
            el.remove();
        });

        var next = movie.next_episode_to_air;
        var last = movie.last_episode_to_air;
        var labelText = '';

        var nextDiff = next && next.air_date ? parseDateDiff(next.air_date) : null;
        var lastDiff = last && last.air_date ? parseDateDiff(last.air_date) : null;

        if (nextDiff !== null) {
            var nextEp = getSimpleEpisodeText(next, movie);
            if (nextDiff === 0 || nextDiff === -1) {
                labelText = 'Сегодня вышла серия: ' + nextEp;
            } else if (nextDiff > 0) {
                labelText = 'Следующая серия: ' + nextEp + ' • ' + formatNextEpisodeDate(next.air_date) + ' (осталось ' + formatDaysLeft(nextDiff) + ')';
            }
        }

        if (!labelText && lastDiff !== null) {
            var lastEp = getSimpleEpisodeText(last, movie);
            if (lastDiff === 0 || lastDiff === -1) {
                labelText = 'Сегодня вышла серия: ' + lastEp;
            }
        }

        if (labelText) {
            var split = $('<span class="full-start-new__split full-start__split clean-next-episode-info clean-split-dot">•</span>');
            var item = $('<span class="clean-next-episode-info">' + labelText + '</span>');
            details.append(split).append(item);
        }
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

    function updateDetailPosterBadge(movie, render) {
        var poster = $(render).find('.full-start-new__poster, .full-start__poster');
        if (!poster.length) return;
        poster.find('.card__type, .card__clean-type, .card__clean-top-left').remove();
        var isTV = movie.number_of_seasons > 0 || movie.seasons || movie.type === 'tv' || movie.name;
        var label = $('<div class="card__clean-type">' + (isTV ? 'Сериал' : 'Фильм') + '</div>');
        poster.css('position', 'relative').append(label);
    }

    function initStyles() {
        if (document.getElementById('cards-style-theme')) return;
        var css = 
            '.card__clean-top-left{position:absolute!important;left:0.3em!important;top:-0.25em!important;z-index:10!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:2px!important;width:fit-content!important}\n' +
            '.card__clean-type{position:static!important;padding:0.18em 0.42em!important;font-size:0.75em!important;font-weight:700!important;color:#fff!important;background:rgba(0,0,0,0.5)!important;border:1px solid rgba(255,255,255,0.18)!important;border-radius:0.3em!important;line-height:1!important;letter-spacing:0.03em!important;text-transform:uppercase!important;box-shadow:0 0.12em 0.35em rgba(0,0,0,0.45)!important;backdrop-filter:blur(5px)!important}\n' +
            '.card__clean-year{position:static!important;padding:0.15em 0.35em!important;font-size:0.68em!important;font-weight:700!important;color:rgba(255,255,255,0.9)!important;background:rgba(0,0,0,0.5)!important;border:1px solid rgba(255,255,255,0.18)!important;border-radius:0.25em!important;line-height:1!important;box-shadow:0 0.12em 0.35em rgba(0,0,0,0.45)!important;backdrop-filter:blur(5px)!important;text-align:center!important}\n' +
            
            '.card__clean-quality{position:absolute!important;left:0.3em!important;bottom:-0.25em!important;z-index:10!important;padding:0.18em 0.38em!important;font-size:0.76em!important;font-weight:700!important;color:#fff!important;background:rgba(0,0,0,0.5)!important;border:1px solid rgba(255,255,255,0.18)!important;border-radius:0.3em!important;line-height:1!important;box-shadow:0 0.12em 0.35em rgba(0,0,0,0.45)!important;backdrop-filter:blur(5px)!important}\n' +
            
            '.card__clean-votes{position:absolute!important;right:-0.25em!important;top:-0.25em!important;bottom:auto!important;z-index:10!important;display:flex!important;flex-direction:column!important;gap:1px!important;padding:0.14em 0.26em!important;background:rgba(0,0,0,0.5)!important;border:1px solid rgba(255,255,255,0.18)!important;border-radius:0.3em!important;box-shadow:0 0.12em 0.35em rgba(0,0,0,0.45)!important;backdrop-filter:blur(5px)!important}\n' +
            '.card__clean-votes .vote-row{display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:2px!important;line-height:1!important}\n' +
            '.card__clean-votes .vote-num{font-size:0.7em!important;font-weight:700!important;color:#fff!important;min-width:1.35em!important;text-align:right!important}\n' +
            '.card__clean-votes .vote-icon{display:inline-flex!important;width:0.8em!important;height:0.8em!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important;color:#fff!important;opacity:0.95!important}\n' +
            '.card__clean-votes .vote-icon svg{width:100%!important;height:100%!important;object-fit:contain!important;display:block!important}\n' +
            '.vote-icon--tmdb{transform:translateY(-0.5px)!important}\n' +
            
            '.detail-icon-svg{display:inline-flex!important;width:1.25em!important;height:1.25em!important;align-items:center!important;justify-content:center!important;vertical-align:middle!important;color:#fff!important;opacity:0.95!important}\n' +
            '.detail-icon-svg svg{width:100%!important;height:100%!important;object-fit:contain!important;display:block!important}\n' +
            '.detail-icon-svg--tmdb{transform:translateY(-0.5px)!important}\n' +
            
            '.clean-detail-quality{margin-left:0!important}\n' +
            '.full-start-new__rate-line, .full-start__rate-line{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:0.25em!important}\n' +
            '.full-start-new__rate-line .full-start__status, .full-start__rate-line .full-start__status, .full-start-new__rate, .full-start__rate{margin:0!important}\n' +
            '.full-start-new__reactions, .full-start__reactions, .reactions{filter:grayscale(100%) contrast(150%) brightness(1.15)!important;opacity:0.9!important}\n' +
            '.card .card__type,.card .card__quality,.card .card__vote{display:none!important}\n' +
            '.full-start__status,.full-start-new__rate,.full-start__rate{color:#fff!important}\n' +
            '.full-start-new__rate > div, .full-start__rate > div{color:#fff!important}\n' +
            '.clean-split-dot{font-size:1.15em!important;font-weight:700!important;opacity:0.85!important;margin:0 0.35em!important}\n';
        
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
                    updateDetailPosterBadge(movie, render);
                    applyDetailRatingIcons(render, movie);
                    renderDetailQuality(movie, render);
                    renderNextEpisodeInfo(movie, render);

                    var retries = [50, 150, 300, 700, 1500];
                    retries.forEach(function (t) {
                        setTimeout(function () {
                            if (document.body.contains(render[0] || render)) {
                                updateDetailPosterBadge(movie, render);
                                applyDetailRatingIcons(render, movie);
                                renderDetailQuality(movie, render);
                            }
                        }, t);
                    });
                }
            }
        });

        setInterval(function () {
            var cards = document.querySelectorAll('.card:not([data-clean-observed])');
            for (var i = 0; i < cards.length; i++) {
                cards[i].setAttribute('data-clean-observed', '1');
                if (cards[i].card_data) updateCard(cards[i]);
            }

            var fullRender = document.querySelector('.full-start-new, .full-start');
            if (fullRender) {
                var act = Lampa.Activity && Lampa.Activity.active && Lampa.Activity.active();
                var curMovie = (act && act.movie) || null;
                applyDetailRatingIcons(fullRender, curMovie);
            }
        }, 300);
    }

    var manifest = {
        name: 'Cards Style',
        version: '1.2.2',
        description: 'Классический стиль карточек, центрированный год, выровненные рейтинги и статус выхода серий'
    };

    if (Array.isArray(Lampa.Manifest.plugins)) Lampa.Manifest.plugins.push(manifest);
    else if (Lampa.Manifest.plugins) Lampa.Manifest.plugins = [Lampa.Manifest.plugins, manifest];
    else Lampa.Manifest.plugins = manifest;

    if (window.appready) init();
    else Lampa.Listener.follow('app', function (e) { if (e.type === 'ready') init(); });
})();
