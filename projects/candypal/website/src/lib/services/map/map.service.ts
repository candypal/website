import {ElementRef, EventEmitter, Inject, Injectable, NgZone, Renderer2, RendererFactory2} from '@angular/core';
import {Observable, Subject, Subscriber} from 'rxjs';
import {DOCUMENT} from "@angular/common";

export declare var google: any;

const GEOLOCATION_ERRORS = {
  'errors.location.unsupportedBrowser': 'Browser does not support location services',
  'errors.location.permissionDenied': 'You have rejected access to your location',
  'errors.location.positionUnavailable': 'Unable to determine your location',
  'errors.location.timeout': 'Service timeout has been reached'
};

export interface GoogleLocation {
  [x: string]: any;
  address_components: any;
  geometry: {
    location: {
      lat: () => any;
      lng: () => any;
    };
  };
  photos: any;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public coordinates: any | undefined;
  public map: any;
  public placeService: any;
  public geocoder: { geocode: (arg0: { latLng: any; }, arg1: (results: any[], status: string) => void) => void; } | undefined;
  public latLng: any;
  public location: Observable<any> | undefined;
  public locationBehaviorSubject = new Subject<any>();
  public coordinatesBehaviorSubject = new Subject<any>();
  public type = 'restaurant';
  public keyword = 'restaurant';
  public mapPlace: any;
  private renderer: Renderer2;

  constructor(
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public getBrowserCoordinates(opts: PositionOptions | undefined): Observable<any> {
    return new Observable(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (coordinates: any) => {
            this.coordinates = coordinates.coords;
            observer.next(coordinates);
            this.coordinatesBehaviorSubject.next(coordinates);

            // we are not completing the observable as we will call it multiple time
            observer.complete();
          },
          (error) => {
            switch (error.code) {
              case 1:
                observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                break;
              case 2:
                observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                break;
              case 3:
                observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                break;
            }
          },
          opts);
      } else {
        observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
      }

    });
  }

  public getAddressFromCoordinates(latLngValue: { latitude: any; longitude: any; }) {
    return new Observable(observer => {
      console.log('getAddressFromCoordinates: %o', this.map);
      console.log('getAddressFromCoordinates: %o', new google.maps.Geocoder());
      this.geocoder = this.geocoder || new google.maps.Geocoder();
      this.latLng = this.latLng || new google.maps.LatLng(latLngValue.latitude, latLngValue.longitude);
      this.geocoder && this.geocoder.geocode({'latLng': this.latLng}, (results: any[], status: string) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const newLocation: any = this.processFullLocation(results[0]);
          newLocation.latitude = latLngValue.latitude;
          newLocation.longitude = latLngValue.longitude;
          this.location = newLocation;
          this.locationBehaviorSubject.next(newLocation);
          observer.next(newLocation);
          observer.complete();
        } else {
          observer.error('LatLng: ' + JSON.stringify(latLngValue) + ', status : ' + status);
        }
      });
    });
  }

  public loadGoogleMapAndGetAddress(url: string): Observable<any> {
    return new Observable(observer => {
      this.loadScript(url).then((mapLoaded: any) => {
        console.log('the map loaded successfully %o', mapLoaded);
        // gets the coordinates from the browser and address from google map. this happens first time
        this.getBrowserCoordinates({})
          .subscribe({
            next: (position) => {
              this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              const mapProp = {
                center: this.latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              this.map = new google.maps.Map(document.getElementById('map'), mapProp);
              this.map = this.map;
              this.coordinates = position && position.coords;
              return this.getAddressFromCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }).subscribe({
                next: (address) => {
                  observer.next(address);
                  observer.complete();
                },
                error: (error) => {
                  observer.error({
                    desc: 'Unable to get address from coordinates',
                    error: error
                  });
                }
              });
            },
            error: (error) => {
              observer.error({
                desc: 'Unable to get browser coordinates',
                error: error
              });
            }
          });

      });
    });
  }

  /**
   * Take user coordinates and return around 20 nearby restaurants
   * @param userLocation
   */
  public getRestaurantsFromGoogleMap(userLocation: { latitude: any; longitude: any; }) {
    console.log('getRestaurantsFromGoogleMap|this.map: %o', this.map);
    return new Observable(observer => {
      const keyword = 'restaurant';
      const rankBy = 'distance';
      const search = {
        keyword: '',
        radius: '',
        location: {},
        types: [] as Array<string>,
      };
      const restaurants: any = [];

      const mapOptions: any = {
        zoom: 8,
        center: new google.maps.LatLng(userLocation.latitude, userLocation.longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      // make sure you added place service in your google map url (&libraries=places&callback=initMap)
      this.placeService = new google.maps.places.PlacesService(this.map);
      if (keyword) {
        search.keyword = keyword;
      }

      search.types.push('restaurant');

      if (rankBy === 'distance' && (search.types || search.keyword)) {
        // search.rankBy = (<any>window).google.maps.places.RankBy.DISTANCE;
        search.location = this.latLng;
        const centerMarker = new google.maps.Marker({
          position: search.location,
          animation: google.maps.Animation.DROP,
          map: this.map
        });
      } else {
        console.log('nearbyrestaurant: setting the laglng:%o', userLocation);
        // search.bounds = (<any>window).google.map.getBounds();
      }
      search.location = {lat: userLocation.latitude, lng: userLocation.longitude};
      search.radius = '10000';

      this.placeService.nearbySearch(search, (results: string | any[], status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            const location = results[i].vicinity.split(',');

            const restaurant = {
              name: results[i].name,
              types: results[i].types,
              rating: results[i].rating,
              googlePlaceId: results[i].place_id,
              latitude: results[i].geometry.location.lat(),
              longitude: results[i].geometry.location.lng(),
              owner: 'google',
              openTime: '11:00 AM',
              closeTime: '11:00 PM',
              address: location[0] + ', ' + location[1],
              locality1: location[location.length - 3],
              locality2: location[location.length - 2],
              city: location[location.length - 1]
            };
            restaurants.push(restaurant);

            const marker = new google.maps.Marker({
              position: new google.maps.LatLng(restaurant.latitude, restaurant.longitude),
              title:"Hello World!"
            });

            // To add the marker to the map, call setMap();
            marker.setMap(this.map);
          }
          observer.next(restaurants);
        } else {
          const restaurant = {'name': null};
          restaurants.push(restaurant);
          observer.next(restaurants);
        }
        observer.complete();
      });

    });
  }

  public getGoogleMapPlaceDetail(googlePlaceId: any) {
    return new Observable(observer => {
      // console.log('getGoogleMapPlaceDetail|parameter:%o', googlePlaceId);
      this.placeService.getDetails({placeId: googlePlaceId}, function (place: any, status: string) {
        console.log('MapService|place-detail: %o | status:%o', place, status);
        if (status === google.maps.places.PlacesServiceStatus.OK) {

          if (typeof place.international_phone_number !== 'undefined') {
            place.phone = place.international_phone_number;
          } else if (typeof place.formatted_phone_number !== 'undefined') {
            place.phone = place.formatted_phone_number;
          } else {
            place.phone = '+14156509102';
          }
          observer.next(place);
        } else {
          console.log('Unable to get phone number, email, url, website from google. error: %o', status);
          observer.error('Unable to get phone number, email, url, website from google. error:' + status);
        }
      });
    });
  }


  public getGoogleMapPhotos(googlePlaceId: string) {
    return new Observable(observer => {
      // console.log('getGoogleMapPlaceDetail|parameter:%o', googlePlaceId);
      // const map = new google.maps.Map(document.getElementById('map-canvas'));
      const places = google.maps.places.PlacesService(this.map);
      places.getDetails({placeId: googlePlaceId},
        function (place: { international_phone_number: any; formatted_phone_number: any; place_id: any; website: any; url: any; }, status: string) {
          console.log('mapService|fetched from map|place::::%o and status: %o', place, status);
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            let phone;

            if (typeof place.international_phone_number !== 'undefined') {
              phone = place.international_phone_number;
            } else if (typeof place.formatted_phone_number !== 'undefined') {
              phone = place.formatted_phone_number;
            } else {
              phone = '+1 415 650 9102';
            }

            const restro = {
              place_id: place.place_id,
              phone: phone,
              website: place.website,
              url: place.url
            };
            observer.next(restro);
          } else {
            console.log('Unable to get phone number, email, url, website from google. error: %o', status);
            observer.error('Unable to get phone number, email, url, website from google. error:' + status);
          }
        });
    });
  }

  /*public storeAndUpdateRestaurantsByMap() {
    this.getLatLng().mergeMap(  (latLng) => {
      const deferred = promise.defer();
      $q.when(this.getLatLng())
        .then(function (latLng) {
          // latLng = {latitude: 28.6289332, longitude: 77.2065322}; //28.6289332,77.2065322
          return this.getUserLocation(latLng);
        }).then(function (userLocation) {
        this.appService.userLocation = userLocation;
        // localStorageService.set('userLocation', userLocation);
        return this.userRestaurants(userLocation);
      }).then(function (userNearbyRestaurants) {
        console.log('storeAndUpdateRestaurantsByMap|userNearbyRestaurants:%o', userNearbyRestaurants);
        for (let i = 0; i < userNearbyRestaurants.restaurant.length; i++) {
          this.appService.userNearbyRestaurants.restaurant.items.splice(0, 0, userNearbyRestaurants.restaurant[i]);
          // console.log("map restaurant added:%0", userNearbyRestaurants.restaurant[i]);
        }
        // console.log("picked up restaurants and locationfrom map: %o", userNearbyRestaurants);
        this.httpClient.post('restaurant/addList', userNearbyRestaurants).subscribe(function (results) {
          deferred.resolve(results.data);
        }, function (error) {
          console.log('Error while storing fetched restaurants from google map! :: ' + error);
          deferred.reject(error);
        });

      }); // .then(function(){return this.userRestaurantDetail()});
      // return deferred.promise;
    });
  }*/


  public autoComplete(searchElementRef: ElementRef | undefined, output: EventEmitter<string>) {

    if (searchElementRef) {
      const autoComplete = new google.maps.places.Autocomplete(searchElementRef.nativeElement, {
        types: ['address']
      });

      autoComplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          let place = autoComplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          place = this.processFullLocation(place);

          // send changed address back
          output.emit(place);
        });
      });
    } else {
      output.emit('Element reference is not available | make sure the template element is available');
    }
  }

  public storeAndUpdateRestaurantsManual(userLocation: { latitude: any; longitude: any; }) {
    return new Observable((subscriber: Subscriber<object>) => {
      this.getRestaurantsFromGoogleMap(userLocation).subscribe({
        next: (userNearbyRestaurants: any) => {
          console.log('storeAndUpdateRestaurantsManual|userNearbyRestaurants:%o', userNearbyRestaurants);
          for (let i = 0; i < userNearbyRestaurants.restaurant.length; i++) {
            // $rootScope.restaurant.items.splice(0, 0, userNearbyRestaurants.restaurant[i]);
            // console.log("map restaurant added:%0", userNearbyRestaurants.restaurant[i]);
          }
          subscriber.next(userNearbyRestaurants);
          /*this.httpClient.post('restaurant/addList', userNearbyRestaurants).sunscribe( (results) => {
            observer.resolve(results.data);
          }, (error) => {
            console.log('Error while storing fetched restaurants from google map! :: ' + error);
            observer.reject(error);
          });*/
        }, error: (error: any) => {
          subscriber.next(error);
        }
      });
    });
  }

  public processFullLocation(googleLocation: GoogleLocation) {
    const location = {} as any;
    const gAddress = googleLocation.address_components;
    for (const prop in googleLocation) {
      if (typeof googleLocation[prop] === 'string') {
        location[prop] = googleLocation[prop];
      }
    }

    location['latitude'] = googleLocation.geometry.location.lat();
    location['longitude'] = googleLocation.geometry.location.lng();

    for (let i = 0; i < gAddress.length; i++) {
      location[gAddress[i].types[0]] = String(gAddress[i].long_name).trim();
    }
    if (typeof googleLocation.photos === 'object') {
      for (const photo in googleLocation.photos) {

      }
    }
    return location;
  }


  public loadScript(url: string) {
    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.text = ``;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      // script.appendChild(this.document.head)
      this.renderer.appendChild(this.document.body, script);
    })
  }


}
