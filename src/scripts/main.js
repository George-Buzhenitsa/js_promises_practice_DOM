'use strict';

const pageDocument = document;
const body = document.body;

function firstPromise() {
  return new Promise((resolve, reject) => {
    pageDocument.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        resolve('First promise was resolved');
      }
    });

    setTimeout(() => {
      reject(new Error());
    }, 3000);
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    pageDocument.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    });
  });
}

function thirdPromise() {
  const buttonsClicked = [];

  return new Promise((resolve) => {
    function handler(e) {
      buttonsClicked.push(e.button);

      if (buttonsClicked.length === 2) {
        pageDocument.removeEventListener('mousedown', handler);
      }

      if (buttonsClicked.includes(0) && buttonsClicked.includes(2)) {
        resolve('Third promise was resolved');
      }
    }

    pageDocument.addEventListener('mousedown', handler);
  });
}

firstPromise()
  .then((value) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.textContent = value;
    body.append(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.textContent = 'First promise was rejected';
    body.append(div);
  });

secondPromise().then((value) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = value;
  body.append(div);
});

thirdPromise().then((value) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = value;
  body.append(div);
});
