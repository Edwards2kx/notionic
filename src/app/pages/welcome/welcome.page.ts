import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit{

  constructor(private router: Router) {
    
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000); 
  }
  async ngOnInit() {
    await LocalNotifications.requestPermissions();
  }

}
