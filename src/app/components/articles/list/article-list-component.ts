import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ArticleService } from '../../../services/article-service';

import { Article } from '../../../models/article';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './article-list-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent implements OnInit {

  articles$!: Observable<Article[]>;

  constructor(
    private service: ArticleService
  ) {}

  ngOnInit(): void {

    this.articles$ =
      this.service.getAll();
  }
}