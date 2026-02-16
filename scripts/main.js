// Elements

const contentContainer = document.querySelector(".js-content-container");
const modal = document.getElementById("modal");
const openModal = document.querySelector(".open-modal-btn");
const closeModal = document.querySelector(".modal-close");
const modalCancelBtn = document.querySelector(".btn-secondary");
const selectContent = document.querySelectorAll(".");

// EventListeners
openModal.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modalCancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const form = document.querySelector(".modal-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  modal.style.display = "none";

  // console.log("Form submitted without reload");
});


// Functions



/*
function saveData() {
  const name = document.querySelector(".added-content-name");
  const date = document.querySelector(".added-content-date");
  const type = document.querySelector(".added-content-type");
  const rating = document.querySelector(".added-content-rating");
  const ContentName = document.querySelector(".added-content-genre");
  
}
*/
