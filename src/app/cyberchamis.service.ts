import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Chami {
  readonly id: string;
  readonly login: string;
  readonly age: number;
  defis: Defi[];
  readonly email: string;
}

export enum Categorie {
  'SPORTIF', 'CULTUREL', 'ENIGME'
}

export interface Defi {

  readonly id: string;
  readonly categorie: Categorie;
  readonly titre: string;
  readonly dateDeCreation: string;
  readonly description: string;
  readonly auteur: Chami;
}

export enum TypeEtape{
  'mere',
  'indice',
  'media',
  'question'
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
  readonly defi: Defi; 

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

  async addDefi(defiId:string, defi: Defi, token: string): Promise<Defi> {
    // return await lastValueFrom( this.httpClient.post<Defi>(this.url+'defis/create/', defi,{headers:{Authorization:token}}) );
    const defiPost = {catagorie: defi.categorie, titre: defi.titre, description: defi.description, auteur: defi.auteur};
    return await lastValueFrom( this.httpClient.post<Defi>(this.url+'defis/create/', defiPost,{headers:{Authorization:token}}) );
    // return await lastValueFrom( this.httpClient.post<Defi>(this.url+'defis/create/', defi,{headers:{Authorization:token}}) );
  }

  async deleteChami(userId: string): Promise<unknown> {
    return await lastValueFrom(this.httpClient.delete(this.url+'chamis/'+userId));
  }

  async deleteDefi(defiId: string): Promise<unknown> {
    return await lastValueFrom(this.httpClient.delete(this.url+'defis'+defiId));
  }

  async getChamiByEmail(chamiEmail: string, token: string): Promise<Chami[]> {
    return await lastValueFrom(this.httpClient.get<Chami[]>(this.url+'chamis/mail/', {headers: new HttpHeaders({Authorization: token}),params:{email:chamiEmail}}));
  }

}
