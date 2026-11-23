const form = document.getElementById('form');
const progress = document.getElementById('progress');

// API нетологии недоступно
form.onsubmit = (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', form.action);

    xhr.upload.onprogress = (uploadEvent) => {
        if (uploadEvent.lengthComputable) {
            progress.value = uploadEvent.loaded / uploadEvent.total;
        }
    };

    xhr.onload = () => {
        progress.value = 1;
    };

    xhr.send(data);
};
