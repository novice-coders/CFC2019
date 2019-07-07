import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  name: string = '';
  age: string = '';
  gender: string = '';
  bloodGroup: string = '';
  currentMedications: string = '';

  constructor() {
    this.name = localStorage.Name;
    this.age = localStorage.age;
    this.gender = localStorage.gender;
    this.bloodGroup = localStorage.bloodGroup;
    this.currentMedications = localStorage.currentMedications;

  }

}
