import { Component, inject, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  router = inject(Router);
  thisWeek = DateTime.now().startOf('week');
  days = new Array(7).fill('');
  ngOnInit(): void {
    this.days = this.days.map((_, index) => {
      return this.thisWeek.plus({ days: index }).toISO();
    });
  }
  navigateTo(day: string) {
    this.router.navigate(['edit-day-report', day]);
  }
}
