import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { DailyViewComponent } from './daily-view.component';

const routes: Routes = [
  {
    path: '',
    component: DailyViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyViewRoutingModule {}
