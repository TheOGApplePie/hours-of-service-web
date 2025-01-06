import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Sign in with Email
  signInWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Sign out
  signOut() {
    this.afAuth
      .signOut()
      .then(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      })
      .catch((reason) => {
        alert(reason);
      });
  }

  // Get current user
  getCurrentUser() {
    return this.afAuth.authState;
  }
}
