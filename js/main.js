/**
 * 🌿 HERBVIAN — Interactive JavaScript Logic
 * Provides smooth drawer animations, cart state management, and mobile navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 0. Hero readiness gate ---
  const preloader = document.getElementById('sitePreloader');
  const root = document.documentElement;

  if (preloader && root.classList.contains('preloader-active')) {
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

      let preloaderRemoved = false;
      const removePreloader = () => {
        if (preloaderRemoved) return;
        preloaderRemoved = true;
        preloader.remove();
        root.classList.remove('preloader-active');
        delete root.dataset.preloaderMode;
        delete root.dataset.preloaderSource;
        window.dispatchEvent(new CustomEvent('herbvian:hero-ready'));
      };

      preloader.addEventListener('transitionend', removePreloader, { once: true });
      setTimeout(removePreloader, isMotionIntro ? 500 : 280);
    });
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
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
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
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
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
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
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
      rootMargin: '160px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
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
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
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

  // Initial cart UI setup
  updateCartUI();
});
