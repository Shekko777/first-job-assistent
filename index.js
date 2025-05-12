const form = document.querySelector('.form');
const inputTitle = document.querySelector('.form__input-title');
const inputText = document.querySelector('.form__input-text');
const items = document.querySelectorAll('.item');
const list = document.querySelector('.list');
const template = document.querySelector('.template').content;
// modal
const modal = document.querySelector('.modal');
const modalButtonNo = document.querySelector('.modal__button_type_no');
const modalButtonYes = document.querySelector('.modal__button_type_yes');


let localArr = JSON.parse(localStorage.getItem('arr'));
let arr = [];

if(localArr != null) {
  arr = localArr;
}

arr.forEach(el => {
  createElement(el.title, el.text);
})

list.addEventListener('click', (evt) => {
  if (evt.target.classList == 'item__text' || evt.target.classList == 'item') {
    const miniText = evt.target.closest('.item').querySelector('.item__hidetext').textContent;
    navigator.clipboard.writeText(miniText);
  } else if (evt.target.classList == 'item__delete') {
    deleteElement(evt.target.closest('.item').querySelector('.item__text').textContent);
    evt.target.closest('.item').remove();
    localStorage.setItem('arr', JSON.stringify(arr))
  };
})

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  arr.push({ title: inputTitle.value, text: inputText.value });
  localStorage.setItem('arr', JSON.stringify(arr))
  createElement(inputTitle.value, inputText.value);
  form.reset();
});

function createElement(title = 'title', text = 'text') {
  const element = template.cloneNode(true);
  element.querySelector('.item__text').textContent = title;
  element.querySelector('.item__hidetext').textContent = text;
  list.append(element);
}

function deleteElement(text) {
  arr = arr.filter(el => el.title !== text);
}

function updateArr() {
  const items = document.querySelectorAll('.item');
  let newArr = [];
  items.forEach(el => {
    const title = el.querySelector('.item__text').textContent;
    const text = el.querySelector('.item__hidetext').textContent;
    newArr.push({title: title, text: text})
  });
  arr = newArr;
  localStorage.setItem('arr', JSON.stringify(arr));
};

list.addEventListener('dragstart', (evt) => {
  evt.target.classList.add('select')
})

list.addEventListener('dragend', (evt) => {
  evt.target.classList.remove('select');
  updateArr();
})

list.addEventListener('dragover', (evt) => {
  const selectElement = list.querySelector('.select');
  const currentElement = evt.target;
  const moveble = selectElement !== currentElement && currentElement.classList.contains('item');

  if(!moveble) {
    return;
  }

  const nextElement = getNextElement(evt.clientY, currentElement);

  if (
    nextElement && 
    selectElement === nextElement.previousElementSibling ||
    selectElement === nextElement
  ) {
    return;
  }

  list.insertBefore(selectElement, nextElement);
});

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

  const nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling;

  return nextElement;
};

// Смена темы
const toggle = document.getElementById('theme-toggle');
function setTheme(isDark) {
  if (isDark) {
    document.documentElement.style.setProperty('--bg', '#222');
    document.documentElement.style.setProperty('--text', '#fff');
    document.documentElement.style.setProperty('--label-bg', '#565656');
    document.documentElement.style.setProperty('--txt-color', '#e3e3e3');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.style.setProperty('--bg', '#f9f9f9');
    document.documentElement.style.setProperty('--text', '#222');
    document.documentElement.style.setProperty('--txt-color', '#505050');
    document.documentElement.style.setProperty('--label-bg', '#fff');
    localStorage.setItem('theme', 'light');
  }
}
toggle.addEventListener('change', function() {
  setTheme(this.checked);
});
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    toggle.checked = true;
    setTheme(true);
  }
});