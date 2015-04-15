Nebulr.Views.EventMapMissionShow = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  initialize: function (options) {
    this._markers = {};
    this._infoWindows = {};
    this.filterData = options.filterData;
  },

  render: function () {
    var mapOptions = {
      center: { lat: this.model.get('latitude'), lng: this.model.get('longitude') },
      zoom: 5
    };

    this._map = new google.maps.Map(this.el, mapOptions);

    this.addMarker(this.model);
  },

  // Event handlers
  addMarker: function (mission) {
    if (this._markers[mission.id]) { return; }
    var view = this;

    var latLng = new google.maps.LatLng(
      mission.get('latitude'),
      mission.get('longitude')
    );

    var locationString = (mission.get('latitude').toString()) + ', ' +
     (mission.get('longitude').toString());

    var marker = new google.maps.Marker({
      position: latLng,
      map: this._map,
      title: locationString,
      animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    this._markers[mission.id] = marker;
  },

  updateMission: function (event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    this.model.set({
      latitude: lat,
      longitude: lng
    });
  },

  removeMarker: function (mission) {
    var marker = this._markers[mission.id];

    if (marker) {
      marker.setMap(null);
      delete this._markers[mission.id];
    }
  },

  showMarkerInfo: function (event, marker) {
    // This event will be triggered when a marker is clicked. Right now it simply
    // opens an info window with the title of the marker. However, you could get
    // fancier if you wanted (maybe use a template for the content of the window?)
    var infoWindow;

    if (!this._infoWindows[marker.title]) {
      infoWindow = new google.maps.InfoWindow({
        content: marker.title
      });
      this._infoWindows[marker.title] = infoWindow;
    } else {
      infoWindow = this._infoWindows[marker.title];
    }

    infoWindow.open(this._map, marker);
  },

  startBounce: function (id) {
    var marker = this._markers[id];
    marker.setAnimation(google.maps.Animation.BOUNCE);
    },

  stopBounce: function (id) {
    var marker = this._markers[id];
    marker.setAnimation(null);
  }
});
