import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController  } from 'ionic-angular';


@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})


export class NotificacionesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
  }


}
