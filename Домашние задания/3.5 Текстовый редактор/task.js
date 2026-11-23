const editor = document.getElementById('editor');
const storageKey = 'text-editor-content';

editor.value = localStorage.getItem(storageKey) || '';

editor.oninput = () => {
  localStorage.setItem(storageKey, editor.value);
};

const clearButton = document.getElementById('clear-button');
clearButton.onclick = () => {
  editor.value = '';
  localStorage.removeItem(storageKey);
  editor.focus();
};
