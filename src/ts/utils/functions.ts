import { API_BASE_URL, API_ENDPOINT, DOM_ELEMENTS } from "./constants";
import { IPeopleArray, IPersonParams } from "./interfaces";
import {
  BuildApiUrlType,
  FetchDataType,
  handleSubmitType,
  isValidURL,
} from "./types";
import { displayError, displayResults, setLoader } from "./ui";

const isValidURL: isValidURL = (url) => {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlPattern.test(url);
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

export const handleSubmit: handleSubmitType = (event) => {
  event?.preventDefault();

  const { endDateInput, startDateInput } = DOM_ELEMENTS;

  if (!startDateInput || !endDateInput) return;

  const startDate: string = String(startDateInput?.value) ?? "";
  const endDate: string = String(endDateInput?.value) ?? "";

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
