import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../app/Components/search/search.component';
import { HistoryComponent } from '../app/Components/history/history.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
