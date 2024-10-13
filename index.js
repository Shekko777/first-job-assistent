document.onload = function () {
  console.log(JSON.parse(localStorage.getItem('arr')));
}();

const form = document.querySelector('.form');
const inputTitle = document.querySelector('.form__input-title');
const inputText = document.querySelector('.form__input-text');
const items = document.querySelectorAll('.item');
const list = document.querySelector('.list');
const template = document.querySelector('.template').content;

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
  } else if (evt.target.classList == 'item__img') {
    deleteElement(evt.target.closest('.item').querySelector('.item__text').textContent);
    console.log(evt.target.closest('.item').querySelector('.item__text').textContent);
    evt.target.closest('.item').remove();
    localStorage.setItem('arr', JSON.stringify(arr))
  };
})

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  arr.push({ title: inputTitle.value, text: inputText.value });
  console.log(arr);
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
