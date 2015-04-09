Nebulr.Views.UserIndexItem = Backbone.View.extend({
  template: JST['user/index_item'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },

  render: function () {
    var thumbnail = "/assets/q.jpg";
    if (this.model.get('filepicker_url')) {
      thumbnail = this.model.get('filepicker_url');
    }

    this.$el.html(this.template({
      user: this.model,
      thumbnail: thumbnail
    }));
    return this;
  }
});
