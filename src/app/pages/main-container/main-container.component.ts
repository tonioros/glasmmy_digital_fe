import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services";

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent implements OnInit {
  toggleMenu = false;
  userName: string = '';

  constructor(private authServ: AuthService) {
  }

  ngOnInit(): void {
    this.userName = this.authServ.user()?.name as string;
  }

  onOpenMenu() {
    this.toggleMenu = !this.toggleMenu
  }
}
