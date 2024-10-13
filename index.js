document.onload = function () {
  console.log(JSON.parse(localStorage.getItem('arr')))
}();
// localStorage.clear();

const form = document.querySelector('.form');
const inputTitle = document.querySelector('.form__input-title');
const inputText = document.querySelector('.form__input-text');
let localArr = JSON.parse(localStorage.getItem('arr'));
let arr = [];

if(localArr != null) {
  arr = localArr;
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  arr.push(inputTitle.value);
  console.log(arr);

  localStorage.setItem('arr', JSON.stringify(arr))
});
