import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Chami {
  readonly login: string;
  readonly age: number;
  readonly defis: Defi[];
  readonly email: string;
}

export interface Defi {

  readonly id: string;
  readonly titre: string;
  readonly dateDeCreation: string;
  readonly description: string;
  readonly auteur: Chami;
}

@Injectable({
  providedIn: 'root'
})
export class CyberchamisService {

  constructor(private httpClient: HttpClient) { }

  private url = environment.apiUrl;

  addChami(userId: string, chami: Chami, token: string): Observable<any> {
    let toto = this.httpClient.post(this.url+'chamis/'+userId, chami, {headers:{Authorization:token}});
    return toto
  }

  addDefi(defiId:string, defi: Defi): Observable<Defi> {
    return this.httpClient.post<Defi>(this.url+'defis/'+defiId, defi);
  }

  deleteChami(userId: string): Observable<unknown> {
    return this.httpClient.delete(this.url+'chamis/'+userId);
  }

  deleteDefi(defiId: string): Observable<unknown> {
    return this.httpClient.delete(this.url+'defis'+defiId);
  }

  getChamiByEmail(chamiEmail: string, token: string): Observable<Chami[]> {
    return this.httpClient.get<Chami[]>(this.url+'chamis/mail/', {headers: new HttpHeaders({Authorization: token}),params:{email:chamiEmail}});
  }

}
