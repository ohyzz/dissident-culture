document.addEventListener('DOMContentLoaded', function () {

    // ── Scroll-reveal observer ──────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.tl-item, .col-card, .phil-card').forEach(el => {
        observer.observe(el);
    });

    // ── Pause reels when tab is hidden ─────────────────
    const reels = document.querySelectorAll('.reel');
    document.addEventListener('visibilitychange', () => {
        const state = document.hidden ? 'paused' : 'running';
        reels.forEach(r => r.style.animationPlayState = state);
    });

    // ── Reel speed tied to scroll velocity ─────────────
    let lastScroll = 0;
    let reelDuration = 3;

    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        const delta = Math.abs(current - lastScroll);
        lastScroll = current;

        // faster scroll = faster spin
        reelDuration = Math.max(0.5, 3 - delta * 0.05);
        reels.forEach(r => r.style.animationDuration = reelDuration + 's');

        // slow back down after scroll stops
        clearTimeout(window._reelTimeout);
        window._reelTimeout = setTimeout(() => {
            reels.forEach(r => {
                r.style.transition = 'animation-duration 1.5s ease';
                r.style.animationDuration = '3s';
            });
        }, 200);
    }, { passive: true });

    // ── Text scramble on hero title ─────────────────────
    const title = document.querySelector('.hero-title');
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#%&';

    if (title) {
        // Store text nodes separately to preserve the <span> bracket
        const titleText = title.childNodes;

        title.addEventListener('mouseenter', () => {
            let i = 0;
            const originalHTML = title.innerHTML;
            const plainParts = ['NUMBER ', 'INE']; // parts outside the span
            let scrambled = false;
            if (scrambled) return;
            scrambled = true;

            const interval = setInterval(() => {
                const r = () => CHARS[Math.floor(Math.random() * CHARS.length)];
                const a = i < plainParts[0].length
                    ? plainParts[0].slice(0, i) + plainParts[0].slice(i).replace(/[A-Z]/g, r)
                    : plainParts[0];
                const b = i < plainParts[0].length + 3
                    ? plainParts[1].replace(/[A-Z]/g, r)
                    : plainParts[1];

                title.innerHTML = `${a}<span class="bracket">(N)</span>${b}`;

                i += 2;
                if (i > 12) {
                    clearInterval(interval);
                    title.innerHTML = originalHTML;
                    scrambled = false;
                }
            }, 40);
        });
    }

    // ── Cassette label flicker on hover ────────────────
    const cassette = document.querySelector('.cassette-body');
    const labelBrand = document.querySelector('.label-brand');

    if (cassette && labelBrand) {
        const labels = ['N(N)', 'SIDE A', '1997', 'TOKYO', 'N(N)'];
        let li = 0;

        cassette.addEventListener('mouseenter', () => {
            const flicker = setInterval(() => {
                labelBrand.textContent = labels[li % labels.length];
                li++;
                if (li >= labels.length) {
                    clearInterval(flicker);
                    labelBrand.textContent = 'N(N)';
                    li = 0;
                }
            }, 120);
        });
    }

    // ── Subtle parallax on hero ─────────────────────────
    const hero = document.querySelector('.hero');
    const cassetteWrap = document.querySelector('.cassette-wrap');

    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        if (sy < window.innerHeight && hero) {
            if (cassetteWrap) {
                cassetteWrap.style.transform = `translateY(${sy * 0.08}px)`;
            }
        }
    }, { passive: true });
});
