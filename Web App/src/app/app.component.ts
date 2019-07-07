import { Component } from '@angular/core';
import { AppcontextService } from './appcontext.service';
// import { } from '@types/googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private appContext: AppcontextService){}
  title = 'map';
  // lat: number = 22.572645;
  // lng: number = 88.363892;
  
  getCurrentPage(){
    return this.appContext.currentPage;
  }
  // @ViewChild('gmap') gmapElement: any;
  // map: google.maps.Map;

  // ngOnInit() {
  //   var mapProp = {
  //     center: new google.maps.LatLng(18.5793, 73.8143),
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  // }
}
