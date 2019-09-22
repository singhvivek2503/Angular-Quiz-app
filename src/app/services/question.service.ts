import { Injectable } from '@angular/core';
import { QuestionModel, UserAnswer } from '../../models';
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  questions: QuestionModel[] = [
    {
      answer: 3,
      options: [{ name: "India", id: 1 }, { name: "USA", id: 2 }, { name: "China", id: 3 }, { name: "Russia", id: 4 }],
      question: "Which is the largest country in the world by population?",
      index: 1
    },
    {
      answer: 1,
      options: [{ name: "1945", id: 1 }, { name: "1939", id: 2 }, { name: "1944", id: 3 }, { name: "1942", id: 4 }],
      question: "When did the second world war end?",
      index: 2
    },
    {
      answer: 4,
      options: [{ name: "USA", id: 1 }, { name: "France", id: 2 }, { name: "Italy", id: 3 }, { name: "China", id: 4 }],
      question: "Which was the first country to issue paper currency?",
      index: 3
    },
    {
      answer: 1,
      options: [{ name: "Atlanta", id: 1 }, { name: "Sydney", id: 2 }, { name: "Athens", id: 3 }, { name: "Beijing", id: 4 }],
      question: "Which city hosted the 1996 Summer Olympics?",
      index: 4
    },
    {
      answer: 2,
      options: [{ name: "Albert Einstein", id: 1 }, { name: "Alexander Graham Bell", id: 2 }, { name: "Isaac Newton", id: 3 }, { name: "Marie Curie", id: 4 }],
      question: "Who invented telephone?",
      index: 5
    }
  ]

  noOfQuestions: number;
  userAnswers: UserAnswer[] = [];
  constructor() {
    this.noOfQuestions = this.questions.length;
  }

  getQuestionList() {
    return of(this.questions);
  }

  pushAnswer(questionId: number, answerId: number) {
    const quest = this.questions.find(f => f.index == questionId);
    if (quest) {
      const isCorrect = quest.answer == answerId;
      const ans = this.userAnswers.find(f => f.questionId == questionId);
      if (ans) {
        ans.answerId = answerId;
        ans.isCorrect = isCorrect;
      }
      else {
        this.userAnswers.push(
          {
            questionId,
            answerId,
            isCorrect
          }
        )
      }

    }
  }

}