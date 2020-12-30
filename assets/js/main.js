//main

/*
  Navigation
  simply-nav.js - v1.3.0
  https://github.com/obscuredetour/simply-nav
*/

(() => {
  let out = {};

  function simplyNavDuty(){
    const sideNav = document.querySelector('.nav-list.-mobile'),
    toggleNavBtn = document.querySelector('.nav-toggle'),
    burger = document.querySelector('.burger'),
    pageOverlay = document.querySelector('.nav-overlay'),
    navLinks = sideNav.querySelectorAll(".nav-list__link"),
    body = document.querySelector('body'),
    html = document.querySelector('html');
    let out = {};

    // Disable page scroll
    function togglePageScroll() {
      if (sideNav.classList.contains('-open')) {
        body.classList.add('_disableScroll');
        html.classList.add('_disableScroll');
      } else {
        body.classList.remove('_disableScroll');
        html.classList.remove('_disableScroll');
      }
    };

    // Nav funtion (toggle)
    function toggleNav() {
      if (sideNav.classList.contains('-open')) {
        closeNav();
      } else {
        openNav();
      }
    };

    function openNav(){
      sideNav.classList.add('-open');
      burger.classList.add('open');
      toggleNavBtn.setAttribute('aria-expanded', 'true');
      sideNav.setAttribute('aria-hidden', 'false');
      togglePageScroll();
    }
    function closeNav(){
      sideNav.classList.remove('-open');
      burger.classList.remove('open');
      toggleNavBtn.setAttribute('aria-expanded', 'false');
      sideNav.setAttribute('aria-hidden', 'true');
      togglePageScroll();
    }

    // To default
    toDefaults = () => {
      closeNav();
      // Make sure scrolling is enabled
      body.classList.remove('_disableScroll');
      html.classList.remove('_disableScroll');
    }

    // Event listeners
    toggleNavBtn.addEventListener('click', toggleNav);
    pageOverlay.addEventListener('click', toggleNav);

    // (on mobile) close nav menu when link is clicked
    // this is useful on mobile when clicking an anchor tag on the current page (eg. index.html#example)
    navLinks.forEach(el => {
      el.addEventListener('click', (event) => {
        toDefaults();
      });
    });

    out.toDefaults = toDefaults;

    return out;
  }
  simplyNavDuty();


  // when browser is resized (past breakpoint) reset to defaults
  (function() {

    window.addEventListener("resize", resizeThrottler, false);
    let resizeTimeout;

    function resizeThrottler() {
      // ignore resize events as long as an actualResizeHandler execution is in the queue
      if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          actualResizeHandler();
       
         // The actualResizeHandler will execute at a rate of 15fps
         }, 66);
      }
    }
  
    function actualResizeHandler() {
      // handle the resize event

      // Window resized width
      let width = window.innerWidth;

      // If resized greater than BREAKPOINT (default: 800px), then reset nav functions
      if (width >= 800) {
        toDefaults();      
      }        
    }
  
  }());

  out.simplyNavDuty = simplyNavDuty;
  return out;  

})();

//accordions
function handleAccordions() {

  function accordion(button, section){

    function isOpen(){
      return button.classList.contains('-active');
    }

    function closeAccordion(){
      function close(prompt, target){
        target.classList.remove('-active');
        prompt.classList.remove('-active');
        prompt.setAttribute('aria-expanded', 'false');

        let children = target.querySelectorAll('accordion');
        if (children){
          children.forEach(child => {
            let button = child.querySelector('.accordion__button');
            let section = child.querySelector('.accordion__section');
            close(button, section);
          });
        }
      }
      close(button, section);
    }

    function openAccordion(){
      section.classList.add('-active');
      button.classList.add('-active');
      button.setAttribute('aria-expanded', 'true');
    }

    let accordionAction = () => {
      if (isOpen()){
        closeAccordion();
      } else {
        openAccordion();
      }
    }

    button.addEventListener('click', accordionAction);
  }

  function initAccordions(){
    let accordions = document.querySelectorAll('.accordion');

    accordions.forEach(function(accordionEl, index){

      let button = accordionEl.querySelector('.accordion__button');
      let section = accordionEl.querySelector('.accordion__section');

      if (!(button && section)) {
        throw "All accordion elements not present. Need button and section elements.";
      }

      function a11y(){
        button.id = button.id || ('accordion_button_' + index);
        section.id = section.id || ('accordion_section_' + index);

        if (!button.getAttribute('aria-controls')){
          button.setAttribute('aria-controls', section.id);
        }
        if (!button.getAttribute('aria-expanded')){
          button.setAttribute('aria-expanded', 'false');
        }
        if (!button.getAttribute('aria-labelledby')){
          section.setAttribute('aria-labelledby', button.id);
        }
      }

      a11y();
      accordion(button, section);
    });
  }
  initAccordions();

}
handleAccordions();