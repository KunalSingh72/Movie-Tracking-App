const modal = document.getElementById("modal");
const openModalBtn = document.querySelector(".open-modal-btn");
const closeModalBtn = document.querySelector(".modal-close");
const modalCancelBtn = document.querySelector(".btn-secondary");
const deleteBtn = document.querySelector(".btn-danger");
const form = document.querySelector(".modal-form");

openModalBtn.addEventListener("click", () => openModalBox());
closeModalBtn.addEventListener("click", closeModal);
deleteBtn.addEventListener("click", () => {
  const id = form.dataset.editId;
  if (!id) return;

  deleteContent(id);
  saveToLocalStorage();
  renderContent();
  closeModal();
});
modalCancelBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function openModalBox(item = null) {
  if (item) {
    document.getElementById("movie-name").value = item.name;
    document.getElementById("finished-date").value = item.date;
    document.getElementById("rating").value = item.rating;
    document.getElementById("genre").value = item.genre;
    document.getElementById("type").value = item.type;

    form.dataset.editId = item.id;

    deleteBtn.style.display = "inline-block";
  } else {
    form.reset();
    delete form.dataset.editId;
    deleteBtn.style.display = "none";
  }

  modal.style.display = "flex";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = form.dataset.editId;

  if (id) {
    updateContent(id);
  } else {
    createContent();
  }

  saveToLocalStorage();
  renderContent();
  closeModal();
});

function closeModal() {
  modal.style.display = "none";
}

function deleteContent(id) {
   content = content.filter((item) => item.id !== id);
}

function createContent() {
  const newItem = {
    id: Date.now().toString(),
    name: document.getElementById("movie-name").value,
    date: document.getElementById("finished-date").value,
    rating: document.getElementById("rating").value,
    genre: document.getElementById("genre").value,
    type: document.getElementById("type").value,
  };

  content.push(newItem);
}

function updateContent(id) {
  const item = content.find((item) => item.id === id);

  if (!item) return;

  item.name = document.getElementById("movie-name").value;
  item.date = document.getElementById("finished-date").value;
  item.rating = document.getElementById("rating").value;
  item.genre = document.getElementById("genre").value;
  item.type = document.getElementById("type").value;
}
