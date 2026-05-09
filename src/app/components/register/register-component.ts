import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './register-component.html'
})
export class RegisterComponent {

  username = '';
  password = '';
  email = '';

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  register(form: NgForm) {

    if (form.invalid) {
        form.control.markAllAsTouched();
        return;
    }

    this.auth.register({
      username: this.username,
      email:this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.snackBar.open(
                'Registered Successfully',
                'Close',
                {
                  duration: 3000,
                  horizontalPosition: 'right',  
                  verticalPosition: 'top',      
                  panelClass: ['success-snackbar']
                }
        );
      },
      error: (err: HttpErrorResponse) => {

        let message = 'Registration failed';

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
