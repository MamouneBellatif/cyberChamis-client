import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Categorie, Chami, CyberchamisService, Defi, Etape, TypeEtape } from '../cyberchamis.service';
import firebase from 'firebase/compat/app'; 


@Component({
  selector: 'app-new-defi',
  templateUrl: './new-defi.component.html',
  styleUrls: ['./new-defi.component.scss']
})
export class NewDefiComponent implements OnInit {
  Categorie = Categorie; // C'est la magie.

  listEtape: Etape[] = [];

  @Input() chami!:Chami;

  // categorie: Categorie = Categorie.SPORTIF;

  // Categorie = Categorie;

  // @Input() token!:string;
  constructor(private auth: AngularFireAuth,private ccService: CyberchamisService) { }
  ngOnInit(): void {
    this.ajouterEtape();
  }

  ajouterEtape(){
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
      defi: {
        id:"",
        categorie: Categorie.CULTUREL,
        titre: "",
        dateDeCreation:"",
        description : "",
        etape: [],
        auteur: this.chami
      }});
  }
  addEtape(etape: Etape){
    this.listEtape.push(etape);
  }
  addDefi(defi: Defi) :Promise<unknown>{
    console.log('addDefi', defi);
    return this.ccService.addDefi(defi,JSON.parse(localStorage.getItem("currentUserToken") || '{}'));
  }

  updateDefi(defi : Defi) : Promise<unknown>{
    return this.ccService.updateDefi(defi, JSON.parse(localStorage.getItem("currentUserToken") || '{}'));
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
}
