import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({ providedIn: 'root' })
export class CommentService {

  constructor(private http: HttpClient) {}

  getComments(articleId: string): Observable<Comment[]> {

    return this.http.get<Comment[]>(
      `/api/comments/${articleId}/comments`
    );
  }

  // getComments(articleId: string) {
  //   return this.http.get<any[]>(`/api/comments/${articleId}/comments`);
  // }

  addComment(articleId: string, content: string, parentCommentId?: string) {
    return this.http.post('/api/comments', {
      articleId: articleId,
      parentCommentId: parentCommentId || null,
      content: content
    });
  }
}