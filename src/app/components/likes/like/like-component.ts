import {
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { LikeService } from '../../../services/like-service';

import { MatButtonModule } from '@angular/material/button';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { LikeCountResponse, LikeUser }
  from '../../../models/like';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './like-component.html',
  styleUrls: ['./like-component.css']
})
export class LikeComponent {

  @Input() articleId!: string;

  count = 0;

  // ✅ Typed model
  likedUsers: LikeUser[] = [];

  showLikesDropdown = false;

  loadingLikes = false;

  constructor(
    private service: LikeService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

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

          this.loadCount();
        },

        error: (err) => {

          if (
            err?.error?.error ===
            'DUPLICATE'
          ) {

            this.snackBar.open(
              'You have already liked this article',
              'Close',
              {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['error-snackbar']
              }
            );

            this.loadCount();

          } else {

            console.error(
              'Like failed',
              err
            );
          }
        }
      });
  }

  // ✅ Load liked users
  loadLikedUsers() {

    if (
      this.loadingLikes ||
      this.likedUsers.length
    ) {
      return;
    }

    this.loadingLikes = true;

    this.service.users(this.articleId)
      .subscribe({

        next: (res) => {

          this.likedUsers =
            res.content || [];

          this.loadingLikes = false;

          this.cdr.detectChanges();
        },

        error: () => {

          this.loadingLikes = false;
        }
      });
  }

  onMouseEnter() {

    this.showLikesDropdown = true;

    this.loadLikedUsers();
  }

  onMouseLeave() {

    this.showLikesDropdown = false;
  }
}