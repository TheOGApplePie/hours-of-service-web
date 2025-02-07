import { Component, inject, type OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
	selector: "app-auth",
	templateUrl: "./auth.component.html",
	styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
	authService = inject(AuthService);
	router = inject(Router);
	loginForm!: FormGroup;
	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.loginForm = new FormGroup({
			email: new FormControl("", [Validators.required, Validators.email]),
			password: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
			]),
		});
	}

	login() {
		const email = this.loginForm.value.email;
		const password = this.loginForm.value.password;
		this.router.navigate(["/dashboard"]);
	}
}
