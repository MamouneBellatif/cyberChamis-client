import { JsonPipe } from '@angular/common';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { defaultStorageInstanceFactory } from '@angular/fire/storage/storage.module';
import { Chami, Defi} from './cyberchamis.service';

@Injectable({
  providedIn: 'root'
})
export class ParseurRequeteurService {

  constructor() { }

  parseChamis(json: string) : Chami[] {
    return JSON.parse(json);
  }

  parseDefis(json: string) : Defi[] {
    let defis = JSON.parse(json);
    let defis2: Defi[] = defis.map((defi: { 
      id: string; 
      titre: string; 
      dateDeCreation: string; 
      description: string; 
      auteur: string; 
    }) => {
      return {
        id: defi.id,
        titre: defi.titre,
        dateDeCreation: new Date(defi.dateDeCreation),
        description: defi.description,
        auteur: defi.auteur
      }
    })
    return defis2;
  }

  stringifyChamis(chamis: Chami[]) : string {
    return JSON.stringify(chamis);
  }

  stringifyDefis(defis: Defi[]) : string {
    return JSON.stringify(defis);
  }
}
