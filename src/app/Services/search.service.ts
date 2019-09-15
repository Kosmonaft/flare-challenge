import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IRestCountry } from '../Models/rest-countries';
import { ISearchAutocompleteOption } from '../Models/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  nameApi = 'https://restcountries.eu/rest/v2/name';
  codeApi = 'https://restcountries.eu/rest/v2/alpha';

  constructor(public httpService: HttpService) {}

  getSuggestions(forUrl: string): Observable<IRestCountry[] | IRestCountry> {
    return this.httpService.get(forUrl).pipe(
      map((res: IRestCountry[] | IRestCountry) => {
        return res;
      }),
      catchError((err: any) => {
        return of(undefined);
      }) // forkJoin does not return anything if any of the API is broken I'm forcing the getSuggestion to return undefined instead of error
    );
  }

  getSearchSuggestions(searchFor: string, limitResultsTo: number): Observable<any> {
    const suggestionsByName = this.getSuggestions(
      `${this.nameApi}/${searchFor}`
    );
    const suggestionsByCode =
      searchFor.length === 3
        ? this.getSuggestions(`${this.codeApi}/${searchFor}`)
        : of(undefined); // The minimal number of autocomplete is 3. There isn't a sense to check if it's not equal to 3

    return forkJoin(suggestionsByName, suggestionsByCode).pipe(
      map((countrySuggestsions: (IRestCountry[] | IRestCountry)[]) => {
        return this.getUniqueResults(countrySuggestsions, limitResultsTo);
      })
    );
  }

  getUniqueResults(countrySuggestsions: (IRestCountry[] | IRestCountry)[], limitResultsTo: number): ISearchAutocompleteOption[] {
    if (!countrySuggestsions[0] && !countrySuggestsions[1]) {
      return [];
    } else if (!countrySuggestsions[0] && countrySuggestsions[1] as IRestCountry ) {
      const finalResults = countrySuggestsions[1] as IRestCountry;
      return [{name: finalResults.name, code: finalResults.alpha3Code }];
    } else {
      const allResults = countrySuggestsions[0] as IRestCountry[];
      if (countrySuggestsions[1]) {
        allResults.push(countrySuggestsions[1] as IRestCountry);
      }
      // Get unique items from the responses
      const uniqueResults = new Set(allResults.map((country: IRestCountry) => JSON.stringify(country)));
      // return the x results (x set in search.component)
      const finalResults = [...uniqueResults].map((country => {
        const countryDetails = JSON.parse(country) as IRestCountry;
        return { name: countryDetails.name, code: countryDetails.alpha3Code };
      })).splice(0, limitResultsTo) as ISearchAutocompleteOption[];

      return finalResults;
    }
  }

  getCountry(countryName: string): Observable<IRestCountry> {
    return this.httpService.get(`${this.nameApi}/${countryName}`);
  }
}
