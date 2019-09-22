import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { QuestionModel } from '../../models';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  private readonly onDestroy = new Subject<void>();
  questions: QuestionModel[] = [];
  selectedQuestion: QuestionModel;
  nextQuestion: number;
  
  constructor(private questSvc: QuestionService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.questSvc.getQuestionList()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(qs => this.questions = qs);

    this.route.params.subscribe(s => {
      const index:number = parseInt(s ? s.index : 1);
      this.selectedQuestion = this.questions.find(f => f.index == index);
      this.nextQuestion = (index + 1)<=this.questions.length?index+1:-1;
    })
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}