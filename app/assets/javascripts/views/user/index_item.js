Nebulr.Views.UserIndexItem = Backbone.View.extend({
  template: JST['user/index_item'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});
