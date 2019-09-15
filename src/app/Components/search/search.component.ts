import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IRestCountries } from '../../Models/rest-countries';
import { ISearchAutocompleteOption } from '../../Models/search';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  options: ISearchAutocompleteOption[];

  constructor() {}

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
          return value.length >= 3 ? of(this.getCountries()) : of(undefined);
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

  getCountries(): any {
    return ['Australia', 'new zeealand'];
  }
}
