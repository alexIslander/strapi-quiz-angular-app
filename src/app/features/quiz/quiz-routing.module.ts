import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'src/app/core/guards/logged-in.guard';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import { ScoreComponent } from './pages/score/score.component';
import { ScoresComponent } from './pages/scores/scores.component';

const routes: Routes = [
    {
        path: '', component: QuizzesComponent
    },
    {
        path: 'quizzes', canActivate: [LoggedInGuard], children: [
            {
                path: ':id', component: QuizComponent
            },
            {
                path: ':id/score', component: ScoreComponent
            }
        ]
    },
    {
        path: 'scores', canActivate: [LoggedInGuard], children: [
            {
                path: '', component: ScoresComponent
            },
            {
                path: ':id', component: ScoreComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuizRoutingModule { }