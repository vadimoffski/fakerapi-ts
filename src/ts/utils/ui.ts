import { DOM_ELEMENTS, ICONS } from "./constants";
import { IPerson } from "./interfaces";
import {
  CreateListItemType,
  CreateResultItemType,
  DisplayErrorType,
  DisplayResultsType,
  SetLoaderType,
} from "./types";

export const createListItem: CreateListItemType = (icon, text) => {
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.src = icon;
  img.alt = text;
  const p = document.createElement("p");
  p.textContent = text;
  li.appendChild(img);
  li.appendChild(p);
  return li;
};

export const createResultItem: CreateResultItemType<IPerson> = (person) => {
  const resultItem = document.createElement("div");
  resultItem.classList.add("results__item");
  const { firstname, lastname, email, phone, birthday, gender, website } =
    person;
  const ul = document.createElement("ul");

  ul.appendChild(createListItem(ICONS.email, `${firstname} ${lastname}`));
  ul.appendChild(createListItem(ICONS.email, email));
  ul.appendChild(createListItem(ICONS.phone, phone));
  ul.appendChild(createListItem(ICONS.birthday, birthday));
  ul.appendChild(createListItem(ICONS.gender, gender));
  ul.appendChild(createListItem(ICONS.website, `${website}`));

  resultItem.appendChild(ul);

  return resultItem;
};

export const displayResults: DisplayResultsType = (data) => {
  const { resultsContainer: container } = DOM_ELEMENTS;
  if (!container || !Array.isArray(data)) return;
  container.innerHTML = "";
  data.forEach((person) => {
    const resultItem = createResultItem(person);
    container.appendChild(resultItem);
  });
};

export const displayError: DisplayErrorType = (error) => {
  const { resultsContainer: container } = DOM_ELEMENTS;
  if (!container) return;
  container.classList.toggle("error", !!error);
  if (error) {
    container.innerHTML = "";
    const p = document.createElement("p");
    p.classList.add("error__description");
    p.textContent = error;
    container.appendChild(p);
  }
};

export const setLoader: SetLoaderType = (switcher) => {
  const { loader, body, submitBtn } = DOM_ELEMENTS;
  if (loader && body && submitBtn) {
    submitBtn.disabled = switcher;
    loader.classList.toggle("display", switcher);
    body.style.overflow = switcher ? "hidden" : "auto";
  }
};
