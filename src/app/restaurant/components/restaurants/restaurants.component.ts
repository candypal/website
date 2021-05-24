import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RestaurantService} from '../../service/restaurant.service';
import {
  faBeer,
  faBirthdayCake,
  faCoffee,
  faGamepad,
  faGlassMartini,
  faMagic,
  faShoppingCart,
  faSquare,
  faStar,
  faStarHalf,
  faTruckMoving,
  faUtensils,
  faWineGlass
} from '@fortawesome/free-solid-svg-icons';
import {CfsInfiniteScrollService, MapService} from '@candypal/website';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {IInfiniteScrollEvent} from "ngx-infinite-scroll";

@Component({
  selector: 'cfs-display-restaurant',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RestaurantsComponent implements OnInit {
  faUtensils = faUtensils;
  faGlassMartini = faGlassMartini;
  faTruckMoving = faTruckMoving;
  faCoffee = faCoffee;
  faWineGlass = faWineGlass;
  faShoppingCart = faShoppingCart;
  faGamepad = faGamepad;
  faBirthdayCake = faBirthdayCake;
  faBeer = faBeer;
  faStar = faStar;
  faStarHalf = faStarHalf;
  faMagic = faMagic;
  faSquar = faSquare;

  constructor(
    public restaurantService: RestaurantService,
    private mapService: MapService,
    private changeDetectorRef: ChangeDetectorRef,
    public ngbCarouselConfig: NgbCarouselConfig,
    private cfsInfiniteScrollService: CfsInfiniteScrollService
  ) {

    // ngbCarouselConfig.interval = 3000;
    // ngbCarouselConfig.wrap = true;
  }

  ngOnInit() {

  }

  onScroll(event: IInfiniteScrollEvent) {
    console.log(event);
    this.cfsInfiniteScrollService.scrolledBehaviorSubject.next(event);
  }

  getGoogleMapPhotos(googlePlaceId: string, index: number) {
    this.mapService.getGoogleMapPlaceDetail(googlePlaceId).subscribe((place: any) => {
      place.photos = place.photos.map((photo: any) => {
        photo.url = photo.getUrl({'maxWidth': 250, 'maxHeight': 200});
        return photo;
      });
      this.restaurantService.restaurants[index].place = place;
      this.changeDetectorRef.detectChanges();
      console.log(this.restaurantService.restaurants[index]);
    });
  }
}
