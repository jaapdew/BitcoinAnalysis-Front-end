import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BitcoinDataDto } from 'src/model/BitcoinDataDto';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private router: Router, private service: DataService) { }

  data : BitcoinDataDto[];
  startDateField;
  endDateField;
  buttonDisabled = true;

  ngOnInit() {
    if(!(sessionStorage.getItem('loggedIn') == 'true')){
      this.router.navigate(['login']);
    }
  }

  getData(){
    this.service.getData(this.startDateField, this.endDateField).subscribe(
      data =>{ this.data = data; 
    })
  }

  decimalFormat(data : number) : string{
    return data.toFixed(2);
  }

  unixToDate(unix: number): Date{
    return new Date(unix * 1000);
  }

  dateChange(){
    this.buttonDisabled = (this.startDateField == null || this.endDateField == null);
  }

}
