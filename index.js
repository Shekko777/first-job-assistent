const form = document.querySelector('.form');
const inputTitle = document.querySelector('.form__input-title');
const inputText = document.querySelector('.form__input-text');
const arr = localStorage.getItem('arr') || [];

document.onload = function () {
  console.log(window.localStorage.getItem('arr'))
}()

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  arr.push(inputTitle.value);
  localStorage.setItem('arr', arr);
  console.log(arr)
});
