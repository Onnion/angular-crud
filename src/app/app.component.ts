import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="nav-header">
      <select #langSelect (change)="translate.use(langSelect.value)">
        <option *ngFor="let lang of translate.getLangs()" [value]="lang" [selected]="lang === translate.currentLang">{{ lang }}</option>
      </select>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
  providers: [TranslateService]
})
export class AppComponent {

  constructor(public translate: TranslateService) {
    this.translate.addLangs(['en', 'pt']);
    this.translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|pt/) ? browserLang : 'en');
  }

  public swipeTranslate(lang: string): void {
    this.translate.use(lang);
  }

}
