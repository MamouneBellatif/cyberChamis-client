import { circle, latLng, Layer, MapOptions, marker, tileLayer } from 'leaflet';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 

import firebase from 'firebase/compat/app'; 
import { Chami, CyberchamisService } from './cyberchamis.service';
import { Subject, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class AppComponent implements OnInit{

  // Chami connecté
  // currentChami: Promise<Chami[]>|null = null;
  currentChami: Promise<Chami>|null = null;
  // chamiSubj = new Subject<Chami[]>();

  // Fonctionnalité en cours : VISUALISER [Chamis], JOUER, AJOUTER [Defi], MODIFIER [Defi]
  private mode: string = '';
  
  getMode(): string {
    return this.mode;
  }

  setMode(mode: string) {
    this.mode = mode;
    console.log("this.mode : "+this.mode+"\nmode : "+mode);
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
    
  constructor(public auth: AngularFireAuth, ccService: CyberchamisService, public router: Router) {
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

  
    /**
   * Initialise le Chami courant currentChami
   */
     ngOnInit(): void {
      this.auth.user.pipe(take(2)).subscribe(user => {
          if (user !== null)  
            // this.currentChami = this.getChamiByEmail(user.email||''); 
            this.currentChami = this.getChamiById(user.uid||''); 
            // this.currentChami?.then(data => this.chamiSubj.next(data))
        });
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          console.log("userId "+user.uid);
          this.userId=user.uid;
        }else{
  
        }
      })
    }
    
  // Connexion avec Firebase
  login(): void { 
    const provider = new firebase.auth.GoogleAuthProvider(); 
    provider.setCustomParameters({ 
      prompt: 'select_account' 
    }); 
    this.auth.signInWithPopup(provider).then( userCred => {
      // this.currentChami = this.getChamiByEmail(userCred.user?.email||''); 
      this.currentChami = this.getChamiById(userCred.user?.uid||''); 
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
    return this.ccService.getChamiByEmail(chamiEmail);
  }

    /**
   * Retourne la promesse des Chamis
   * enregistrés avec l'email chamiEmail
   * @param chamiEmail une adresse email à rechercher
   * @returns la promesse d'une liste de Chamis ayant cette adresse email
   */
     getChamiById(chamiId: string) : Promise<Chami> {
      if(this.auth.user){
         firebase.auth().currentUser?.getIdToken(true).then(function(idToken) {
            localStorage.setItem("currentUserToken",JSON.stringify(idToken));
          }
        );
      }
      return this.ccService.getChamiById(chamiId);
    }

  /**
   * Enregistre un nouveau Chami
   * @param chami Un Chami à enregistrer
   * @returns Une promesse ?
   */
  addChami(chami: Chami) {
  // addChami(chami: Chami):Promise<unknown> {
    // this.auth.user.subscribe(data => this.userId=data?.uid ||'').unsubscribe();
    
    // return this.ccService.addChami(firebase.auth().currentUser?.uid||'', chami);
    
    this.ccService.addChami(chami.id, chami).then(() => this.refresh());
    
  }

  /**
   * Encapsulation de parseInt pour son utilisation dans le template
   * @param s Une string représentant un entier
   * @returns Ledit entier
   */
  parseAge(s: string): number{
    return parseInt(s);
  }



  refresh(){
    window.location.reload()
  }
}

