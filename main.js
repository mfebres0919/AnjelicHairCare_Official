
console.log("Brand video JS loaded");


/* =========================
   SCROLL REVEALS (JS)
   ========================= */
let revealsInitialized = false;

function initScrollReveals() {
  if (revealsInitialized) return;
  revealsInitialized = true;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const singles = document.querySelectorAll(".reveal");
  const groups  = document.querySelectorAll(".reveal-group");

  if (reduceMotion) {
    singles.forEach(el => el.classList.add("is-in"));
    groups.forEach(el => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      // If it's a group, stagger its children once it becomes visible
      if (el.classList.contains("reveal-group")) {
        const step = Number(el.dataset.stagger || 120); // ms
        [...el.children].forEach((child, i) => {
          child.style.setProperty("--d", `${i * step}ms`);
        });
      }

      el.classList.add("is-in");
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

  singles.forEach(el => io.observe(el));
  groups.forEach(el => io.observe(el));
}


/* =========================
   PRELOADER (UPDATED)
   ========================= */
// Preloader functionality
document.addEventListener('DOMContentLoaded', function () {

  // ✅ NEW: mark preloader as active immediately (controls reveal timing)
  document.documentElement.classList.add('preloader-active');
  document.documentElement.classList.remove('preloader-done');

  const preloader = document.getElementById('preloader');
  if (!preloader) {
    // ✅ NEW: if no preloader exists, allow reveals immediately
    document.documentElement.classList.remove('preloader-active');
    document.documentElement.classList.add('preloader-done');

    // If no preloader exists, start reveals immediately
    initScrollReveals();
    return;
  }

  const enterDuration = 1500 + (7 * 150);

  setTimeout(() => {
    preloader.classList.add('exit');

    const exitDuration = 1000 + (7 * 120);

    setTimeout(() => {
      preloader.classList.add('done');

      // ✅ NEW: the instant preloader is "done", unlock reveal delays
      document.documentElement.classList.remove('preloader-active');
      document.documentElement.classList.add('preloader-done');

      // ✅ Start reveals as soon as preloader is "done"
      // (so the user doesn't wait longer than needed)
      initScrollReveals();

      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.remove();
        }
      }, 500);

    }, exitDuration);

  }, enterDuration);
});

/* HARD FAILSAFE — never remove this */
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.remove();
  }

  // ✅ NEW: if failsafe triggers, unlock reveals immediately
  document.documentElement.classList.remove('preloader-active');
  document.documentElement.classList.add('preloader-done');

  // ✅ If preloader got stuck, still start reveals
  initScrollReveals();
}, 5000);






// add classes for mobile navigation toggling
    var CSbody = document.querySelector("body");
    const CSnavbarMenu = document.querySelector("#cs-navigation");
    const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

    CShamburgerMenu.addEventListener('click', function() {
        CShamburgerMenu.classList.toggle("cs-active");
        CSnavbarMenu.classList.toggle("cs-active");
        CSbody.classList.toggle("cs-open");
        // run the function to check the aria-expanded value
        ariaExpanded();
    });

    // checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
    function ariaExpanded() {
        const csUL = document.querySelector('#cs-expanded');
        const csExpanded = csUL.getAttribute('aria-expanded');

        if (csExpanded === 'false') {
            csUL.setAttribute('aria-expanded', 'true');
        } else {
            csUL.setAttribute('aria-expanded', 'false');
        }
    }

        // This script adds a class to the body after scrolling 100px
    // and we used these body.scroll styles to create some on scroll 
    // animations with the navbar
    
    document.addEventListener('scroll', (e) => { 
        const scroll = document.documentElement.scrollTop;
        if(scroll >= 100){
    document.querySelector('body').classList.add('scroll')
        } else {
        document.querySelector('body').classList.remove('scroll')
        }
    });


    // mobile nav toggle code
    const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
        for (const item of dropDowns) {
            const onClick = () => {
            item.classList.toggle('cs-active')
        }
        item.addEventListener('click', onClick)
        }
                                


// FAQ Accordion functionality
        const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});




// ABOUT ME VIDEO CODE
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".brand-video");
  const btn = document.querySelector(".video-control-btn");
  const wrapper = document.querySelector(".video-wrapper");

  if (!video || !btn || !wrapper) return;

  // 🔒 Video is NOT clickable
  video.style.pointerEvents = "auto";

  function updateUI() {
    btn.textContent = video.paused ? "▶" : "❚❚";
    wrapper.classList.toggle("playing", !video.paused);
  }

  // ✅ ONLY control playback here
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  // ✅ Sync UI ONLY (no toggling)
  video.addEventListener("play", updateUI);
  video.addEventListener("pause", updateUI);
  video.addEventListener("ended", updateUI);

  // 👁 Show controls on hover/tap ONLY
  wrapper.addEventListener("mousemove", () => {
    wrapper.classList.add("show-controls");
    clearTimeout(wrapper.hideTimer);

    wrapper.hideTimer = setTimeout(() => {
      if (!video.paused) {
        wrapper.classList.remove("show-controls");
      }
    }, 2000);
  });
});



/* =========================
   SHOWCASE SLIDER (JS)
========================= */
(function () {
  const slider = document.querySelector('.showcase-slider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.showcase-slide'));
  const dots = Array.from(slider.querySelectorAll('.showcase-dot'));
  const prevBtn = slider.querySelector('.showcase-prev');
  const nextBtn = slider.querySelector('.showcase-next');

  let current = slides.findIndex(slide =>
    slide.classList.contains('is-active')
  );
  if (current === -1) current = 0;

  function updateActiveState() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    updateActiveState();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goTo(index));
  });

  // Keyboard navigation
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Initial sync (important)
  updateActiveState();
})();





// TRANSITIONS

function initScrollReveals() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const singles = document.querySelectorAll(".reveal");
  const groups  = document.querySelectorAll(".reveal-group");

  if (reduceMotion) {
    singles.forEach(el => el.classList.add("is-in"));
    groups.forEach(el => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      // If it's a group, stagger its children once it becomes visible
      if (el.classList.contains("reveal-group")) {
          const step = Number(el.dataset.stagger || 200); // ms
        [...el.children].forEach((child, i) => {
          child.style.setProperty("--d", `${i * step}ms`);
        });
      }

      el.classList.add("is-in");
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

  singles.forEach(el => io.observe(el));
  groups.forEach(el => io.observe(el));
}








