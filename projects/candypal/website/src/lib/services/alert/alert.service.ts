import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

export interface AlertModel {
  title: string;
  subTitle: string;
  text: string;
  type: AlertType;
  closeDelay?: number;
}

export class SuccessAlert implements AlertModel {
  public type: AlertType;
  constructor (public title: string, public subTitle: string, public text: string, public closeDelay?: number) {
    this.type = 'success';
  }
}

export class InfoAlert implements AlertModel {
  readonly type: AlertType;
  constructor (public title: string, public subTitle: string, public text: string, public closeDelay?: number) {
    this.type = 'info';
  }
}
export class WarningAlert implements AlertModel {
  readonly type: AlertType;
  constructor (public title: string, public subTitle: string, public text: string, public closeDelay?: number) {
    this.type = 'warning';
  }
}
export class DangerAlert implements AlertModel {
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

  private _alerts: ReplaySubject<AlertModel>;

  constructor() {
    this._alerts = new ReplaySubject();
   }

  /**
   * Sends a message to be seen globally.
   */
  public alert(alert: AlertModel) {
    this._alerts.next(alert);
  }

  get alerts(): Observable<AlertModel> {
    return this._alerts.asObservable();
  }
}
