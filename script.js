const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const slides = Array.from(document.querySelectorAll('.hero-slide'));
const slideDots = Array.from(document.querySelectorAll('.slide-dot'));
const slideCurrent = document.querySelector('#slide-current');
let activeSlide = 0;
const uploadedImageFiles = new Map([
    ['hero-01', 'hero-01'],
    ['hero-02', 'hero-02'],
    ['hero-03', 'hero-03'],
    ['role-kebun', 'role-kebun'],
    ['role-origin', 'role-origin'],
    ['role-cangkir', 'role-cangkir'],
    ['origin-gayo', 'origin-gayo'],
    ['origin-flores', 'origin-flores'],
    ['origin-toraja', 'origin-toraja'],
    ['story-kebun', 'story-kebun'],
    ['coffee-gayo', 'origin-gayo'],
    ['coffee-flores', 'coffee-flores'],
    ['coffee-toraja', 'coffee-toraja'],
    ['coffee-ijen', 'coffee-ijen']
]);

document.querySelectorAll('img[data-image-slot]').forEach((image) => {
    const imageFile = uploadedImageFiles.get(image.dataset.imageSlot);
    if (imageFile) {
        image.src = `assets/images/${imageFile}.jpeg`;
    }
});

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
    }
});

function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeSlide;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
        slideDots[slideIndex].classList.toggle('is-active', isActive);
        slideDots[slideIndex].setAttribute('aria-current', String(isActive));
    });

    slideCurrent.textContent = String(activeSlide + 1).padStart(2, '0');
}

document.querySelector('[data-slide="previous"]').addEventListener('click', () => {
    showSlide(activeSlide - 1);
});

document.querySelector('[data-slide="next"]').addEventListener('click', () => {
    showSlide(activeSlide + 1);
});

slideDots.forEach((dot) => {
    dot.addEventListener('click', () => {
        showSlide(Number(dot.dataset.slideTo));
    });
});

const detailDialog = document.querySelector('.detail-dialog');
const dialogImage = detailDialog.querySelector('.dialog-image');
const dialogTitle = detailDialog.querySelector('#detail-title');
const dialogKicker = detailDialog.querySelector('.dialog-kicker');
const dialogDescription = detailDialog.querySelector('.dialog-description');
const dialogExtra = detailDialog.querySelector('.dialog-extra');

document.querySelectorAll('[data-open-detail]').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.role-card, .origin-card, .explore-card');
        const image = card.querySelector('img');
        const copy = card.querySelector('.card-copy, .explore-copy');
        const title = copy.querySelector('h3');
        const kicker = copy.querySelector('.card-kicker, .explore-copy > span');
        const description = copy.querySelector(':scope > p');
        const extra = copy.querySelector('.read-more > p');

        dialogImage.src = image.complete && image.naturalWidth > 0
            ? image.currentSrc
            : image.src;
        dialogImage.alt = image.alt;
        dialogTitle.textContent = title.textContent;
        dialogKicker.textContent = kicker.textContent;
        dialogDescription.textContent = description.textContent;
        dialogExtra.textContent = extra ? extra.textContent : '';
        dialogExtra.hidden = !extra;
        detailDialog.showModal();
    });
});

detailDialog.querySelector('.dialog-close').addEventListener('click', () => {
    detailDialog.close();
});

detailDialog.addEventListener('click', (event) => {
    if (event.target === detailDialog) detailDialog.close();
});

document.querySelector('.hero').addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showSlide(activeSlide - 1);
    if (event.key === 'ArrowRight') showSlide(activeSlide + 1);
});

const revealElements = document.querySelectorAll(
    '.section-heading, .role-card, .origin-card, .map-page-heading, .map-panel, ' +
    '.impact-intro > div, .impact-table-wrap, .field-story-copy, .explore-card, .footer-main > *'
);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
    revealElements.forEach((element, index) => {
        element.classList.add('reveal-on-scroll');
        element.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
    });

    document.body.classList.add('motion-enabled');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    revealElements.forEach((element) => revealObserver.observe(element));

    const revealVisibleElements = () => {
        revealElements.forEach((element) => {
            const bounds = element.getBoundingClientRect();
            if (bounds.top < window.innerHeight - 35 && bounds.bottom > 35) {
                element.classList.add('is-revealed');
                revealObserver.unobserve(element);
            }
        });
    };

    window.addEventListener('scroll', revealVisibleElements, { passive: true });
    window.addEventListener('resize', revealVisibleElements);
    revealVisibleElements();
}

document.querySelector('#current-year').textContent = new Date().getFullYear();
