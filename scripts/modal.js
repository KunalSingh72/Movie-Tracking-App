import { content } from "../data/data.js";
import { saveContentToLocal } from "./storage.js";
import { renderAllData } from "./render.js";

const modalOverlay = document.querySelector(".modal-overlay");
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
  saveContentToLocal();
  renderAllData();

  closeModal();
});
modalCancelBtn.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

export function openModalBox(item = null) {
  if (item) {
    const genreSelect = document.getElementById("genre");
    document.getElementById("movie-name").value = item.name;
    document.getElementById("number-of-parts").value = item.parts;
    document.getElementById("rating").value = item.rating;
    document.getElementById("genre").value = Array.from(
      genreSelect.options,
    ).forEach((option) => {
      option.selected = item.genre.includes(option.value);
    });
    document.getElementById("type").value = item.type;

    form.dataset.editId = item.id;

    deleteBtn.style.display = "inline-block";
  } else {
    form.reset();
    delete form.dataset.editId;
    deleteBtn.style.display = "none";
  }

  modalOverlay.style.display = "flex";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = form.dataset.editId;

  if (id) {
    updateContent(id);
  } else {
    createContent();
  }
  saveContentToLocal();
  renderAllData();
  closeModal();
});

function closeModal() {
  modalOverlay.style.display = "none";
}

function deleteContent(id) {
  const index = content.findIndex((item) => item.id === id);
  if (index !== -1) {
    content.splice(index, 1);
  }
}

function createContent() {
  const genreSelect = document.getElementById("genre");
  const selectedGenres = Array.from(genreSelect.selectedOptions).map(
    (option) => option.value,
  );
  if (selectedGenres.length === 0) {
    alert("Select at least one genre");
    return;
  }

  const newItem = {
    id: Date.now().toString(),
    name: document.getElementById("movie-name").value,
    parts: Number(document.getElementById("number-of-parts").value),
    rating: Number(document.getElementById("rating").value),
    genre: selectedGenres,
    type: document.getElementById("type").value,
  };

  content.push(newItem);
}

function updateContent(id) {
  const item = content.find((item) => item.id === id);

  if (!item) return;

  const genreSelect = document.getElementById("genre");

  item.name = document.getElementById("movie-name").value;
  item.parts = Number(document.getElementById("number-of-parts").value);
  item.rating = Number(document.getElementById("rating").value);
  item.genre = Array.from(genreSelect.selectedOptions).map(
    (option) => option.value,
  );
  item.type = document.getElementById("type").value;
}
