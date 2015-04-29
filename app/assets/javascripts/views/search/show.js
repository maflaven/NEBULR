Nebulr.Views.MissionSearchShow = Backbone.View.extend({
  template: JST['search/show'],

  className: 'full-size row',

  initialize: function (options) {
    this.filterData = options.filterData;
    this.mapView = new Nebulr.Views.EventMapShow({
      collection: this.collection,
      filterData: this.filterData
    });

    this.missionIndex = new Nebulr.Views.MissionIndex({
      collection: this.collection,
      itemSize: 6
    });

    this.filterView = new Nebulr.Views.SearchFilter({
      collection: this.collection,
      filterData: this.filterData
    });
  },

  events: {
    // 'click a.remove-listing': 'destroyListing',
    'click li.mission-index-li > div': 'panToListing',
    'mouseenter li.mission-index-li > div': 'startBounce',
    'mouseleave li.mission-index-li > div': 'stopBounce'
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

  destroyListing: function (event) {
    var missionId = $(event.currentTarget.parentElement).data('mission-id');
    var listing = this.collection.get(missionId);
    listing.destroy();
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
    this.$('.filter').html(this.filterView.render().$el);
    this.$('.filtered-mission-index').html(this.missionIndex.render().$el);
    this.$('.map').html(this.mapView.$el);
    this.mapView.render();
    return this;
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.mapView.remove();
    this.missionIndex.remove();
    this.filterView.remove();
    $.each(this.filterData, function (key, value) {
      this.filterData[key] = undefined;
    }.bind(this));
  }
});
