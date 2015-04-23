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
          return "http://googledrive.com/host/0B87UzFwwOBvxflZwTGZhc3IzUjJNUjZYQUVUWnJoUUotdU0tNmczYjN2UUhLOS01amo1Umc" +
                 "/tile_" + zoom + "_" + coord.x + "-" +
                 coord.y + ".png";
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 5,
      minZoom: 0,
      radius: 1738000,
      name: "Solar System"
    };

    var mapOptions = {
      center: { lat: 0, lng: 0},
      zoom: 3,
      streetViewControl: false,
      backgroundColor: 'black',
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

  // Normalizes the coords that tiles repeat across the x axis (horizontally)
  // like the standard Google map tiles.
  getNormalizedCoord: function (coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
      return null;
    }

    // repeat across x-axis
    if (x < 0 || x >= tileRange) {
      x = (x % tileRange + tileRange) % tileRange;
    }

    return {
      x: x,
      y: y
    };
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
      animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    this._markers[mission.id] = marker;
  },

  search: function () {
    var mapBounds = this._map.getBounds();
    var ne = mapBounds.getNorthEast();
    var sw = mapBounds.getSouthWest();

    this.filterData = $.extend(this.filterData, {
      min_lat: sw.lat(), max_lat: ne.lat(),
      min_lng: sw.lng(), max_lng: ne.lng()
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
    $missionDiv = $('<div class="mission-window">');
    $missionDiv.html(JST['mission/index_item']({
      mission: mission,
      thumbnail: thumbnail
    }));

    if (!this._infoWindows[marker.title]) {
      infoWindow = new google.maps.InfoWindow({
        content: $missionDiv.html(),
        maxWidth: 200
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
