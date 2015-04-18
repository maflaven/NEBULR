Nebulr.Views.UpdateShow = Backbone.View.extend({
  template: JST['update/show'],
  tagName: 'li',
  className: 'update-index-item',

  initialize: function (options) {
    this.currentUserId = options.currentUserId;
    this.mission = options.mission;
    this.mission && this.listenTo(this.mission, "sync", this.render);
  },

  events: {
    'click .delete-update': 'delete'
  },

  render: function () {
    this.setAttributes();

    this.$el.html(this.template({
      currentUserId: this.currentUserId,
      leaderId: this.mission.leader().id,
      thumbnail: this.thumbnail,
      mission: this.mission,
      update: this.model
    }));

    return this;
  },

  setAttributes: function () {
    this.thumbnail = "https://www.filepicker.io/api/file/UuGSt7rqR4aVqjX5K54S";
    if (this.mission.images().first().get('filepicker_url')) {
      this.thumbnail = this.mission.images().first().get('filepicker_url');
    }
  },

  delete: function (event) {
    $(event.currentTarget).prop('disabled', true);
    this.model.destroy();
  }
});
