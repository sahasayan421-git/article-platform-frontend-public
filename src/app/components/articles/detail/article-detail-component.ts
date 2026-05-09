import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../services/article-service';
import { CommentService } from '../../../services/comment-service';
import { LikeService } from '../../../services/like-service';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../../comments/comment/comment-component';
import { LikeComponent } from '../../likes/like/like-component';
import { MatCardModule } from '@angular/material/card';
import { Article } from '../../../models/article';

@Component({
  standalone: true,
  imports: [CommonModule, CommentComponent, LikeComponent, MatCardModule],
  templateUrl: './article-detail-component.html',
  styleUrl: './article-detail-component.css'
})
export class ArticleDetailComponent {

  //article: any;
  article!: Article;
  comments: any[] = [];
  likes: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService,
    private likeService: LikeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.articleService.getById(id).subscribe(res => {
      this.article = res;
      this.cdr.detectChanges();
    });

  
    this.likeService.count(id).subscribe(res => {
      this.likes = res;
      this.cdr.detectChanges();
    });
  }
}
