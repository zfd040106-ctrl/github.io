(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const header = document.querySelector("[data-header]");
  const trail = document.querySelector(".trail");
  const trailPath = document.querySelector("[data-trail-path]");
  const revealItems = document.querySelectorAll("[data-reveal]");
  const navLinks = [...document.querySelectorAll("[data-nav-link]")];
  const navSections = [...document.querySelectorAll("[data-nav-section]")];

  const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

  document.body.classList.add("is-loaded");

  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.1 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  let trailLength = 0;
  if (trailPath) {
    trailLength = trailPath.getTotalLength();
    trailPath.style.strokeDasharray = `${trailLength}`;
    trailPath.style.strokeDashoffset = reduceMotion.matches ? "0" : `${trailLength}`;
  }

  let sectionRanges = [];
  let trailTop = 0;
  let trailHeight = 1;

  const measureLayout = () => {
    const scrollY = window.scrollY;
    sectionRanges = navSections.map((section) => {
      const rect = section.getBoundingClientRect();
      return { id: section.id, top: rect.top + scrollY, bottom: rect.bottom + scrollY };
    });

    if (trail) {
      const rect = trail.getBoundingClientRect();
      trailTop = rect.top + scrollY;
      trailHeight = rect.height;
    }
  };

  const updateActiveNavigation = (scrollY) => {
    const markerY = scrollY + Math.min(210, window.innerHeight * 0.28);
    let activeId = "";

    sectionRanges.forEach((section) => {
      if (section.top <= markerY && section.bottom > markerY) activeId = section.id;
    });

    navLinks.forEach((link) => {
      const isActive = link.dataset.navLink === activeId;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  let frameRequested = false;

  const renderScroll = () => {
    const scrollY = window.scrollY;
    header?.classList.toggle("is-compact", scrollY > 90);
    updateActiveNavigation(scrollY);

    if (trail && trailPath && trailLength && !reduceMotion.matches) {
      const viewport = window.innerHeight;
      const trailViewportTop = trailTop - scrollY;
      const progress = clamp((viewport * 0.68 - trailViewportTop) / Math.max(trailHeight - viewport * 0.16, 1));
      trailPath.style.strokeDashoffset = `${trailLength * (1 - progress)}`;
    }

    frameRequested = false;
  };

  const requestScrollRender = () => {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(renderScroll);
  };

  window.addEventListener("scroll", requestScrollRender, { passive: true });
  window.addEventListener("resize", () => {
    measureLayout();
    requestScrollRender();
  });
  document.fonts?.ready.then(() => {
    measureLayout();
    requestScrollRender();
  });
  measureLayout();
  renderScroll();
})();
