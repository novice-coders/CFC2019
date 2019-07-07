import { Component, OnInit } from '@angular/core';
import { AppcontextService } from '../appcontext.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.less']
})
export class HelpComponent implements OnInit {

  constructor(private appContext: AppcontextService) { }

  ngOnInit() {
    this.appContext.currentPage = 'Help';
  }

}
