import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  forkJoin,
  map,
  Observable,
  switchMap
} from 'rxjs';

import { ArticleService } from '../../../services/article-service';
import { LikeService } from '../../../services/like-service';

import { CommentComponent } from '../../comments/comment/comment-component';
import { LikeComponent } from '../../likes/like/like-component';

import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    LikeComponent,
    MatCardModule
  ],
  templateUrl: './article-detail-component.html',
  styleUrl: './article-detail-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleDetailComponent implements OnInit {

  detail$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {

    this.detail$ = this.route.paramMap.pipe(

      map(params => params.get('id')!),

      switchMap(id =>

        forkJoin({

          article: this.articleService.getById(id),

          likes: this.likeService.count(id)

        })
      )
    );
  }
}