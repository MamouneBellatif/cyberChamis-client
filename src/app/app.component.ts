import { circle, latLng, Layer, MapOptions, marker, tileLayer } from 'leaflet';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 

import firebase from 'firebase/compat/app'; 
import { Chami, CyberchamisService } from './cyberchamis.service';
import { Observable, takeWhile } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class AppComponent implements OnInit{

  private mode: string = '';
  currentChami: Observable<Chami[]>|null = null;
  
  getMode(): string {
    return this.mode;
  }

  setMode(mode: string) {
    this.mode = mode;
  }

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

  ccService: CyberchamisService;
    
  constructor(public auth: AngularFireAuth, ccService: CyberchamisService) {
    this.ccService = ccService;
    this.auth.authState.subscribe(
      user => {
        user?.getIdTokenResult().then(idToken => { 
          localStorage.setItem('currentUserToken', JSON.stringify(idToken))
          }
        )
      }     

    )
  } 
    
  login(): void { 
    const provider = new firebase.auth.GoogleAuthProvider(); 
    provider.setCustomParameters({ 
      prompt: 'select_account' 
    }); 
    this.auth.signInWithPopup(provider).then( ()=>
      this.auth.user.forEach(user=>this.currentChami = this.getChamiByEmail(user?.email||''))
    );
    
  } 
  
  logout(): void { 
    this.auth.signOut(); 
  }

  idToken!: string;

  getToken():Promise<string>{
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(user => { if(user){
        user.getIdToken().then(idToken => { this.idToken=idToken;
        resolve(idToken);
        });
      }
      });
    })
  }


  getChamiByEmail(chamiEmail: string) : Observable<Chami[]> {
    if(this.auth.user){
      //console.log("store token");
       firebase.auth().currentUser?.getIdToken(true).then(function(idToken) {
          localStorage.setItem("currentUserToken",JSON.stringify(idToken));
        }
      );
    }
    return this.ccService.getChamiByEmail(chamiEmail,JSON.parse(localStorage.getItem("currentUserToken") || '{}'));
  }

  addChami(chami: Chami) {
    return this.ccService.addChami(chami.login, chami, JSON.parse(localStorage.getItem("currentUserToken") || '{}'));
  }

  parseAge(s: string): number{
    return parseInt(s);
  }

  ngOnInit(): void {
    this.auth.user.forEach(user => this.currentChami = user !== null ? this.getChamiByEmail(user.email||''):null)
  }
}
