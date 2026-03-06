const cards = document.querySelectorAll('.card');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxSubtitle = document.getElementById('lightboxSubtitle');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const thumbnailsContainer = document.getElementById('thumbnails');

let currentIndex = 0;

// Create thumbnails
cards.forEach((card, index) => {
  const thumb = document.createElement('img');
  thumb.src = card.getAttribute('data-source');
  thumb.classList.add('thumbnail');
  thumb.dataset.index = index;
  thumbnailsContainer.appendChild(thumb);

  thumb.addEventListener('click', () => {
    currentIndex = parseInt(thumb.dataset.index);
    updateLightbox();
    updateThumbnails(); // ← was missing: thumbnail click didn't highlight active
  });
});

cards.forEach((card, index) => {
  card.addEventListener('click', e => {
    e.preventDefault();
    currentIndex = parseInt(card.getAttribute('data-index')); // ← was: index (caused mismatch)
    openLightbox();
  });

  // Image loading
  const img = card.querySelector('img');
  const loader = card.querySelector('.loader');
  img.addEventListener('load', () => {
    img.classList.add('loaded');
    loader.style.display = 'none';
  });
});

function openLightbox() {
  updateLightbox();
  lightbox.classList.add('open');
  updateThumbnails(); // ← was missing: thumbnails never synced on open
}

function updateLightbox() {
  const card = cards[currentIndex];
  lightboxImg.src = card.getAttribute('data-source');
  lightboxTitle.textContent = card.getAttribute('data-title');
  lightboxSubtitle.textContent = card.getAttribute('data-subtitle');
}

function updateThumbnails() {
  const thumbs = thumbnailsContainer.querySelectorAll('.thumbnail');
  thumbs.forEach(thumb => thumb.classList.remove('active'));
  thumbs[currentIndex].classList.add('active');
  thumbs[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
}

function closeLightbox() {
  lightbox.classList.remove('open');
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

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

window.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});