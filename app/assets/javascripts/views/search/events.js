Nebulr.Views.EventMapShow = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  initialize: function (options) {
    this._markers = {};
    this._infoWindows = {};
    this.filterData = options.filterData;
    this.listenTo(this.collection, "add", this.addMarker);
    this.listenTo(this.collection, "remove", this.removeMarker);
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
          return "https://s3-us-west-1.amazonaws.com/nebulr/ss_map_vert" +
                 "/tile_" + zoom + "_" + coord.x + "-" +
                 coord.y + ".png";
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 5,
      minZoom: 1,
      name: "Solar System"
    };

    var centerLat = 0; var centerLng = 0;
    if (this.filterData['center_lat']) {
      centerLat = this.filterData['center_lat'];
      centerLng = this.filterData['center_lng'];
      delete this.filterData['center_lat'];
      delete this.filterData['center_lng'];
    }

    var zoom = 3;
    if (this.filterData['zoom'] || this.filterData['zoom'] === 0) {
      zoom = this.filterData['zoom'];
      delete this.filterData['zoom'];
    }

    var mapOptions = {
      center: { lat: centerLat, lng: centerLng},
      zoom: zoom,
      streetViewControl: false,
      backgroundColor: "#222222",
      mapTypeControlOptions: {
        mapTypeIds: ["solarSystem"]
      }
    };

    var solarSystemMapType = new google.maps.ImageMapType(solarSystemTypeOptions);
    this._map = new google.maps.Map(this.el, mapOptions);
    this._map.mapTypes.set('solarSystem', solarSystemMapType);
    this._map.setMapTypeId('solarSystem');

    this.strictBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-85, -180),
      new google.maps.LatLng(85, 180)
    );

    this.collection.each(this.addMarker.bind(this));
    this.attachMapListeners();
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'idle', this.search.bind(this));
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
      id: mission.id,
      animation: google.maps.Animation.DROP,
      icon: "https://www.filepicker.io/api/file/0Eu5gpIQRLyzHw77TiQK"
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    this._markers[mission.id] = marker;
  },

  search: function () {
    this.checkBounds();

    this.filterData = $.extend(this.filterData, {
      min_lat: this.min_lat, max_lat: this.max_lat,
      min_lng: this.min_lng, max_lng: this.max_lng
    });

    this.collection.fetch({
      data: { search: this.filterData }
    });
  },

  removeMarker: function (mission) {
    var marker = this._markers[mission.id];
    marker.setMap(null);
    delete this._markers[mission.id];
  },

  showMarkerInfo: function (event, marker) {
    // This event will be triggered when a marker is clicked. Right now it simply
    // opens an info window with the title of the marker. However, you could get
    // fancier if you wanted (maybe use a template for the content of the window?)
    var infoWindow;

    var mission = this.collection.get(marker.id);
    var thumbnail = "https://www.filepicker.io/api/file/UuGSt7rqR4aVqjX5K54S";
    if (mission.images().length > 0) {
      thumbnail = mission.images().first().get('filepicker_url');
    }
    var leaderThumbnail = "https://www.filepicker.io/api/file/SRJoNkGaS06HpHc1mZpg";
    if (mission.leader().get('filepicker_url')) {
      leaderThumbnail = mission.leader().get('filepicker_url');
    }
    var compensation = 0;
    if (mission.get('compensation')) {
      compensation = mission.get('compensation');
    }

    $missionDiv = $('<div class="mission-window">');
    $missionDiv.html(JST['mission/index_item']({
      mission: mission,
      thumbnail: thumbnail,
      leaderThumbnail: leaderThumbnail,
      compensation: compensation
    }));

    if (!this._infoWindows[marker.title]) {
      infoWindow = new google.maps.InfoWindow({
        content: $missionDiv.html(),
        maxWidth: 200,
        backgroundColor: "#222222"
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
  },



  checkBounds: function () {
    var currentBounds = this._map.getBounds();
    if (currentBounds == null) return;

    var allowed_ne_lng = this.strictBounds.getNorthEast().lng();
    var allowed_ne_lat = this.strictBounds.getNorthEast().lat();
    var allowed_sw_lng = this.strictBounds.getSouthWest().lng();
    var allowed_sw_lat = this.strictBounds.getSouthWest().lat();

    var wrap;
    var cc = this._map.getCenter();
    var centerH = false;
    var centerV = false;

    // Check horizontal wraps and offsets
    if ( currentBounds.toSpan().lng() > this.strictBounds.toSpan().lng() ) {
        centerH = true;
    } else {  // test positive and negative wrap respectively
      wrap = currentBounds.getNorthEast().lng() < cc.lng();
      this.max_lng = !wrap ?  currentBounds.getNorthEast().lng() : allowed_ne_lng + (currentBounds.getNorthEast().lng() + 180)  + (180 - allowed_ne_lng);
      wrap = currentBounds.getSouthWest().lng() > cc.lng();
      this.min_lng = !wrap ?  currentBounds.getSouthWest().lng() : allowed_sw_lng - (180 - currentBounds.getSouthWest().lng()) - (allowed_sw_lng+180);
    }


    // Check vertical wraps and offsets
    if ( currentBounds.toSpan().lat() > this.strictBounds.toSpan().lat() ) {
        centerV = true;
    } else { // test positive and negative wrap respectively
      wrap = currentBounds.getNorthEast().lat() < cc.lat();
      this.max_lat = !wrap ? currentBounds.getNorthEast().lat()  : allowed_ne_lat + (currentBounds.getNorthEast().lat() + 100) + (100 - allowed_ne_lat);
      wrap = currentBounds.getSouthWest().lat() > cc.lat();
      this.min_lat = !wrap ?  currentBounds.getSouthWest().lat() : allowed_sw_lat - (100 - currentBounds.getSouthWest().lat()) - (allowed_sw_lat + 100);
    }
  }
});
