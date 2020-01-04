import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Feedback } from '../models/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient) { }

  headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': `${localStorage.getItem('token')}`
      })
    }
  }

  auth(): Observable<any> {
    return this.http.post(`${environment.apiUrlAccount}authentication`, {
      username: environment.accountUser,
      password: environment.accountPass
    })
    .pipe(map(({data}: any) => {
        return data.accessToken;
			}
    ));
  }
    
  setting(settingId: string, experienceId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlFeedback}settings?settingId=${settingId}&experienceId=${experienceId}`, this.headers())
      .pipe(map(res => res.data)
    );
  }

  getStatus(experienceId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlFeedback}experiences/status/${experienceId}`, this.headers())
      .pipe(map(res => res.data)
    );
  }

  sendFeedback(feedback: Feedback, token: string): Observable<any> {
    return this.http.post(`${environment.apiUrlFeedback}feedback`, feedback, this.headers())
    .pipe(map(({data}: any) => {
        return data;
    }));
  }
}
