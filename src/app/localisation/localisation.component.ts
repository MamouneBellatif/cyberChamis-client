import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalisationComponent implements OnInit {

  constructor() {
  }

  option = {
    enableHighAccuracy: true
  };

  ngOnInit(): void {
    let map = L.map('map', {
      center: [45.18680056764414, 5.736371520710951],
      zoom: 15
    });
    let osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 20
  });

    map.addLayer(osmLayer);


    navigator.geolocation.watchPosition((position) => {
      L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindTooltip("Ma position", {permanent: true, direction: 'top'});
    }, null, this.option);
  }

}
