import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  EventEmitter,
  ChangeDetectionStrategy, ViewEncapsulation, Renderer2, ElementRef, NgZone
} from '@angular/core';
import {take, map} from 'rxjs/operators';
import {Observable, timer} from 'rxjs';
import {AlertModel, AlertService} from '../../services/alert/alert.service';
import {WebsiteEnvironmentConfigs} from "../../interfaces/website-environment-configs";
import {Carousel, Modal, Alert} from 'bootstrap';
import {ngbRunTransition} from "@ng-bootstrap/ng-bootstrap/util/transition/ngbTransition";
import {ngbAlertFadingTransition} from "@ng-bootstrap/ng-bootstrap/alert/alert-transition";

@Component({
  selector: 'cfs-alerts',
  templateUrl: './alerts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host:
    {'role': 'alert', 'class': 'alert show', '[class.fade]': 'animation', '[class.alert-dismissible]': 'dismissible'},
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnChanges {
  @Input() dismissible: boolean = false;
  @Input() type: string = 'warning';
  @Input() animation: boolean = false;
  @Input() public alerts: Array<AlertModel> = [];
  public delay: number = 0;
  @Output() public closed = new EventEmitter<void>();

  constructor(
    @Optional() @Inject('websiteEnvironment') private environment: WebsiteEnvironmentConfigs,
    private alertService: AlertService,
    private _renderer2: Renderer2,
    private _elementRef: ElementRef,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit() {

    this.alerts.forEach((alert) => {
      new Alert(this._elementRef.nativeElement)
    })
    this.alertService.alerts.subscribe((alert: AlertModel) => {
      this.delay = (alert.closeDelay || this.environment.alertDelayInSeconds || 7) * 1000;
      // push it on to show
      this.alerts = this.alerts.concat(alert);

      // close the alert after 5 seconds by default
      // have to use timer -> map instead of delay because delay can't currently
      // be properly unit tested due to fakeAsync issues.
      timer(this.delay)
        .pipe(
          take(1),
          map(() => alert))
        .subscribe((al) => this.closeAlert(al));
    });
  }

  public closeAlert(al: AlertModel) {
    const index: number = this.alerts.indexOf(al);
    this.alerts.splice(index, 1);
  }

  close(): Observable<void> {
    const transition = ngbRunTransition(
      this._ngZone, this._elementRef.nativeElement, ngbAlertFadingTransition,
      {animation: this.animation, runningTransition: 'continue'}
    );
    transition.subscribe(() => this.closed.emit());
    return transition;
  }

  ngOnChanges(changes: SimpleChanges) {
    const typeChange = changes['type'];
    if (typeChange && !typeChange.firstChange) {
      this._renderer2.removeClass(this._elementRef.nativeElement, `alert-${typeChange.previousValue}`);
      this._renderer2.addClass(this._elementRef.nativeElement, `alert-${typeChange.currentValue}`);
    }
  }

}
