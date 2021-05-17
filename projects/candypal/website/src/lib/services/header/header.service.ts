import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

export interface Link {
  label: string;
  url: string;
  access?: Array<string>;
}

export interface Logo {
  imageInAsset: string;
  width?: string | number;
  height?: string | number;
  alt?: string;
  style?: Object | any;
}

export interface MiddleButton {
  display: boolean;
  label: string;
  loading: boolean;
  style?: Object | any;
}

export interface BrandImage {
  display?: boolean;
  logo?: Logo;
  style?: Object | any;
}

export interface BrandText {
  display?: boolean;
  style?: Object | any;
}

export interface Brand {
  label?: string;
  url?: string;
  brandImage?: BrandImage;
  brandText?: BrandText;
  style?: Object | any;
}

export interface Header {
  brand?: Brand;
  links?: {
    leftLinks?: Array<Link>;
    rightLinks?: Array<Link>;
    style?: Object | any;
  };
  middleButton?: MiddleButton;
  style?: Object | any;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  header: Subject<Header> = new Subject<Header>();
  headerChanged: Subject<Header> = new Subject<Header>();
  leftLinks: Subject<Array<Link>> = new Subject<Array<Link>>();
  rightLinks: Subject<Array<Link>> = new Subject<Array<Link>>();
  middleButton: Subject<MiddleButton> = new Subject<MiddleButton>();
  logo: Subject<Logo> = new Subject<Logo>();
  brand: Subject<Brand> = new Subject<Brand>();

  constructor() {
  }

  changeRightLink(links: Array<Link>) {
    this.rightLinks.next(links);
  }

  changeLinkText(oldText: string, newText: string) {

  }
}
