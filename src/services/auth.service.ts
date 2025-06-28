import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EndPoints } from 'src/core/enum/endpoints.enum';
import {
  loginUser,
  logoutUser,
  registerUser,
  responseLogin,
  responseLogout,
  responseRegister,
  responseVerify,
  verifyUser,
} from 'src/core/interface/register.interface';

@Injectable({
  providedIn: 'root',
})
export class authService {
  constructor(private http: HttpClient) {}
  environmentUrl = environment.apiUrl;

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  registerUser(userData: registerUser): Observable<responseRegister> {
    return this.http.post<responseRegister>(
      `${this.environmentUrl}${EndPoints.register}`,
      userData
    );
  }

  verifyUser(userData: verifyUser): Observable<responseVerify> {
    return this.http.post<responseVerify>(
      `${this.environmentUrl}${EndPoints.verify}`,
      userData
    );
  }

  logout(userData: logoutUser): Observable<responseLogout> {
    return this.http.post<responseLogout>(
      `${this.environmentUrl}${EndPoints.logout}`,
      userData,
      { headers: this.getAuthHeaders() }
    );
  }

  loginUser(userData: loginUser): Observable<responseLogin> {
    return this.http.post<responseLogin>(
      `${this.environmentUrl}${EndPoints.login}`,
      userData
    );
  }
}
