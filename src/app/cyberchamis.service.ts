import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, TimeoutError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
export interface Chami {
  readonly id: string;
  readonly login: string;
  readonly age: number;
  defis: Defi[];
  readonly email: string;
}

export enum Categorie {
  SPORTIF="SPORTIF", CULTUREL="CULTUREL", ENIGME="ENIGME"
}

export interface DefiDTO {
  // id: string;
  categorie: Categorie;
  titre: string;
  dateDeCreation: string;
  description: string;
  etape: Etape[];
  auteur: Chami;
  image: string;
  coordonnees: string;
}
export interface Defi {

  // id: string;
  id: number;
  categorie: Categorie;
  titre: string;
  dateDeCreation: string;
  description: string;
  etape: Etape[];
  auteur: Chami;
  image : string;
  coordonnees : string;
}

export enum TypeEtape{
  mere="mere",
  indice='indice',
  media='media',
  question='question'
}

export interface Etape {
  type_etape: TypeEtape;
  id: number;
  label: string;
  rang: number;
  url: string;
  point: number;
  reponseAttendu: string;
  cout: number;
  typeReponseAttendu: TypeReponse;
  listeIndice?: Partial<Indice>[];
}

export interface Indice{
  type_etape: TypeEtape;
  id: number;
  label: string;
  rang: number;
  cout: number;
}

export interface VisiteDTO{
  joueur:string;
  defi: number;
  rang:number
}

export interface Visite{
  id: number;
  joueurs: Chami[];
  defi : Defi;
  rang: number;
  dateDebut: string;
  dateFin: string;
}

export enum TypeReponse{
  media="media",
  texte="texte"
}

export interface Reponse{
  type_reponse: TypeReponse,
  valide: boolean,
  value:string,
  question: Etape,
  visite:Visite
}

@Injectable({
  providedIn: 'root'
})
export class CyberchamisService {

  currentChami!: Chami; 
  currentToken!: string;

  constructor(private httpClient: HttpClient,public auth: AngularFireAuth) { 
    this.auth.authState.subscribe(
      user => {
        user?.getIdTokenResult().then(idToken => { 
          this.currentToken=idToken.token;    
          console.log(this.currentToken)      
        }
        )
      }     
    )
  }

  private url = environment.apiUrl;

  /**
   * 
   */
  async addChami(userId: string, chami: Chami): Promise<unknown> {
    let toto = await lastValueFrom( this.httpClient.post(this.url+'chamis/'+userId, chami, {headers:{Authorization:this.currentToken}}) );
    return toto
  }

  async addDefi(defi: DefiDTO) {
    const defiPost = {categorie: defi.categorie, titre: defi.titre, description: defi.description, auteur: defi.auteur, etape: defi.etape, image: defi.image, coordonnees: defi.coordonnees};
        await lastValueFrom( this.httpClient.post(this.url+'defis/create/', defiPost,{headers:{Authorization:this.currentToken}}) ).then(() => console.log("ten post"));
  }

  async addReponse(idVisite: string, reponse: Reponse){
    return await lastValueFrom(this.httpClient.put(this.url+"visite/"+idVisite+"/reponse/", reponse, {headers:{Authorization:this.currentToken}}) ).then(() => console.log("rep post"))
  }

  /*async updateDefi(defi: Defi, token: string): Promise<Defi> {
    const defiPost = {categorie: defi.categorie, titre: defi.titre, description: defi.description, auteur: defi.auteur};
    return await lastValueFrom( this.httpClient.put<Defi>(this.url+'defis/', defiPost,{headers:{Authorization:token}}) );
  }*/

  async deleteChami(userId: string): Promise<unknown> {
    return await lastValueFrom(this.httpClient.delete(this.url+'chamis/'+userId));
  }

  async getDefiById(defiId: number): Promise<Defi> {
    return await lastValueFrom(this.httpClient.get<Defi>(this.url+'defis/'+defiId, {headers:{Authorization:this.currentToken}}));
  }

  async updateDefi(defiId: number, defi: Defi): Promise<Defi> {
    return await lastValueFrom(this.httpClient.put<Defi>(this.url+'defis/'+defiId, defi, {headers:{Authorization:this.currentToken}}));
  }

  async finVisite(visite: Visite){
    return await lastValueFrom(this.httpClient.get<Visite>(this.url+'visite/fin/'+visite.id, {headers:{Authorization:this.currentToken}}))
  }

  async deleteDefi(defiId: number): Promise<unknown> {
    return await lastValueFrom(this.httpClient.delete(this.url+'defis/'+defiId, {headers:{Authorization:this.currentToken}}));
  }

  async getChamiByEmail(chamiEmail: string): Promise<Chami[]> {
    return await lastValueFrom(this.httpClient.get<Chami[]>(this.url+'chamis/mail/', {headers: new HttpHeaders({Authorization: this.currentToken}),params:{email:chamiEmail}}));
  }

  async getChamiById(chamiId: string): Promise<any>{
    let  ret = await lastValueFrom(this.httpClient.get<Chami>(this.url+'chamis/'+chamiId, {headers: new HttpHeaders({Authorization:this.currentToken})})).then(chami =>this.currentChami=chami);
    return ret;
  }

  async addVisite(chami: Chami, defi: Defi):Promise<Visite>{
    let chamiArray: Chami[] =[];
    chamiArray.push(chami);
    let visiteDto :{joueur:string, defi:number, rang:number} = {joueur:chami.id, defi:defi.id, rang:0};
    return await lastValueFrom(this.httpClient.post<Visite>(this.url+'visite/', {joueur:chami.id, defi:defi.id, rang:0}, {headers:{Authorization:this.currentToken}}));
  }

  async addVisiteComplete(chamis: Chami[], defi: Defi):Promise<Visite>{
    return await lastValueFrom(this.httpClient.post<Visite>(this.url+'visite/complet/', {joueurs:chamis, defi:defi, rang:0, reponses:[]}, {headers:{Authorization:this.currentToken}}));
  }

  async getVisitesByChami(chamiId: string): Promise<Visite[]> {
    return await lastValueFrom(this.httpClient.get<Visite[]>(this.url+'visite/'+chamiId, {headers: new HttpHeaders({Authorization: this.currentToken})}));
  }

  async getVisitesDTOByChami(chamiId: string): Promise<VisiteDTO[]>{
    return await lastValueFrom(this.httpClient.get<VisiteDTO[]>(this.url+'visite/DTO/'+chamiId,{headers: new HttpHeaders({Authorization: this.currentToken})}));
  }

  async addChamiToVisite(idVisite:number, idChami : string) {
    return await lastValueFrom(this.httpClient.put<Visite>(this.url+idVisite+"/ajouterJoueur/"+idChami, {headers: new HttpHeaders({Authorization: this.currentToken})}));
  }

  getCategorie() {
    return Object.values(Categorie);
  }

  getTypeEtape(){
    return Object.values(TypeEtape);
  }


  async getVisite(visiteId: string): Promise<Visite>{
    return await lastValueFrom(this.httpClient.get<Visite>(this.url+"visite/play/"+visiteId, 
    {headers: new HttpHeaders(
      {'Authorization': this.currentToken})}));
  }
  /**
   * 
   * @param stringDate Une string représentant une date au format YYYY-MM-DDThh:mm:ss
   * @returns La date formattée selon la localisation de l'appareil
   */
   parsedDateToString(stringDate: string) : string {
    return new Date(stringDate).toLocaleString();
  }

}
