/**
 * 🌿 HERBVIAN — Interactive JavaScript Logic
 * Provides smooth drawer animations, cart state management, and mobile navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 0. Smooth Scroll Engine (Lenis) ---
  let lenis = null;
  const shouldEnableLenis = window.matchMedia('(min-width: 768px)').matches;
  if (shouldEnableLenis && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false, // Keep native touch momentum on mobile devices
      autoResize: true,
    });
    window.lenis = lenis;

    function lenisRaf(time) {
      lenis.raf(time);
      requestAnimationFrame(lenisRaf);
    }
    requestAnimationFrame(lenisRaf);

    // Shopify Customizer / Section Rendering API compatibility hooks
    if (window.Shopify && window.Shopify.designMode) {
      document.addEventListener('shopify:section:load', () => lenis.resize());
      document.addEventListener('shopify:section:reorder', () => lenis.resize());
      document.addEventListener('shopify:section:select', () => lenis.resize());
      document.addEventListener('shopify:section:deselect', () => lenis.resize());
    }
  }

  // --- Hero readiness gate ---
  const preloader = document.getElementById('sitePreloader');
  const root = document.documentElement;

  if (preloader && root.classList.contains('preloader-active')) {
    if (lenis) lenis.stop();
    const preloaderLogo = preloader.querySelector('.site-preloader-logo');
    const isMotionIntro = root.dataset.preloaderMode === 'motion';
    // The SVG finishes at 1.9s. Keep its completed logo visible briefly before fading.
    const svgAnimationDuration = isMotionIntro ? 1900 : 0;
    const completedLogoHold = 500;
    const introDuration = svgAnimationDuration + completedLogoHold;

    const wait = (duration) => new Promise(resolve => setTimeout(resolve, Math.max(0, duration)));
    const svgSequenceComplete = new Promise(resolve => {
      let loaded = false;
      const finish = () => {
        if (loaded) return;
        loaded = true;
        wait(introDuration).then(resolve);
      };

      preloaderLogo.addEventListener('load', finish, { once: true });
      preloaderLogo.addEventListener('error', finish, { once: true });

      if (preloaderLogo.complete && preloaderLogo.naturalWidth > 0) finish();
    });

    const heroImageReady = new Promise(resolve => {
      const heroImage = new Image();
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;

        if (typeof heroImage.decode === 'function' && heroImage.naturalWidth > 0) {
          heroImage.decode().catch(() => {}).finally(resolve);
        } else {
          resolve();
        }
      };

      heroImage.addEventListener('load', finish, { once: true });
      heroImage.addEventListener('error', finish, { once: true });
      heroImage.src = 'imgs/hero.webp';

      if (heroImage.complete) finish();
    });

    // Never reveal the Hero until both the SVG sequence and Hero image are ready.
    Promise.all([
      svgSequenceComplete,
      heroImageReady,
    ]).then(() => {
      preloader.classList.add('is-leaving');

      // Trigger Hero staggered cascade at the exact moment preloader begins fading out
      revealHero();

      let preloaderRemoved = false;
      const removePreloader = () => {
        if (preloaderRemoved) return;
        preloaderRemoved = true;
        preloader.remove();
        root.classList.remove('preloader-active');
        delete root.dataset.preloaderMode;
        delete root.dataset.preloaderSource;
        if (lenis) {
          lenis.start();
          lenis.resize();
        }
        initScrollReveal();
        window.dispatchEvent(new CustomEvent('herbvian:hero-ready'));
      };

      preloader.addEventListener('transitionend', removePreloader, { once: true });
      setTimeout(removePreloader, isMotionIntro ? 500 : 280);
    });
  } else {
    // If preloader is not active, reveal Hero and observe scroll immediately
    revealHero();
    initScrollReveal();
  }

  // --- 1. Sticky Header on Scroll ---
  const header = document.querySelector('.site-header');
  let headerTicking = false;
  let headerIsScrolled = null;

  function updateHeaderState() {
    const shouldBeScrolled = window.scrollY > 40;
    if (header && shouldBeScrolled !== headerIsScrolled) {
      header.classList.toggle('scrolled', shouldBeScrolled);
      headerIsScrolled = shouldBeScrolled;
    }
    headerTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!headerTicking) {
      headerTicking = true;
      window.requestAnimationFrame(updateHeaderState);
    }
  }, { passive: true });
  if (lenis) {
    lenis.on('scroll', () => {
      if (!headerTicking) {
        headerTicking = true;
        window.requestAnimationFrame(updateHeaderState);
      }
    });
  }
  updateHeaderState();

  // --- 2. Mobile Menu Drawer ---
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openMobileMenu() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);

  // --- 3. Shopping Cart Drawer & State ---
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartBadge = document.getElementById('cartBadge');
  const drawerCartItems = document.getElementById('drawerCartItems');
  const drawerSubtotal = document.getElementById('drawerSubtotal');
  const toastMsg = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');

  let cart = [];

  // A single delegated listener avoids rebinding every remove button after each render.
  if (drawerCartItems) {
    drawerCartItems.addEventListener('click', (e) => {
      const removeButton = e.target.closest('.remove-cart-item');
      if (!removeButton || !drawerCartItems.contains(removeButton)) return;

      const index = Number.parseInt(removeButton.dataset.index, 10);
      if (!Number.isNaN(index)) {
        cart.splice(index, 1);
        updateCartUI();
      }
    });
  }

  function openCartDrawer() {
    cartDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCartDrawer);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);

  // Overlay click closes whichever drawer is open
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', () => {
      closeMobileMenu();
      closeCartDrawer();
    });
  }

  // --- 4. Toast Notification Helper ---
  let toastTimer = null;
  function showToast(message) {
    if (toastText) toastText.textContent = message;
    if (toastMsg) {
      toastMsg.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastMsg.classList.remove('show');
      }, 3000);
    }
  }

  // --- 5. Add to Cart Handling ---
  const addToCartButtons = document.querySelectorAll('.btn-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;

      const title = card.querySelector('.product-title').textContent.trim();
      const priceStr = card.querySelector('.product-price').textContent.trim();
      const priceNum = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
      const imgSrc = card.querySelector('.product-img-wrap img').getAttribute('src');

      // Check if product already exists in cart
      const existing = cart.find(item => item.title === title);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          title,
          price: priceNum,
          priceStr,
          imgSrc,
          quantity: 1
        });
      }

      updateCartUI();
      showToast(`Added "${title}" to your cart!`);
    });
  });

  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) cartBadge.textContent = totalCount;

    if (!drawerCartItems) return;

    if (cart.length === 0) {
      drawerCartItems.innerHTML = `
        <div class="drawer-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 12px; color: var(--text-sub);">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p>Your bag is currently empty.</p>
        </div>
      `;
      if (drawerSubtotal) drawerSubtotal.textContent = '$0.00';
      return;
    }

    let subtotal = 0;
    drawerCartItems.innerHTML = cart.map((item, index) => {
      subtotal += item.price * item.quantity;
      return `
        <div style="display: flex; gap: 12px; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border-subtle); align-items: center;">
          <img src="${item.imgSrc}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <div style="flex-grow: 1;">
            <h4 style="font-size: 0.875rem; font-weight: 600; line-height: 1.3; margin-bottom: 4px;">${item.title}</h4>
            <div style="font-size: 0.8125rem; color: var(--text-muted);">Qty: ${item.quantity} × ${item.priceStr}</div>
          </div>
          <button data-index="${index}" class="remove-cart-item" style="color: #c53030; font-size: 1.1rem; padding: 4px;" title="Remove">&times;</button>
        </div>
      `;
    }).join('');

    if (drawerSubtotal) {
      drawerSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }

  }

  // --- 6. Newsletter Form Submission (Simulation) ---
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      if (input && input.value) {
        showToast('Thank you for subscribing to Herbvian!');
        input.value = '';
      }
    });
  }

  // --- 7. Smooth Scroll Reveal on Scroll ---
  function revealHero() {
    const heroReveals = document.querySelectorAll('#hero .reveal');
    heroReveals.forEach(el => el.classList.add('is-visible'));
  }

  let scrollRevealInitialized = false;
  function initScrollReveal() {
    if (scrollRevealInitialized) return;
    scrollRevealInitialized = true;

    const scrollRevealElements = document.querySelectorAll('.reveal:not(#hero .reveal)');
    if (scrollRevealElements.length === 0) return;

    if ('IntersectionObserver' in window) {
      const isMobile = window.innerWidth <= 768;
      // Negative bottom margin ensures element must enter 30px-55px inside the viewport before triggering,
      // so the user actually sees the slide-up and fade-in instead of it finishing while still off-screen!
      const bottomMargin = isMobile ? '-30px' : '-55px';

      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.12,
        rootMargin: `0px 0px ${bottomMargin} 0px`
      });

      scrollRevealElements.forEach(el => {
        // If element is already on-screen at boot (e.g. refreshed halfway down the page), reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 55 && rect.bottom > 0) {
          el.classList.add('is-visible');
        } else {
          revealObserver.observe(el);
        }
      });
    } else {
      scrollRevealElements.forEach(el => el.classList.add('is-visible'));
    }
  }

  // --- 8. Smooth Anchor Navigation with Offset ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        closeMobileMenu();
        if (lenis) {
          lenis.scrollTo(targetEl, {
            offset: -70,
            duration: 1.2
          });
        } else {
          const headerOffset = 70;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // --- 9. FAQ Accordion Interaction ---
  const faqQuestions = document.querySelectorAll('.faq-question, .faq-question-btn');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Close other open FAQ items for a neat, focused accordion experience
      faqQuestions.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherItem = otherBtn.closest('.faq-item');
          if (otherItem) otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      btn.setAttribute('aria-expanded', !isExpanded);
      if (item) {
        item.classList.toggle('active', !isExpanded);
      }

      if (lenis) {
        setTimeout(() => lenis.resize(), 320);
      }
    });
  });

  // Open first FAQ item by default for great discoverability
  if (faqQuestions.length > 0) {
    const firstFaq = faqQuestions[0];
    const firstItem = firstFaq.closest('.faq-item');
    firstFaq.setAttribute('aria-expanded', 'true');
    if (firstItem) firstItem.classList.add('active');
  }

  // --- 10. True 3D Card Stage Carousel ---
  const revPrevBtn = document.getElementById('revPrevBtn');
  const revNextBtn = document.getElementById('revNextBtn');
  const revCounter = document.getElementById('revCounter');
  const cards = document.querySelectorAll('#reviews3DStage .review-3d-card');
  const total = cards.length;
  let activeIndex = 1; // Elena Rostova is center initially

  function update3DDeck() {
    cards.forEach((card, i) => {
      // Relative offset from activeIndex: -1 (left), 0 (center), +1 (right)
      let offset = i - activeIndex;
      // Handle circular wrapping for 4 cards: map to [-2, 1] range
      if (offset < -Math.floor(total / 2)) offset += total;
      if (offset > Math.floor((total - 1) / 2)) offset -= total;

      let slotClass = 'slot-hidden';
      if (offset === 0) {
        slotClass = 'slot-center';
      } else if (offset === -1) {
        slotClass = 'slot-left';
      } else if (offset === 1) {
        slotClass = 'slot-right';
      }

      // Assign exactly base classes + slotClass, guaranteeing no leftover conflicting classes
      card.className = `review-3d-card card-story ${slotClass}`;
    });

    if (revCounter) {
      revCounter.textContent = `0${activeIndex + 1} / 0${total}`;
    }
  }

  function goToNext() {
    activeIndex = (activeIndex + 1) % total;
    update3DDeck();
  }

  function goToPrev() {
    activeIndex = (activeIndex - 1 + total) % total;
    update3DDeck();
  }

  if (revNextBtn) revNextBtn.addEventListener('click', goToNext);
  if (revPrevBtn) revPrevBtn.addEventListener('click', goToPrev);

  // Keyboard navigation when near review section
  window.addEventListener('keydown', (e) => {
    const reviewsEl = document.getElementById('reviews');
    if (!reviewsEl) return;
    const rect = reviewsEl.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === 'ArrowLeft') goToPrev();
      else if (e.key === 'ArrowRight') goToNext();
    }
  });

  // Click on side cards to rotate them to center
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (card.classList.contains('slot-left')) {
        goToPrev();
      } else if (card.classList.contains('slot-right')) {
        goToNext();
      }
    });
  });

  // Touch Swipe Support for Mobile
  const stage = document.getElementById('reviews3DStage');
  if (stage) {
    let touchStartX = 0;
    let touchEndX = 0;

    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goToNext();
        else goToPrev();
      }
    }, { passive: true });
  }

  // Initialize 3D positions
  update3DDeck();

  // --- 11. Mobile Card Swipers ---
  // On phones, grouped cards become touch carousels; Stories also uses two slides on tablet.
  const mobileSwiperMedia = window.matchMedia('(max-width: 639px)');
  const tabletStoriesSwiperMedia = window.matchMedia('(min-width: 640px) and (max-width: 1023px)');
  const mobileSwiperConfigs = [
    { selector: '.products-grid', slideSelector: '.product-card', mobileSlidesPerView: 1.08 },
    { selector: '.ocean-cards-grid', slideSelector: '.ocean-card', mobileSlidesPerView: 1.08 },
    { selector: '.stories-cards-grid', slideSelector: '.story-card', mobileSlidesPerView: 1.08, tabletSlidesPerView: 2 },
    { selector: '.journey-steps-grid', slideSelector: '.step-card', mobileSlidesPerView: 1.45 },
  ];
  const mobileSwipers = new Map();

  function createMobileSwiper(config, slidesPerView) {
    const container = document.querySelector(config.selector);
    if (!container || typeof Swiper === 'undefined') return;

    const existing = mobileSwipers.get(container);
    if (existing) {
      if (existing.slidesPerView !== slidesPerView) {
        existing.instance.params.slidesPerView = slidesPerView;
        existing.instance.update();
        existing.slidesPerView = slidesPerView;
      }
      return;
    }

    const slides = [...container.querySelectorAll(`:scope > ${config.slideSelector}`)];
    if (slides.length < 2) return;

    // A carousel should enter as one unit; individual slide reveals cause flicker and
    // can replay awkwardly when users swipe.
    const slideRevealClasses = slides.map((slide) => {
      const classes = [...slide.classList].filter((className) => (
        className === 'reveal'
        || className === 'is-visible'
        || className.startsWith('reveal-delay-')
      ));
      slide.classList.remove(...classes);
      return classes;
    });

    const wrapper = document.createElement('div');
    wrapper.className = 'swiper-wrapper';
    slides.forEach((slide) => {
      slide.classList.add('swiper-slide');
      wrapper.appendChild(slide);
    });

    const pagination = document.createElement('div');
    pagination.className = 'mobile-swiper-pagination';
    container.classList.add('swiper', 'mobile-swiper', 'reveal', 'mobile-swiper-reveal');
    container.append(wrapper);
    // Keep controls outside the clipped Swiper viewport so they remain visible.
    container.insertAdjacentElement('afterend', pagination);

    // The global reveal observer may have already initialized before responsive
    // Swiper markup is created, so observe this new container when needed.
    if (scrollRevealInitialized) {
      const rect = container.getBoundingClientRect();
      if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
        container.classList.add('is-visible');
      } else if ('IntersectionObserver' in window) {
        const swiperRevealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
        swiperRevealObserver.observe(container);
      } else {
        container.classList.add('is-visible');
      }
    }

    const instance = new Swiper(container, {
      slidesPerView,
      spaceBetween: 14,
      speed: 500,
      grabCursor: true,
      watchOverflow: true,
      a11y: {
        enabled: true,
      },
      pagination: {
        el: pagination,
        clickable: true,
        bulletClass: 'mobile-swiper-bullet',
        bulletActiveClass: 'is-active',
        renderBullet: (index, className) => `<button class="${className}" type="button" aria-label="Go to slide ${index + 1}"></button>`,
      },
    });

    mobileSwipers.set(container, {
      instance,
      wrapper,
      pagination,
      slides,
      slideRevealClasses,
      slidesPerView,
    });
  }

  function destroyMobileSwiper(container) {
    const record = mobileSwipers.get(container);
    if (!record) return;

    record.instance.destroy(true, true);
    record.slides.forEach((slide, index) => {
      slide.classList.remove('swiper-slide');
      slide.classList.add(...record.slideRevealClasses[index], 'is-visible');
      container.insertBefore(slide, record.wrapper);
    });
    record.wrapper.remove();
    record.pagination.remove();
    container.classList.remove('swiper', 'mobile-swiper', 'reveal', 'mobile-swiper-reveal', 'is-visible');
    mobileSwipers.delete(container);
  }

  function updateMobileSwipers() {
    mobileSwiperConfigs.forEach((config) => {
      const container = document.querySelector(config.selector);
      if (!container) return;
      const slidesPerView = mobileSwiperMedia.matches
        ? config.mobileSlidesPerView
        : (tabletStoriesSwiperMedia.matches ? config.tabletSlidesPerView : null);

      if (slidesPerView) createMobileSwiper(config, slidesPerView);
      else destroyMobileSwiper(container);
    });
    if (window.lenis) window.lenis.resize();
  }

  updateMobileSwipers();
  mobileSwiperMedia.addEventListener('change', updateMobileSwipers);
  tabletStoriesSwiperMedia.addEventListener('change', updateMobileSwipers);

  // Initial cart UI setup
  updateCartUI();
});
