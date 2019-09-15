import { Action } from '@ngrx/store';
import { IRestCountry } from '../../Models/rest-countries';

export enum ECountryActions {
  GetCountry = '[Country] Get Country',
  SetCountry = '[Country] Set Country'
}

export class GetCountry implements Action {
  public readonly type = ECountryActions.GetCountry;
}

export class SetCountry implements Action {
    public readonly type = ECountryActions.SetCountry;
    constructor(public payload: IRestCountry) {}
}


export type CountryActions = GetCountry | SetCountry;
