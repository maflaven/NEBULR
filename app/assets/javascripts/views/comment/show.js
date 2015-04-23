Nebulr.Views.CommentShow = Backbone.View.extend({
  template: JST['comment/show'],
  tagName: 'li',
  className: 'comment-index-item',

  initialize: function (options) {
    this.currentUserId = options.currentUserId;
    this.mission = options.mission;
    this.user = options.user;
  },

  events: {
    'click .delete-comment': 'delete'
  },

  render: function () {
    this.setAttributes();

    this.$el.html(this.template({
      currentUserId: this.currentUserId,
      pageOwnerId: this.pageOwnerId,
      comment: this.model,
      user: this.commenter,
      thumbnail: this.thumbnail
    }));

    this.$el.fadeIn("fast");
    return this;
  },

  setAttributes: function () {
    if (this.mission) {
      this.pageOwnerId = this.mission.leader().id;
    } else if (this.user) {
      this.pageOwnerId = this.user.id;
    }
    this.commenter = this.model.user();
    this.thumbnail = "https://www.filepicker.io/api/file/PNXcJrvgR82BzwR5rfeO";
    if (this.commenter.get('filepicker_url')) {
      this.thumbnail = this.commenter.get('filepicker_url');
    }
  },

  delete: function (event) {
    $(event.currentTarget).prop('disabled', true);
    this.$el.fadeOut("fast", this.model.destroy.bind(this.model));
  }
});
