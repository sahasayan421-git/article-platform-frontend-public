import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Observable,
  BehaviorSubject,
  switchMap
} from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { RouterLink } from '@angular/router';

import { ArticleService } from '../../../../services/article-service';

import { DraftPageResponse } from '../../../../models/article';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  templateUrl: './draft-list-component.html',
  styleUrls: ['./draft-list-component.css']
})
export class DraftListComponent {

  private refresh$ = new BehaviorSubject<void>(undefined);

  drafts$: Observable<DraftPageResponse> = this.refresh$.pipe(
    switchMap(() => this.service.getDrafts())
  );

  constructor(
    private service: ArticleService,
    private snackBar: MatSnackBar
  ) {}

  publish(id: string): void {

    this.service.publish(id)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Draft published successfully',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            }
          );

          // refresh list
          this.refresh$.next();
        },

        error: (err) => {

          console.error('Failed to publish draft', err);

          this.snackBar.open(
            'Failed to publish draft',
            'Close',
            {
              duration: 3000
            }
          );
        }
      });
  }
}