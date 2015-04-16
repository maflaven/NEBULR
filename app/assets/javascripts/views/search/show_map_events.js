Nebulr.Views.EventMapMissionShow = Backbone.View.extend({
  className: 'full-size',

  initialize: function (options) {
    this._markers = {};
    this._infoWindows = {};
    this.filterData = options.filterData;
  },

  render: function () {
    var mapOptions = {
      center: { lat: this.model.get('latitude'), lng: this.model.get('longitude') },
      zoom: 5,
      draggable: false,
      disableDoubleClickZoom: true,
      overviewMapControl: false,
      overviewMapControlOptions: false,
      scrollwheel: false
    };

    this._map = new google.maps.Map(this.el, mapOptions);

    this.addMarker(this.model);

    return this;
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

    this._markers[mission.id] = marker;
  }
});
