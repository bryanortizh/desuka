import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getMusic(): Observable<Track[]> {
    return this.http.get<Track[]>(
      `${this.environmentUrl}${EndPoints.list_music}`
    );
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.environmentUrl}${EndPoints.list_category}`
    );
  }

  getLikeMusicbyId(id: number): Observable<MusicLike> {
    return this.http.get<MusicLike>(
      `${this.environmentUrl}${EndPoints.like_music}/${id}`
    );
  }

  changeLikeMusicbyId(id: number): Observable<MusicLike> {
    return this.http.put<MusicLike>(
      `${this.environmentUrl}${EndPoints.like_music}/${id}`,
      null
    );
  }
}
