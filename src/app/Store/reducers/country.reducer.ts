import { countryState } from '../state/country.state';
import { CountryActions, ECountryActions } from '../actions/country.actions';
import { ICountryState } from '../../models/store/state';

export function countryReducers(state = countryState, action: CountryActions): ICountryState  {
  switch (action.type) {
    case ECountryActions.SetCountry: {
      return {
        ...state,
        [action.payload.name]: action.payload
      };
    }

    case ECountryActions.GetCountry: {
      return { ...state };
    }

    default:
      return state;
  }
}
