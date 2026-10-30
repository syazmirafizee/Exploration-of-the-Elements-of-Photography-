/**
 * A24 REIMAGINED: DIGITAL PHOTOGRAPHY PORTFOLIO
 * Faculty of Applied & Creative Arts (FACA), UNIMAS — GKU 1033
 * Inspiration: a24.raviklaassens.com (Ravi Klaassens)
 */

// --------------------------------------------------------------------------
// 1. Data Store for Photography Elements
// --------------------------------------------------------------------------
const portfolioData = [
  {
    ref: "FACA-2026-01",
    element: "ELEMENT 01 · LINE",
    topic: "PERSPECTIVE & GEOMETRY",
    title: "Lines in Perspective",
    imgSrc: "assets/images/elements/element-1/lines-in-perspective.jpg",
    analysis: "This photograph explores the element of line through the diagonal railing, vertical window frames and geometric patterns on the floor. These lines guide the viewer's eyes through the composition, creating a sense of depth and structure while the contrast between sunlight and shadows adds visual interest to the architectural space.",
    aperture: "f/2.4",
    shutter: "1/320 SEC",
    iso: "ISO 32",
    focal: "1.54MM (ULTRA WIDE)",
    device: "IPHONE 14",
    lighting: "NATURAL SUNLIGHT & SHADOWS",
    igCaption: "This photograph explores the element of line through the diagonal railing, vertical window frames and geometric patterns on the floor. These lines guide the viewer's eyes through the composition, creating a sense of depth and structure while the contrast between sunlight and shadows adds visual interest to the architectural space."
  },
  {
    ref: "FACA-2026-02",
    element: "ELEMENT 02 · TEXTURE",
    topic: "SURFACE & ORGANIC DETAIL",
    title: "Beauty in Texture",
    imgSrc: "assets/images/elements/element-2/beauty-in-texture.jpg",
    analysis: "This photograph highlights the element of texture through the rough, uneven surface of the stone wall, contrasted with the softness of the curtains and the delicate flowers. The warm natural lighting emphasizes the wall's details, while the vibrant flowers introduce contrasting colours that make the composition more visually engaging.",
    aperture: "f/1.5",
    shutter: "1/6400 SEC",
    iso: "ISO 50",
    focal: "5.7MM (26MM EQUIV.)",
    device: "IPHONE 14",
    lighting: "WARM NATURAL LIGHTING",
    igCaption: "This photograph highlights the element of texture through the rough, uneven surface of the stone wall, contrasted with the softness of the curtains and the delicate flowers. The warm natural lighting emphasizes the wall's details, while the vibrant flowers introduce contrasting colours that make the composition more visually engaging."
  },
  {
    ref: "FACA-2026-03",
    element: "ELEMENT 03 · SPACE",
    topic: "NEGATIVE SPACE & TRANQUILLITY",
    title: "A Space to Breathe",
    imgSrc: "assets/images/elements/element-3/a-space-to-breathe.jpg",
    analysis: "This photograph explores the element of space through three beach chairs placed on the sand, surrounded by the open beach and wide blue sky. The relationship between the chairs and the surrounding negative space creates a sense of openness and tranquillity, allowing the viewer to appreciate the simplicity and peaceful atmosphere of the beach.",
    aperture: "f/2.4",
    shutter: "1/1800 SEC",
    iso: "ISO 32",
    focal: "1.54MM (ULTRA WIDE)",
    device: "IPHONE 14",
    lighting: "OPEN COASTAL DAYLIGHT",
    igCaption: "This photograph explores the element of space through three beach chairs placed on the sand, surrounded by the open beach and wide blue sky. The relationship between the chairs and the surrounding negative space creates a sense of openness and tranquillity, allowing the viewer to appreciate the simplicity and peaceful atmosphere of the beach."
  }
];

// Global State
let currentIndex = 0;
let currentHeroIndex = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let dragDistance = 0;

// Audio disabled
function playShutterSound() {}

// --------------------------------------------------------------------------
// 3. Tactile Lens Crate Controller
// --------------------------------------------------------------------------
// Center the active card in the middle of the stage at every screen size.
// offsetLeft/offsetWidth are measured from the real layout (they ignore the
// scale transform), so this stays correct as the cards resize with the screen.
function centerActiveCard() {
  const track = document.getElementById('crateTrack');
  const wrapper = document.getElementById('crateWrapper');
  const activeItem = document.querySelectorAll('.photo-card-item')[currentIndex];
  if (!track || !wrapper || !activeItem) return;
  const offset = wrapper.clientWidth / 2 - (activeItem.offsetLeft + activeItem.offsetWidth / 2);
  track.style.transform = `translateX(${offset}px)`;
}

function updateStagePosition() {
  const items = document.querySelectorAll('.photo-card-item');
  const indexBtns = document.querySelectorAll('.index-num-btn');

  centerActiveCard();

  // Update classes
  items.forEach((item, idx) => {
    if (idx === currentIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  indexBtns.forEach((btn, idx) => {
    if (idx === currentIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update Dynamic Editorial Liner Notes with subtle fade
  updateLinerNotes(currentIndex);
}

function selectLens(index) {
  if (currentIndex === index) {
    // If clicking active lens, open full-bleed takeover directly!
    openFullBleedTakeover();
    return;
  }
  currentIndex = index;
  playShutterSound();
  updateStagePosition();
}

function stepLens(direction) {
  let next = currentIndex + direction;
  if (next < 0) next = portfolioData.length - 1;
  if (next >= portfolioData.length) next = 0;
  selectLens(next);
}

function updateLinerNotes(index) {
  const data = portfolioData[index];
  if (!data) return;

  const catalogRef = document.getElementById('catalogRef');
  const elementTag = document.getElementById('elementTag');
  const linerElement = document.getElementById('linerElement');
  const linerTopic = document.getElementById('linerTopic');
  const linerTitle = document.getElementById('linerTitle');
  const linerAnalysis = document.getElementById('linerAnalysis');

  const specAperture = document.getElementById('specAperture');
  const specShutter = document.getElementById('specShutter');
  const specIso = document.getElementById('specIso');
  const specFocal = document.getElementById('specFocal');
  const specDevice = document.getElementById('specDevice');
  const specLight = document.getElementById('specLight');

  // Quick fade out
  linerTitle.style.opacity = '0';
  linerAnalysis.style.opacity = '0';

  setTimeout(() => {
    catalogRef.textContent = data.ref;
    elementTag.textContent = `ELEMENT 0${index + 1} OF 03`;
    linerElement.textContent = `ELEMENT 0${index + 1}`;
    linerTopic.textContent = data.topic;
    linerTitle.textContent = data.title;
    linerAnalysis.textContent = data.analysis;

    specAperture.textContent = data.aperture;
    specShutter.textContent = data.shutter;
    specIso.textContent = data.iso;
    specFocal.textContent = data.focal;
    specDevice.textContent = data.device;
    specLight.textContent = data.lighting;

    linerTitle.style.opacity = '1';
    linerAnalysis.style.opacity = '1';
  }, 150);
}

// --------------------------------------------------------------------------
// 4. Mouse Wheel & Drag Interaction (Momentum on Crate)
// --------------------------------------------------------------------------
function setupCrateGestures() {
  const wrapper = document.getElementById('crateWrapper');
  if (!wrapper) return;

  // A. Mouse wheel / trackpad
  // Scrolling up and down always scrolls the page, so the visitor can read the
  // details of the card they are on. Sideways trackpad swipes over the slider
  // flip through the cards.
  let wheelTimeout = null;
  wrapper.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // vertical: scroll the page
    e.preventDefault(); // also stops the browser's swipe-to-go-back gesture
    if (wheelTimeout) return;

    if (e.deltaX > 25) {
      stepLens(1);
    } else if (e.deltaX < -25) {
      stepLens(-1);
    }

    wheelTimeout = setTimeout(() => {
      wheelTimeout = null;
    }, 350);
  }, { passive: false });

  // B. Mouse drag (desktop)
  let suppressClick = false;

  // Stop the browser from dragging the photo itself, which would swallow the
  // mouse-up and leave the drag unfinished.
  wrapper.addEventListener('dragstart', (e) => e.preventDefault());

  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    dragDistance = 0;
    suppressClick = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    dragDistance = e.clientX - startX;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    if (Math.abs(dragDistance) <= 60) return;
    // A drag must not also count as a click on the card under the pointer:
    // that click would select the old card again and undo the drag.
    suppressClick = true;
    stepLens(dragDistance < 0 ? 1 : -1);
  });

  wrapper.addEventListener('click', (e) => {
    if (!suppressClick) return;
    suppressClick = false;
    e.stopPropagation();
    e.preventDefault();
  }, true);

  // C. Touch (phones and tablets)
  // Sideways swipes change the card. Mostly-vertical swipes are left to the
  // browser, so swiping up scrolls down to the details.
  let startY = 0;
  let dragY = 0;

  wrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    dragDistance = 0;
    dragY = 0;
  }, { passive: true });

  wrapper.addEventListener('touchmove', (e) => {
    dragDistance = e.touches[0].clientX - startX;
    dragY = e.touches[0].clientY - startY;
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    if (Math.abs(dragDistance) < 50 || Math.abs(dragY) > Math.abs(dragDistance)) return;
    stepLens(dragDistance < 0 ? 1 : -1);
  });

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (document.getElementById('fullBleedModal').classList.contains('active')) {
      if (e.key === 'Escape') closeFullBleedTakeover();
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      stepLens(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      stepLens(-1);
    }
  });
}

// --------------------------------------------------------------------------
// 5. Immersive Full-Bleed Takeover Transition
// --------------------------------------------------------------------------
function openFullBleedTakeover() {
  playShutterSound();
  const data = portfolioData[currentIndex];
  const modal = document.getElementById('fullBleedModal');
  const img = document.getElementById('takeoverImg');
  const hudElement = document.getElementById('hudElement');
  const hudTitle = document.getElementById('hudTitle');
  const hudCritique = document.getElementById('hudCritique');
  const hudSpecsBar = document.getElementById('hudSpecsBar');

  // Grab the image from DOM if updated
  const liveImg = document.getElementById(`opticImg${currentIndex}`);
  img.src = liveImg ? liveImg.src : data.imgSrc;

  hudElement.textContent = data.element;
  hudTitle.textContent = data.title;
  hudCritique.textContent = data.analysis;

  hudSpecsBar.innerHTML = `
    <span>APERTURE: ${data.aperture}</span>
    <span>SHUTTER: ${data.shutter}</span>
    <span>ISO: ${data.iso}</span>
    <span>LENS: ${data.focal}</span>
    <span>DEVICE: ${data.device}</span>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeFullBleedTakeover() {
  playShutterSound();
  const modal = document.getElementById('fullBleedModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// --------------------------------------------------------------------------
// 6. View Mode Switching (Crate / Contact Sheet / Instagram / Curator)
// --------------------------------------------------------------------------
function switchView(viewName) {
  playShutterSound();
  
  // Update nav pills
  document.querySelectorAll('.nav-pill').forEach(pill => {
    if (pill.getAttribute('data-view') === viewName) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  // Update panels
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const targetPanel = document.getElementById(`${viewName}View`);
  if (targetPanel) {
    targetPanel.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (viewName === 'crate') {
    setTimeout(updateStagePosition, 50);
  }

  // Hide 01/02/03 index steppers on Instagram view — they only apply to the Gallery
  const dockCenter = document.querySelector('.dock-center');
  if (dockCenter) {
    dockCenter.style.visibility = viewName === 'instagram' ? 'hidden' : 'visible';
  }
}

function selectAndReturnToCrate(index) {
  currentIndex = index;
  switchView('crate');
  updateStagePosition();
}

function jumpToInstagram() {
  switchView('instagram');
}

// --------------------------------------------------------------------------
// 7. Instagram Showcase (legacy functions — kept for safety, elements removed)
// --------------------------------------------------------------------------
function setHeroPhoto(index) {
  // No-op: phone frame/hero selector removed from Instagram view
}

function copyInstagramCaption() {
  // No-op: caption copy removed from Instagram view
}

// --------------------------------------------------------------------------
// 8. Canvas / Darkroom Noir Theme Toggle
// --------------------------------------------------------------------------
function toggleTheme() {
  playShutterSound();
  const isNoir = document.body.classList.toggle('theme-noir');
  const icon = document.getElementById('themeIcon');
  icon.textContent = isNoir ? '☼' : '◐';
}

// --------------------------------------------------------------------------
// 9. Live Kuching Time Clock
// --------------------------------------------------------------------------
function initLiveClock() {
  const clockEl = document.querySelector('.clock-digits');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    // UTC+8 for Sarawak/Malaysia
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kuchingTime = new Date(utc + (3600000 * 8));
    
    const hrs = String(kuchingTime.getHours()).padStart(2, '0');
    const mins = String(kuchingTime.getMinutes()).padStart(2, '0');
    const secs = String(kuchingTime.getSeconds()).padStart(2, '0');
    
    clockEl.textContent = `${hrs}:${mins}:${secs}`;
  }

  update();
  setInterval(update, 1000);
}

// --------------------------------------------------------------------------
// 10. Custom Cursor Tracker
// --------------------------------------------------------------------------
function initCustomCursor() {
  const cursor = document.getElementById('cursorFollower');
  const crate = document.getElementById('crateWrapper');
  if (!cursor || !crate) return;

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  crate.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
  });

  crate.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
}

// --------------------------------------------------------------------------
// Initialize Everything on DOM Load
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initCustomCursor();
  setupCrateGestures();
  updateStagePosition();
});

// Keep the active card centered whenever the stage changes size (window
// resize, fonts loading, cards resizing to fit the screen height).
document.addEventListener('DOMContentLoaded', () => {
  const stage = document.getElementById('crateWrapper');
  if (stage && 'ResizeObserver' in window) {
    new ResizeObserver(centerActiveCard).observe(stage);
  } else {
    window.addEventListener('resize', centerActiveCard);
  }
});
