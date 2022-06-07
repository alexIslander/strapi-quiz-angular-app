import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quiz } from '../models/quiz';
import { NormalizationService } from './normalization.service';

interface StrapiResponse {
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private url = `${environment.strapiUrl}/quizzes`;
  private populateQuestionsParam = { params: new HttpParams().set('populate', '*') };

  constructor(private http: HttpClient, private ns: NormalizationService) { }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<StrapiResponse>(
      this.url,
      this.populateQuestionsParam
    )
      .pipe(this.ns.restructureArrayedAttributes('questions'));
  }

  getQuiz(id: number): Observable<Quiz> {
    return this.http.get<StrapiResponse>(`${this.url}/${id}`,
      this.populateQuestionsParam
    )
      .pipe(
        this.ns.restructureAttributes('questions')
      );
  }
}
