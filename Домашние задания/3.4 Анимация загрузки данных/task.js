const items = document.getElementById('items');
const loader = document.getElementById('loader');
const cacheKey = 'exchange-rates-cache';

const renderRates = (currencies) => {
    items.innerHTML = '';

    Object.values(currencies).forEach((currency) => {
        const item = document.createElement('div');
        item.className = 'item';

        item.innerHTML = `
      <div class="item__code">${currency.CharCode}</div>
      <div class="item__value">${currency.Value}</div>
      <div class="item__currency">руб.</div>
    `;

        items.appendChild(item);
    });
};

const cachedData = localStorage.getItem(cacheKey);

if (cachedData) {
    try {
        const parsedCache = JSON.parse(cachedData);
        renderRates(parsedCache.response.Valute);
    } catch (error) {
        localStorage.removeItem(cacheKey);
    }
}

// URL недоступен. Импровизация
fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Ошибка загрузки курса валют');
        }

        return response.json();
    })
    .then((data) => {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        renderRates(data.response.Valute);
    })
    .catch(() => {
        if (!cachedData) {
            items.textContent = 'Не удалось загрузить курс валют';
        }
    })
    .finally(() => {
        loader.classList.remove('loader_active');
    });
