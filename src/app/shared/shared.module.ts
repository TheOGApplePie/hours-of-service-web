import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
	declarations: [HeaderComponent],
	imports: [CommonModule, NgbModule],
	exports: [CommonModule, HeaderComponent],
})
export class SharedModule {}
