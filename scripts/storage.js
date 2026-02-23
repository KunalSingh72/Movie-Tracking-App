import { content } from "../data/data.js";

export function loadFromLocalStorage() {
  const storedContentData = localStorage.getItem("contentData");

  if (storedContentData) {
    try {
      content.length = 0;
      content.push(...JSON.parse(storedContentData));
    } catch {
      localStorage.removeItem("contentData");
    }
  }
}

export function saveContentToLocal() {
  localStorage.setItem("contentData", JSON.stringify(content));
}
