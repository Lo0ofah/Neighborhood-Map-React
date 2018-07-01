import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

class Map extends Component{

    state = {
        map: {},
        markers: [],
        allData:[]
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

    populateInfoWindow = (marker,infowindow,data) => {
 // Check to make sure the infowindow is not already opened on this marker.
 if (infowindow.marker !== marker) {
   infowindow.marker = marker;
      // console.log(data.response.venues[0].name)
 //infowindow.setContent('<div>' + marker.title + '</div>');
 infowindow.setContent('<div>' + data.name + '</div>');

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
    let infowindow = new window.google.maps.InfoWindow();
    var bounds = new window.google.maps.LatLngBounds();
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
         console.log("data in state"+ self.state.allData[i])
         self.markerInfoWidow(this, infowindow, self.state.allData[i]);
       });
      this.state.markers.push(marker);
      bounds.extend(marker.position);
    }
    this.state.map.fitBounds(bounds);

  }

  markerInfoWidow = (marker,infowindow,data) => {
  this.populateInfoWindow(marker,infowindow,data);
}



  componentDidMount(){
  const allLocation = this.props.allLocation;
  let self = this;
  for (var  i = 0; i < allLocation.length; i++){
    var clientId = "WJOXEMGT5VVXMSSTTIWCXPBC3GVTUQ0CU02X1NLZU3YIKQ5W";
    var clientSecret = "SMQHCSS1STWQTO0XIG15V4YFSZBTIGJA50ZT42KPSDOPDK0T";
    var request = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20180323&ll=" + allLocation[i].location.lat+','+allLocation[i].location.lng + "&limit=1";
      fetch(request).then(function (response) {
        if (response.status !== 200) {
          console.log("Sorry there is no data ")
                return;
              }
                response.json().then(function (data){
                  self.state.allData.push(data.response.venues[0].name);
                  console.log("in state josn "+  self.state.allData[i])
                  console.log("data in json "+data.response.venues[0].name)
                });

      });

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
