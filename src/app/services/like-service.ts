import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LikeCountResponse, LikeUser } from '../models/like';

@Injectable({ providedIn: 'root' })
export class LikeService {

  constructor(private http: HttpClient) {}

  like(id: string) {
    return this.http.post(`/api/likes/article/${id}`, {});
  }

  count(id: string): Observable<LikeCountResponse> {

    return this.http.get<LikeCountResponse>(
      `/api/likes/${id}/likes/count`
    );
  }

  // users(id: string): Observable<LikeUser[]> {

  //   return this.http.get<LikeUser[]>(
  //     `/api/likes/${id}/likes`
  //   );
  // }

  users(
    id: string,
    page: number = 0,
    size: number = 10
  ) {

      return this.http.get<{
        content: LikeUser[]
      }>(
        `/api/likes/${id}/likes?page=${page}&size=${size}`
      );
    }

  // count(id: string) {
  //   return this.http.get<any>(`/api/likes/${id}/likes/count`);
  // }

  // users(id: string) {
  //   return this.http.get<any>(`/api/likes/${id}/likes`);
  // }
}