import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  dropdownOpen = false;

  constructor(private accountService: AccountService, private router:Router) {

   }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    localStorage.removeItem('user');
    this.dropdownOpen = false;
    this.accountService.setIsLogued(false);
  }

  toggleNav() {
    const navbar = document.querySelector('.menubar');
    const mobileNav = document.querySelector('.hamburger');
    navbar?.classList.toggle('active');
    mobileNav?.classList.toggle('hamburger-active');
  }

  GetRol(): number {
    return (JSON.parse(localStorage.getItem('user')!) as User).rolRolid!;
  }
}
