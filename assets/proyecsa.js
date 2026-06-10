(function(){
  // year
  var yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();

  // mobile nav
  var t=document.getElementById('navToggle'),m=document.getElementById('menu');
  if(t&&m){t.addEventListener('click',function(){m.classList.toggle('open');});
    m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){m.classList.remove('open');});});}

  // header scrolled state
  var nav=document.getElementById('nav');
  function onScroll(){if(nav)nav.classList.toggle('scrolled',window.scrollY>10);}
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});

  // ---------- REVEALS (bloque canónico FASE 5) ----------
  if('scrollRestoration' in history) history.scrollRestoration='manual';
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{rootMargin:"0px 0px -10% 0px",threshold:0.01});
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('.hero .fade').forEach(function(el){el.classList.add('in');});
    document.querySelectorAll('.fade:not(.in)').forEach(function(el){io.observe(el);});
  });
  window.addEventListener('load',function(){
    setTimeout(function(){document.querySelectorAll('.fade:not(.in)').forEach(function(el){el.classList.add('in');});},2500);
  });

  // ---------- Lenis smooth scroll + GSAP parallax (solo si hay motion) ----------
  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(!reduce && window.Lenis){
    var lenis=new Lenis({lerp:.1,wheelMultiplier:1});
    function raf(time){lenis.raf(time);requestAnimationFrame(raf);}requestAnimationFrame(raf);
    if(window.gsap&&window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll',ScrollTrigger.update);
      // parallax suave en el visual del hero y la foto about (elementos SIN .fade)
      gsap.utils.toArray('.hero-visual .iso').forEach(function(el){
        gsap.to(el,{yPercent:-8,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}});
      });
      gsap.utils.toArray('.about-photo img,.svc-img img').forEach(function(el){
        gsap.fromTo(el,{yPercent:-4},{yPercent:4,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}});
      });
    }
  }
})();
