import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ISearchAutocompleteOption } from '../../Models/search';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchService } from '../../Services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  options: ISearchAutocompleteOption[];
  limitOptionsTo = 10;
  constructor(public searchService: SearchService) {}

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
          return value.length >= 3
            ? this.searchService.getSearchSuggestions(value, this.limitOptionsTo)
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
}
