function renderContent() {
  // Render Content Data
  let contentHTML = "";

  content.forEach((item) => {
    contentHTML += `
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
  document.querySelector(".content-grid").innerHTML = contentHTML;
  attachContentClickEvents();
}

function renderGenre() {
  // Loading Genre Data
  let genreHTML = "";
  genre.forEach((genreContent) => {
    genreHTML += `
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
  document.querySelector(".genre-bar").innerHTML = genreHTML;
}

function renderType() {
  // Loading type Data
  let typeHTML = "";
  type.forEach((typeContent) => {
    typeHTML += `
    <button class="type-name">${typeContent}</button>
  `;
  });
  document.querySelector(".type-chip").innerHTML = typeHTML;
}

function attachContentClickEvents() {
  document.querySelectorAll(".content-container").forEach((card) => {
    card.addEventListener("click", () => {
      const contentId = card.dataset.contentId;
      const selectedItem = content.find((item) => item.id === contentId);

      if (selectedItem) {
        openModalBox(selectedItem);
      }
    });
  });
}
