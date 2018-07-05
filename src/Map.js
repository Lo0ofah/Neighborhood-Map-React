import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

class Map extends Component{

    state = {
        map: {},
        successfulMapLoaded:true,
        markers: [],
        allInfoWindow:[]
     }

/*
in componentWillReceiveProps
 recive the google map API
  check if the reqest was Succeed
  then setting map and  load it
*/
  componentWillReceiveProps = ({ isScriptLoaded, isScriptLoadSucceed }) => {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        console.log("map loaded successfully");
        const mapload = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 21.485811, lng: 39.1925048},
          zoom: 13
        });
      this.setState({map:mapload});
    }
    else {
      console.log("erorr in loading map");
      this.setState({successfulMapLoaded:false});
    }
  }
}
/*
in componentDidMount
reqest data for the locations by foursquare API
*/
componentDidMount =() => {
  const allLocation = this.props.allLocation;
  for (let  i = 0; i < allLocation.length; i++){
    var clientId = "WJOXEMGT5VVXMSSTTIWCXPBC3GVTUQ0CU02X1NLZU3YIKQ5W";
    var clientSecret = "SMQHCSS1STWQTO0XIG15V4YFSZBTIGJA50ZT42KPSDOPDK0T";
    var request = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20180323&ll=" + allLocation[i].location.lat+','+allLocation[i].location.lng + "&limit=1";

    fetch(request).then(function (response) {
      if (response.status !== 200) {
          allLocation[i].data = "There is no data";
          return;
      }
      response.json().then(function (data){
            allLocation[i].data = data.response.venues[0];
      });
    });
  }
}

/*
in componentDidUpdate
create markers and infowindows foe the location
*/
  componentDidUpdate =() => {
    if(this.state.successfulMapLoaded){
    this.clearMarker();
    this.clearInfoWindow();
    const allLocation = this.props.allLocation;
    let self = this;
    let infowindow = new window.google.maps.InfoWindow();
    var bounds = new window.google.maps.LatLngBounds();
    for (let  i = 0; i < allLocation.length; i++){
      var position = allLocation[i].location;
      var title = allLocation[i].title;
      var marker = new window.google.maps.Marker({
        map: this.state.map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: i
      });
       marker.addListener('click', function() {
            self.markerInfoWidow(this, infowindow, allLocation[i].data.name);
       });
      this.state.markers.push(marker);
      bounds.extend(marker.position);
    }
    this.state.map.fitBounds(bounds);

    if(this.props.selectedItem){
      this.openSelectedInfowindow(infowindow);
    }
  }
}
/*
in markerInfoWidow
set infowindow and data for specific marker
*/
  markerInfoWidow = (marker,infowindow,data) => {
    this.clearInfoWindow();
    this.markerAnimation(marker);
    this.setContentInfoWindow(marker,infowindow,data);
  }

/*
setContentInfoWindow
set the content of the InfoWindow
*/
  setContentInfoWindow = (marker,infowindow,data) => {
  // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + data + '</div>');
      infowindow.open(this.state.map, marker);
  // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
      });
    }
    this.state.allInfoWindow.push(infowindow);
  }

/*
markerAnimation
set the Animation for the markers
*/
  markerAnimation = (marker) => {
    if(marker){
      if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
      } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function(){ marker.setAnimation(null); }, 2000);
        }
      }
    }

/*clearArray
method to clear array*/
    clearArray = (array) => {
      while(array.length > 0) {
        array.pop();
      }
    }

/*
    clearMarker
    close all opened marker and clear the marker array
*/
    clearMarker =  () => {
      for(let marker of this.state.markers){
        marker.setMap(null);
      }
        this.clearArray(this.state.markers)
    }

/*
clearInfoWindow
close all opened InfoWindow and clear the InfoWindow array
*/
    clearInfoWindow = () => {
      for(let infoWindow of this.state.allInfoWindow){
        infoWindow.close();
      }
      this.clearArray(this.state.allInfoWindow)
    }

/*
openSelectedInfowindow
to open the Infowindow when clicked on the list view
*/
  openSelectedInfowindow = (infowindow) => {
    let selectedMarker =  this.state.markers.filter((marker)=>{ return marker.title === this.props.selectedItem})
    let selectedLocation =  this.props.allLocation.filter((location)=>{ return location.title === this.props.selectedItem})
    if(selectedMarker && selectedMarker[0] && selectedLocation && selectedLocation[0]){
      this.markerInfoWidow(selectedMarker[0], infowindow, selectedLocation[0].data.name);
    }
  }


  render() {
    return (
        this.state.successfulMapLoaded ?(<div className="map-container" id="map" role="application" tabIndex="-1" ></div>) : (<div className="mapError-container" role="application" tabIndex="-1" >Error  in loading map</div>)
    )
  }
}



export default scriptLoader(
  ["https://maps.googleapis.com/maps/api/js?key=AIzaSyAL1FvCDoe6-jmdlGkTrz7ZRsGZqdRJV94&v=3"]
)(Map)
