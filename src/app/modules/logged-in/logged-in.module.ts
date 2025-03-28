import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoggedInRoutingModule } from "./logged-in-routing.module";
import { LoggedInComponent } from "./logged-in.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
	declarations: [LoggedInComponent],
	imports: [CommonModule, SharedModule, LoggedInRoutingModule],
})
export class LoggedInModule {}
