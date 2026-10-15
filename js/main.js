/* ==========================================================================
   LOGICA PRINCIPALE E INTERAZIONI - ZHIWEI LAN PORTFOLIO
   ========================================================================== */

const $ = id => document.getElementById(id);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const quick = matchMedia('(prefers-reduced-motion: reduce)').matches;

let time = 0, sp = 0, ss = 0, isModalOpen = false, menuOpen = false, pending = null;
let lastActiveElement = null;

const mouse = { x: 0, y: 0 }, sm = { x: 0, y: 0, rawX: 0, rawY: 0 };
const raw = { x: innerWidth / 2, y: innerHeight / 2 }, rp = { x: raw.x, y: raw.y };

/* ================= CONTROLLO AUDIO E EQUALIZZATORE ================= */
const soundBtn = $('soundToggle');
if (soundBtn) {
    soundBtn.addEventListener('click', () => {
        if (window.soundEngine) {
            const enabled = window.soundEngine.toggle();
            soundBtn.innerHTML = enabled ?
                'AUDIO [ON] <div class="eq-bar"><span></span><span></span><span></span></div>' :
                'AUDIO [OFF]';
            soundBtn.classList.toggle('active', enabled);
        }
    });
}

/* ================= SPOTLIGHT GLOW AL CURSORE DENTRO LE SCHEDE ================= */
document.querySelectorAll('.glass, .wk-m, .wk').forEach(card => {
    card.addEventListener('pointermove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        const targetm = card.querySelector('.wk-m');
        if (targetm) {
            const mrect = targetm.getBoundingClientRect();
            targetm.style.setProperty('--mouse-x', `${e.clientX - mrect.left}px`);
            targetm.style.setProperty('--mouse-y', `${e.clientY - mrect.top}px`);
        }
    });
});

/* ================= APPLICAZIONE E SEZIONI ================= */
const secs = [...document.querySelectorAll('.sec')];
let curSec = null, hoverEl = null;

function apply() {
    const src = hoverEl || curSec;
    if (!src) return;
    const shapeIdx = src.dataset.shape !== undefined ? +src.dataset.shape : 0;
    if (typeof setShape === 'function') setShape(shapeIdx);
    if (typeof setScene === 'function') setScene(src.dataset.ca, src.dataset.cb, curSec ? +curSec.dataset.x : 0);
}

function activate(sec) {
    if (!sec) return;
    if (curSec !== sec && window.soundEngine) {
        window.soundEngine.playTransition();
    }
    curSec = sec;
    const idx = secs.indexOf(sec);
    const cnEl = $('cn');
    if (cnEl) cnEl.textContent = String(idx >= 0 ? idx + 1 : 1).padStart(2, '0');
    const clEl = $('cl');
    if (clEl && sec.dataset.name) clEl.textContent = sec.dataset.name.toUpperCase();
    apply();
}

const secIO = new IntersectionObserver(es => {
    es.forEach(e => {
        if (e.isIntersecting) activate(e.target);
    });
}, { rootMargin: '-45% 0px -45% 0px' });

secs.forEach(s => secIO.observe(s));

document.querySelectorAll('.wk').forEach(w => {
    w.addEventListener('mouseenter', () => {
        hoverEl = w;
        apply();
        if (window.soundEngine) window.soundEngine.playHover();
    });
    w.addEventListener('mouseleave', () => { hoverEl = null; apply(); });
    w.addEventListener('focus', () => { hoverEl = w; apply(); });
    w.addEventListener('blur', () => { hoverEl = null; apply(); });
});

/* ================= FILTRO INTERATTIVO BADGE TECH ================= */
document.querySelectorAll('#skills .badge-n').forEach(badge => {
    badge.addEventListener('click', () => {
        const techName = badge.textContent.trim().toLowerCase();
        const isActive = badge.classList.contains('active');

        document.querySelectorAll('#skills .badge-n').forEach(b => b.classList.remove('active'));

        if (!isActive) {
            badge.classList.add('active');
            if (window.soundEngine) window.soundEngine.playClick();

            document.querySelectorAll('.wk').forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(techName)) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1.02)';
                } else {
                    card.style.opacity = '0.3';
                    card.style.transform = 'scale(0.98)';
                }
            });
        } else {
            document.querySelectorAll('.wk').forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'none';
            });
        }
    });
});

/* ================= EFFETTI TESTO E ANIMAZIONI FLUIDE ================= */
document.querySelectorAll('.giant .w').forEach(w => {
    let i = 0;
    w.innerHTML = [...w.textContent].map(c => `<span class="ch" style="--i:${i++}">${c}</span>`).join('');
});

document.querySelectorAll('.statement').forEach(el => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(x => `<span class="wd">${x}</span>`).join(' ');
});

/* Revelazione Parola per Parola Fluida e Nitida allo Scroll */
function words() {
    document.querySelectorAll('.statement').forEach(el => {
        const r = el.getBoundingClientRect();
        const progress = clamp((innerHeight * 0.85 - r.top) / (innerHeight * 0.35), 0, 1);
        const wordsList = el.children;
        const count = wordsList.length;

        for (let i = 0; i < count; i++) {
            const wordProgress = clamp((progress - (i / count) * 0.6) * 2.5, 0, 1);
            const opacity = 0.22 + wordProgress * 0.78;
            const translateY = (1 - wordProgress) * 6;

            wordsList[i].style.opacity = opacity;
            wordsList[i].style.transform = `translate3d(0, ${translateY}px, 0)`;
            wordsList[i].style.transition = 'opacity 0.22s ease-out, transform 0.22s ease-out';
        }
    });
}

addEventListener('scroll', () => {
    words();
    const hint = $('hint');
    if (hint && scrollY > 40) hint.style.opacity = '0';
}, { passive: true });

addEventListener('resize', words, { passive: true });

const CH = '!<>-_\\/[]{}=+*^?#01';
function scramble(el) {
    if (!el) return;
    const t = el.dataset.t || (el.dataset.t = el.textContent);
    let f = 0;
    clearInterval(el._i);
    el._i = setInterval(() => {
        el.textContent = [...t].map((c, i) => c === ' ' ? ' ' : (i < f / 2 ? c : CH[Math.floor(Math.random() * CH.length)])).join('');
        if (++f > t.length * 2) {
            clearInterval(el._i);
            el.textContent = t;
        }
    }, 18);
}

const rvIO = new IntersectionObserver(es => {
    es.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            if (e.target.classList.contains('scr') && !quick) scramble(e.target);
            rvIO.unobserve(e.target);
        }
    });
}, { threshold: .12 });

document.querySelectorAll('.rv, .scr').forEach(el => rvIO.observe(el));
document.querySelectorAll('.scr').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (!quick) scramble(el);
        if (window.soundEngine) window.soundEngine.playHover();
    });
});

document.querySelectorAll('.magnet').forEach(b => {
    b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
});

const mqs = [...document.querySelectorAll('.mq-in')];
mqs.forEach(m => { m.textContent = m.textContent.repeat(5); });

/* ================= MENU E MODALI ================= */
const menuEl = $('menu');
const list = $('menuList');

if (menuEl && list) {
    secs.forEach((s, i) => {
        const a = document.createElement('a');
        a.href = '#' + s.id;
        a.className = 'mi';
        a.innerHTML = `<small>${String(i + 1).padStart(2, '0')}</small>${s.dataset.name || s.id}`;
        a.onclick = e => {
            e.preventDefault();
            pending = s;
            if (window.soundEngine) window.soundEngine.playClick();
            if (typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
                bootstrap.Offcanvas.getOrCreateInstance(menuEl).hide();
            }
        };
        a.onmouseenter = () => { if (window.soundEngine) window.soundEngine.playHover(); };
        list.appendChild(a);
    });

    menuEl.addEventListener('show.bs.offcanvas', () => { menuOpen = true; });
    menuEl.addEventListener('hidden.bs.offcanvas', () => {
        menuOpen = false;
        if (pending) {
            const p = pending;
            pending = null;
            p.scrollIntoView({ behavior: quick ? 'auto' : 'smooth' });
        }
    });
}

function kd(e, id) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(id);
    }
}

function openModal(id) {
    const modal = $(id);
    if (!modal) return;
    lastActiveElement = document.activeElement;
    isModalOpen = true;
    document.body.classList.add('modal-on');
    modal.classList.add('active');

    const hudModal = modal.querySelector('.hud-modal');
    if (hudModal) {
        hudModal.scrollTop = 0;
    }

    if (ring) ring.classList.remove('big');
    if (cursorDot) cursorDot.classList.remove('hide');

    if (window.soundEngine) window.soundEngine.playModalOpen();

    // Animazione contatori numerici
    animateStats(modal);

    const closeBtn = modal.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.focus({ preventScroll: true });
    }
}

function closeModal(id) {
    const modal = $(id);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.classList.remove('modal-on');
    isModalOpen = false;

    if (window.soundEngine) window.soundEngine.playModalClose();

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
    }
}

function animateStats(container) {
    container.querySelectorAll('.stat b').forEach(stat => {
        const targetVal = parseFloat(stat.dataset.val || stat.textContent);
        if (isNaN(targetVal)) return;

        const suffix = stat.textContent.replace(/[0-9.]/g, '');
        let current = 0;
        const step = targetVal / 30;

        const timer = setInterval(() => {
            current += step;
            if (current >= targetVal) {
                current = targetVal;
                clearInterval(timer);
            }
            stat.textContent = Math.round(current) + suffix;
        }, 20);
    });
}

document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => {
        if (e.target === o) closeModal(o.id);
    });
});

addEventListener('keydown', e => {
    const activeModal = document.querySelector('.modal-overlay.active');
    if (!activeModal) return;

    if (e.key === 'Escape') {
        closeModal(activeModal.id);
        return;
    }

    if (e.key === 'Tab') {
        const focusables = [...activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(el => !el.hasAttribute('disabled'));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});

const cursorDot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
const label = ring ? ring.querySelector('span') : null;

const updateMousePos = (x, y) => {
    raw.x = x;
    raw.y = y;
    mouse.x = (x / innerWidth - .5) * 2;
    mouse.y = (y / innerHeight - .5) * 2;
};

addEventListener('pointermove', e => {
    updateMousePos(e.clientX, e.clientY);
    if (cursorDot) {
        cursorDot.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    }
});

addEventListener('click', () => {
    if (typeof triggerPulse === 'function') triggerPulse();
    if (window.soundEngine && window.soundEngine.enabled) window.soundEngine.playClick();
});

addEventListener('touchmove', e => {
    if (e.touches && e.touches[0]) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });

document.querySelectorAll('.interactive-el, button, a, .mi, .wk, .tlr').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (ring) ring.classList.add('big');
        if (cursorDot) cursorDot.classList.add('hide');
        if (label) label.textContent = (el.classList.contains('wk') || el.classList.contains('tlr')) ? 'APRI' : '';
        if (window.soundEngine) window.soundEngine.playHover();
    });
    el.addEventListener('mouseleave', () => {
        if (ring) ring.classList.remove('big');
        if (cursorDot) cursorDot.classList.remove('hide');
        if (label) label.textContent = '';
    });
});

/* ================= RENDERING LOOP ================= */
function frame(t) {
    time = t * .001;
    const max = document.documentElement.scrollHeight - innerHeight;
    sp = max > 0 ? scrollY / max : 0;
    ss += (sp - ss) * .06;

    sm.x += (mouse.x - sm.x) * .05;
    sm.y += (mouse.y - sm.y) * .05;
    sm.rawX = mouse.x;
    sm.rawY = mouse.y;
    rp.x += (raw.x - rp.x) * .2;
    rp.y += (raw.y - rp.y) * .2;

    if (ring) {
        ring.style.transform = `translate(calc(${rp.x}px - 50%), calc(${rp.y}px - 50%))`;
    }

    const pf = $('pf');
    if (pf) pf.style.height = (sp * 100) + '%';

    mqs.forEach(m => {
        const d = +m.dataset.dir;
        m.style.transform = `translateX(${d < 0 ? -scrollY * .35 : -1400 + scrollY * .35}px)`;
    });

    if (typeof glFrame === 'function') {
        glFrame(time, ss, sm, isModalOpen, menuOpen);
    }

    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
words();

/* ================= GESTIONE PRELOADER ================= */
let preloaderDone = false;
function finishPreloader() {
    if (preloaderDone) return;
    preloaderDone = true;

    const loader = $('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 900);
    }
    document.body.classList.remove('loading');
    document.body.classList.add('ready');
    if (typeof setGLReady === 'function') setGLReady(true);
    apply();

    const hint = $('hint');
    if (hint) hint.style.opacity = '1';
}

if (typeof gsap !== 'undefined') {
    const o = { v: 0 };
    gsap.to(o, {
        v: 100,
        duration: quick ? .2 : 1.8,
        ease: 'power2.inOut',
        onUpdate() {
            const ldn = $('ldn');
            if (ldn) ldn.textContent = Math.round(o.v);
        },
        onComplete: finishPreloader
    });
} else {
    finishPreloader();
}
