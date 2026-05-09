import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login-component.html'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  login(form: NgForm) {

    if (form.invalid) {
        form.control.markAllAsTouched();
        return;
    }

    this.auth.login({ username: this.username, password: this.password })
      .subscribe({

        next: (res: any) => {
          this.auth.saveToken(res.accessToken);
          this.router.navigate(['/articles']);
          this.snackBar.open(
            'Login successful',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            }
          );
        },
        error: (err: HttpErrorResponse) => {

        let message = 'Login failed';

        if (err.error?.error === 'DUPLICATE') {
          message = err.error?.message;
        }

        this.snackBar.open(
          message,
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          }
        );

      }
      });
  }
}
