import { IRestCountry } from '../rest-countries';

export interface IAppState {
  country: ICountryState;
}

export interface ICountryState {
  [countrtyName: string]: IRestCountry;
}
