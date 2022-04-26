import { circle, latLng, Layer, MapOptions, marker, tileLayer } from 'leaflet';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 

import firebase from 'firebase/compat/app'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class AppComponent {
  options: MapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18,  attribution: '...' }),
    ],
    zoom: 15,
    center: latLng(	45.188529, 	5.724524)
  };
  otherLayers: Layer[] = [
    marker([ 45.188529, 	5.724524 ])
  ];

  displayCircle = false;
  layerCircle: Layer = circle([ 45.188529, 	5.724524 ], {radius: 500} )

  dataIconGoogle = 'assets/images/iconGoogle.png'; 
    
  constructor(public auth: AngularFireAuth) {} 
    
  login(): void { 
    const provider = new firebase.auth.GoogleAuthProvider(); 
    provider.setCustomParameters({ 
      prompt: 'select_account' 
    }); 
    this.auth.signInWithPopup(provider); 
  } 
    
  logout(): void { 
    this.auth.signOut(); 
  }
}
