import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

import {filter} from "rxjs/operators";

import {MenuItem} from "primeng/api";

import {AuthService} from "../auth/service/auth.service";

import {feature} from "./feature-model";

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  featureList = feature;
  items: MenuItem[];
  isShowNavigation: boolean = true;
  navigationClass = 'feature-navigation';
  infoUser: any;
  routenow = this.router.url
  menuidnowheight: any
  positionY: any
  lastheight: any
  lastY: any
  menutoheight: any
  menutoY: any

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    let v = setInterval(() => {
      if (document.getElementById('menunow') !== null) {
        this.positionY = document.getElementById('menunow')?.offsetTop;
        this.menuidnowheight = document.getElementById('menunow')?.offsetHeight
        clearInterval(v)
      }
    }, 450)
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        for (let f of this.featureList) {
          f.isSelected = event.url.replace('/', '').includes(f.routerLink[0]) && f.routerLink[0] !== '';
        }
      }
    });
    for (let f of this.featureList) {
      f.isSelected = this.router.url.replace('/', '').includes(f.routerLink[0]) && f.routerLink[0] !== '';
    }
    this.authService.getInfo().subscribe(res => {
      this.infoUser = res;
      this.items = [
        {
          label: 'Đăng xuất',
          command: () => {
            this.authService.logOut();
          }

        }
      ]
    })

    this.showNavigation()
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

  showNavigation() {
    if (this.isMobile()) {
      this.isShowNavigation = false;
      this.navigationClass = 'a';
    } else {
      this.isShowNavigation = true;
      this.navigationClass = 'feature-navigation';
    }
  }
  load(url: string) {
    document.getElementById('menuidnow')!.classList.remove('slip')
    this.routenow = url
    let v = setInterval(() => {
      if (document.getElementById('menunow') !== null) {
        this.lastheight = this.menuidnowheight
        this.lastY = this.positionY
        this.menutoY = document.getElementById('menunow')?.offsetTop
        this.menutoheight = document.getElementById('menunow')?.offsetHeight
        document.getElementById('menuidnow')!.classList.add('slip')
        setTimeout(() => {
          this.positionY = document.getElementById('menunow')?.offsetTop
          this.menuidnowheight = document.getElementById('menunow')?.offsetHeight
          document.getElementById('menuidnow')!.classList.remove('slip')
          clearInterval(v)
        }, 450)
      }
    }, 0)
    if (this.router.url == url) {
      window.location.reload()
    }
  }
}
