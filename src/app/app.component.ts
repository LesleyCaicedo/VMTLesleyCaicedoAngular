import { Component } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'VMT-LesleyCaicedo';
  isLogged: boolean = false;

  constructor(private accountService: AccountService) {
    this.accountService.isLogged$.subscribe((value) => {
      this.isLogged = value;
    });
  }
}
