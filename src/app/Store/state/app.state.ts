import { IAppState } from '../../models/store/state';
import { countryState } from './country.state';

export const AppState: IAppState = {
  country: countryState
};

export function getInitialState(): IAppState {
  return AppState;
}
