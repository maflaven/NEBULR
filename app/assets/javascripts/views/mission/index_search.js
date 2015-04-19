Nebulr.Views.MissionIndexSearch = Backbone.View.extend({
  template: JST['mission/index_search'],
  className: 'mission-index-search',

  initialize: function (options) {
    this.collection = options.collection;
    this.missionIndexView = new Nebulr.Views.MissionIndex({
      collection: this.collection,
      itemSize: 6
    });
    this.form = $('#mission-title-search');
    this.form.on('submit', this.searchMissions.bind(this));
  },

  render: function () {
    this.form.html(this.template());
    this.$el.html(this.missionIndexView.$el);
    return this;
  },

  searchMissions: function (event) {
    event.preventDefault();
    this.filterData = this.form.serializeJSON();
    this.collection.fetch({
      data: { search: this.filterData }
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.form.empty();
    this.missionIndexView.remove();
  }
});
