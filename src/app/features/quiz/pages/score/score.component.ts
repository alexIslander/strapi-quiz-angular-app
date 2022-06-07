import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iif, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Answer } from 'src/app/data/models/answer';
import { ScoreResponse } from 'src/app/data/models/score-response';
import { ScoreService } from 'src/app/data/services/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  scoreResp$: Observable<ScoreResponse> | undefined;
  id = 0;

  constructor(private route: ActivatedRoute, private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scoreResp$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const state = window.history.state;
          this.id = Number(params.get('id'));

          if (window.location.pathname.startsWith('/quizzes/')) {
            let reqBody: Answer[] = [];

            for (const [qstId, answ] of Object.entries(state)) {
              if (typeof answ === 'string') {
                reqBody.push({ question: { id: Number(qstId) }, value: answ.toLowerCase() });
              }
            }

            return iif(() => reqBody.length > 0,
              this.scoreService.createScore({ id: this.id }, reqBody));
          }

          return this.scoreService.getScore(this.id);
        })
      );
  }
}
