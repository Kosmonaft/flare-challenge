import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { IAppState } from '../../models/store/state';
import { countryReducers } from './country.reducer';

export const reducers: ActionReducerMap<IAppState> = {
  country: countryReducers,
};

export const metaReducers: MetaReducer<IAppState>[] = !environment.production
  ? []
  : [];
