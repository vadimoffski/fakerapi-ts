export type BuildApiUrlType = <T>(params: T) => string;

export type FetchDataType = <T>(url: string) => Promise<T>;

export type handleSubmitType = (event: Event) => void;

export type DisplayResultsType = <T>(data: T) => void;

export type DisplayErrorType = (error: string) => void;

export type setLoaderType = (switcher: boolean) => void;

export type CreateResultItemType<T> = (result: T) => HTMLElement;

export type CreateListItemType = (icon: string, text: string) => HTMLElement;

export type isValidURL = (url: string) => boolean;
