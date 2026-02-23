import { content } from "../data/data.js";
import { openModalBox } from "./modal.js";

export function renderAllData() {
  renderContent();
  renderGenre();
  renderType();
}

export function renderContent() {
  // Render Content Data
  let contentHTML = "";

  content.forEach((item) => {
    contentHTML += `
      <div data-content-id="${item.id}" class="content-container">
        <div class="content-name">${item.name}</div>
  
        <div class="content-info-container">
          <p><span>Parts/Seasons:</span> ${item.parts}</p>
          <p><span>Type:</span> ${item.type}</p>
          <p><span>Genre:</span> ${item.genre.join(", ")}</p>
          <p><span>Rating:</span> ${item.rating}</p>
        </div>
      </div>
    `;
  });
  if (content.length === 0) {
    contentHTML = `<p class="empty-state">No content added yet.</p>`;
  }

  const grid = document.querySelector(".content-grid");
  if (!grid) return;

  grid.innerHTML = contentHTML;

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".content-container");
    if (!card) return;

    const contentId = card.dataset.contentId;
    const selectedItem = content.find((item) => item.id === contentId);

    if (selectedItem) openModalBox(selectedItem);
  });
}

export function renderGenre() {
  const genreCount = generateGenreData();
  const totalContent = content.length;
  const TOTAL_BLOCKS = 10;

  // Loading Genre Data
  let genreHTML = "";

  genreHTML += `
    <button class="genre-chip" data-genre="All">
      <span class="genre-name">All</span>
    </button>
  `;

  Object.keys(genreCount).forEach((genreName) => {
    const count = genreCount[genreName];
    const filledBlocks =
      totalContent === 0
        ? 0
        : Math.round((count / totalContent) * TOTAL_BLOCKS) + 1;

    let blocksHTML = "";
    for (let i = 0; i < TOTAL_BLOCKS; i++) {
      blocksHTML += `
        <span class="block ${i < filledBlocks ? "filled" : ""}"></span>
      `;
    }

    genreHTML += `
      <button class="genre-chip" data-genre="${genreName}">
        <span class="genre-name">${genreName}</span>

        <div class="genre-progress" aria-hidden="true">
          ${blocksHTML}
        </div>
      </button>
  `;
  });
  document.querySelector(".genre-bar").innerHTML = genreHTML;
}

export function renderType() {
  const dynamicTypes = generateTypeData();

  // Loading type Data
  let typeHTML = "";
  dynamicTypes.forEach((typeContent) => {
    typeHTML += `
    <button class="type-name">${typeContent}</button>
  `;
  });
  document.querySelector(".type-chip").innerHTML = typeHTML;
}

function generateGenreData() {
  const genreCount = {};

  content.forEach((item) => {
    item.genre.forEach((g) => {
      genreCount[g] = (genreCount[g] || 0) + 1;
    });
  });

  return genreCount;
}

function generateTypeData() {
  const typeSet = new Set();

  content.forEach((item) => {
    typeSet.add(item.type);
  });

  return ["All", ...typeSet];
}
