(function () {
  'use strict';
  var raiz = document.documentElement;
  var botao = document.getElementById('botao-tema');
  var metaTema = document.querySelector('meta[name="theme-color"]');

  // localStorage pode lançar erro (modo privado, ficheiros locais, políticas do browser)
  function ler() { try { return localStorage.getItem('portfolio-tema'); } catch (e) { return null; } }
  function gravar(v) { try { localStorage.setItem('portfolio-tema', v); } catch (e) {} }

  function aplicar(escuro) {
    raiz.classList.toggle('dark', escuro);
    if (botao) botao.setAttribute('aria-pressed', String(escuro));
    if (metaTema) metaTema.setAttribute('content', escuro ? '#0d1424' : '#f5f7fb');
  }

  aplicar(raiz.classList.contains('dark'));

  if (botao) {
    botao.addEventListener('click', function () {
      var escuro = !raiz.classList.contains('dark');
      aplicar(escuro);
      gravar(escuro ? 'dark' : 'light');
    });
  }

  // Acompanha o tema do sistema enquanto o utilizador não escolher manualmente
  if (window.matchMedia) {
    var mq = matchMedia('(prefers-color-scheme: dark)');
    var seguir = function (e) { if (!ler()) aplicar(e.matches); };
    if (mq.addEventListener) mq.addEventListener('change', seguir);
    else if (mq.addListener) mq.addListener(seguir);
  }

  // Destaca no menu a secção visível
  var links = Array.prototype.slice.call(document.querySelectorAll('nav a[href^="#"]'));
  if ('IntersectionObserver' in window && links.length) {
    var mapa = {};
    links.forEach(function (a) { mapa[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        var alvo = mapa[e.target.id];
        if (alvo) alvo.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(mapa).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) obs.observe(sec);
    });
  }
})();
