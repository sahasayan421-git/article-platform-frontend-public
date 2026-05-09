import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ArticleService } from '../../../services/article-service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './create-article-component.html'
})
export class CreateArticleComponent {

  title = '';
  content = '';

  constructor(
    private service: ArticleService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // ✅ Save Draft Only
  saveDraft() {

    const payload = {
      title: this.title,
      content: this.content
    };

    this.service.create(payload)
      .subscribe(() => {

        this.snackBar.open(
          'Draft saved successfully',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          }
        );

        this.router.navigate(['/articles']);
      });
  }

  // ✅ Create + Publish
  publish() {

    const payload = {
      title: this.title,
      content: this.content
    };

    // Step 1 → Create Draft
    this.service.create(payload)
      .subscribe((created: any) => {

        // Step 2 → Publish Draft
        this.service.publish(created.id)
          .subscribe(() => {

            this.snackBar.open(
              'Article published successfully',
              'Close',
              {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['success-snackbar']
              }
            );

            this.router.navigate(['/articles']);
          });

      });
  }
}