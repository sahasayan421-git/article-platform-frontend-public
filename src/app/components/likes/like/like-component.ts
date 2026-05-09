import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { LikeService } from '../../../services/like-service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LikeCountResponse } from '../../../models/like';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSnackBarModule],
  template: `
    <button mat-button (click)="like()">
      👍 Like
    </button>

    <span>{{ count }}</span>
  `
})
export class LikeComponent {

  @Input() articleId!: string;
  count = 0;

  constructor(private service: LikeService, private cdr: ChangeDetectorRef, private snackBar: MatSnackBar ) {}

  ngOnInit() {
    if (this.articleId) {
      this.loadCount();
    }
  }

  loadCount() {
    this.service.count(this.articleId)
      .subscribe((res: LikeCountResponse) => {
        this.count = res.likesCount;
        this.cdr.detectChanges();
      });
  }

  like() {
    this.service.like(this.articleId)
      .subscribe({
        next: () => {
          this.loadCount(); // ✅ normal flow
        },
        error: (err) => {
          // ✅ HANDLE DUPLICATE LIKE
          if (err?.error?.error === 'DUPLICATE_LIKE') {
          this.snackBar.dismiss;
          this.snackBar.open(
              'You have already liked this article',
              'Close',
              {
                duration: 3000,
                horizontalPosition: 'right',   // ✅ move to right
                verticalPosition: 'top',       // ✅ move to top
                panelClass: ['error-snackbar'] // ✅ custom styling
              }
          );
            this.loadCount(); // just refresh count
          } else {
            console.error('Like failed', err);
          }
        }
      });
  }
}