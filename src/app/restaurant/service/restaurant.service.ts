import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class RestaurantService implements OnInit {

  public location: any;
  private busy: any;
  private finish: any;
  public records = {
    runningStage: 'sublocality_level_2',
    sublocality_level_2Finish: false,
    locality2Finish: false,
    locality1Finish: false,
    sublocality_level_1Finish: false,
    routeFinish: false,
    city: false,
    state: false,
    localityFinish: false,
    postalCodeFinish: false,
    administrative_area_level_1Finish: false,
    administrative_area_level_2Finish: false,
    cityFinish: false,
    stateFinish: false,
    url: 'sublocality_level_2',
    param: null,
    busy: false,
    after: 0,
    finish: false,
    noOfRecord: 20
  };

  // public restaurants: Observable<any>;
  public restaurants: any = [];

  constructor(
    private httpClient: HttpClient,
    // private mapService: MapService
  ) {
  }

  ngOnInit(): void {
  }

  addRestaurants(restaurants: any): Observable<any> {
    return this.httpClient.post(environment.restUrl + '/restaurant/addList', restaurants);
  }

  getRestaurantsBySubLocality(locality2: string): Observable<any> {
    // https://andycandifood.appspot.com/restaurant/sublocality_level_2/undefined/0/10/
    return this.httpClient.get(environment.restUrl + '/restaurant/sublocality_level_2/' + locality2 + '/0/20');
  }


  public getRestaurants(location?: any) {
    // this.location = location;
    console.log('restaurant.service|getRestaurants|this.location: %o', location);

    if (!location) {
      return;
    }

    if (this.busy) {
      return;
    }
    if (this.finish) {
      return;
    }
    this.busy = true;

    if (!this.records.sublocality_level_2Finish) {
      this.records.runningStage = 'sublocality_level_2';
      this.records.url = 'sublocality_level_2';
      this.records.param = location && location.sublocality_level_2 || null;
    } else if (!this.records.sublocality_level_1Finish) {
      this.records.runningStage = 'sublocality_level_1';
      this.records.url = 'sublocality_level_1';
      this.records.param = location && location.sublocality_level_1 || null;
    } else if (!this.records.localityFinish) {
      this.records.runningStage = 'locality';
      this.records.url = 'locality';
      this.records.param = location && location.locality || null;
    } else if (!this.records.locality2Finish) {
      this.records.runningStage = 'locality2';
      this.records.url = 'locality2';
      this.records.param = location && location.locality2 || null;
    } else if (!this.records.locality1Finish) {
      this.records.runningStage = 'locality1';
      this.records.url = 'locality1';
      this.records.param = location && location.locality1 || null;
    } else if (!this.records.routeFinish) {
      this.records.runningStage = 'route';
      this.records.url = 'route';
      this.records.param = location && location.route || null;
    } else if (!this.records.postalCodeFinish) {
      this.records.runningStage = 'postalCode';
      this.records.url = 'postalCode';
      this.records.param = location && location.postal_code || null;
    } else if (!this.records.cityFinish) {
      this.records.runningStage = 'city';
      this.records.url = 'city';
      this.records.param = location && location.city || null;
    } else if (!this.records.stateFinish) {
      this.records.runningStage = 'state';
      this.records.url = 'state';
      this.records.param = location && location.state || null;
    }
    this._getRestaurants(location);
    this.busy = false;

  }

  public _getRestaurants(location: any) {
    const url = environment.restUrl
      + '/restaurant/' + this.records.url
      + '/' + this.records.param + '/' + this.records.after + '/' + this.records.noOfRecord;
    this.httpClient.get(url).subscribe((results: any) => {

      results.map((restaurant: any) => {
        this.restaurants.push(restaurant);
      });
      console.log('restaurants from datastore', results);
      // this.restaurant.items = _.unique(this.restaurant.items, 'name');

      if (results.length <= 0) {
        if (this.records.runningStage === 'sublocality_level_2') {
          this.records.after = 0;
          this.records.sublocality_level_2Finish = true;
        } else if (this.records.runningStage === 'sublocality_level_1') {
          this.records.after = 0;
          this.records.sublocality_level_1Finish = true;
        } else if (this.records.runningStage === 'locality') {
          this.records.after = 0;
          this.records.localityFinish = true;
        } else if (this.records.runningStage === 'locality2') {
          this.records.after = 0;
          this.records.locality2Finish = true;
        } else if (this.records.runningStage === 'locality1') {
          this.records.after = 0;
          this.records.locality1Finish = true;
        } else if (this.records.runningStage === 'route') {
          this.records.after = 0;
          this.records.routeFinish = true;
        } else if (this.records.runningStage === 'postalCode') {
          this.records.after = 0;
          this.records.postalCodeFinish = true;
        } else if (this.records.runningStage === 'city') {
          this.records.after = 0;
          this.records.cityFinish = true;
        } else if (this.records.runningStage === 'state') {
          this.records.after = 0;
          this.records.stateFinish = true;

          // state finish means we searched all. So finish the search now.
          this.finish = true;
        }
        this.getRestaurants(location);
      }

      this.records.after += 10;
      this.busy = false;

    }, (error) => {
      console.log('unable to get restaurants from datastore| error:%o', error);
    });
  }
}
