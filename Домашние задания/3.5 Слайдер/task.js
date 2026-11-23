const slides = Array.from(document.querySelectorAll('.slider__item'));
const prevArrow = document.querySelector('.slider__arrow_prev');
const nextArrow = document.querySelector('.slider__arrow_next');

let activeIndex = 0;

let dotsContainer = document.querySelector('.slider__dots');
let dots = [];

if (!dotsContainer) {
    const navigation = document.querySelector('.slider__navigation');
    dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider__dots';

    slides.forEach(() => {
        dotsContainer.appendChild(document.createElement('div'));
    });

    navigation.appendChild(dotsContainer);
}

const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('slider__item_active', slideIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('slider__dot_active', dotIndex === activeIndex);
    });
};

dots = Array.from(dotsContainer.children);
dots.forEach((dot, index) => {
    dot.className = 'slider__dot';
    dot.onclick = () => showSlide(index);
});

prevArrow.onclick = () => showSlide(activeIndex - 1);
nextArrow.onclick = () => showSlide(activeIndex + 1);

showSlide(activeIndex);
