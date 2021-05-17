import {Component, Input, OnInit} from '@angular/core';
import {faFacebook, faGooglePlus, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons';

import {faEnvelope, faFax, faHome, faPhone, faUser} from '@fortawesome/free-solid-svg-icons';
import {Footer, FooterService} from '../../services/footer/footer.service';


@Component({
  selector: 'cfs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() footer: Footer | undefined;
  faUser = faUser;
  faHome = faHome;
  faFax = faFax;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faGooglePlus = faGooglePlus;
  faLinkedi = faLinkedin;

  constructor(private footerService: FooterService) {

    this.footerService.footer.subscribe((footer: Footer) => {

    });
  }

  ngOnInit() {
  }

}
