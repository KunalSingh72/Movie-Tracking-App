function loadFromLocalStorage() {
  const storedData = localStorage.getItem("contentData");

  if (storedData) {
    content = JSON.parse(storedData);
  }
}

function saveToLocalStorage() {
  localStorage.setItem("contentData", JSON.stringify(content));
}
