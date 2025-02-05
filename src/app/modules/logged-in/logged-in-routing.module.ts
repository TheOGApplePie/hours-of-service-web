import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInComponent } from './logged-in.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  {
    path: '',
    component: LoggedInComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'edit-day-report/:day',
        loadChildren: () =>
          import('../daily-view/daily-view.module').then(
            (m) => m.DailyViewModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedInRoutingModule {}
