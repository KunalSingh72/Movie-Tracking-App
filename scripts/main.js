import { loadFromLocalStorage } from "./storage.js";
import { renderAllData } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  renderAllData();
});
