Nebulr.Views.UpdateFeed = Backbone.CompositeView.extend({
  template: JST['update'],
  className: 'updates-index',

  initialize: function (options) {
    this.listenTo(this.collection, "add", this.addUpdateView);
    this.collection.each(this.addUpdateView.bind(this));
    this.listenTo(this.collection, "remove", this.removeUpdateView);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addUpdateView: function (update) {
    var subview = new Nebulr.Views.UpdateShow({
      mission: update.mission(),
      model: update
    });
    this.addSubview('ul', subview);
  },

  removeUpdateView: function (update) {
    this.removeModelSubview('ul', update);
  }
});
