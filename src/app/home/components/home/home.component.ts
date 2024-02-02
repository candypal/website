import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from '@candypal/website';
import {Subscription} from 'rxjs';

@Component({
  selector: 'cfs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  constructor(headerService: HeaderService) {
    this.subscriptions.push(headerService.headerChanged.asObservable().subscribe((data: any) => {
      console.log('header changed with data: %o', data);
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( (subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
