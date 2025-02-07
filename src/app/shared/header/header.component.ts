import { Component, inject, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
router = inject(Router)
  authService = inject(AuthService)

  ngOnInit(): void {}
  logout() {
    this.authService.signOut();
  }
}
