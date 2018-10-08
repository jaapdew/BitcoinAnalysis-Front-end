import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-database-hub',
  templateUrl: './database-hub.component.html',
  styleUrls: ['./database-hub.component.css']
})
export class DatabaseHubComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(!(sessionStorage.getItem('loggedIn') == 'true')){
      this.router.navigate(['login']);
    }
  }
  

}
