import { Component } from '@angular/core';
import { ScoreService } from 'src/app/data/services/score.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent {
  scores$ = this.score.getScores();

  constructor(private score: ScoreService) { }
}
