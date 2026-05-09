import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
  templateUrl: './edit-article-component.html',
  styleUrls: ['./edit-article-component.css']
})
export class EditArticleComponent {

  id = '';

  title = '';
  content = '';

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private service: ArticleService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.service.getDraftById(this.id)
      .subscribe((res: any) => {

        this.title = res.title;
        this.content = res.content;
        this.cdr.detectChanges();

      });
  }

  // Save Draft
  saveDraft() {

    this.loading = true;

    const payload = {
      title: this.title,
      content: this.content
    };

    this.service.update(this.id, payload)
      .subscribe(() => {

        this.loading = false;

        this.snackBar.open(
          'Draft updated successfully',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          }
        );

        this.router.navigate(['/drafts']);
      });
  }

  // Save + Publish
  publish() {

    const payload = {
      title: this.title,
      content: this.content
    };

    this.service.update(this.id, payload)
      .subscribe(() => {

        this.service.publish(this.id)
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