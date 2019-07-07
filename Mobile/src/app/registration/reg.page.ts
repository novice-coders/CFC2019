import { Component } from '@angular/core';
import { ToastController  , NavController } from '@ionic/angular';
import { PreloadAllModules, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: 'reg.page.html',
  styleUrls: ['reg.page.scss']
})
export class RegPage {

  name : string = '';
  age : string = '';
  gender : string = '';
  bloodGroup : string = '';
  currentMedications : string = '';

  constructor(private nav : NavController) {}

  onSubmit(){
    localStorage.Name = this.name;
    localStorage.age = this.age;
    localStorage.gender = this.gender;
    localStorage.bloodGroup = this.bloodGroup;
    localStorage.currentMedications = this.currentMedications;
    
    this.nav.navigateForward('tabs');
    
  }

}
