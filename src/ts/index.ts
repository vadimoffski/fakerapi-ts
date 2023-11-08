import { DOM_ELEMENTS } from "./utils/constants";
import { handleSubmit } from "./utils/functions";

if (DOM_ELEMENTS.dateForm) {
  DOM_ELEMENTS.dateForm.addEventListener("submit", handleSubmit);
}
