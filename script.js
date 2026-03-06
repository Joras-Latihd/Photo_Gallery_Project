document.addEventListener('DOMContentLoaded', function () {

  const lightbox            = document.getElementById('lightbox');
  const lightboxImg         = document.getElementById('lightboxImg');
  const lightboxTitle       = document.getElementById('lightboxTitle');
  const lightboxSubtitle    = document.getElementById('lightboxSubtitle');
  const closeBtn            = document.getElementById('closeBtn');
  const prevBtn             = document.getElementById('prevBtn');
  const nextBtn             = document.getElementById('nextBtn');
  const thumbnailsContainer = document.getElementById('thumbnails');

  const cards = Array.from(document.querySelectorAll('#gallery .card'));
  let currentIndex = 0;

  // ── Force-stamp correct index on every card ──
  cards.forEach(function (card, i) {
    card.setAttribute('data-index', i);

    // ── CRITICAL FIX: remove lazy loading so ALL images load upfront ──
    const img = card.querySelector('img');
    if (img) {
      img.removeAttribute('loading');          // removes lazy
      img.setAttribute('loading', 'eager');    // force eager load

      const loader = card.querySelector('.loader');
      function markLoaded() {
        img.classList.add('loaded');
        if (loader) loader.style.display = 'none';
      }
      if (img.complete) {
        markLoaded();
      } else {
        img.addEventListener('load', markLoaded);
        img.addEventListener('error', function () {
          if (loader) loader.style.display = 'none';
        });
      }
    }
  });

  // ── Build thumbnails ──
  thumbnailsContainer.innerHTML = '';
  cards.forEach(function (card, i) {
    const src   = card.getAttribute('data-source');
    const title = card.getAttribute('data-title') || '';
    const thumb = document.createElement('img');
    thumb.src           = src;
    thumb.alt           = title;
    thumb.className     = 'thumbnail';
    thumb.dataset.index = i;
    thumbnailsContainer.appendChild(thumb);

    thumb.addEventListener('click', function () {
      currentIndex = i;
      updateLightbox();
      updateThumbnails();
    });
  });

  // ── Card click ──
  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      currentIndex = parseInt(card.getAttribute('data-index'), 10);
      openLightbox();
    });
  });

  // ── Open / close ──
  function openLightbox() {
    updateLightbox();
    updateThumbnails();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── Update lightbox image — preload first to avoid blank flash ──
  function updateLightbox() {
    const card = cards[currentIndex];
    if (!card) return;

    const src      = card.getAttribute('data-source');
    const title    = card.getAttribute('data-title') || '';
    const subtitle = card.getAttribute('data-subtitle') || '';

    // Preload into a temporary Image object first,
    // then assign to the visible <img> — guarantees no blank frame
    const preloader = new Image();
    preloader.onload = function () {
      lightboxImg.src = src;
    };
    preloader.onerror = function () {
      lightboxImg.src = src; // show anyway even if broken
    };
    preloader.src = src;

    // Set title immediately — doesn't need to wait for image
    if (lightboxTitle)    lightboxTitle.textContent    = title;
    if (lightboxSubtitle) lightboxSubtitle.textContent = subtitle;
  }

  // ── Sync thumbnail highlight ──
  function updateThumbnails() {
    const thumbs = thumbnailsContainer.querySelectorAll('.thumbnail');
    thumbs.forEach(function (t) { t.classList.remove('active'); });
    const active = thumbs[currentIndex];
    if (active) {
      active.classList.add('active');
      active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  // ── Navigation ──
  function showNext() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateLightbox();
    updateThumbnails();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateLightbox();
    updateThumbnails();
  }

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click',  showNext);
  prevBtn.addEventListener('click',  showPrev);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft')  showPrev();
  });

  // ── Swipe support ──
  var touchStartX = 0;
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) diff > 0 ? showNext() : showPrev();
  }, { passive: true });

});