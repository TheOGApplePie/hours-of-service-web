import { inject, Injectable } from "@angular/core";
import {
	type ActivatedRouteSnapshot,
	type CanActivate,
	Router,
	type RouterStateSnapshot,
	type UrlTree,
} from "@angular/router";
import type { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class LoginGuard implements CanActivate {
	router = inject(Router);
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		const user = localStorage.getItem("user");
		if (!user) {
			this.router.navigate(["/login"]);
			return false;
		}
		return true;
	}
}
