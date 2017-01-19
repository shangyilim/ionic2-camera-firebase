import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      const firebaseConfig = {
        apiKey: "AIzaSyA-34tvPn0bpQ93VKqU0bHZqkeuKGCh2rc",
        authDomain: "ionic-camera-firebase.firebaseapp.com",
        databaseURL: "https://ionic-camera-firebase.firebaseio.com",
        storageBucket: "ionic-camera-firebase.appspot.com",
        messagingSenderId: "60462604107"

      };

      firebase.initializeApp(firebaseConfig);
    });
  }
}
