import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EndPoints } from 'src/core/enum/endpoints.enum';
import { Track } from 'src/core/interface/tracker.interface';
import { MusicLike } from 'src/core/interface/music.interface';
import { Category } from 'src/core/interface/category.interface';

@Injectable({
  providedIn: 'root',
})
export class musicService {
  constructor(private http: HttpClient) {}
  environmentUrl = environment.apiUrl;
  token = localStorage.getItem('token') || '';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getMusic(): Observable<Track[]> {
    return this.http.get<Track[]>(
      `${this.environmentUrl}${EndPoints.list_music}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.environmentUrl}${EndPoints.list_category}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getLikeMusicbyId(id: number): Observable<MusicLike> {
    return this.http.get<MusicLike>(
      `${this.environmentUrl}${EndPoints.like_music}/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  changeLikeMusicbyId(id: number): Observable<MusicLike> {
    return this.http.put<MusicLike>(
      `${this.environmentUrl}${EndPoints.like_music}/${id}`,
      null,
      { headers: this.getAuthHeaders() }
    );
  }
}
