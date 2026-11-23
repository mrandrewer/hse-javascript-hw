const products = document.querySelectorAll('.product');
const cartProducts = document.querySelector('.cart__products');

const cartTitle = document.querySelector('.cart__title');

const updateCartTitle = () => {
    cartTitle.hidden = cartProducts.children.length === 0;
};

Array.from(products).forEach((product) => {
    const decButton = product.querySelector('.product__quantity-control_dec');
    const incButton = product.querySelector('.product__quantity-control_inc');
    const quantityValue = product.querySelector('.product__quantity-value');
    const addButton = product.querySelector('.product__add');

    decButton.onclick = () => {
        quantityValue.textContent = String(Math.max(1, Number(quantityValue.textContent) - 1));
    };

    incButton.onclick = () => {
        quantityValue.textContent = String(Number(quantityValue.textContent) + 1);
    };

    addButton.onclick = () => {
        const productId = product.dataset.id;
        const existingProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);
        const quantity = Number(quantityValue.textContent);

        if (existingProduct) {
            const count = existingProduct.querySelector('.cart__product-count');
            count.textContent = String(Number(count.textContent) + quantity);
        } else {
            const cartProduct = document.createElement('div');
            cartProduct.className = 'cart__product';
            cartProduct.dataset.id = productId;

            const image = product.querySelector('.product__image').cloneNode();
            image.className = 'cart__product-image';

            const count = document.createElement('div');
            count.className = 'cart__product-count';
            count.textContent = String(quantity);

            cartProduct.appendChild(image);
            cartProduct.appendChild(count);
            cartProducts.appendChild(cartProduct);
        }

        updateCartTitle();
    };
});

updateCartTitle();
