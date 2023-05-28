import {Component, HostListener, OnInit} from '@angular/core';
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
  isShowNavigation: boolean = true;
  navigationClass = 'feature-navigation';

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
    this.showNavigation()
  }

  save() {

  }

  routerLink(link: any) {
    this.router.navigate(link.routerLink);
  }

  showNavigationToggle() {
    this.isShowNavigation = !this.isShowNavigation;

  }

  isMobile() {
    return window.innerWidth < 768;
  }

  isDesktop() {
    return window.innerWidth >= 768;
  }

  isTablet() {
    const width = window.innerWidth;
    return width <= 768 && width > 640;
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    console.log(window.innerWidth)
   this.showNavigation();
  }
  showNavigation(){
     if (this.isMobile()){
      this.isShowNavigation = false;
      this.navigationClass = 'a';
    }
    else {
      this.isShowNavigation = true;
      this.navigationClass = 'feature-navigation';
    }
  }
}
