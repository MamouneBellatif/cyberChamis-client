import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Categorie, Chami, CyberchamisService, Defi, DefiDTO, Etape, TypeEtape } from '../cyberchamis.service';
import firebase from 'firebase/compat/app'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { appCheckInstanceFactory } from '@angular/fire/app-check/app-check.module';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-new-defi',
  templateUrl: './new-defi.component.html',
  styleUrls: ['./new-defi.component.scss']
})
export class NewDefiComponent implements OnInit {
  Categorie = Categorie; // C'est la magie.

  listEtape: Etape[] = [];

  coordonnesDefi : string = "";

  // @Input() chami!:Chami;
  chami!:Chami;

  defi : Defi = {        
    id:0,
    categorie: Categorie.CULTUREL,
    titre: "",
    dateDeCreation:"",
    description : "",
    etape: [],
    auteur: this.chami,
    image: "",
    coordonnees: ""
    };

  // categorie: Categorie = Categorie.SPORTIF;

  // Categorie = Categorie;

  // @Input() token!:string;

  constructor(private auth: AngularFireAuth, private ccService: CyberchamisService, 
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //this.ajouterEtape();
    this.chami=this.ccService.currentChami;
  }

  /*ajouterEtape(){
    console.log("ajouter une etape");
    this.addEtape({
      type_etape: TypeEtape.MERE,
      id:0,
      label :' ',
      rang : 1,
      url:' ',
      point: 0,
      reponse_attendu:" ",
      cout:0,
      defi: this.defi});
  }*/
  
  addEtape(etape: Etape){
    console.log('ajouter encore un defis');
    this.listEtape.push(etape);
    console.log(this.listEtape);
  }

  addDefi(defi: DefiDTO) :Promise<unknown>{
    console.log("img save "+defi.image);
    console.log("envoie du defi");
    defi.etape = this.listEtape;
    console.log('addDefi', defi);
    return this.ccService.addDefi(defi);
  }

  updateDefi(defi : Defi) : Promise<unknown>{
    return this.ccService.updateDefi(defi.id, defi);
  }

  getCategorie(){
    return this.ccService.getCategorie();
  }
    
  getCategorieString(categorie: string){
    if(categorie == "SPORTIF")
      return Categorie.SPORTIF;
    if(categorie == "CULTUREL")
      return Categorie.CULTUREL;
    if(categorie == "ENIGME")
      return Categorie.ENIGME;
    else
      return Categorie.CULTUREL;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  changeCoordonnees(c : string){
    this.coordonnesDefi = c;
  }
}