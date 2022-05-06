import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, TimeoutError } from 'rxjs';
import { environment } from 'src/environments/environment';

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

export interface Defi {

  id: string;
  categorie: Categorie;
  titre: string;
  dateDeCreation: string;
  description: string;
  etape: Etape[];
  auteur: Chami;
}

export enum TypeEtape{
  mere="mere",
  indice='indice',
  media='media',
  question='question'
}

export interface Etape {
  readonly type_etape: TypeEtape;
  readonly id: number;
  readonly label: string;
  readonly rang: number;
  readonly url: string;
  readonly point: number;
  readonly reponse_attendu: string;
  readonly cout: number;
  //defi: Defi; 

}

@Injectable({
  providedIn: 'root'
})
export class CyberchamisService {

  constructor(private httpClient: HttpClient) { }

  private url = environment.apiUrl;

  /**
   * 
   */
  async addChami(userId: string, chami: Chami, token: string): Promise<unknown> {
    let toto = await lastValueFrom( this.httpClient.post(this.url+'chamis/'+userId, chami, {headers:{Authorization:token}}) );
    return toto
  }

  async addDefi(defi: Defi, token: string) {
    // return await lastValueFrom( this.httpClient.post<Defi>(this.url+'defis/create/', defi,{headers:{Authorization:token}}) );
    //const defiPost = {categorie: defi.categorie, titre: defi.titre, description: defi.description, auteur: defi.auteur, etape: defi.etape};
    console.log("avant requete post");
        await lastValueFrom( this.httpClient.post(this.url+'defis/create/', defi,{headers:{Authorization:token}}) ).then(() => console.log("ten post"));
    //return await lastValueFrom( this.httpClient.post<Defi>(this.url+'defis/create/', defi,{headers:{Authorization:token}}) );
    // return await lastValueFrom( this.httpClient.post<Defi>(this.url+'defis/create/', defi,{headers:{Authorization:token}}) );
  }

  /*async updateDefi(defi: Defi, token: string): Promise<Defi> {
    const defiPost = {categorie: defi.categorie, titre: defi.titre, description: defi.description, auteur: defi.auteur};
    return await lastValueFrom( this.httpClient.put<Defi>(this.url+'defis/', defiPost,{headers:{Authorization:token}}) );
  }*/

  async deleteChami(userId: string): Promise<unknown> {
    return await lastValueFrom(this.httpClient.delete(this.url+'chamis/'+userId));
  }

  async updateDefi(defiId: String, defi: Defi, token: string): Promise<Defi> {
    return await lastValueFrom(this.httpClient.put<Defi>(this.url+'defis/'+defiId, defi, {headers:{Authorization:token}}));
  }

  async deleteDefi(defiId: string, token: string): Promise<unknown> {
    return await lastValueFrom(this.httpClient.delete(this.url+'defis'+defiId, {headers:{Authorization:token}}));
  }

  async getChamiByEmail(chamiEmail: string, token: string): Promise<Chami[]> {
    return await lastValueFrom(this.httpClient.get<Chami[]>(this.url+'chamis/mail/', {headers: new HttpHeaders({Authorization: token}),params:{email:chamiEmail}}));
  }


  getCategorie() {
    return Object.values(Categorie);
  }

  getTypeEtape(){
    return Object.values(TypeEtape);
  }

}
