import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div class="nav-header"></div><router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() { }

}
