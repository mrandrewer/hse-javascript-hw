const links = document.querySelectorAll('.menu__link');

Array.from(links).forEach((link) => {
    link.onclick = () => {
        const menuItem = link.closest('.menu__item');
        const subMenu = menuItem.querySelector('.menu_sub');

        if (!subMenu) {
            return true;
        }

        const mainMenu = link.closest('.menu_main');

        if (mainMenu) {
            Array.from(mainMenu.querySelectorAll('.menu_sub')).forEach((menu) => {
                if (menu !== subMenu) {
                    menu.classList.remove('menu_active');
                }
            });
        }

        subMenu.classList.toggle('menu_active');
        return false;
    };
});
