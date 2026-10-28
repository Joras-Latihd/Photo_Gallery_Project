(() => {
  "use strict";

  // ---------- data ----------
  const PLAYERS = [
    {
      name: "Ousmane Dembélé",
      club: "PSG",
      country: "France",
      file: "dembele",
    },
    {
      name: "Raphinha",
      club: "Barcelona",
      country: "Brazil",
      file: "raphinha",
    },
    {
      name: "Lamine Yamal",
      club: "Barcelona",
      country: "Spain",
      file: "yamal",
    },
    {
      name: "Mohamed Salah",
      club: "Liverpool",
      country: "Egypt",
      file: "salah",
    },
    { name: "Achraf Hakimi", club: "PSG", country: "Morocco", file: "hakimi" },
    { name: "Vitinha", club: "PSG", country: "Portugal", file: "vitinha" },
    {
      name: "Kylian Mbappé",
      club: "Real Madrid",
      country: "France",
      file: "mbappe",
    },
    { name: "Pedri", club: "Barcelona", country: "Spain", file: "pedri" },
    { name: "Nuno Mendes", club: "PSG", country: "Portugal", file: "mendes" },
    {
      name: "Harry Kane",
      club: "Bayern Munich",
      country: "England",
      file: "kane",
    },
  ];
  const imgSrc = (p) => `images/${p.file}.jpg`;

  // ---------- elements ----------
  const $ = (id) => document.getElementById(id);
  const gallery = $("gallery"),
    box = $("lightbox"),
    stage = $("stage"),
    thumbs = $("thumbnails");
  const bigImg = $("lightboxImg"),
    title = $("lightboxTitle"),
    sub = $("lightboxSubtitle"),
    counter = $("counter");
  const closeBtn = $("closeBtn"),
    prevBtn = $("prevBtn"),
    nextBtn = $("nextBtn");

  let current = 0,
    opener = null,
    loadId = 0;

  // ---------- build gallery and thumbnails ----------
  PLAYERS.forEach((p, i) => {
    const li = document.createElement("li");
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.dataset.rank = i + 1;
    card.setAttribute(
      "aria-label",
      `${i + 1}. ${p.name}, ${p.club}, ${p.country}. Open photo`,
    );
    card.innerHTML =
      `<span class="rank">${i + 1}</span>` +
      `<img src="${imgSrc(p)}" alt="" loading="${i < 4 ? "eager" : "lazy"}" decoding="async">` +
      `<span class="caption"><strong>${p.name}</strong><span>${p.club} · ${p.country}</span></span>`;

    const img = card.querySelector("img");
    const ok = () => card.classList.add("loaded");
    const bad = () => card.classList.add("broken");
    if (img.complete && img.naturalWidth) ok();
    else if (img.complete && img.currentSrc) bad();
    else {
      img.addEventListener("load", ok);
      img.addEventListener("error", bad);
    }

    card.addEventListener("click", () => openBox(i, card));
    li.append(card);
    gallery.append(li);

    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "thumb";
    thumb.setAttribute("aria-label", `Show ${p.name}`);
    thumb.innerHTML = `<img src="${imgSrc(p)}" alt="" loading="lazy" decoding="async">`;
    thumb.addEventListener("click", () => show(i));
    thumbs.append(thumb);
  });

  // ---------- lightbox ----------
  function show(index) {
    current = (index + PLAYERS.length) % PLAYERS.length;
    const p = PLAYERS[current],
      id = ++loadId;

    title.textContent = `${current + 1}. ${p.name}`;
    sub.textContent = `${p.club} · ${p.country}`;
    counter.textContent = `${current + 1} / ${PLAYERS.length}`;

    // load first, then swap, so there is no blank frame; the id check ignores slow older loads
    bigImg.classList.add("fading");
    const pre = new Image();
    pre.onload = pre.onerror = () => {
      if (id !== loadId) return;
      bigImg.src = imgSrc(p);
      bigImg.alt = p.name;
      bigImg.classList.remove("fading");
    };
    pre.src = imgSrc(p);

    [...thumbs.children].forEach((t, n) => {
      t.classList.toggle("active", n === current);
      t.setAttribute("aria-current", n === current ? "true" : "false");
    });
    const t = thumbs.children[current];
    thumbs.scrollTo({
      left: t.offsetLeft - (thumbs.clientWidth - t.offsetWidth) / 2,
      behavior: "smooth",
    });

    // warm the cache for the neighbours
    [current + 1, current - 1].forEach((n) => {
      new Image().src = imgSrc(PLAYERS[(n + PLAYERS.length) % PLAYERS.length]);
    });
  }

  function openBox(index, trigger) {
    opener = trigger;
    box.inert = false;
    box.classList.add("open");
    document.documentElement.classList.add("lock");
    show(index);
    closeBtn.focus();
  }

  function closeBox() {
    box.classList.remove("open");
    box.inert = true;
    document.documentElement.classList.remove("lock");
    if (opener) opener.focus();
  }

  // ---------- events ----------
  closeBtn.addEventListener("click", closeBox);
  prevBtn.addEventListener("click", () => show(current - 1));
  nextBtn.addEventListener("click", () => show(current + 1));
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target === stage) closeBox();
  });

  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") closeBox();
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "Home") show(0);
    else if (e.key === "End") show(PLAYERS.length - 1);
    else if (e.key === "Tab") {
      const items = [...box.querySelectorAll("button")];
      const first = items[0],
        last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // swipe on the photo area only (not on the thumbnail strip)
  let startX = 0,
    startY = 0;
  stage.addEventListener(
    "touchstart",
    (e) => {
      startX = e.changedTouches[0].clientX;
      startY = e.changedTouches[0].clientY;
    },
    { passive: true },
  );
  stage.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - startX,
        dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5)
        show(dx < 0 ? current + 1 : current - 1);
    },
    { passive: true },
  );
})();
