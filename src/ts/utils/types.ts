export type BuildApiUrlType = <T>(params: T) => string;

export type FetchDataType = <T>(url: string) => Promise<T>;

export type handleSubmitType = (event: Event) => void;

export type DisplayResultsType = <T>(data: T) => void;

export type DisplayErrorType = (error: string) => void;

export type SetLoaderType = (switcher: boolean) => void;

export type CreateResultItemType<T> = (result: T) => HTMLElement;

export type CreateListItemType = (icon: string, text: string) => HTMLElement;

export type fetchPeopleDataType = (startDate: string, endDate: string) => void;

export type isValidURL = (url: string) => boolean;

export type isValidDates = (startDate: string, endDate: string) => boolean;

export type GetISODateType = (date: Date) => string;

export type SetMinMaxValueType = (
  inputElement: HTMLInputElement | null,
  minDate: string,
  maxDate: string
) => void;
