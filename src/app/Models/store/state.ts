import { IRestCountry } from '../rest-countries';

export interface IAppState {
  country: ICountryState;
}

export interface ICountryState {
  countries: IRestCountry[];
}
