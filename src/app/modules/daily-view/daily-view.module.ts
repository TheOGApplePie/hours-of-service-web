import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DailyViewComponent } from "./daily-view.component";
import { DailyViewRoutingModule } from "./daily-view-routing.module";
import { NgbModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [DailyViewComponent],
	imports: [
		NgbModule,
		CommonModule,
		DailyViewRoutingModule,
		NgbTimepickerModule,
		ReactiveFormsModule,
	],
})
export class DailyViewModule {}
