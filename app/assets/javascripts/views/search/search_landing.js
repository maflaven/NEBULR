Nebulr.Views.SearchLanding = Backbone.View.extend({
  template: JST['search/landing'],
  className: 'search-landing row',

  initialize: function (options) {
    this.filterData = options.filterData;
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
    this.filterData = $.extend(this.filterData, data);

    Backbone.history.navigate('#/missions/search', { trigger: true });
  }
});
