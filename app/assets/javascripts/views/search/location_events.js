Nebulr.Views.EventMapLocationShow = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  initialize: function (options) {
    this._markers = {};
    this._infoWindows = {};
    this.filterData = options.filterData;
  },

  render: function () {
    var solarSystemTypeOptions = {
      getTileUrl: function(coord, zoom) {
        if (coord.x < 0 || coord.y < 0) {
          return null;
        }
        if ((coord.x > Math.pow(2, zoom) - 1) || (coord.y > Math.pow(2, zoom) - 1)) {
          return null;
        }
        return "http://googledrive.com/host/0B87UzFwwOBvxflZwTGZhc3IzUjJNUjZYQUVUWnJoUUotdU0tNmczYjN2UUhLOS01amo1Umc" +
               "/tile_" + zoom + "_" + coord.x + "-" +
               coord.y + ".png";
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 5,
      minZoom: 1,
      name: "Solar System"
    };

    var mapOptions = {
      center: { lat: 0, lng: 0},
      zoom: 3,
      backgroundColor: 'black',
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ["solarSystem"]
      }
    };

    this.strictBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-85, -180),
      new google.maps.LatLng(85, 180)
    );

    var solarSystemMapType = new google.maps.ImageMapType(solarSystemTypeOptions);
    this._map = new google.maps.Map(this.el, mapOptions);
    this._map.mapTypes.set('solarSystem', solarSystemMapType);
    this._map.setMapTypeId('solarSystem');

    this.addMarker(this.model);
    this.attachMapListeners();
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'click', function (event) {
      this.removeMarker.call(this, this.model);
      this.updateMission.call(this, event);
      this.addMarker.call(this, this.model);
    }.bind(this));
    google.maps.event.addListener(this._map, 'dragend', this.limitExtent.bind(this));
  },

  limitExtent: function () {
    if (this.strictBounds.contains(this._map.getCenter())) return;

    var c = this._map.getCenter(),
        x = c.lng(),
        y = c.lat(),
        maxX = this.strictBounds.getNorthEast().lng(),
        maxY = this.strictBounds.getNorthEast().lat(),
        minX = this.strictBounds.getSouthWest().lng(),
        minY = this.strictBounds.getSouthWest().lat();

    if (x < minX) x = minX;
    if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;

    this._map.setCenter(new google.maps.LatLng(y, x));
  },

  // Event handlers
  addMarker: function (mission) {
    if (this._markers[mission.id]) { return; }
    var view = this;

    var latLng = new google.maps.LatLng(
      mission.get('latitude'),
      mission.get('longitude')
    );

    var marker = new google.maps.Marker({
      position: latLng,
      map: this._map,
      title: mission.get('title'),
      animation: google.maps.Animation.DROP
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
