import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/service/auth.service";
import {feature} from "./feature-model";
import {ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  featureList = feature;
  items: any[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    console.log(this.authService.getToken())
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        for (let f of this.featureList) {
          f.isSelected = event.url.replace('/', '').includes(f.routerLink[0]) && f.routerLink[0] !== '';
        }
      }
    });
  }

  save() {

  }

  routerLink(link: any) {
    this.router.navigate(link.routerLink);
  }

}
