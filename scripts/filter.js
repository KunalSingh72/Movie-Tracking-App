import { content } from "../data/data.js";
import { renderContent } from "./render.js";
export function displayContentByGenre() {
  const genreBar = document.querySelector(".genre-bar");
  if (!genreBar) return;

  // Activate "All" by default
  const allChip = genreBar.querySelector('[data-genre="All"]');
  if (allChip) allChip.classList.add("active");

  genreBar.addEventListener("click", (e) => {
    const chip = e.target.closest(".genre-chip");
    if (!chip) return;

    const isAll = chip.dataset.genre === "All";

    if (isAll) {
      // Remove all other actives
      genreBar
        .querySelectorAll(".genre-chip")
        .forEach((c) => c.classList.remove("active"));

      chip.classList.add("active");
    }

    // If another genre clicked
    chip.classList.toggle("active");

    // Remove All
    if (allChip) {
      allChip.classList.remove("active");
    }

    // If no genre active → activate All again
    const activeGenres = genreBar.querySelectorAll(
      '.genre-chip.active:not([data-genre="All"])',
    );

    if (activeGenres.length === 0 && allChip) {
      allChip.classList.add("active");
    }
    applyFilters();
  });
}
export function displayContentByType() {
  const typeChip = document.querySelector(".type-chip");
  if (!typeChip) return;

  const allType = Array.from(typeChip.querySelectorAll(".type-name")).find(
    (btn) => btn.textContent === "All",
  );

  if (allType) allType.classList.add("active");

  typeChip.addEventListener("click", (e) => {
    const name = e.target.closest(".type-name");
    if (!name) return;

    typeChip
      .querySelectorAll(".type-name")
      .forEach((c) => c.classList.remove("active"));

    name.classList.add("active");
    applyFilters();
  });
}

function applyFilters() {
  const genreBar = document.querySelector(".genre-bar");
  const typeChip = document.querySelector(".type-chip");
  if (!genreBar || !typeChip) return;

  // Get active genres
  const activeGenres = Array.from(
    genreBar.querySelectorAll('.genre-chip.active:not([data-genre="All"])'),
  ).map((chip) => chip.dataset.genre);

  const isGenreAllActive = genreBar
    .querySelector('[data-genre="All"]')
    ?.classList.contains("active");

  // Get active type
  const activeTypeBtn = typeChip.querySelector(".type-name.active");
  const activeType = activeTypeBtn?.textContent;

  const isTypeAll = activeType === "All";

  let filtered = content;

  // Apply Genre Filter
  if (!isGenreAllActive && activeGenres.length > 0) {
    filtered = filtered.filter((item) =>
      activeGenres.every((selectedGenre) => item.genre.includes(selectedGenre)),
    );
  }

  // Apply Type Filter
  if (!isTypeAll && activeType) {
    filtered = filtered.filter((item) => item.type === activeType);
  }

  renderContent(filtered);
}
