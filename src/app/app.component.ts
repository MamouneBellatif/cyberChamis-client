import { circle, latLng, Layer, MapOptions, marker, tileLayer } from 'leaflet';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 

import firebase from 'firebase/compat/app'; 
import { Chami, CyberchamisService } from './cyberchamis.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class AppComponent implements OnInit{

  // Chami connecté
  currentChami: Promise<Chami[]>|null = null;

  // Fonctionnalité en cours : VISUALISER [Chamis], JOUER, AJOUTER [Defi]
  private mode: string = '';
  
  getMode(): string {
    return this.mode;
  }

  setMode(mode: string) {
    this.mode = mode;
  }

  // Configuration leaflet
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
    
  // Connexion avec Firebase
  login(): void { 
    const provider = new firebase.auth.GoogleAuthProvider(); 
    provider.setCustomParameters({ 
      prompt: 'select_account' 
    }); 
    this.auth.signInWithPopup(provider).then( userCred => {
      this.currentChami = this.getChamiByEmail(userCred.user?.email||''); 
    });
  } 
  
  logout(): void { 
    this.auth.signOut(); 
  }

  // not used?
  idToken!: string;

  userId!:string;

  getToken():Promise<string>{
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(user => { if(user){
        user.getIdToken().then(idToken => { this.idToken=idToken;
        this.userId=user.uid;
        resolve(idToken);
        });
      }
      });
    })
  }

  /**
   * Retourne la promesse des Chamis
   * enregistrés avec l'email chamiEmail
   * @param chamiEmail une adresse email à rechercher
   * @returns la promesse d'une liste de Chamis ayant cette adresse email
   */
  getChamiByEmail(chamiEmail: string) : Promise<Chami[]> {
    if(this.auth.user){
       firebase.auth().currentUser?.getIdToken(true).then(function(idToken) {
          localStorage.setItem("currentUserToken",JSON.stringify(idToken));
        }
      );
    }
    return this.ccService.getChamiByEmail(chamiEmail,JSON.parse(localStorage.getItem("currentUserToken") || '{}'));
  }

  /**
   * Enregistre un nouveau Chami
   * @param chami Un Chami à enregistrer
   * @returns Une promesse ?
   */
  addChami(chami: Chami):Promise<unknown> {
    // this.auth.user.subscribe(data => this.userId=data?.uid ||'').unsubscribe();
    
    // return this.ccService.addChami(firebase.auth().currentUser?.uid||'', chami, JSON.parse(localStorage.getItem("currentUserToken") || '{}'));
    
    return this.ccService.addChami(chami.id, chami, JSON.parse(localStorage.getItem("currentUserToken") || '{}'));
  }

  /**
   * Encapsulation de parseInt pour son utilisation dans le template
   * @param s Une string représentant un entier
   * @returns Ledit entier
   */
  parseAge(s: string): number{
    return parseInt(s);
  }

  /**
   * Initialise le Chami courant currentChami
   */
  ngOnInit(): void {
    this.auth.user.pipe(take(2)).subscribe(user => {
      if (user !== null)  
        this.currentChami = this.getChamiByEmail(user.email||''); 
      });

    // this.auth.user.subscribe(user => { 
    //   if(user!=null)
    //     this.currentChami = this.getChamiByEmail(user.email||'');
    // }).unsubscribe();
    // this.auth.user.subscribe(data =>{
       
    //      this.currentChami = this.getChamiByEmail(data.email||'');}
    //     .unsubscribe();

      console.log("init");
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          console.log("userId "+user.uid);
          this.userId=user.uid;
        }else{

        }
      })
  }
}
