Nebulr.Views.MissionIndexSearch = Backbone.View.extend({
  template: JST['mission/index_search'],
  className: 'mission-index-search',

  initialize: function (options) {
    this.collection = options.collection;

    this.ssObjectBounds = {
      'solar-system': {'min_lat': -85, 'max_lat': 85, 'min_lng': -180, 'max_lng': 180},
      'sun': {'min_lat': 70, 'max_lat': 85, 'min_lng': -180, 'max_lng': 180},
      'mercury': {'min_lat': 63.6, 'max_lat': 64.6, 'min_lng': -3.34, 'max_lng': -1.19},
      'venus': {'min_lat': 59.06, 'max_lat': 61.75, 'min_lng': -4.8, 'max_lng': 0.66},
      'earth': {'min_lat': 54.06, 'max_lat': 57.28, 'min_lng': -4.97, 'max_lng': 1.01},
      'moon': {'min_lat': 55.18, 'max_lat': 56.14, 'min_lng': -8.13, 'max_lng': -6.46},
      'mars': {'min_lat': 50.12, 'max_lat': 52.02, 'min_lng': -3.74, 'max_lng': -0.74},
      'jupiter': {'min_lat': -16.46, 'max_lat': 42.8, 'min_lng': -31.8, 'max_lng': 30.05},
      'saturn': {'min_lat': -58.7, 'max_lat': -22.59, 'min_lng': -62.05, 'max_lng': -64.16},
      'uranus': {'min_lat': -71.39, 'max_lat': -62.47, 'min_lng': -11.07, 'max_lng': 12.22},
      'neptune': {'min_lat': -78.1, 'max_lat': -72.6, 'min_lng': -10.2, 'max_lng': 12.4}
    };

    this.missionIndexView = new Nebulr.Views.MissionIndex({
      collection: this.collection,
      itemSize: 6
    });
    this.form = $('#mission-title-search');
    this.form.on('submit', this.searchMissions.bind(this));
    $('#ss-object').on('focus', this.searchMissions.bind(this));
    $('#mission-browse').on('click', function () {
      this.render();
      this.searchMissions();
    }.bind(this));
  },

  render: function () {
    this.form.html(this.template());
    this.$el.html(this.missionIndexView.$el);
    return this;
  },

  searchMissions: function (event) {
    if (event) {
      event.preventDefault();
    }
    var data = this.form.serializeJSON();
    if (data['ss-object']) {
      data.min_lat = this.ssObjectBounds[data['ss-object']]['min_lat'];
      data.max_lat = this.ssObjectBounds[data['ss-object']]['max_lat'];
      data.min_lng = this.ssObjectBounds[data['ss-object']]['min_lng'];
      data.max_lng = this.ssObjectBounds[data['ss-object']]['max_lng'];
      delete data['ss-object'];
    }
    this.collection.fetch({
      data: { search: data }
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.form.empty();
    this.missionIndexView.remove();
  }
});
