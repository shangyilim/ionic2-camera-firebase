import { Component } from '@angular/core';
import firebase from 'firebase';

import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  captureDataUrl: string;
  alertCtrl: AlertController;

  constructor(public navCtrl: NavController, alertCtrl: AlertController) {
    this.alertCtrl = alertCtrl;
  }

  capture() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
    };

    Camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  upload() {
    let storageRef = firebase.storage().ref();

    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      this.showSuccesfulUploadAlert();
    });

  }

  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();

    // clear the previous photo data in the variable
    this.captureDataUrl = "";
  }



}
