import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

class Map extends Component{

    state = {
        map : {}
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
      console.log("erorrrr in loading map");
      this.props.onError();
    }
  }
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
