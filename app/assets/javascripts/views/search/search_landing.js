Nebulr.Views.SearchLanding = Backbone.View.extend({
  template: JST['search/landing'],
  className: 'search-landing',

  initialize: function (options) {
    this.filterData = options.filterData;
    this.ssObjects = {
      'sun': [82, 0, 0], 'mercury': [64, 0, 5], 'venus': [60.4, 0, 5],
      'earth': [55.67, 0, 5], 'moon': [55.67, -7.33, 5], 'mars': [51, 0, 5],
      'jupiter': [15.1, 0, 2], 'saturn': [-43.7, 0, 1], 'uranus': [-67.2, 0, 3],
      'neptune': [-75.6, 0, 3]
    };
  },

  events: {
    'click #search-btn': 'search'
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  search: function (event) {
    event.preventDefault();
    var data = this.$('.mission-search').serializeJSON();

    if (data['ss-object']) {
      var object = data['ss-object'];
      data['center_lat'] = this.ssObjects[object][0];
      data['center_lng'] = this.ssObjects[object][1];
      data['zoom'] = this.ssObjects[object][2];
      delete data['ss-object'];
    }
    this.filterData = $.extend(this.filterData, data);

    if (!this.filterData['min_date'] || !this.filterData['max_date']) {
      delete this.filterData['min_date']; delete this.filterData['max_date'];
    }

    Backbone.history.navigate('#/missions/search', { trigger: true });
  }
});
