import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
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

  async addChami(userId: string, chami: Chami, token: string): Promise<unknown> {
    return await lastValueFrom(this.httpClient.post(this.url+'chamis/'+userId, chami, {headers:{Authorization:token}}));
  }

  async addDefi(defiId:string, defi: Defi): Promise<unknown> {
    return await lastValueFrom(this.httpClient.post(this.url+'defis/'+defiId, defi));
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
