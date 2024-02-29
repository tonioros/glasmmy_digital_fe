import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../services";
import {Router} from "@angular/router";
import {mobileCheck} from "../../utils/mobile-check";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() toggleMenu?: boolean = false
  @Output() toggleMenuChange = new EventEmitter<boolean>();

  constructor(private authServ: AuthService, private router: Router) {
  }

  isMobile = mobileCheck;

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
    this.toggleMenuChange.emit(this.toggleMenu);
  }

  logout() {
    this.authServ.logout();
    this.router.navigate(['/']);
  }
}
