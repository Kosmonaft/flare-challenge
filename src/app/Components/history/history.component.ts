import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState, ICountryState } from '../../models/store/state';
import { IRestCountry } from '../../Models/rest-countries';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  countries: IRestCountry[] = [];

  constructor(public store: Store<IAppState>, public dialog: MatDialog) {}

  ngOnInit() {
    this.store
      .select((state: IAppState) => state.country)
      .subscribe((countryState: ICountryState) => {
        for (const key in countryState) {
          if (countryState.hasOwnProperty(key)) {
            this.countries.push(countryState[key]);
          }
        }
      });
  }

  openDialog(country: IRestCountry) {
    const dialogRef = this.dialog.open(DialogComponent, { data: { country } });
  }
}
