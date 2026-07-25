/* ==========================================================================
   SaMax Nepal Pvt. Ltd. - Enterprise Application Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cyber Loader Sequence
  initCyberLoader();

  // 2. Mouse Glow Cursor Spotlight
  initGlowCursor();

  // 3. Canvas 3D Node Particle Engine
  initHeroCanvas();

  // 4. Scroll Progress & Navigation
  initNavigation();

  // 5. Typed.js Subtitle
  initTypedSubtitle();

  // 6. Viewport Counter Animations
  initCounters();

  // 7. 3D Tilt FX for Bento Cards
  init3DTilt();

  // 8. FAQ Accordion Toggle
  initFAQAccordion();

  // 9. Nepal Network Coverage Map Interactivity
  initNepalMap();

  // 10. Modals (Case Study & Services & Notify)
  initModals();

  // 11. Contact Form Validation & Toasts
  initContactForm();

  // 12. Back To Top Button
  initBackToTop();
});

/* ==========================================================================
   1. Cyber Loader Sequence
   ========================================================================== */
function initCyberLoader() {
  const loader = document.getElementById('cyber-loader');
  const percentText = document.getElementById('loader-percent');
  if (!loader || !percentText) return;

  let current = 0;
  const interval = setInterval(() => {
    current += Math.floor(Math.random() * 8) + 4;
    if (current >= 100) {
      current = 100;
      percentText.textContent = '100%';
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(() => loader.remove(), 600);
      }, 300);
    } else {
      percentText.textContent = `${current}%`;
    }
  }, 40);
}

/* ==========================================================================
   2. Glowing Cursor Spotlight
   ========================================================================== */
function initGlowCursor() {
  const cursor = document.getElementById('glow-cursor');
  if (!cursor || window.innerWidth < 768) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(renderCursor);
  }

  renderCursor();
}

/* ==========================================================================
   3. Canvas Particle Network (Futuristic Fiber / Telecom Node Mesh)
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 200 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.radius = Math.random() * 2.5 + 1.2;
      this.color = Math.random() > 0.35 ? '#18C6FF' : '#4FE3FF';
      this.alpha = Math.random() * 0.6 + 0.4;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse attraction/repulsion physics
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let angle = Math.atan2(dy, dx);
          let force = (mouse.radius - dist) / mouse.radius;
          this.x -= Math.cos(angle) * force * 2.5;
          this.y -= Math.sin(angle) * force * 2.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
    }
  }

  const particleCount = Math.min(Math.floor(window.innerWidth / 14), 100);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(24, 198, 255, ${0.4 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. Navigation & Scroll Progress
   ========================================================================== */
function initNavigation() {
  const progressBar = document.getElementById('scroll-progress');
  const header = document.getElementById('navbar-header');
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scroll progress bar width calculation
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = `${scrolled}%`;

    // Header scroll background threshold
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('shadow-2xl', 'border-b', 'border-cyan-500/20');
      } else {
        header.classList.remove('shadow-2xl');
      }
    }

    // Active Section Link Highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active', 'text-cyan-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active', 'text-cyan-400');
      }
    });
  });

  // Mobile Menu Toggle
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = menuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* ==========================================================================
   5. Typed.js Subtitle
   ========================================================================== */
function initTypedSubtitle() {
  const typingElem = document.getElementById('typing');
  if (typingElem && typeof Typed !== 'undefined') {
    new Typed('#typing', {
      strings: [
        'Engineering Reliable Telecom Infrastructure Across Nepal',
        'Digital Map Delivery • Indoor & Outdoor Repeaters • RF Planning',
        'Enterprise Wi-Fi • Fiber Optics • Technical Manpower Deployment',
        'Carrier-Grade Telecom Partner for Nepal Telecom & Ncell'
      ],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 2400,
      loop: true
    });
  }
}

/* ==========================================================================
   6. Viewport Counter Animations
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let started = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.ceil(current) + suffix;
        }
      }, stepTime);
    });
  }

  const statsSec = document.querySelector('.stats-trigger');
  if (statsSec) {
    window.addEventListener('scroll', () => {
      const rect = statsSec.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 100 && !started) {
        started = true;
        animateCounters();
      }
    });
  }
}

/* ==========================================================================
   7. 3D Tilt FX for Bento Cards
   ========================================================================== */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  if (window.innerWidth < 1024) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   8. FAQ Accordion Toggle
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   9. Nepal Network Coverage Map Interactivity
   ========================================================================== */
const nodeDetails = {
  kathmandu: {
    city: 'Kathmandu Headquarters',
    type: 'Core Telecom & NOC Hub',
    specs: 'Direct fiber backhaul, 24/7 NOC monitoring team, enterprise map delivery center.'
  },
  pokhara: {
    city: 'Pokhara Regional Hub',
    type: 'Western District Relay & Repeaters',
    specs: 'Outdoor repeater deployment & micro-node RF coverage for tourism corridor.'
  },
  biratnagar: {
    city: 'Biratnagar Industrial Hub',
    type: 'Eastern Fiber Backbone Splicing',
    specs: 'High-density fiber optic ring connecting industrial enterprise parks.'
  },
  chitwan: {
    city: 'Chitwan Central Hub',
    type: 'Microwave Backhaul Switch',
    specs: 'Point-to-point wireless microwave backhaul linking central-to-southern districts.'
  },
  butwal: {
    city: 'Butwal Logistics Hub',
    type: 'Technical Manpower Base',
    specs: 'Field engineer rapid dispatch unit serving Lumbini province.'
  },
  nepalgunj: {
    city: 'Nepalgunj Gateway',
    type: 'Western Border RF Site',
    specs: 'Cellular BTS deployment & outdoor signal amplification.'
  }
};

function initNepalMap() {
  const nodes = document.querySelectorAll('.map-node');
  const infoCard = document.getElementById('map-node-info');
  if (!infoCard) return;

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const key = node.getAttribute('data-node');
      const data = nodeDetails[key];
      if (!data) return;

      document.getElementById('map-city-name').textContent = data.city;
      document.getElementById('map-city-type').textContent = data.type;
      document.getElementById('map-city-specs').textContent = data.specs;

      nodes.forEach(n => n.classList.remove('ring-4', 'ring-cyan-400'));
      node.classList.add('ring-4', 'ring-cyan-400');
    });
  });
}

/* ==========================================================================
   10. Modals (Case Study & Services & Notify)
   ========================================================================== */
function initModals() {
  // Case Study Modal
  const caseModal = document.getElementById('casestudy-modal');
  window.openCaseStudyModal = function() {
    if (!caseModal) return;
    caseModal.classList.remove('hidden');
    caseModal.classList.add('flex');
  };

  window.closeCaseStudyModal = function() {
    if (!caseModal) return;
    caseModal.classList.add('hidden');
    caseModal.classList.remove('flex');
  };

  // Product Notify Modal
  const notifyModal = document.getElementById('notify-modal');
  window.openNotifyModal = function(productName) {
    if (!notifyModal) return;
    document.getElementById('notify-product-title').textContent = productName || 'SaMax Hardware Unit';
    notifyModal.classList.remove('hidden');
    notifyModal.classList.add('flex');
  };

  window.closeNotifyModal = function() {
    if (!notifyModal) return;
    notifyModal.classList.add('hidden');
    notifyModal.classList.remove('flex');
  };

  const notifyForm = document.getElementById('notify-form');
  if (notifyForm) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Subscription confirmed! You will receive launch alerts.', 'success');
      closeNotifyModal();
      notifyForm.reset();
    });
  }
}

/* ==========================================================================
   EmailJS Configuration
   ========================================================================== */
const EMAILJS_SERVICE_ID = 'service_x2qahyv';
const EMAILJS_TEMPLATE_ID = 'template_yx0fh59';
const EMAILJS_PUBLIC_KEY = 'PASTE_MY_PUBLIC_KEY_HERE';

// Initialize EmailJS SDK ONCE
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/* ==========================================================================
   11. Contact Form Validation & EmailJS Integration
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const companyInput = document.getElementById('contact-company');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const company = companyInput ? companyInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !phone || !subject || !message) {
      showToast('Please fill in all required contact fields.', 'error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const origContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Sending...';

    const templateParams = {
      name: name,
      company: company || 'N/A',
      email: email,
      phone: phone,
      subject: subject,
      message: message
    };

    try {
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS SDK is not loaded.');
      }

      // Execute emailjs.send ONCE
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Success Response:', response);

      // Display success toast ONLY after emailjs.send succeeds
      showToast('Thank you! Your message has been sent successfully. Our engineering team will contact you shortly.', 'success');
      contactForm.reset();
    } catch (error) {
      // Log full error in browser console for debugging
      console.error('EmailJS Submission Error Full Trace:', error);
      showToast('Unable to send your message. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origContent;
    }
  });
}

function showToast(msg, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = type === 'success' ? 'fa-circle-check text-cyan-400' : 'fa-circle-exclamation text-amber-400';
  toast.innerHTML = `<i class="fa-solid ${icon} text-xl"></i> <span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ==========================================================================
   12. Back To Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('hidden', 'opacity-0');
      btn.classList.add('flex', 'opacity-100');
    } else {
      btn.classList.remove('opacity-100');
      btn.classList.add('opacity-0');
      setTimeout(() => {
        if (window.scrollY <= 400) btn.classList.add('hidden');
      }, 300);
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
