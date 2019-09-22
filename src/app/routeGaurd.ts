import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { QuestionService } from './services/question.service';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private router: Router,
    private questSvc: QuestionService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    if (next.params.index) {
      if(this.questSvc.questions.find(f=>f.index == next.params.index)){
        return true;
      }
      else{
        this.router.navigateByUrl('notfound')
        return false;
      }
    }
    else {
      return true;
    }
  }

}