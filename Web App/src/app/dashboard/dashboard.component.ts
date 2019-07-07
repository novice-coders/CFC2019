import { Component, OnInit } from '@angular/core';
import { AppcontextService } from '../appcontext.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor(private appContext: AppcontextService) { }

  ngOnInit() {
    this.appContext.currentPage = 'Dashboard';
  }

}
