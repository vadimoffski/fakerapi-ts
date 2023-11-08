export interface IPerson {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    birthday: string;
    gender: string;
    address: {
        id: number;
        street: string;
        streetName: string;
        buildingNumber: string;
        city: string;
        zipcode: string;
        country: string;
        county_code: string;
        latitude: number;
        longitude: number;
    };
    website: string;
    image: string;
}
export interface IPeopleArray {
    people: IPerson[];
}
export interface IDefaultParams {
    _locale: string;
    _seed: string;
    _gender: string;
}
export interface IPersonParams extends Partial<IDefaultParams> {
    _quantity?: number;
    _birthday_start: string;
    _birthday_end: string;
}
