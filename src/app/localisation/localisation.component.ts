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

  marker : L.Marker;
  constructor() {
    this.marker = L.marker([0,0]);
  }
  ngOnInit(): void {

    let map = L.map('map')

    const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(map);
    
        
    
    map.locate({setView: true, 
                 maxZoom: 16, 
                 watch:true
               });
    
    const onLocationFound = (e: { accuracy: number; latlng: L.LatLngExpression; }) => {
        map.removeLayer(this.marker);
        this.marker = new L.Marker(e.latlng, {draggable:true});
        map.addLayer(this.marker);
    }
    
    map.on('locationfound', onLocationFound);
    
    }



  /*
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

    navigator.permissions.query({name:'geolocation'})
      .then((result)=>{
        if(result.state === "granted"){




          let marker: L.Layer;
          navigator.geolocation.watchPosition((position) => {
            map.removeLayer(marker);
            marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindTooltip("Ma position", {permanent: true, direction: 'top'});
          
          
          
          
          
          }, (error) => {
            console.log('System/OS services disabled', navigator);
          },
          this.option);
        }
        else
        {
          console.log('Browser location services disabled', navigator);
        }
      },
      (error) => {
        console.log('Browser permissions services unavailable', navigator);
      }
      );

  }
*/
}
