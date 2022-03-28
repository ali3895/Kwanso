import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  public isSignedIn: boolean = false;


  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.menuService.isSignedIn.subscribe((res) => {
      this.isSignedIn = res;
    });

    if (localStorage.getItem("token")) {
      this.isSignedIn = true;
    }
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public signOut_onClick() {
    localStorage.clear();
    this.menuService.isSignedIn.next(false);
    this.router.navigate(['login']);
  }
}
