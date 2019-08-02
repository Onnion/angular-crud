import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NotifyService {


  constructor() { }


  /**
   * show
   *
   * @param type (string)
   * @param content (string)
   */
  public show(type: string, content: string): void {
    // this.notify.notify(type, content);

  }


  /**
   * removeAll
   */
  public removeAll(): void {
    // this.notify.hideAll();
  }

}
