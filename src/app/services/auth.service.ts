import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);

  // Sign in with Email
  signInWithEmail(email: string, password: string) {
    return;
  }

  // Sign out
  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // Get current user
  getCurrentUser() {
    return;
  }
}
