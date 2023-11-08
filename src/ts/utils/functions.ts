import { API_BASE_URL, API_ENDPOINT, DOM_ELEMENTS } from "./constants";
import { IDateRange, IPeopleArray, IPersonParams } from "./interfaces";
import {
  BuildApiUrlType,
  FetchDataType,
  fetchPeopleDataType,
  GetISODateType,
  handleSubmitType,
  isValidDates,
  isValidURL,
  SetMinMaxValueType,
} from "./types";
import { displayError, displayResults, setLoader } from "./ui";

export const getISODate: GetISODateType = (date) =>
  date.toISOString().split("T")[0];

export const calculateDateRange = (): IDateRange => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);

  const oneDayAgo = getISODate(currentDate);
  const today = getISODate(new Date());

  currentDate.setFullYear(currentDate.getFullYear() - 5);
  const minDate = getISODate(currentDate);

  return { oneDayAgo, today, minDate };
};

export const setMinMaxValue: SetMinMaxValueType = (
  inputElement,
  minDate,
  maxDate
) => {
  if (inputElement) {
    inputElement.setAttribute("min", minDate);
    inputElement.setAttribute("max", maxDate);
    inputElement.value = maxDate;
  }
};

const isValidURL: isValidURL = (url) => {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlPattern.test(url);
};

const isValidDates: isValidDates = (
  startDate: string,
  endDate: string
): boolean => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  if (startDateObj >= endDateObj) {
    displayError(
      "Start date should not be greater than or equal to the end date"
    );
    return false;
  }

  return true;
};

export const buildApiUrl: BuildApiUrlType = (params) => {
  const queryParams: string[] = [];
  for (const key in params) {
    if (params?.hasOwnProperty(key)) {
      const param = `${key}=${params[key]}`;
      queryParams.push(param);
    }
  }
  const apiUrl: string = `${API_BASE_URL}${API_ENDPOINT}?${queryParams.join(
    "&"
  )}`;
  return apiUrl;
};

export const fetchData: FetchDataType = async (url) => {
  try {
    if (!isValidURL(url)) {
      throw new Error("Invalid URL");
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${url}. Status: ${response.status}`
      );
    }
    const data = await response.json();

    return data?.data;
  } catch (error) {
    throw new Error(`Error while fetching data: ${(error as Error).message}`);
  }
};

const fetchPeopleData: fetchPeopleDataType = (
  startDate: string,
  endDate: string
): void => {
  const queryParams: IPersonParams = {
    _birthday_start: startDate,
    _birthday_end: endDate,
  };

  const apiUrl = buildApiUrl(queryParams);

  fetchData<IPeopleArray>(apiUrl)
    .then((data) => {
      displayError("");
      setLoader(true);
      displayResults(data);
    })
    .catch((error) => displayError(error.message))
    .finally(() => setLoader(false));
};

export const handleSubmit: handleSubmitType = (event) => {
  event?.preventDefault();
  const { endDateInput, startDateInput } = DOM_ELEMENTS;
  if (!startDateInput || !endDateInput) return;

  const startDate: string = String(startDateInput?.value) ?? "";
  const endDate: string = String(endDateInput?.value) ?? "";

  if (!isValidDates(startDate, endDate)) return;

  fetchPeopleData(startDate, endDate);
};
