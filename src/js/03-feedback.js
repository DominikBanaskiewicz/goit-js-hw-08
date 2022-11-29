import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';
const form = document.querySelector('form');
const inputEmail = form.querySelector('label > input');
const inputMessage = form.querySelector('label > textarea');
const submitBtn = form.querySelector('button');

//checking local-storage for 'feedback-form-state' exist if dont create it empty
const initializeLocalStorage = () => {
  if (localStorage.getItem('feedback-form-state') === null) {
    localStorage.setItem(
      'feedback-form-state',
      JSON.stringify({ email: '', message: '' })
    );
  }
};
initializeLocalStorage();

//updating form on reload
const localStorageData = JSON.parse(
  localStorage.getItem('feedback-form-state')
);

const formUpdateOnstart = localStorageData => {
  if (localStorageData.email != '') {
    inputEmail.value = localStorageData.email;
  }
  if (localStorageData.message != '') {
    inputMessage.value = localStorageData.message;
  }
};
formUpdateOnstart(localStorageData);

//
const data = {
  email: localStorageData.email,
  message: localStorageData.message,
};

// adding input data to object on input event
const formList = form.addEventListener('input', event => {
  data[event.target.name] = event.target.value;
  localStorageUpdate();
});

// local storage-set throttle 500ms
const localStorageUpdate = throttle(() => {
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}, 500);

// submit btn
submitBtn.addEventListener('click', event => {
  event.preventDefault();
  if (inputMessage.value === '' && inputEmail.value === '') {
    Notiflix.Notify.failure('Please input email and message');
    return;
  }
  inputMessage.value = '';
  inputEmail.value = '';
  localStorage.removeItem('feedback-form-state');
  console.log(data);
});
