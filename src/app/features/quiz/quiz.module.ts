import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './components/question/question.component';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import { ScoreComponent } from './pages/score/score.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ScoresComponent } from './pages/scores/scores.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    QuestionComponent,
    QuizzesComponent,
    QuizComponent,
    ScoreComponent,
    ScoresComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class QuizModule { }
