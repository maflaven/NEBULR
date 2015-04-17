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
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167},
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    var that = this;
    // var moonTypeOptions = {
    //   getTileUrl: function(coord, zoom) {
    //       var normalizedCoord = that.getNormalizedCoord(coord, zoom);
    //       if (!normalizedCoord) {
    //         return null;
    //       }
    //       var bound = Math.pow(2, zoom);
    //       return "http://mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw" +
    //           "/" + zoom + "/" + normalizedCoord.x + "/" +
    //           (bound - normalizedCoord.y - 1) + ".jpg";
    //   },
    //   tileSize: new google.maps.Size(256, 256),
    //   maxZoom: 9,
    //   minZoom: 0,
    //   radius: 1738000,
    //   name: "Moon"
    // };

    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167},
      zoom: 7,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ["moon"]
      }
    };

    // var moonMapType = new google.maps.ImageMapType(moonTypeOptions);
    // this._map = new google.maps.Map(this.el, mapOptions);
    // this._map.mapTypes.set('moon', moonMapType);
    // this._map.setMapTypeId('moon');

    this._map = new google.maps.Map(this.el, mapOptions);

    this.collection.each(this.addMarker.bind(this));
    this.attachMapListeners();
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'idle', this.search.bind(this));
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
