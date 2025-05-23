// Vanilla JS Slider for .why-oa-slider
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('whyOASlider');
  const leftBtn = document.querySelector('.why-oa-slider-arrow.left');
  const rightBtn = document.querySelector('.why-oa-slider-arrow.right');
  const dotsWrap = document.getElementById('whyOADots');
  const cards = Array.from(slider.children);
  const cardCount = cards.length;
  let current = 0;
  let autoInterval;
  let cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap || 32);

  // Dots
  function renderDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < cardCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'why-oa-slider-dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => {
        goTo(i);
      });
      dotsWrap.appendChild(dot);
    }
  }

  // Scroll to card
  function goTo(idx) {
    current = idx;
    cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap || 32);
    slider.scrollTo({ left: cardWidth * idx, behavior: 'smooth' });
    renderDots();
  }

  // Prev/Next
  leftBtn.addEventListener('click', function () {
    current = (current - 1 + cardCount) % cardCount;
    goTo(current);
    resetAuto();
  });
  rightBtn.addEventListener('click', function () {
    current = (current + 1) % cardCount;
    goTo(current);
    resetAuto();
  });

  // Autoplay
  function autoPlay() {
    autoInterval = setInterval(() => {
      current = (current + 1) % cardCount;
      goTo(current);
    }, 3300);
  }
  function resetAuto() {
    clearInterval(autoInterval);
    autoPlay();
  }

  // Drag/Swipe
  let isDown = false;
  let startX, scrollLeft;
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
    // Snap to nearest card
    let idx = Math.round(slider.scrollLeft / cardWidth);
    goTo(idx);
    resetAuto();
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (startX - x);
    slider.scrollLeft = scrollLeft + walk;
  });

  // Touch
  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('touchend', () => {
    isDown = false;
    let idx = Math.round(slider.scrollLeft / cardWidth);
    goTo(idx);
    resetAuto();
  });
  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (startX - x);
    slider.scrollLeft = scrollLeft + walk;
  });

  // Resize
  window.addEventListener('resize', () => {
    cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap || 32);
    goTo(current);
  });

  // Init
  renderDots();
  goTo(0);
  autoPlay();
});
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('testimonialsSlider');
  const leftBtn = document.querySelector('.testimonials-arrow.left');
  const rightBtn = document.querySelector('.testimonials-arrow.right');
  const dotsWrap = document.getElementById('testimonialsDots');
  const cards = Array.from(slider.children);
  const cardCount = cards.length;
  let visible = 4;
  let current = 0;
  let cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap || 16);

  function updateVisible() {
    if (window.innerWidth < 700) visible = 1;
    else if (window.innerWidth < 1000) visible = 2;
    else visible = 4;
    cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap || 16);
    goTo(current, false);
    renderDots();
  }

  function renderDots() {
    dotsWrap.innerHTML = '';
    let dotCount = cardCount - visible + 1;
    if (dotCount < 1) dotCount = 1;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'testimonials-dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => {
        goTo(i, true);
      });
      dotsWrap.appendChild(dot);
    }
  }

  function goTo(idx, smooth = true) {
    let maxIdx = cardCount - visible;
    if (maxIdx < 0) maxIdx = 0;
    current = Math.max(0, Math.min(idx, maxIdx));
    slider.scrollTo({ left: cardWidth * current, behavior: smooth ? 'smooth' : 'auto' });
    renderDots();
  }

  leftBtn.addEventListener('click', function () {
    goTo(current - 1, true);
    resetAuto();
  });
  rightBtn.addEventListener('click', function () {
    goTo(current + 1, true);
    resetAuto();
  });

  // Touch/drag swipe
  let isDown = false;
  let startX, scrollLeft;
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
    let idx = Math.round(slider.scrollLeft / cardWidth);
    goTo(idx, true);
    resetAuto();
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (startX - x);
    slider.scrollLeft = scrollLeft + walk;
  });

  // Touch (mobile)
  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('touchend', () => {
    isDown = false;
    let idx = Math.round(slider.scrollLeft / cardWidth);
    goTo(idx, true);
    resetAuto();
  });
  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (startX - x);
    slider.scrollLeft = scrollLeft + walk;
  });

  // Auto-play
  let autoInterval = null;
  function autoPlay() {
    clearInterval(autoInterval);
    autoInterval = setInterval(() => {
      let maxIdx = cardCount - visible;
      if (current < maxIdx) {
        goTo(current + 1, true);
      } else {
        goTo(0, true);
      }
    }, 3500);
  }
  function resetAuto() {
    clearInterval(autoInterval);
    autoPlay();
  }

  window.addEventListener('resize', updateVisible);

  // Init
  updateVisible();
  goTo(0, false);
  autoPlay();
});