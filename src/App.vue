
<template>
  <div class="container">
    <gmap-map id="map"
        :center="{lat:48.137154, lng:11.576124}"
        :zoom="14"
        ref="map" 
        @idle="filterMarkers()"
    >
    <div>
      <gmap-marker
        v-for="(marker,key) in receivedDataArray"
        :key="key"
        :position="marker.location"
        :clickable="true"
        @click="toggleInfo(marker, key)"
        :icon="changeIcon(key)"
      >
      </gmap-marker>
    </div>  
    </gmap-map>
    <div v-if="infoOpened" id="sidebar">
      <div class="adress-time-container">
        <fetch-address
          v-bind:receivedName = 'receivedName'
          v-bind:receivedAddress = 'receivedAddress'
          v-bind:receivedCity = 'receivedCity'
          v-bind:receivedCounty = 'receivedCounty'
        ></fetch-address>
        <opening-hours></opening-hours>
      </div>
      <div class="weather-container">
        <h4 class="weather-title">Weather</h4>
        <weather-forecast
          :key="weatherKey"
          v-bind:weather = 'weather'
        ></weather-forecast>
      </div> 
    </div>  
  </div> 
</template>

<script>
import axios from 'axios'
import OpeningHours from './components/OpeningHours.vue'
import WeatherForecast from './components/WeatherForecast.vue'
import FetchAddress from './components/FetchAddress.vue'

export default {
  name: 'App',

  components: {
    OpeningHours,
    WeatherForecast,
    FetchAddress
  },

  data() {
    return {
      map: null,
      receivedData: [],
      receivedName: '',
      receivedAddress: '',
      receivedCity: '',
      receivedCounty: '',
      infoCurrentKey: '',
      infoOpened: false,
      iconNormal: { url: require('./assets/ic_pin_normal.png')},
      iconActive: { url: require('./assets/ic_pin_active.png')},
      selectedKey: '',
      weather: '',
      weatherKey: 0,
      receivedDataArray: []
    }
  },

  mounted: function() {
      this.geolocation();
  },
  
  methods: {
    geolocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    filterMarkers(){
      let bounds = this.$refs.map.$mapObject.getBounds();
      let ne = bounds.getNorthEast();
      let sw = bounds.getSouthWest();

      let neLat = ne.lat();
      let neLng = ne.lng();
      let swLat = sw.lat();
      let swLng = sw.lng();

      axios.get(`https://interview.superology.dev/betshops?boundingBox=${neLat},${neLng},${swLat},${swLng}`)
        .then((res) => {
          for( let i = 0; i < res.data.betshops.length; i++) {
            this.receivedDataArray.push(res.data.betshops[i]);
          }
        })
        .catch((error) => console.error(error));
    },

    callWeather(marker) {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${marker.location.lat}&lon=${marker.location.lng}&units=metric&appid=988433af8ef3d684a4a72152a6574c21`)
        .then((res) => {
            this.weather = res.data.list;
            this.weatherKey += 1;   
        })
        .catch((error) => console.error(error));    
    },

    toggleInfo(marker, key) {
      this.receivedName = marker.name;
      this.receivedAddress = marker.address;
      this.receivedCity = marker.city;
      this.receivedCounty = marker.county;
      this.lat = marker.location.lat;
      this.lng = marker.location.lng;

      if (this.infoCurrentKey === key) {
          this.infoOpened = !this.infoOpened;
      } else {
          this.infoOpened = true;
          this.infoCurrentKey = key;
      }

      this.callWeather(marker)
    },
    
    changeIcon(key) {
      return (this.infoCurrentKey === key) ? this.iconActive : this.iconNormal;
    },
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap');  

  * {
    padding: 0;
    margin: 0;
    box-shadow: border-box;
  }

  .container {
    display: flex;
  }

  #map {
    width: 400px;
    min-height: 575px;
    border: 2px solid #fff;
    box-shadow: rgb(0 0 0 / 35%) 0px 1px 11px;
  }

  #sidebar {
    width: 215px;
    margin-left: 15px;
    color: #6e6e6e;
  }

  .weather-title {
    text-align: center;
    padding: 11px 0;
    background-color: #ffffff;
    font-weight: 600;
    color: #6e6e6e;
  }

  .adress-time-container {
    padding: 22px 18px;
    background-color: #ffffff;
    box-shadow: rgb(0 0 0 / 35%) 0px 1px 11px;
  }

  .weather-container {
    margin-top: 15px;
    background-color: #ffffff;
    box-shadow: rgb(0 0 0 / 35%) 0px 1px 11px;
  }

  @media (max-width: 780px) { 
        .container {
            flex-direction: column;
        }

        #map { 
          width: unset;
        }

        #sidebar {
          width: 100%;
          margin-left: 0;
          margin-top: 15px;
        }
    }
</style>


