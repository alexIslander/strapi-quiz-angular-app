import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ScoreResponse } from '../models/score-response';
import { Answer } from '../models/answer';
import { Quiz } from '../models/quiz';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private url = `${environment.strapiUrl}/scores`;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  createScore(quiz: Quiz, answers: Answer[]): Observable<ScoreResponse> {
    return this.http.post<ScoreResponse>(
      this.url,
      { quiz, answers },
      this.auth.getAuthHeader()
    );
  }

  getScore(id: number): Observable<ScoreResponse> {
    return this.http.get<ScoreResponse>(
      `${this.url}/${id}`,
      this.auth.getAuthHeader()
    );
  }

  getScores(): Observable<ScoreResponse[]> {
    return this.http.get<ScoreResponse[]>(this.url,
      {
        params: new HttpParams({
          fromObject: {
            'sort': 'createdAt:desc',
            'pagination[pageSize]': 10
          }
        }),
        ...this.auth.getAuthHeader()
      }
    );
  }
}
