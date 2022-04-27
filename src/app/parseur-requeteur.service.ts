import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { defaultStorageInstanceFactory } from '@angular/fire/storage/storage.module';
import { Chami, Defi, ListChamis, ListDefis } from './cyberchamis.service';

@Injectable({
  providedIn: 'root'
})
export class ParseurRequeteurService {

  constructor() { }

  parseChamis(json: string) : ListChamis {
    return JSON.parse(json);
  }

  parseDefis(json: string) : ListDefis {
    return JSON.parse(json);
  }

  parseDefis2(json: string) : ListDefis {
    let defis = JSON.parse(json);
    defis.map(defi => {
      
    })
    return defis;
  }

  stringifyChamis(chamis: ListChamis) : string {
    return JSON.stringify(chamis);
  }

  stringifyDefis(defis: ListDefis) : string {
    return JSON.stringify(defis);
  }
}
