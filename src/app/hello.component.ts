import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Welcome!</h1>
<button name="start" [routerLink]='["/question/1"]' id="start" class="btn btn-success">Start the Quiz</button>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
}
