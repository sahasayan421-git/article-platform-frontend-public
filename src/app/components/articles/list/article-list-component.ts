import { ChangeDetectorRef, Component, OnInit  } from '@angular/core';
import { ArticleService } from '../../../services/article-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Article } from '../../../models/article';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './article-list-component.html'
})
export class ArticleListComponent implements OnInit{

  articles: Article[] = [];

  constructor(private service: ArticleService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      console.log(res);
      this.articles = res;
      this.cdr.detectChanges();
    });
  }
}
