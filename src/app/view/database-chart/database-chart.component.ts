import { Component, OnInit, Input } from '@angular/core';
import { BitcoinService } from '../../../service/bitcoin.service'
import { TimeInterval } from 'rxjs';

@Component({
  selector: 'app-database-chart',
  templateUrl: './database-chart.component.html',
  styleUrls: ['./database-chart.component.css']
})

export class DatabaseChartComponent implements OnInit {
  interval;


  @Input() databaseName : string = "databaseName";
  databaseStatus : string = "Disabled";
  databaseEntries: number = -1;
  databaseEntriesParsed: string;
  scraping: boolean = false;
  firstEntry: string = "";
  lastEntry: string = "";
  disableuiswitch: boolean = false;

  


  constructor(private service: BitcoinService) { }

  ngOnInit() {
    this.getCount();
    this.isScraping();
    this.getFirstEntry();
    this.getLastEntry();

    this.interval = setInterval(() => {
      this.getCount();
      this.isScraping();
      this.getFirstEntry();
      this.getLastEntry();
      
    }, 1000);
  }


  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }


  switch(){
    if(this.scraping){
      this.service.startScraping().subscribe();
    } else{
      this.service.stopScraping().subscribe();
    }
  }

  getCount(){-
    this.service.getCount().subscribe(data =>{
      this.databaseEntries = data;
      this.databaseEntriesParsed = this.numberWithCommas(data);
      this.databaseStatus = "Enabled";
    },
      error => {this.databaseStatus="Disabled";
    });
  }

  isScraping(){
    this.service.isScraping().subscribe(data =>{
      this.scraping = data;
      this.disableuiswitch = false;
    },
      error => {
        this.scraping = false;
        this.disableuiswitch = true;
    });
  }
  
  getFirstEntry(){
    
    this.service.getFirstEntry().subscribe(data =>{
      this.firstEntry = data;
    },
    error => {
    });
  }

  getLastEntry(){
    this.service.getLastEntry().subscribe(data =>{
      this.lastEntry = data;
    },
    error => {
    });
  }

  numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
 








}
