import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { QuestionModel } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnChanges {

  @Input() question: QuestionModel;
  @Input() nextQuestion: number;
  questionCtrl = new FormControl();
  prevUrl: string;
  nextUrl: string;
  questionForm: FormGroup;
  get f() { return this.questionForm.controls; }
  isSubmitted: boolean;
  selectedAns:number;

  constructor(private router: Router,
    private svc: QuestionService) { }

  ngOnInit() {

  }
  initForm(question) {
    this.isSubmitted = false;    
    const existAnswer = this.svc.userAnswers.find(f=>f.questionId == question.index);
    if(existAnswer){
      this.selectedAns = existAnswer.answerId;
    }
    this.questionForm = new FormGroup({
      answer: new FormControl(this.selectedAns, Validators.required),
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue) {
      this.selectedAns = null;
      this.initForm(changes.question.currentValue);
      
    }
    if (changes.nextQuestion && changes.nextQuestion.currentValue) {
      const nextId = changes.nextQuestion.currentValue;
      if (nextId > 1) {
        this.nextUrl = '../../question/' + (nextId);
        this.prevUrl = '../../question/' + (this.question.index - 1);
      }
      else {
        this.nextUrl = '../../question/' + (nextId);
        this.prevUrl = '../../question/' + (this.question.index - 1);
      }
    }
  }

  onSubmit(formDir) {
    this.isSubmitted = true;
    if (this.questionForm.valid) {

      this.svc.pushAnswer(this.question.index, this.questionForm.value.answer);
      if (this.nextQuestion >= 1) {
        this.router.navigateByUrl('question/' + this.nextQuestion);
      }
      else {
        this.router.navigateByUrl('complete')
      }
    }
  }
}