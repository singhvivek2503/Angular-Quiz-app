import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import {timer} from 'rxjs'
import{take} from 'rxjs/operators';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
  score:number;
  total:number;
  isOutOf:boolean;
  ctScore:number=0;

  constructor(private svc:QuestionService) {
    this.score = svc.userAnswers.filter(f=>f.isCorrect).length;
    this.total = svc.questions.length;
    
   }

  ngOnInit() {
    const source = timer(100,100);
    let score = 0;
    source
    .pipe(take(this.score))
    .subscribe(
      (s)=>this.ctScore++,
      (err)=>null,
      ()=>this.isOutOf = this.score == this.total)
  }

}