"use strict";

(function () {
  const MAX_ITEMS = 32;

  const storage = localStorage.getItem("queue");
  const inputForm = document.getElementById("form");
  const submitButton = document.getElementById("submit");
  const inputValue = document.getElementById("input");
  const deleteButton = document.getElementById("deleteButton");
  const queueList = document.getElementById("queue-list");

  let queueData = [];

  submitButton.disabled = true;

  if (JSON.parse(storage).length !== 0) {
    queueData = JSON.parse(storage);
    renderQueue(queueData);
  }

  if (queueData.length < 1) {
    queueList.innerHTML = "Your  queue list is empty";
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
    if (arr.length > MAX_ITEMS - 1) {
      return alert("Your queue is too loong");
    } else {
      return queueData.push(item);
    }
  }

  function addToLocalStorage(arr) {
    localStorage.clear();
    localStorage.setItem("queue", JSON.stringify(arr));
  }

  function deleteQueueItem(arr) {
    if (queueData.length === 0) {
      alert("There are nothing left in your queue");
    }
    return arr.shift();
  }

  function deleteFromLocalStorage(arr) {
    localStorage.clear();
    localStorage.setItem("queue", JSON.stringify(arr));
  }

  inputValue.addEventListener("input", (e) => {
    submitButton.disabled = !e.target.value;
  });

  inputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputValue.value == "") {
      alert("Ensure your input is correct");
    } else {
      console.log(`This form has a input - ${inputValue.value}`);
      addQueueItem(inputValue.value, queueData);
      renderQueue(queueData);
      addToLocalStorage(queueData);
      submitButton.disabled = true;
      inputValue.value = "";
    }
  });

  deleteButton.addEventListener("click", (e) => {
    deleteQueueItem(queueData);
    renderQueue(queueData);
    deleteFromLocalStorage(queueData);
    inputValue.value = "";
  });
})();
