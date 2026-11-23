const rotators = document.querySelectorAll('.rotator');

Array.from(rotators).forEach((rotator) => {
    const cases = Array.from(rotator.querySelectorAll('.rotator__case'));

    if (cases.length === 0) {
        return;
    }

    let activeIndex = cases.findIndex((item) =>
        item.classList.contains('rotator__case_active')
    );

    if (activeIndex === -1) {
        activeIndex = 0;
    }

    const showNextCase = () => {
        cases[activeIndex].classList.remove('rotator__case_active');
        activeIndex = (activeIndex + 1) % cases.length;

        const nextCase = cases[activeIndex];
        nextCase.classList.add('rotator__case_active');

        if (nextCase.dataset.color) {
            nextCase.style.color = nextCase.dataset.color;
        } else {
            nextCase.style.color = '';
        }

        const speed = Number(nextCase.dataset.speed) || 1000;
        setTimeout(showNextCase, speed);
    };

    const activeCase = cases[activeIndex];
    if (activeCase.dataset.color) {
        activeCase.style.color = activeCase.dataset.color;
    }

    const initialSpeed = Number(activeCase.dataset.speed) || 1000;
    setTimeout(showNextCase, initialSpeed);
});
