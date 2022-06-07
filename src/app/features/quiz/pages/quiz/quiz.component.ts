import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Quiz } from 'src/app/data/models/quiz';
import { QuizService } from 'src/app/data/services/quiz.service';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Answer } from 'src/app/data/models/answer';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  quiz!: Quiz;
  quizForm: FormGroup = new FormGroup({});
  quizId = 0;

  private quizSub!: Subscription;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.quizSub.unsubscribe();
  }

  ngOnInit(): void {
    this.quizSub = this.route.paramMap.pipe(
      switchMap(params => {
        this.quizId = Number(params.get('id'));
        return this.quizService.getQuiz(this.quizId);
      })
    ).subscribe(
      quiz => {
        this.quiz = quiz;

        if (quiz.questions) {
          quiz.questions.forEach(question => {
            this.quizForm.addControl(question.id.toString(), new FormControl('', Validators.required));
          });
        }
      }
    );
  }

  setAnswerValue(answ: Answer) {
    this.quizForm.controls[answ.question.id].setValue(answ.value);
  }

  score() {
    this.router.navigateByUrl(`/quizzes/${this.quizId}/score`, { state: this.quizForm.value });
  }
}
