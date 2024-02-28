import {Component, Input} from '@angular/core';
import {AuthService} from "../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() toggleMenu?: boolean;

  constructor(private authServ: AuthService, private router: Router) {
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  logout() {
    this.authServ.logout();
    this.router.navigate(['/']);
  }
}
