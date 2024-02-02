import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';

declare let ga: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  ga: any | undefined;
  trackAnalytics: any | undefined;
  /**
   * This is first initialized in the app shell (app component)
   * therefore it is fine to put the ga('create') in its constructor.
   */
  constructor(private cu: UserService) {
    if ( this.trackAnalytics && this.ga.trackingId) {
      ga('create', this.ga.trackingId, 'auto');
    } else {
      console.warn(`Google Analytics has not been configured for this deployment.
      Either trackAnalytics has not been set in the configuration.json or ga.trackingId has not been provided in the configuration.`);
    }
  }

  public sendPageViewData(url: string) {
    if ( this.trackAnalytics) {
        ga('set', 'page', url);
        ga('set', 'dimension1', this.cu.encryptedUserIdentifier );
        ga('set', 'userId', this.cu.encryptedUserIdentifier);
        ga('send', 'pageview');
    }
  }

  public sendEventData(eventCategory: string, eventAction: string, eventLabel: string) {
    if ( this.trackAnalytics) {
     // ga send event with encrypted  user id. GA generated the term 'dimension1'. This cannot be modified.
      ga('send', 'event', eventCategory, eventAction , eventLabel,
       {'dimension1': this.cu.encryptedUserIdentifier});
    }
  }
}
