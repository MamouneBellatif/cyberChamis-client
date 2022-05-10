import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage} from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from'@angular/fire/compat/auth';
import { ListChamisComponent } from './list-chamis/list-chamis.component';
import { ChamiComponent } from './chami/chami.component';
import { DefiComponent } from './defi/defi.component';
import { ListDefisComponent } from './list-defis/list-defis.component';

import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'; 
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ListElementChamiComponent } from './list-element-chami/list-element-chami.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { NewDefiComponent } from './new-defi/new-defi.component';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { EtapeComponent } from './etape/etape.component';
import { NotificationComponentComponent } from './notification-component/notification-component.component';
import { NewEtapeComponent } from './new-etape/new-etape.component';
import { EditDefiComponent } from './edit-defi/edit-defi.component';
import { PlayComponent } from './play/play.component';
import { VisiteListComponent } from './visite-list/visite-list.component';
import { IndiceComponent } from './indice/indice.component';
import { UpdDelDefiComponent } from './upd-del-defi/upd-del-defi.component';
import { UpdateDefiComponent } from './update-defi/update-defi.component';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { UploadComponent } from './upload/upload.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ListChamisComponent,
    ChamiComponent,
    DefiComponent,
    ListDefisComponent,
    ListElementChamiComponent,
    LocalisationComponent,
    NewDefiComponent,
    NewEtapeComponent,
    EtapeComponent,
    NotificationComponentComponent,
    EditDefiComponent,
    PlayComponent,
    VisiteListComponent,
    IndiceComponent,
    UpdDelDefiComponent,
    UpdateDefiComponent,
    UploadComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    LeafletModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    provideDatabase(() => getDatabase()),
    MdbCarouselModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
