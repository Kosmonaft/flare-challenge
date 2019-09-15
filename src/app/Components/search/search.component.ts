import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ISearchAutocompleteOption } from '../../Models/search';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchService } from '../../Services/search.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { IRestCountry } from '../../Models/rest-countries';
import { Store, select } from '@ngrx/store';
import { IAppState, ICountryState } from '../../models/store/state';
import { SetCountry } from '../../Store/actions/country.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  options: ISearchAutocompleteOption[];
  limitOptionsTo = 10;
  searchSubmitted = false;
  selectedCountry: IRestCountry;

  constructor(public searchService: SearchService, public store: Store<IAppState>) {}

  ngOnInit() {
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(null)
    });
    this.subscribeToSearchInputChange();
  }

  subscribeToSearchInputChange(): void {
    this.searchForm
      .get('searchInput')
      .valueChanges.pipe(
        debounceTime(250), // Adding debounce to prevent API calls on each value change (reduce API calls)
        switchMap(value => {
          if (this.searchSubmitted) {
            this.searchSubmitted = false;
            return of(undefined);
          }
          return value.length >= 3
            ? this.searchService.getSearchSuggestions(
                value,
                this.limitOptionsTo
              )
            : of(undefined);
        })
      )
      .subscribe((autocompleteSuggestions: any) => {
        if (autocompleteSuggestions) {
          this.options = autocompleteSuggestions;
        } else {
          this.options = [];
        }
      });
  }

  onSelection(event: MatAutocompleteSelectedEvent) {
    this.searchSubmitted = true;
    this.searchService.getCountry(this.searchForm.get('searchInput').value).subscribe((selectedCountry: IRestCountry) => {
      this.selectedCountry = selectedCountry[0];

      this.store.dispatch(new SetCountry(this.selectedCountry));
    });
  }
}
