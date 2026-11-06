//Задача № 1
function cachingDecoratorNew(func) {
    const cache = [];

    function wrapper(...args) {
        const hash = md5(args);
        const cachedResult = cache.find((item) => item.hash === hash);

        if (cachedResult) {
            console.log("Из кеша: " + cachedResult.value);
            return "Из кеша: " + cachedResult.value;
        }

        const result = func(...args);
        cache.push({ hash, value: result });

        if (cache.length > 5) {
            cache.shift();
        }

        console.log("Вычисляем: " + result);
        return "Вычисляем: " + result;
    }

    return wrapper;
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
    let timeoutId;
    let hasBeenCalled = false;

    function wrapper(...args) {
        wrapper.allCount += 1;

        if (!hasBeenCalled) {
            hasBeenCalled = true;
            wrapper.count += 1;
            return func.apply(this, args);
        }

        clearTimeout(timeoutId);
        const context = this;
        timeoutId = setTimeout(() => {
            timeoutId = undefined;
            wrapper.count += 1;
            func.apply(context, args);
        }, delay);
    }

    wrapper.count = 0;
    wrapper.allCount = 0;

    return wrapper;
}
