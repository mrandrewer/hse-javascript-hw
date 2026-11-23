const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

const links = document.querySelectorAll('.has-tooltip');

Array.from(links).forEach((link) => {
    link.onclick = (event) => {
        event.preventDefault();

        if (tooltip.classList.contains('tooltip_active') && tooltip.dataset.owner === link.title) {
            tooltip.classList.remove('tooltip_active');
            return false;
        }

        tooltip.textContent = link.title;
        tooltip.dataset.owner = link.title;
        tooltip.classList.add('tooltip_active');

        const linkRect = link.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const position = link.dataset.position || 'bottom';

        let left = linkRect.left;
        let top = linkRect.bottom + 5;

        if (position === 'top') {
            left = linkRect.left;
            top = linkRect.top - tooltipRect.height - 5;
        } else if (position === 'left') {
            left = linkRect.left - tooltipRect.width - 5;
            top = linkRect.top;
        } else if (position === 'right') {
            left = linkRect.right + 5;
            top = linkRect.top;
        }

        tooltip.style.left = `${Math.max(0, left)}px`;
        tooltip.style.top = `${Math.max(0, top)}px`;

        return false;
    };
});
