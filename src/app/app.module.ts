import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionComponent } from './question-list/question/question.component';
import { QuestionService } from './services/question.service';
import { CompleteComponent } from './complete/complete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteGuard } from './routeGaurd';
import { NotfoundComponent } from './notfound/notfound.component';

const appRoutes: Routes = [
  { path: '', component: HelloComponent },
  { path: 'question', component: QuestionListComponent },
  {
    path: 'question/:index',
    component: QuestionListComponent,
    canActivate: [RouteGuard],
  },
  { path: 'complete', component: CompleteComponent },
  { path: 'notfound', component: NotfoundComponent },
  {path:'**',redirectTo:''}
]
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule],
  declarations:
    [AppComponent,
      HelloComponent,
      QuestionComponent,
      QuestionListComponent,
      CompleteComponent,
      NotfoundComponent],
  bootstrap: [AppComponent],
  providers: [
    QuestionService,
    RouteGuard
  ]
})
export class AppModule { }
