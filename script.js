// Wait for full DOM
document.addEventListener('DOMContentLoaded', () => {

  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSubtitle = document.getElementById('lightboxSubtitle');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const thumbnailsContainer = document.getElementById('thumbnails');

  // Always re-query cards AFTER DOM is ready — never rely on order from outside
  const cards = Array.from(document.querySelectorAll('.card'));

  let currentIndex = 0;

  // ── Re-stamp data-index to match exact DOM order, no assumptions ──
  cards.forEach((card, i) => {
    card.setAttribute('data-index', i);
  });

  // ── Build thumbnails fresh ──
  thumbnailsContainer.innerHTML = '';
  cards.forEach((card, i) => {
    const thumb = document.createElement('img');
    thumb.src = card.getAttribute('data-source');
    thumb.alt = card.getAttribute('data-title') || '';
    thumb.classList.add('thumbnail');
    thumb.dataset.index = i;
    thumbnailsContainer.appendChild(thumb);

    thumb.addEventListener('click', () => {
      currentIndex = i;
      updateLightbox();
      updateThumbnails();
    });
  });

  // ── Image load handling (covers cached images too) ──
  cards.forEach(card => {
    const img = card.querySelector('img');
    const loader = card.querySelector('.loader');
    if (!img) return;

    const markLoaded = () => {
      img.classList.add('loaded');
      if (loader) loader.style.display = 'none';
    };

    if (img.complete && img.naturalWidth > 0) {
      markLoaded(); // already cached
    } else {
      img.addEventListener('load', markLoaded);
      img.addEventListener('error', () => {
        if (loader) loader.style.display = 'none';
      });
    }
  });

  // ── Card click: always read data-index from the element ──
  cards.forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      currentIndex = parseInt(card.getAttribute('data-index'), 10);
      openLightbox();
    });
  });

  // ── Lightbox functions ──
  function openLightbox() {
    updateLightbox();
    updateThumbnails();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function updateLightbox() {
    const card = cards[currentIndex];
    if (!card) return;
    lightboxImg.src = card.getAttribute('data-source');
    lightboxImg.alt = card.getAttribute('data-title') || '';
    lightboxTitle.textContent = card.getAttribute('data-title') || '';
    lightboxSubtitle.textContent = card.getAttribute('data-subtitle') || '';
  }

  function updateThumbnails() {
    const thumbs = thumbnailsContainer.querySelectorAll('.thumbnail');
    thumbs.forEach(t => t.classList.remove('active'));
    const active = thumbs[currentIndex];
    if (active) {
      active.classList.add('active');
      active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

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

  // ── Button listeners ──
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Click outside content to close
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  window.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowRight')  showNext();
    if (e.key === 'ArrowLeft')   showPrev();
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? showNext() : showPrev();
    }
  }, { passive: true });

});