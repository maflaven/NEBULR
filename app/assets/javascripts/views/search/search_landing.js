Nebulr.Views.SearchLanding = Backbone.View.extend({
  template: JST['search/landing'],
  className: 'search-landing row',

  initialize: function (options) {
    this.filterData = options.filterData;
    this.ssObjects = {
      'sun': [82, 0], 'mercury': [64, 0], 'venus': [60.4, 0],
      'earth': [55.67, 0], 'moon': [55.67, -7.33], 'mars': [51, 0],
      'jupiter': [15.1, 0], 'saturn': [-43.7, 0], 'uranus': [-67.2, 0],
      'neptune': [-75.6, 0], 'solar-system': [0, 0]
    }
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
      delete data['ss-object'];
    }
    this.filterData = $.extend(this.filterData, data);

    if (!this.filterData['min_date'] || !this.filterData['max_date']) {
      delete this.filterData['min_date']; delete this.filterData['max_date'];
    }

    Backbone.history.navigate('#/missions/search', { trigger: true });
  }
});
