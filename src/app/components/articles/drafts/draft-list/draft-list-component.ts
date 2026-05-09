import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ArticleService } from '../../../../services/article-service';
import { RouterLink } from '@angular/router';

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

  drafts: any[] = [];

  constructor(
    private service: ArticleService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDrafts();
  }

  loadDrafts() {
    this.service.getDrafts()
      .subscribe((res: any) => {
        this.drafts = res.content;
        this.cdr.detectChanges();
      });
  }

  publish(id: string) {

    this.service.publish(id)
      .subscribe(() => {

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

        this.loadDrafts();
      });
  }
}