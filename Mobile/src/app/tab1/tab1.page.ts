import { Component } from '@angular/core';
import { ToastController , NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isSubmit : boolean = false;
  isIotRead : boolean = false;

name : string = '';

  constructor(public toastController: ToastController) {
    this.name = localStorage.Name;
  }

  presentToast() {
     this.isSubmit = true;
    //  setTimeout(()=>{
    //   this.isSubmit = false;
    //   this.isIotRead = true;
    //  },10000);
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
