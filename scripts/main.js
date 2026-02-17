// Elements

const modal = document.getElementById("modal");
const openModalBtn = document.querySelector(".open-modal-btn");
const closeModalBtn = document.querySelector(".modal-close");
const modalCancelBtn = document.querySelector(".btn-secondary");
const form = document.querySelector(".modal-form");

// Default Calling
renderContent();
renderGenre();
renderType();

function renderContent() {
  // Render Content Data
  let contentData = "";
  content.forEach((item) => {
    contentData += `
    <div data-content-id="${item.id}" class="content-container">
      <div class="content-name">${item.name}</div>

      <div class="content-info-container">
        <p><span>Date:</span> ${item.date}</p>
        <p><span>Genre:</span> ${item.genre}</p>
        <p><span>Type:</span> ${item.type}</p>
        <p><span>Rating:</span> ${item.rating}</p>
      </div>
    </div>
  `;
  });
  document.querySelector(".content-grid").innerHTML = contentData;
  attachContentClickEvents();
}

function renderGenre() {
  // Loading Genre Data
  let genreData = "";
  genre.forEach((genreContent) => {
    genreData += `
    <button class="genre-chip" data-genre="action">
            <span class="genre-name">${genreContent}</span>

            <div class="genre-progress" aria-hidden="true">
              <span class="block filled"></span>
              <span class="block filled"></span>
              <span class="block filled"></span>
              <span class="block filled"></span>
              <span class="block"></span>
              <span class="block"></span>
              <span class="block"></span>
              <span class="block"></span>
              <span class="block"></span>
              <span class="block"></span>
            </div>
          </button>
  `;
  });
  document.querySelector(".genre-bar").innerHTML = genreData;
}

function renderType() {
  // Loading type Data
  let typeData = "";
  type.forEach((typeContent) => {
    typeData += `
    <button class="type-name">${typeContent}</button>
  `;
  });
  document.querySelector(".type-chip").innerHTML = typeData;
}

function attachContentClickEvents() {
  document
    .querySelectorAll(".content-container")
    .forEach((contentContainer) => {
      contentContainer.addEventListener("click", () => {
        const contentId = contentContainer.dataset.contentId;
        const selectedItem = content.find((item) => item.id === contentId);

        if (selectedItem) {
          openModalBox(selectedItem);
        }
      });
    });
}

openModalBtn.addEventListener("click", () => openModalBox());

closeModalBtn.addEventListener("click", closeModal);
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
  } else {
    form.reset();
    delete form.dataset.editId;
  }

  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = form.dataset.editId;

  if (id) {
    updateContent(id);
  }

  renderContent();
  closeModal();
});


function updateContent(id) {
  const item = content.find((item) => item.id === id);

  if (!item) return;

  item.name = document.getElementById("movie-name").value;
  item.date = document.getElementById("finished-date").value;
  item.rating = document.getElementById("rating").value;
  item.genre = document.getElementById("genre").value;
  item.type = document.getElementById("type").value;
}
