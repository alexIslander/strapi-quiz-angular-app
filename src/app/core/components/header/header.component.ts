import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  avatarInitial = '';
  username = '';

  authStatus!: Subscription;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.authStatus = this.auth.loggedInStatus$.subscribe(status => {
      this.isLoggedIn = status;

      if (status) {
        this.username = this.auth.getPersistedUser().username;
        this.avatarInitial = this.username[0] || 'Q';
      }
    });
  }

  ngOnDestroy(): void {
    this.authStatus.unsubscribe();
  }

  logout() {
    this.auth.logout();

    this.toast.showSuccess('Successfully logged out.');

    this.router.navigateByUrl('/');
  }
}
