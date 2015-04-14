Nebulr.Views.MissionLocationShow = Backbone.View.extend({
  template: JST['search/location'],

  className: 'full-size',

  initialize: function () {
    this.mapView = new Nebulr.Views.EventMapLocationShow({
      model: this.model,
    });
  },

  events: {
    'click li.mission-index-li > div': 'panToListing',
  },

  // Event handlers
  startBounce: function (event) {
    var missionId = $(event.currentTarget.parentElement).data('mission-id');
    this.mapView.startBounce(missionId);
  },

  stopBounce: function (event) {
    var missionId = $(event.currentTarget.parentElement).data('mission-id');
    this.mapView.stopBounce(missionId);
  },

  panToListing: function (event) {
    var missionId = $(event.currentTarget.parentElement).data('mission-id');
    var marker = this.mapView._markers[missionId];
    this.mapView._map.panTo(marker.getPosition());
  },

  render: function () {
    // Because we render the `mapView` here, we MUST NOT re-render this view.
    var content = this.template();
    this.$el.html(content);
    this.$('.map').html(this.mapView.$el);
    this.mapView.render();
    return this;
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.mapView.remove();
  }
});
