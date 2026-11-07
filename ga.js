/* thanapong.com visit statistics: Google Analytics 4, only after the visitor agrees (v1, 2026-11-07).
   Loaded by index.html with  <script src="/ga.js" defer></script>
   - GA_ID below is the only setting. Empty = off: no bar, no Google request.
   - Nothing is sent to Google and no cookie is set until the visitor taps Accept.
     "No thanks", a browser Global Privacy Control signal, or no answer = nothing loads.
   - Google signals and ad personalisation are off.
   - The bar follows the page language (en, th, zh, de, ja) chosen with the globe menu.
   - The choice is kept in localStorage 'thanapong-analytics'; any element with
     data-ga-change (the link in the Privacy note) reopens the bar. */
(function () {
  'use strict';
  var GA_ID = 'G-2EJ8R4K62E';

  if (window.__tGA) return; window.__tGA = 1;
  var KEY = 'thanapong-analytics', loaded = false, bar = null;
  var on = /^G-[A-Z0-9]{4,}$/.test(GA_ID);
  var framed = false; try { framed = window.top !== window.self; } catch (e) { framed = true; }

  var T = {
    en: { q: 'May we count your visit with Google Analytics? It uses cookies, shows no ads and never asks who you are. It only tells us which pages help patients.', more: 'Privacy', no: 'No thanks', yes: 'Accept' },
    th: { q: 'ท่านอนุญาตให้เว็บไซต์นับการเข้าชมของท่านด้วย Google Analytics หรือไม่ ระบบนี้ใช้คุกกี้ ไม่แสดงโฆษณา และไม่ถามว่าท่านเป็นใคร ใช้เพียงเพื่อดูว่าหน้าใดเป็นประโยชน์ต่อผู้ป่วย', more: 'ความเป็นส่วนตัว', no: 'ไม่อนุญาต', yes: 'อนุญาต' },
    zh: { q: '我们可以使用 Google Analytics 统计您的访问吗？它会使用 Cookie，不显示广告，也不会询问您的身份，仅用于了解哪些页面对患者有帮助。', more: '隐私', no: '不，谢谢', yes: '接受' },
    de: { q: 'Dürfen wir Ihren Besuch mit Google Analytics zählen? Dabei werden Cookies verwendet, es wird keine Werbung angezeigt und Sie werden nie nach Ihrer Identität gefragt. Wir sehen nur, welche Seiten Patientinnen und Patienten helfen.', more: 'Datenschutz', no: 'Nein, danke', yes: 'Akzeptieren' },
    ja: { q: 'Google Analytics でアクセスを計測してもよろしいですか？Cookie を使用しますが、広告は表示せず、お名前などを伺うこともありません。どのページが患者さんの役に立っているかを知るためだけに使います。', more: 'プライバシー', no: '同意しない', yes: '同意する' }
  };

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function put(v) { try { if (v) localStorage.setItem(KEY, v); else localStorage.removeItem(KEY); } catch (e) {} }
  function gpc() { try { return navigator.globalPrivacyControl === true; } catch (e) { return false; } }
  function lang() { var l = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase(); return T[l] ? l : 'en'; }

  function load() {
    if (loaded || !on) return; loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    gtag('js', new Date());
    gtag('config', GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
  }

  function clearCookies() {  // removes Google Analytics cookies left from an earlier "Accept"
    var host = location.hostname, doms = ['', host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim(); if (!/^_ga/.test(n)) return;
      doms.forEach(function (d) { document.cookie = n + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : ''); });
    });
  }
  function hide() { if (bar) { bar.remove(); bar = null; } }
  function choose(v) { put(v); hide(); if (v === 'granted') load(); else clearCookies(); }

  function privacyLink() {  // the site's Privacy note sits in the footer
    var b = [].slice.call(document.querySelectorAll('p b')).filter(function (x) { return x.parentNode.querySelector('[data-ga-change]'); })[0];
    return b ? b.parentNode : null;
  }

  function show() {
    if (!on || framed || !document.body) return;
    if (!document.getElementById('t-ga-css')) {
      var st = document.createElement('style'); st.id = 't-ga-css';
      st.textContent =
        '.t-ga{position:fixed;left:50%;transform:translateX(-50%);bottom:max(12px,env(safe-area-inset-bottom));z-index:2147483000;' +
        'width:min(560px,calc(100vw - 32px));box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;padding:12px 14px;' +
        'background:#fff;color:#1a2230;border:1px solid #C9CED6;border-radius:14px;box-shadow:0 6px 28px rgba(13,16,20,.22);' +
        'font:14px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans Thai","Noto Sans JP","Noto Sans SC",sans-serif;text-align:left}' +
        '.t-ga p{margin:0;flex:1 1 260px;color:#1a2230}.t-ga a{color:#0B6FA4;text-decoration:underline}.t-ga .b{display:flex;gap:8px;flex:0 0 auto;margin-left:auto}' +
        '.t-ga button{min-height:40px;padding:0 16px;border-radius:999px;font:600 14px system-ui,sans-serif;cursor:pointer;border:1px solid #0B6FA4}' +
        '.t-ga .y{background:#0B6FA4;color:#fff}.t-ga .n{background:#fff;color:#0B6FA4}' +
        '.t-ga button:focus-visible{outline:2px solid #0B6FA4;outline-offset:2px}@media print{.t-ga{display:none}}';
      document.head.appendChild(st);
    }
    var t = T[lang()];
    if (!bar) {
      bar = document.createElement('div'); bar.className = 't-ga'; bar.setAttribute('role', 'region');
      document.body.appendChild(bar);
    }
    bar.setAttribute('aria-label', t.more); bar.lang = lang();
    bar.innerHTML = '<p></p><div class="b"><button type="button" class="n"></button><button type="button" class="y"></button></div>';
    var p = bar.querySelector('p'); p.textContent = t.q + ' ';
    var a = document.createElement('a'); a.href = '#'; a.textContent = t.more; p.appendChild(a);
    a.onclick = function (e) { e.preventDefault(); var n = privacyLink(); if (n) { var d = n.closest('details'); if (d) d.open = true; n.scrollIntoView({ behavior: 'smooth', block: 'center' }); } };
    bar.querySelector('.n').textContent = t.no; bar.querySelector('.y').textContent = t.yes;
    bar.querySelector('.y').onclick = function () { choose('granted'); };
    bar.querySelector('.n').onclick = function () { choose('denied'); };
  }

  function pending() { return on && !framed && !get() && !gpc(); }

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest && e.target.closest('[data-ga-change]'); if (!el) return;
    e.preventDefault();
    if (!on) return;
    var was = loaded; put(null); clearCookies();
    if (was) { location.reload(); return; }
    show();
  });
  try { new MutationObserver(function () { if (bar) show(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] }); } catch (e) {}

  window.thanapongAnalytics = { id: GA_ID, enabled: on, state: function () { return get() || 'not chosen'; } };

  if (!on) return;
  if (get() === 'granted') load();
  else if (pending()) setTimeout(function () { if (pending()) show(); }, 1500);
})();
