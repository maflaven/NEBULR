Nebulr.Views.UserIndexItem = Backbone.View.extend({
  template: JST['user/index_item'],

  initialize: function (options) {
    this.mission = options.mission;
    this.listenTo(this.mission, "sync", this.render);
    this.listenTo(this.model, "sync add", this.render);
    this.model.fetch();
  },

  render: function () {
    var thumbnail = "https://www.filepicker.io/api/file/SRJoNkGaS06HpHc1mZpg";
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
