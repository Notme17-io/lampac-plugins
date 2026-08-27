(function () {
    'use strict';

    var KP_API_URL = 'https://kinopoiskapiunofficial.tech/';
    var QUALITY_CACHE_KEY = 'qualview_quality_cache';
    var QUALITY_API_DOMAIN = 'jr.maxvol.pro';

    var CARD_TMDB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><defs><linearGradient id="cTmdbG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#90cea1"/><stop offset="56%" stop-color="#3cbec9"/><stop offset="100%" stop-color="#00b3e5"/></linearGradient><style>.c-tm-t{font-weight:bold;fill:url(#cTmdbG);text-anchor:start;dominant-baseline:middle;font-size:70px;}</style></defs><text class="c-tm-t" x="0" y="50" textLength="150" lengthAdjust="spacingAndGlyphs">TM</text><text class="c-tm-t" x="0" y="120" textLength="150" lengthAdjust="spacingAndGlyphs">DB</text></svg>';

    var CARD_IMDB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><path fill="#F5C518" d="M18.43,0h86.02c10.18,0 18.43,8.25 18.43,18.43v86.02c0 10.18-8.25 18.43-18.43 18.43H18.43C8.25,122.88 0,114.63 0,104.45l0-86.02C0,8.25 8.25,0 18.43,0z"/><path fill="#000" d="M24.96,78.72V44.16h-9.6v34.56H24.96z M45.36,44.16L43.2,60.24L42,51.6l-1.2-7.44h-12v34.56h8.16v-22.8l3.36,22.8h6l3.12-23.28v23.28h8.16V44.16H45.36z M61.44,78.72V44.16h14.88c3.6,0 6.24,2.64 6.24,6v22.56c0,3.36-2.64,6-6.24,6H61.44z M72.72,50.4l-2.16-.24v22.56c1.2,0 2.16-.24 2.4-.72c.48-.48.48-1.92.48-4.32V54.24v-2.88L72.72,50.4z M100.56,52.8h.72c3.36,0 6.24,2.64 6.24,6v13.92c0,3.36-2.88,6-6.24,6h-.72c-1.92,0-3.84-.96-5.04-2.64l-.48,2.16H86.4V44.16h9.12V55.2C96.72,53.76,98.64,52.8,100.56,52.8z M98.64,69.6v-8.16L98.4,58.8c-.24-.48-.96-.72-1.44-.72-.48,0-1.2.24-1.44.72v13.68c.24.48.96.72 1.44.72.48,0 1.44-.24 1.44-.72L98.64,69.6z"/></svg>';

    var CARD_KP_SVG = '<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="cKpM" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="300"><circle cx="150" cy="150" r="150" fill="white"/></mask><g mask="url(#cKpM)"><circle cx="150" cy="150" r="150" fill="black"/><path d="M300 45L145.26 127.827L225.9 45H181.2L126.3 121.203V45H89.9999V255H126.3V178.92L181.2 255H225.9L147.354 174.777L300 255V216L160.776 160.146L300 169.5V130.5L161.658 139.494L300 84V45Z" fill="url(#cKpG)"/></g><defs><radialGradient id="cKpG" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(89.9999 45) rotate(45) scale(296.985)"><stop offset="0.5" stop-color="#FF5500"/><stop offset="1" stop-color="#BBFF00"/></radialGradient></defs></svg>';

    var CARD_LAMPA_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="110" height="104" viewBox="0 0 110 104" fill="none"><path d="M81.6744 103.11C98.5682 93.7234 110 75.6967 110 55C110 24.6243 85.3757 0 55 0C24.6243 0 0 24.6243 0 55C0 75.6967 11.4318 93.7234 28.3255 103.11C14.8869 94.3724 6 79.224 6 62C6 34.938 27.938 13 55 13C82.062 13 104 34.938 104 62C104 79.224 95.1131 94.3725 81.6744 103.11Z" fill="white"/><path d="M92.9546 80.0076C95.5485 74.5501 97 68.4446 97 62C97 38.804 78.196 20 55 20C31.804 20 13 38.804 13 62C13 68.4446 14.4515 74.5501 17.0454 80.0076C16.3618 77.1161 16 74.1003 16 71C16 49.4609 33.4609 32 55 32C76.5391 32 94 49.4609 94 71C94 74.1003 93.6382 77.1161 92.9544 80.0076Z" fill="white"/><path d="M55 89C69.3594 89 81 77.3594 81 63C81 57.9297 79.5486 53.1983 77.0387 49.1987C82.579 54.7989 86 62.5 86 71C86 88.1208 72.1208 102 55 102C37.8792 102 24 88.1208 24 71C24 62.5 27.421 54.7989 32.9613 49.1987C30.4514 53.1983 29 57.9297 29 63C29 77.3594 40.6406 89 55 89Z" fill="white"/><path d="M73 63C73 72.9411 64.9411 81 55 81C45.0589 81 37 72.9411 37 63C37 53.0589 45.0589 45 55 45C64.9411 45 73 53.0589 73 63Z" fill="white"/></svg>';


    function _b64raw(str) {
        if (typeof atob === 'function') {
            try {
                return atob(str);
            } catch (e) {
                logErr(e);
            }
        }

        var b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        str = String(str)
            .replace(/=+$/, '')
            .replace(/[^A-Za-z0-9+/]/g, '');

        var out = '';
        var bits = 0;
        var acc = 0;

        for (var i = 0; i < str.length; i++) {
            acc = (acc << 6) | b.indexOf(str.charAt(i));
            bits += 6;

            if (bits >= 8) {
                bits -= 8;
                out += String.fromCharCode((acc >> bits) & 0xFF);
            }
        }

        return out;
    }


    function _decodeAllohaServers() {
        var _d = 'OBpQET0aR0hOCQ0XEQFeYFkEAgVPGBMDBwMuGglcAxMeQU1QECAdABxOW1tbBRNVLE8HFwgAQFZVR1V4QldEWAUaWgdEVy5BUhZOHFUYQwcWI1RfUAQVDRMSSEtgAxUcQhINFg0eSjcPH1BAQw0MChcKbUxHFl9QTldVQ1d6TwBHXFQaUFVBB31GU0EJBRpaVhdTbQs4';
        var _k = 'cardOverlay';

        try {
            var raw = _b64raw(_d);
            var out = '';

            for (var i = 0; i < raw.length; i++) {
                out += String.fromCharCode(
                    raw.charCodeAt(i) ^ _k.charCodeAt(i % _k.length)
                );
            }

            return JSON.parse(out);
        } catch (e) {
            return [];
        }
    }


    var ALLOHA_API_SERVERS = _decodeAllohaServers();

    var CACHE_TTL = 24 * 60 * 60 * 1000;
    var CACHE_EMPTY_TTL = 3 * 60 * 60 * 1000;
    var CACHE_NETWORK_ERROR_TTL = 45 * 1000;

    var DEBUG = false;


    function logErr(e) {
        if (!DEBUG) return;

        try {
            console.error('[cards_style]', e);
        } catch (e2) {}
    }


    var ratingCache = {
        caches: {},

        get: function (source, key) {
            var cache = this.caches[source] ||
                (this.caches[source] = loadPersistentCache(source));

            var data = cache[key];

            if (!data) return null;

            var ttl = data._failed
                ? CACHE_NETWORK_ERROR_TTL
                : (data._empty ? CACHE_EMPTY_TTL : CACHE_TTL);

            if (Date.now() - data.timestamp > ttl) {
                delete cache[key];
                debouncedSave(source, cache);
                return null;
            }

            return data;
        },

        set: function (source, key, value) {
            var cache = this.caches[source] ||
                (this.caches[source] = loadPersistentCache(source));

            value.timestamp = Date.now();
            cache[key] = value;

            debouncedSave(source, cache);

            return value;
        }
    };


    function getPersistentCacheKey(source) {
        return 'cards_style_cache_' + source;
    }


    function loadPersistentCache(source) {
        var stored = null;

        try {
            stored = Lampa.Storage.get(
                getPersistentCacheKey(source),
                null
            );
        } catch (e) {
            logErr(e);
        }

        return (stored && typeof stored === 'object')
            ? stored
            : {};
    }


    var _saveStates = Object.create(null);


    function debouncedSave(source, cache) {
        var key = getPersistentCacheKey(source);

        var state = _saveStates[key] ||
            (_saveStates[key] = {
                timer: 0,
                cache: cache
            });

        state.cache = cache;

        if (state.timer) {
            clearTimeout(state.timer);
        }

        state.timer = setTimeout(function () {
            state.timer = 0;

            try {
                Lampa.Storage.set(key, state.cache);
            } catch (e) {
                logErr(e);
            }
        }, 2000);
    }


    var requestPool = [];


    function getRequest() {
        return requestPool.pop() || new Lampa.Reguest();
    }


    function releaseRequest(req) {
        req.clear();

        if (requestPool.length < 5) {
            requestPool.push(req);
        }
    }


    function getKpApiKey() {
        return String(
            Lampa.Storage.get('rating_kp_api_key', '') ||
            Lampa.Storage.get('source_api_key', '') ||
            ''
        ).trim();
    }


    function formatRating(value) {
        var n = parseFloat(value);

        if (isNaN(n) || n <= 0) {
            return '0.0';
        }

        return n === 10 ? '10' : n.toFixed(1);
    }


    function getTmdbRating(data) {
        var rating = parseFloat(data && data.vote_average) || 0;

        return rating > 0
            ? rating.toFixed(1)
            : '0.0';
    }


    function getKinopoiskRating(item, callback) {
        var kpKey =
            (item.type === 'tv' || item.name ? 'tv_' : 'movie_') +
            item.id;

        if (item.kp_rating > 0 || item.imdb_rating > 0) {
            callback({
                kp: parseFloat(item.kp_rating) || 0,
                imdb: parseFloat(item.imdb_rating) || 0
            });

            return;
        }

        var cached = ratingCache.get('kp_rating', kpKey);

        if (cached) {
            callback(cached);
            return;
        }

        var apiKey = getKpApiKey();

        if (!apiKey) {
            callback({
                kp: 0,
                imdb: 0
            });

            return;
        }

        var req = getRequest();

        req.timeout(5000);

        var searchUrl = item.kinopoisk_id
            ? KP_API_URL + 'api/v2.2/films/' + item.kinopoisk_id
            : KP_API_URL +
              'api/v2.1/films/search-by-keyword?keyword=' +
              encodeURIComponent(item.title || item.name || '');

        req.silent(
            searchUrl,

            function (data) {
                releaseRequest(req);

                var res = {
                    kp: 0,
                    imdb: 0
                };

                if (data && data.ratingKinopoisk) {
                    res.kp = parseFloat(data.ratingKinopoisk) || 0;
                    res.imdb = parseFloat(data.ratingImdb) || 0;
                } else if (
                    data &&
                    (data.films || data.items) &&
                    (data.films || data.items).length
                ) {
                    var best = (data.films || data.items)[0];

                    res.kp =
                        parseFloat(
                            best.rating || best.ratingKinopoisk
                        ) || 0;

                    res.imdb =
                        parseFloat(best.ratingImdb) || 0;
                }

                ratingCache.set(
                    'kp_rating',
                    kpKey,
                    res
                );

                callback(res);
            },

            function () {
                releaseRequest(req);

                callback({
                    kp: 0,
                    imdb: 0
                });
            },

            false,
            {
                headers: {
                    'X-API-KEY': apiKey
                }
            }
        );
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

        var cached = ratingCache.get(
            'quality',
            cacheKey
        );

        if (cached) {
            callback(cached.quality);
            return;
        }

        var releaseYear =
            (item.release_date ||
             item.first_air_date ||
             '').substring(0, 4);

        var uniqueId =
            Lampa.Storage.get('lampac_unic_id', '');

        var jacUrl =
            'https://' +
            QUALITY_API_DOMAIN +
            '/api/v2.0/indexers/all/results?apikey=&uid=' +
            uniqueId +
            '&year=' +
            releaseYear +
            '&title=' +
            encodeURIComponent(
                item.title || item.name || ''
            );

        var req = getRequest();

        req.timeout(6000);

        req.silent(
            jacUrl,

            function (resp) {
                releaseRequest(req);

                var quality = null;

                try {
                    var data =
                        typeof resp === 'string'
                            ? JSON.parse(resp)
                            : resp;

                    var releases =
                        (data && data.Results) || [];

                    var maxRes = 0;

                    for (
                        var i = 0;
                        i < releases.length;
                        i++
                    ) {
                        var r =
                            (releases[i].info &&
                             releases[i].info.quality) ||
                            0;

                        if (r > maxRes) {
                            maxRes = r;
                        }
                    }

                    if (maxRes >= 2160) {
                        quality = '4K';
                    } else if (maxRes >= 1080) {
                        quality = 'FHD';
                    } else if (maxRes >= 720) {
                        quality = 'HD';
                    } else if (maxRes > 0) {
                        quality = 'SD';
                    }
                } catch (e) {}

                if (
                    !quality &&
                    ALLOHA_API_SERVERS.length
                ) {
                    var server =
                        ALLOHA_API_SERVERS[0];

                    var allohaUrl =
                        server.url +
                        '?token=' +
                        server.token +
                        '&tmdb=' +
                        encodeURIComponent(item.id);

                    var reqA = getRequest();

                    reqA.timeout(4000);

                    reqA.silent(
                        allohaUrl,

                        function (aResp) {
                            releaseRequest(reqA);

                            try {
                                var aData =
                                    typeof aResp === 'string'
                                        ? JSON.parse(aResp)
                                        : aResp;

                                if (
                                    aData &&
                                    aData.data
                                ) {
                                    quality =
                                        aData.data.uhd
                                            ? '4K'
                                            : normalizeQuality(
                                                aData.data.quality
                                            );
                                }
                            } catch (e) {}

                            ratingCache.set(
                                'quality',
                                cacheKey,
                                {
                                    quality: quality
                                }
                            );

                            callback(quality);
                        },

                        function () {
                            releaseRequest(reqA);

                            ratingCache.set(
                                'quality',
                                cacheKey,
                                {
                                    quality: null
                                }
                            );

                            callback(null);
                        }
                    );
                } else {
                    ratingCache.set(
                        'quality',
                        cacheKey,
                        {
                            quality: quality
                        }
                    );

                    callback(quality);
                }
            },

            function () {
                releaseRequest(req);
                callback(null);
            }
        );
    }


    /*
     * ------------------------------------------------------------
     * ТИП КАРТОЧКИ
     * ------------------------------------------------------------
     *
     * Всегда:
     *   фильм  -> Фильм
     *   сериал -> Сериал
     *
     * Никаких TV.
     */

    function addTypeLabel(card) {
        var view = card.querySelector('.card__view');

        if (!view) return;

        var data = card.card_data || {};

        var isTV =
            data.type === 'tv' ||
            data.name ||
            data.first_air_date ||
            data.number_of_seasons > 0 ||
            card.classList.contains('card--tv');

        var old =
            view.querySelector('.card__clean-type');

        if (old) {
            old.remove();
        }

        /*
         * Удаляем нативный тип Lampa,
         * чтобы не было одновременно TV + Сериал.
         */
        var nativeType =
            view.querySelector(
                '.card__type'
            );

        if (nativeType) {
            nativeType.style.display = 'none';
        }

        var label =
            document.createElement('div');

        label.className =
            'card__clean-type ' +
            (
                isTV
                    ? 'clean-type--tv'
                    : 'clean-type--movie'
            );

        label.textContent =
            isTV
                ? 'Сериал'
                : 'Фильм';

        view.appendChild(label);
    }


    function updateCardQuality(card) {
        var view =
            card.querySelector('.card__view');

        if (
            !view ||
            !card.card_data ||
            !card.card_data.id
        ) {
            return;
        }

        var old =
            view.querySelector(
                '.card__clean-quality'
            );

        if (old) {
            old.remove();
        }

        fetchQuality(
            card.card_data,

            function (quality) {
                if (
                    !quality ||
                    !document.body.contains(card)
                ) {
                    return;
                }

                var qEl =
                    document.createElement('div');

                qEl.className =
                    'card__clean-quality';

                qEl.textContent =
                    quality;

                view.appendChild(qEl);
            }
        );
    }


    function updateCardRating(card) {
        var view =
            card.querySelector('.card__view');

        if (
            !view ||
            !card.card_data ||
            !card.card_data.id
        ) {
            return;
        }

        var old =
            view.querySelector(
                '.card__clean-votes'
            );

        if (old) {
            old.remove();
        }

        var wrap =
            document.createElement('div');

        wrap.className =
            'card__clean-votes';

        view.appendChild(wrap);

        var tmdbVal =
            getTmdbRating(
                card.card_data
            );

        if (tmdbVal !== '0.0') {
            var tmdbEl =
                document.createElement('div');

            tmdbEl.className =
                'vote-row';

            tmdbEl.innerHTML =
                '<span class="vote-num">' +
                tmdbVal +
                '</span>' +
                '<span class="vote-icon">' +
                CARD_TMDB_SVG +
                '</span>';

            wrap.appendChild(tmdbEl);
        }

        getKinopoiskRating(
            card.card_data,

            function (res) {
                if (
                    !document.body.contains(wrap)
                ) {
                    return;
                }

                if (res.kp > 0) {
                    var kpEl =
                        document.createElement('div');

                    kpEl.className =
                        'vote-row';

                    kpEl.innerHTML =
                        '<span class="vote-num">' +
                        formatRating(res.kp) +
                        '</span>' +
                        '<span class="vote-icon">' +
                        CARD_KP_SVG +
                        '</span>';

                    wrap.appendChild(kpEl);
                }

                if (res.imdb > 0) {
                    var imdbEl =
                        document.createElement('div');

                    imdbEl.className =
                        'vote-row';

                    imdbEl.innerHTML =
                        '<span class="vote-num">' +
                        formatRating(res.imdb) +
                        '</span>' +
                        '<span class="vote-icon">' +
                        CARD_IMDB_SVG +
                        '</span>';

                    wrap.appendChild(imdbEl);
                }
            }
        );
    }


    function updateCard(card) {
        if (
            !card ||
            !card.card_data
        ) {
            return;
        }

        addTypeLabel(card);
        updateCardQuality(card);
        updateCardRating(card);
    }


    /*
     * ------------------------------------------------------------
     * РЕЙТИНГИ НА СТРАНИЦЕ ФИЛЬМА / СЕРИАЛА
     * ------------------------------------------------------------
     */

    function applyDetailRatingIcons(render) {
        var scope = $(render);

        var map = {
            'rate--tmdb': CARD_TMDB_SVG,
            'rate--imdb': CARD_IMDB_SVG,
            'rate--kp': CARD_KP_SVG,
            'rate--lampa': CARD_LAMPA_SVG
        };

        for (var key in map) {
            scope
                .find('.' + key)
                .each(function () {
                    var el = $(this);

                    el.addClass(
                        'clean-detail-rate'
                    );

                    var target =
                        el.find(
                            '.source--name'
                        );

                    if (!target.length) {
                        target =
                            el.children('div')
                                .filter(function () {
                                    var text =
                                        (
                                            this.textContent ||
                                            ''
                                        )
                                            .trim()
                                            .toUpperCase();

                                    return (
                                        text === 'TMDB' ||
                                        text === 'IMDB' ||
                                        text === 'KP' ||
                                        text === 'LAMPA' ||
                                        text === '★'
                                    );
                                })
                                .last();
                    }

                    if (target.length) {
                        target
                            .addClass(
                                'clean-icon-applied'
                            )
                            .html(
                                '<span class="detail-icon-svg">' +
                                map[key] +
                                '</span>'
                            );
                    } else if (
                        !el.find(
                            '.clean-generated-icon'
                        ).length
                    ) {
                        el.prepend(
                            '<span class="detail-icon-svg clean-generated-icon">' +
                            map[key] +
                            '</span>'
                        );
                    }
                });
        }
    }


    /*
     * ------------------------------------------------------------
     * ФИЛЬМ / СЕРИАЛ НА СТРАНИЦЕ ПРОСМОТРА
     * ------------------------------------------------------------
     */

    function renderDetailType(movie, render) {
        if (!movie || !render) {
            return;
        }

        var isTV =
            movie.type === 'tv' ||
            movie.name ||
            movie.first_air_date ||
            movie.number_of_seasons > 0;

        var target =
            $(render).find(
                '.full-start-new__rate-line, .full-start__rate-line'
            );

        if (!target.length) {
            return;
        }

        target
            .find('.clean-detail-type')
            .remove();

        /*
         * Удаляем возможный старый TV / Film,
         * чтобы не было дубля.
         */
        target
            .find(
                '.card__type,' +
                '.full-start__type,' +
                '.full-start-new__type'
            )
            .remove();

        var type =
            $(
                '<div class="clean-detail-type">' +
                (
                    isTV
                        ? 'Сериал'
                        : 'Фильм'
                ) +
                '</div>'
            );

        target.prepend(type);
    }


    function renderDetailQuality(movie, render) {
        fetchQuality(
            movie,

            function (quality) {
                if (!quality) {
                    return;
                }

                var target =
                    $(render).find(
                        '.full-start-new__rate-line, .full-start__rate-line'
                    );

                if (target.length) {
                    target
                        .find(
                            '.clean-detail-quality'
                        )
                        .remove();

                    target.append(
                        '<div class="full-start__status clean-detail-quality">' +
                        '<span class="quality-dot"></span>' +
                        quality +
                        '</div>'
                    );
                }
            }
        );
    }


    /*
     * ------------------------------------------------------------
     * СТИЛИ
     * ------------------------------------------------------------
     */

    function initStyles() {
        if (
            document.getElementById(
                'cards-style-theme'
            )
        ) {
            return;
        }

        var css =

            /*
             * --------------------------------------------------
             * ТИП НА КАРТОЧКЕ
             * --------------------------------------------------
             *
             * Сделано максимально близко к оригинальной
             * выступающей плашке Lampa.
             *
             * Ч/Б вместо красного/синего.
             */

            '.card__clean-type{' +
                'position:absolute!important;' +
                'left:0!important;' +
                'top:0!important;' +
                'z-index:20!important;' +
                'padding:.42em .72em .46em!important;' +
                'font-size:.72em!important;' +
                'font-weight:700!important;' +
                'color:#fff!important;' +
                'background:rgba(0,0,0,.78)!important;' +
                'border:1px solid rgba(255,255,255,.28)!important;' +
                'border-left:0!important;' +
                'border-top:0!important;' +
                'border-radius:0 0 .65em 0!important;' +
                'line-height:1!important;' +
                'letter-spacing:.035em!important;' +
                'box-shadow:0 3px 12px rgba(0,0,0,.35)!important;' +
                'text-shadow:0 1px 2px rgba(0,0,0,.55)!important;' +
                'backdrop-filter:blur(7px)!important;' +
                '-webkit-backdrop-filter:blur(7px)!important;' +
            '}' +

            '.clean-type--tv,' +
            '.clean-type--movie{' +
                'background:rgba(0,0,0,.78)!important;' +
                'color:#fff!important;' +
            '}' +


            /*
             * --------------------------------------------------
             * ТИП НА СТРАНИЦЕ ФИЛЬМА
             * --------------------------------------------------
             */

            '.clean-detail-type{' +
                'display:inline-flex!important;' +
                'align-items:center!important;' +
                'justify-content:center!important;' +
                'min-height:1.85em!important;' +
                'padding:.2em .62em!important;' +
                'margin:0 .28em .18em 0!important;' +
                'border:1px solid rgba(255,255,255,.22)!important;' +
                'background:rgba(0,0,0,.48)!important;' +
                'color:#fff!important;' +
                'border-radius:.48em!important;' +
                'font-size:.82em!important;' +
                'font-weight:700!important;' +
                'line-height:1!important;' +
                'vertical-align:middle!important;' +
                'box-shadow:0 2px 10px rgba(0,0,0,.16)!important;' +
                'backdrop-filter:blur(6px)!important;' +
                '-webkit-backdrop-filter:blur(6px)!important;' +
            '}' +


            /*
             * --------------------------------------------------
             * КАЧЕСТВО НА КАРТОЧКЕ
             * --------------------------------------------------
             */

            '.card__clean-quality{' +
                'position:absolute!important;' +
                'left:0!important;' +
                'bottom:0!important;' +
                'z-index:10!important;' +
                'padding:.34em .62em!important;' +
                'font-size:.72em!important;' +
                'font-weight:700!important;' +
                'color:#fff!important;' +
                'background:rgba(8,8,10,.78)!important;' +
                'border:1px solid rgba(255,255,255,.12)!important;' +
                'border-left:0!important;' +
                'border-bottom:0!important;' +
                'border-radius:0 .55em 0 0!important;' +
                'line-height:1!important;' +
                'letter-spacing:.01em!important;' +
                'box-shadow:0 -2px 8px rgba(0,0,0,.16)!important;' +
                'backdrop-filter:blur(7px)!important;' +
                '-webkit-backdrop-filter:blur(7px)!important;' +
            '}' +


            /*
             * --------------------------------------------------
             * РЕЙТИНГИ НА КАРТОЧКЕ
             * --------------------------------------------------
             */

            '.card__clean-votes{' +
                'position:absolute!important;' +
                'right:0!important;' +
                'bottom:0!important;' +
                'z-index:10!important;' +
                'display:flex!important;' +
                'flex-direction:column!important;' +
                'gap:3px!important;' +
                'padding:.34em .42em!important;' +
                'background:rgba(8,8,10,.78)!important;' +
                'border:1px solid rgba(255,255,255,.12)!important;' +
                'border-right:0!important;' +
                'border-bottom:0!important;' +
                'border-radius:.55em 0 0 0!important;' +
                'box-shadow:0 -2px 8px rgba(0,0,0,.16)!important;' +
                'backdrop-filter:blur(7px)!important;' +
                '-webkit-backdrop-filter:blur(7px)!important;' +
            '}' +

            '.card__clean-votes .vote-row{' +
                'display:flex!important;' +
                'align-items:center!important;' +
                'justify-content:flex-end!important;' +
                'gap:4px!important;' +
                'line-height:1!important;' +
                'min-height:1.05em!important;' +
            '}' +

            '.card__clean-votes .vote-num{' +
                'font-size:.70em!important;' +
                'font-weight:700!important;' +
                'color:rgba(255,255,255,.96)!important;' +
                'min-width:1.8em!important;' +
                'text-align:right!important;' +
                'font-variant-numeric:tabular-nums!important;' +
            '}' +

            '.card__clean-votes .vote-icon{' +
                'display:inline-flex!important;' +
                'width:1.02em!important;' +
                'height:1.02em!important;' +
                'align-items:center!important;' +
                'justify-content:center!important;' +
                'flex-shrink:0!important;' +
            '}' +

            '.card__clean-votes .vote-icon svg{' +
                'width:100%!important;' +
                'height:100%!important;' +
                'object-fit:contain!important;' +
                'display:block!important;' +
            '}' +


            /*
             * --------------------------------------------------
             * РЕЙТИНГИ НА СТРАНИЦЕ ФИЛЬМА
             * --------------------------------------------------
             */

            '.clean-detail-rate{' +
                'display:inline-flex!important;' +
                'align-items:center!important;' +
                'gap:.38em!important;' +
                'min-height:1.85em!important;' +
                'padding:.16em .52em!important;' +
                'margin:0 .22em .18em 0!important;' +
                'border:1px solid rgba(255,255,255,.12)!important;' +
                'background:rgba(0,0,0,.28)!important;' +
                'border-radius:.48em!important;' +
                'box-shadow:0 2px 10px rgba(0,0,0,.12)!important;' +
                'vertical-align:middle!important;' +
                'line-height:1!important;' +
                'backdrop-filter:blur(6px)!important;' +
                '-webkit-backdrop-filter:blur(6px)!important;' +
            '}' +

            '.clean-detail-rate > *{' +
                'flex-shrink:0!important;' +
            '}' +

            '.detail-icon-svg{' +
                'display:inline-flex!important;' +
                'width:1.22em!important;' +
                'height:1.22em!important;' +
                'align-items:center!important;' +
                'justify-content:center!important;' +
                'vertical-align:middle!important;' +
            '}' +

            '.detail-icon-svg svg{' +
                'width:100%!important;' +
                'height:100%!important;' +
                'display:block!important;' +
                'object-fit:contain!important;' +
            '}' +

            '.clean-icon-applied{' +
                'font-size:0!important;' +
                'color:transparent!important;' +
                'display:inline-flex!important;' +
                'align-items:center!important;' +
                'justify-content:center!important;' +
                'margin:0!important;' +
                'width:1.22em!important;' +
                'height:1.22em!important;' +
            '}' +

            '.clean-generated-icon{' +
                'margin:0!important;' +
            '}' +

            '.clean-detail-rate .source--value,' +
            '.clean-detail-rate .source--rating,' +
            '.clean-detail-rate .source--rate{' +
                'font-size:.9em!important;' +
                'font-weight:700!important;' +
                'color:#fff!important;' +
                'font-variant-numeric:tabular-nums!important;' +
            '}' +


            /*
             * --------------------------------------------------
             * КАЧЕСТВО НА СТРАНИЦЕ ФИЛЬМА
             * --------------------------------------------------
             */

            '.clean-detail-quality{' +
                'display:inline-flex!important;' +
                'align-items:center!important;' +
                'gap:.42em!important;' +
                'border:1px solid rgba(255,255,255,.14)!important;' +
                'background:rgba(255,255,255,.09)!important;' +
                'color:#fff!important;' +
                'border-radius:.48em!important;' +
                'padding:.26em .58em!important;' +
                'margin:0 0 .18em .12em!important;' +
                'font-size:.82em!important;' +
                'font-weight:700!important;' +
                'line-height:1!important;' +
                'vertical-align:middle!important;' +
                'box-shadow:0 2px 10px rgba(0,0,0,.12)!important;' +
                'backdrop-filter:blur(6px)!important;' +
                '-webkit-backdrop-filter:blur(6px)!important;' +
            '}' +

            '.quality-dot{' +
                'width:.42em!important;' +
                'height:.42em!important;' +
                'border-radius:50%!important;' +
                'background:currentColor!important;' +
                'opacity:.7!important;' +
                'display:inline-block!important;' +
                'box-shadow:0 0 0 .18em rgba(255,255,255,.08)!important;' +
            '}' +


            /*
             * --------------------------------------------------
             * УДАЛЯЕМ СТАРЫЕ ДУБЛИ
             * --------------------------------------------------
             */

            '.card .card__type,' +
            '.card .card__quality,' +
            '.card .card__vote{' +
                'display:none!important;' +
            '}' +

            '.full-start__status,' +
            '.full-start-new__rate,' +
            '.full-start__rate{' +
                'color:#fff!important;' +
            '}' +

            '.full-start-new__rate > div,' +
            '.full-start__rate > div{' +
                'color:#fff!important;' +
            '}' +

            '.full-start-new__rate-line,' +
            '.full-start__rate-line{' +
                'display:flex!important;' +
                'align-items:center!important;' +
                'flex-wrap:wrap!important;' +
                'gap:0!important;' +
            '}' +

            '.full-start-new__rate-line > .clean-detail-rate,' +
            '.full-start__rate-line > .clean-detail-rate{' +
                'margin-right:.28em!important;' +
            '}' +

            '.clean-next-episode-info{' +
                'color:rgba(255,255,255,.86)!important;' +
            '}';


        var style =
            document.createElement('style');

        style.id =
            'cards-style-theme';

        style.type =
            'text/css';

        style.appendChild(
            document.createTextNode(css)
        );

        document.head.appendChild(style);
    }


    /*
     * ------------------------------------------------------------
     * INIT
     * ------------------------------------------------------------
     */

    function init() {
        initStyles();


        Lampa.Listener.follow(
            'card',

            function (e) {
                if (
                    e.type === 'build' &&
                    e.object &&
                    e.object.card
                ) {
                    var card =
                        e.object.card;

                    var data =
                        card.card_data ||
                        e.object.data;

                    if (data) {
                        card.card_data =
                            data;

                        updateCard(card);
                    }
                }
            }
        );


        Lampa.Listener.follow(
            'full',

            function (e) {
                if (
                    e.type === 'complite' &&
                    e.object &&
                    e.object.activity
                ) {
                    var render =
                        e.object.activity.render();

                    var movie =
                        e.data &&
                        e.data.movie;

                    if (
                        render &&
                        movie
                    ) {
                        applyDetailRatingIcons(
                            render
                        );

                        renderDetailType(
                            movie,
                            render
                        );

                        renderDetailQuality(
                            movie,
                            render
                        );

                        renderNextEpisodeInfo(
                            movie,
                            render
                        );
                    }
                }
            }
        );


        setInterval(
            function () {
                var cards =
                    document.querySelectorAll(
                        '.card:not([data-clean-observed])'
                    );

                for (
                    var i = 0;
                    i < cards.length;
                    i++
                ) {
                    cards[i].setAttribute(
                        'data-clean-observed',
                        '1'
                    );

                    if (
                        cards[i].card_data
                    ) {
                        updateCard(
                            cards[i]
                        );
                    }
                }
            },
            300
        );
    }


    var manifest = {
        name: 'Cards Style',
        version: '1.1.1',
        description:
            'Чёрно-белый стиль карточек: Фильм / Сериал, рейтинги, качество и даты выхода серий'
    };


    if (
        Array.isArray(
            Lampa.Manifest.plugins
        )
    ) {
        Lampa.Manifest.plugins.push(
            manifest
        );
    } else if (
        Lampa.Manifest.plugins
    ) {
        Lampa.Manifest.plugins = [
            Lampa.Manifest.plugins,
            manifest
        ];
    } else {
        Lampa.Manifest.plugins =
            manifest;
    }


    if (window.appready) {
        init();
    } else {
        Lampa.Listener.follow(
            'app',

            function (e) {
                if (e.type === 'ready') {
                    init();
                }
            }
        );
    }

})();
