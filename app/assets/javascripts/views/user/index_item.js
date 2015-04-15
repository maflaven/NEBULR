Nebulr.Views.UserIndexItem = Backbone.View.extend({
  template: JST['user/index_item'],

  initialize: function () {
    this.listenTo(this.model, "sync add", this.render);
    this.model.fetch();
  },

  render: function () {
    var thumbnail = "https://www.filepicker.io/api/file/PNXcJrvgR82BzwR5rfeO";
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
