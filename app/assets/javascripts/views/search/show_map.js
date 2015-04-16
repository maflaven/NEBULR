Nebulr.Views.MissionMapShow = Backbone.View.extend({
  template: JST['search/location'],

  className: 'full-size',

  initialize: function () {
    this.mapView = new Nebulr.Views.EventMapMissionShow({
      model: this.model,
    });
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
