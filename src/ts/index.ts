import { DOM_ELEMENTS } from "./utils/constants";
import {
  calculateDateRange,
  handleSubmit,
  setMinMaxValue,
} from "./utils/functions";

if (DOM_ELEMENTS.startDateInput && DOM_ELEMENTS.endDateInput) {
  const { oneDayAgo, today, minDate } = calculateDateRange();
  setMinMaxValue(DOM_ELEMENTS.startDateInput, minDate, oneDayAgo);
  setMinMaxValue(DOM_ELEMENTS.endDateInput, minDate, today);
}

if (DOM_ELEMENTS.dateForm) {
  DOM_ELEMENTS.dateForm.addEventListener("submit", handleSubmit);
}
