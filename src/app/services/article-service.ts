import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, DraftPageResponse } from '../models/article';

@Injectable({ providedIn: 'root' })
export class ArticleService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {

    return this.http.get<Article[]>(
      '/articles'
    );
  }

  getById(id: string): Observable<Article> {

    return this.http.get<Article>(
      `/articles/${id}`
    );
  }

  create(article: {
    title: string;
    content: string;
  }) {

    return this.http.post(
      '/articles',
      article
    );
  }

  // getAll() {
  //   return this.http.get<any[]>('/articles');
  // }

  // getById(id: string) {
  //   return this.http.get(`/articles/${id}`);
  // }

  getDraftById(id: string) {
    return this.http.get(`/articles/drafts/${id}`);
  }

  // create(data: any) {
  //   return this.http.post('/articles', data);
  // }

  publish(id: string) {
    return this.http.patch(`/articles/${id}/publish`, {});
  }

  getDrafts(
    page: number = 0
  ): Observable<DraftPageResponse> {

    return this.http.get<DraftPageResponse>(
      `/articles/drafts?page=${page}`
    );
  }

  // getDrafts(page: number = 0) {
  //   return this.http.get<any>(`/articles/drafts?page=${page}`);
  // }

  update(id: string, data: any) {
    return this.http.put(`/articles/${id}`, data);
  } 
}
