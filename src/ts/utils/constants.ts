export const API_BASE_URL: string = "https://fakerapi.it/api/v1/";
export const API_ENDPOINT: string = "persons";

export const DOM_ELEMENTS = {
  body: document.body,
  dateForm: document.querySelector(".js-date-form"),
  startDateInput: document.querySelector(
    ".js-startDate"
  ) as HTMLInputElement | null,
  endDateInput: document.querySelector(
    ".js-endDate"
  ) as HTMLInputElement | null,
  resultsContainer: document.querySelector(".js-results"),
  submitBtn: document.querySelector(
    ".js-submitBtn"
  ) as HTMLButtonElement | null,
  loader: document.querySelector(".js-lds-ring"),
} as const;

export const ICONS = {
  email: "assets/email.svg",
  phone: "assets/phone.svg",
  birthday: "assets/birthday.svg",
  gender: "assets/gender.svg",
  website: "assets/website.svg",
} as const;
