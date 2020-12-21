import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs';

export interface Alert {
  title: string;
  subTitle: string;
  text: string;
  type: AlertType;
  closeDelay?: number;
}

export class SuccessAlert implements Alert {
  public type: AlertType;
  constructor (public title: string, public subTitle: string, public text: string, public closeDelay?: number) {
    this.type = 'success';
  }
}

export class InfoAlert implements Alert {
  readonly type: AlertType;
  constructor (public title: string, public subTitle: string, public text: string, public closeDelay?: number) {
    this.type = 'info';
  }
}
export class WarningAlert implements Alert {
  readonly type: AlertType;
  constructor (public title: string, public subTitle: string, public text: string, public closeDelay?: number) {
    this.type = 'warning';
  }
}
export class DangerAlert implements Alert {
  readonly type: AlertType;
  constructor (public title: string, public subTitle: string, public text: string, public closeDelay?: number) {
    this.type = 'danger';
  }
}

export type AlertType = 'success' | 'info' | 'warning' | 'danger';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private _alerts: ReplaySubject<Alert>;

  constructor() {
    this._alerts = new ReplaySubject();
   }

  /**
   * Sends a message to be seen globally.
   */
  public alert(alert: Alert) {
    this._alerts.next(alert);
  }

  get alerts(): Observable<Alert> {
    return this._alerts.asObservable();
  }
}
