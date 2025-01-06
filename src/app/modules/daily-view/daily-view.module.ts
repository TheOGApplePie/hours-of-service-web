import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyViewComponent } from './daily-view.component';
import { DailyViewRoutingModule } from './daily-view-routing.module';

@NgModule({
  declarations: [DailyViewComponent],
  imports: [CommonModule, DailyViewRoutingModule],
})
export class DailyViewModule {}
