import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  private loginSub: Subscription | undefined;

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private toast: ToastService,
    private ss: StorageService
  ) { }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  login() {
    const credentials = this.loginForm.value;

    this.loginSub = this.auth.login(
      credentials.email,
      credentials.password
    ).subscribe(
      resp => {
        this.loginForm.reset();

        this.auth.persistUser(resp);

        this.toast.showSuccess('Successfully logged in.');

        const attemptedRoute = this.ss.getItem('attemptedRoute');

        this.ss.removeItem('attemptedRoute');

        this.router.navigateByUrl(attemptedRoute || '/')
      },
      () => {
        this.toast.showDanger('Login unsuccessful. Check your credentials.');
      }
    );
  }
}
