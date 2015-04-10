Nebulr.Views.MissionSearchShow = Backbone.CompositeView.extend({
  template: JST['search/show'],

  className: 'full-size row',

  initialize: function () {
    this.mapView = new Nebulr.Views.EventMapShow({
      collection: this.collection
    });

    this.missionIndex = new Nebulr.Views.MissionIndex({
      collection: this.collection,
      itemSize: 4
    });
  },

  events: {
    'click a.remove-listing': 'destroyListing',
    'click a.listing-name': 'panToListing',
    'mouseenter a.listing-name': 'startBounce',
    'mouseleave a.listing-name': 'stopBounce'
  },

  // Event handlers
  startBounce: function (event) {
    var missionId = $(event.currentTarget).data('mission-id');
    this.mapView.startBounce(missionId);
  },

  stopBounce: function (event) {
    var missionId = $(event.currentTarget).data('mission-id');
    this.mapView.stopBounce(missionId);
  },

  destroyListing: function (event) {
    var missionId = $(event.currentTarget).data('mission-id');
    var listing = this.collection.get(missionId);
    listing.destroy();
  },

  panToListing: function (event) {
    var missionId = $(event.currentTarget).data('mission-id');
    var marker = this.mapView._markers[missionId];
    this.mapView._map.panTo(marker.getPosition());
  },

  render: function () {
    // Because we render the `mapView` here, we MUST NOT re-render this view.
    var content = this.template();
    this.$el.html(content);
    this.$('.sidebar').html(this.missionIndex.render().$el);
    this.$('.map').html(this.mapView.$el);
    this.mapView.render();
    return this;
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.mapView.remove();
    this.missionIndex.remove();
  }
});
