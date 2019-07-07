import { Component, OnInit } from '@angular/core';
import { AppcontextService } from '../appcontext.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.less']
})
export class MapsComponent implements OnInit {
  lat: number = 22.579650;
  lng: number = 88.438020;


  // locations: Array<any> = [{ id: this.guid(), lat: 22.579694, lng: 88.438046 },
  // { id: this.guid(), lat: 22.579795, lng: 88.438147 },
  // { id: this.guid(), lat: 22.579795, lng: 88.438147 },
  // { id: this.guid(), lat: 22.579896, lng: 88.438248 },
  // { id: this.guid(), lat: 22.579997, lng: 88.438349 },
  // { id: this.guid(), lat: 22.579598, lng: 88.438444 },
  // { id: this.guid(), lat: 22.579499, lng: 88.438543 }];
  locations: Array<any> = [];
  constructor(private appContext: AppcontextService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.appContext.currentPage = 'Maps';
    this.fetchLocations();
  }
  fetchLocations() {
    this.httpClient.get('https://radiojocker-relaxed-cassowary.eu-gb.mybluemix.net/api/users')
      .subscribe((data: Array<any>) => {
        this.locations = data.map((x) => {
          return {
            id: x._id,
            lat: parseFloat(x.lat),
            lng: parseFloat(x.long)
          }
        });       
      });
  }
  guid() {
    return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
  }
  S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  openedWindow: number = 0; // alternative: array of numbers

  openWindow(id) {
    this.openedWindow = id; // alternative: push to array of numbers
  }

  isInfoWindowOpen(id) {
    return this.openedWindow == id; // alternative: check if id is in array
  }
}
