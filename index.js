"use strict";

const myAge = 32;

const storage = localStorage.getItem("queue");

let queue = [];

let queueList = document.getElementById("queue-list");

if (JSON.parse(storage).length !== 0) {
  queue = JSON.parse(storage);
  renderQueue(queue);
}

function renderQueue(list) {
  queueList.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    let newListItem = document.createElement("li");
    newListItem.innerHTML = list[i];
    queueList.appendChild(newListItem);
  }
}

function addQueueItem(item, arr) {
  if (arr.length > myAge - 1) {
    return alert("Your queue is too loong");
  } else {
    return queue.push(item);
  }
}

function addToLocalStorage(arr) {
  localStorage.clear();
  localStorage.setItem("queue", JSON.stringify(arr));
}

function deleteQueueItem(arr) {
  if (queue.length === 0) {
    alert("There are nothing left in your queue");
  }
  return arr.shift();
}

function deleteFromLocalStorage(arr) {
  localStorage.clear();
  localStorage.setItem("queue", JSON.stringify(arr));
}

if (queue.length < 1) {
  queueList.innerHTML = "Your  queue list is empty";
}

let inputForm = document.getElementById("form");
let submitButton = document.getElementById("submit");
let inputValue = document.getElementById("input");

submitButton.disabled = true;
inputValue.addEventListener("input", (e) => {
  submitButton.disabled = !e.target.value;
});
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputValue.value == "") {
    alert("Ensure your input is correct");
  } else {
    console.log(`This form has a input - ${inputValue.value}`);
    addQueueItem(inputValue.value, queue);
    renderQueue(queue);
    addToLocalStorage(queue);
    submitButton.disabled = true;
    inputValue.value = "";
  }
});

const deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener("click", (e) => {
  deleteQueueItem(queue);
  renderQueue(queue);
  deleteFromLocalStorage(queue);
  inputValue.value = "";
});
