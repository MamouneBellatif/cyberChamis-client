import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import * as L from 'leaflet';
import { Defi } from '../cyberchamis.service';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalisationComponent implements OnInit {

  @Input() listeDefis! : Defi[];

  marker : L.Marker;
  icon!: L.Icon;
  map! : L.Map;
  constructor() {
    this.marker = L.marker([0,0]);
  }
  ngOnInit(): void {

      this.map = L.map('map', {
      center: [45.18680056764414, 5.736371520710951],
      zoom: 16
    });
    let osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 25
  });

  this.map.addLayer(osmLayer);

    /*let map = L.map('map')

    const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(map);*/
    
        
    
    this.map.locate({setView: true, 
                 maxZoom: 20, 
                 watch:true
               });
    
    /*let icon = new L.Icon.Default();
    icon.options.shadowSize = [0,0];*/

    
      this.icon = new L.Icon({
      iconSize: [ 30, 41 ],
      iconAnchor: [ 13, 0 ],
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png'
    });
    const onLocationFound = (e: { accuracy: number; latlng: L.LatLngExpression; }) => {
        this.map.removeLayer(this.marker);
        this.marker = new L.Marker(e.latlng, {draggable:true}).setIcon(this.icon);
        this.map.addLayer(this.marker);
    }
    
    this.map.on('locationfound', onLocationFound);
    
    this.listeDefis.forEach(element => {
      this.addMarker(element.coordonnees);
    });
    }

    addMarker(coordonnees : string){
      coordonnees = coordonnees.replace(' ', '');
      let coord = coordonnees.split(",");
      let lat : number = parseFloat(coord[0]);
      let long : number = parseFloat(coord[1]);
      console.log("lat : " + lat + " et long : " + long);
      let mark = new L.Marker([lat, long], {icon:this.icon});
      this.map.addLayer(mark);
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
      maxZoom: 25
  });

    map.addLayer(osmLayer);

    navigator.permissions.query({name:'geolocation'})
      .then((result)=>{
        if(result.state === "granted"){



            let icon = new L.Icon.Default();
            icon.options.shadowSize = [0,0];
            navigator.geolocation.watchPosition((position) => {
            map.removeLayer(this.marker);
            this.marker = L.marker([position.coords.latitude, position.coords.longitude], {icon : icon}).addTo(map).bindTooltip("Ma position", {permanent: true, direction: 'top'});
          
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
