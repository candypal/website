import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


export interface Footer {
  displayTopSection: boolean;
  social: {
    facebook: string,
    googlePlus: string,
    twitter: string,
    linkedIn: string,
  };
  copyright: { label: string, url: string, year: number };
  contact: { name: string, email: string, phone: string, fax: string };
  message: { heading: string, desc: string };
  columnOneLinks: Array<{ label: string, url: string, hidden: boolean }>;
  columnTwoLinks: Array<{ label: string, url: string, hidden: boolean }>;
  style?: Object | any;
}


@Injectable({
  providedIn: 'root'
})
export class FooterService {
  footer: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  backgroundColor = '#7a690b';
  color = '#f99d00';
  linkColor = '#ffc11a';
  linkVisitedColor = '#16d3ff';
  linkHoverColor = '#fbfe11';
  linkActiveColor = '#d0eccb';

  constructor() {
  }

  setFooter() {
    this.footer.next({
      displayTopSection: true,
      social: {
        facebook: 'http://www.facebook.com',
        googlePlus: 'http://www.plus.google.com',
        twitter: 'http://www.twitter.com',
        linkedIn: 'http://www.linkedin.com',
      },
      copyright: {
        year: 2018,
        label: 'Candiman team with love',
        url: 'https://www.candifood.com'
      },
      contact: {
        name: 'Xxxxxxxx Xxxx',
        email: 'xxxxxxxxxxxxxx@xxxxxxx.xxx',
        phone: '+1 xxx xxx xxxx',
        fax: '+x xxx xxx xxxx'
      },
      message: {
        heading: 'This will be a good header',
        desc: 'This will be your good description and detailed work or service you provide'
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
    });
  }
}
