import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  startDateField;
  endDateField;
  data;
  buttonDisabled = true;

  constructor(private router: Router) { }

  ngOnInit() {
    if(!(sessionStorage.getItem('loggedIn') == 'true')){
      this.router.navigate(['login']);
    }
  }

  dateChange(){
    this.buttonDisabled = (this.startDateField == null || this.endDateField == null);
  }

  getData(){
    this.data = true;
  }
}
