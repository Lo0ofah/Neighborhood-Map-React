import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

class Map extends Component{

    state = {
        map: {},
        markers: []
     }


  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
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
      this.props.onError();
    }
  }
}

    populateInfoWindow = (marker, infowindow) => {
 // Check to make sure the infowindow is not already opened on this marker.
 if (infowindow.marker !== marker) {
   infowindow.marker = marker;
   infowindow.setContent('<div>' + marker.title + '</div>');
   infowindow.open(this.state.map, marker);
   // Make sure the marker property is cleared if the infowindow is closed.
   infowindow.addListener('closeclick',function(){
     infowindow.setMarker = null;
   });
 }
}

  componentDidUpdate(){
    const allLocation = this.props.allLocation;
    let self = this;
    var bounds = new window.google.maps.LatLngBounds();
    var largeInfowindow = new window.google.maps.InfoWindow();
    for (var  i = 0; i < allLocation.length; i++){
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
       self.populateInfoWindow(this, largeInfowindow);
      });
      this.state.markers.push(marker);
      bounds.extend(marker.position);
    }
    this.state.map.fitBounds(bounds);

  }

  render() {
    return (
    <div className="map-container" id="map"> </div>
    )
  }
}

export default scriptLoader(
  ["https://maps.googleapis.com/maps/api/js?key=AIzaSyAL1FvCDoe6-jmdlGkTrz7ZRsGZqdRJV94&v=3"]
)(Map)
