import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Event, Router} from '@angular/router';

@Component({
  selector: 'cfs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {


  header: any;
  footer: any;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {

    this.header = {
      brand: {
        label: 'candifood',
        url: '/',
        brandImage: {
          logo: {
            imageInAsset: 'candilogo_icon32x32.png',
            style: {
              width: '30px',
              height: '30px'
            }
          },
          style: {
            'padding-top': '21px'
          }
        },
        style: {
          'color': '#ffffff',
          'text-decoration': 'none'
        }
      },
      links: {
        rightLinks: [
          {label: 'login', url: '/login'},
        ],
        leftLinks: null,
        style: {
          'background-color': '#ec7a39',
          'color': '#f6f6f6',
          'text-decoration': 'none',
          'a:link': {
            'color': '#3eff77'
          },
          'a:visited': {
            'color': '#ff9d19'
          },
          'a:hover': {
            'color': '#fe4d0e'
          },
          'a:active': {
            'color': '#ec7a39'
          }
        }
      },
      middleButton: {
        display: true,
        label: 'finding your location...',
        loading: true,
        style: {
          'background-color': '#ec9a0a',
          'color': '#ffffff'
        }
      },
      style: {
        'background-color': '#ec7a39'
      }
    };


    this.footer = {
      displayTopSection: true,
      social: {
        facebook: 'http://www.facebook.com',
        googlePlus: 'http://www.plus.google.com',
        twitter: 'http://www.twitter.com',
        linkedIn: 'http://www.linkedin.com',
      },
      copyright: {
        year: 2018,
        label: 'candifood team',
        url: 'https://www.candifood.com'
      },
      contact: {
        name: 'Aniruddha Das',
        email: 'candifoodindia@gmail.com',
        phone: '+1 415 650 9102',
        fax: '+x xxx xxx xxxx'
      },
      message: {
        heading: 'All your eating solution',
        desc: 'What we eat, it makes a difference in our life. Healthy food does not always comes with good test.' +
          'We are here to help you to be health as well as take care of your test. Just let us know you.'
      },
      columnOneLinks: [
        {label: 'login', url: '/login', hidden: false},
        {label: 'Privacy', url: '/privacy', hidden: false}
      ],
      columnTwoLinks: [
        {label: 'profile', url: '/profile', hidden: false}
      ],
      style: {
        'background-color': '#7a690b',
        'color': '#f99d00',
        'a:link': {
          'color': '#ffc11a'
        },
        'a:visited': {
          'color': '#16d3ff'
        },
        'a:hover': {
          'color': '#fbfe11'
        },
        'a:active': {
          'color': '#d0eccb'
        }
      }
    };

  }


  ngOnInit() {

    // gets the coordinates from the browser and address from google map. this happens first time
    /*this.mapService.getBrowserCoordinates({}).subscribe((position: Position) => {
      this.coordinates = position && position.coords;
      this.mapService.getAddressFromCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }).subscribe((location: any) => {
        this.header.middleButton.label = location.formatted_address;
        this.header.middleButton.loading = false;
        this.changeDetectorRef.detectChanges();
      }, (error) => {
        this.header.middleButton.label = 'select location here.';
        this.header.middleButton.loading = false;
      });
    }, (error) => {
      this.header.middleButton.label = 'select location here.';
      this.header.middleButton.loading = false;
    });*/


  }

  ngAfterViewInit() {
    /*const mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.mapService.map = this.map;*/
  }
  /*openLocationChangeModel(event) {
    this.modalRef = this.modalService.open(ChangeLocationModelComponent, {windowClass: 'location-change-modal'});
    this.modalRef.componentInstance.input = this.location;
    this.modalRef.componentInstance.output.subscribe((location) => {
      this.location = location;
      this.header.middleButton.label = location.formatted_address;
      this.modalRef.componentInstance.input = this.location;
      this.mapService.locationBehaviorSubject.next(location);
    });
  }

  mapReady(map: GoogleMap) {
    this.mapService.map = map;
  }*/

}
