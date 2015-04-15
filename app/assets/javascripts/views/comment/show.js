Nebulr.Views.CommentShow = Backbone.View.extend({
  template: JST['comment/show'],
  tagName: 'li',
  className: 'comment-index-item',

  initialize: function (options) {
    this.currentUserId = options.currentUserId;
    this.leaderId = options.leaderId;
    this.userId = options.userId;
    this.setAttributes();
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click .delete-comment': 'delete'
  },

  render: function () {
    this.$el.html(this.template({
      currentUserId: this.currentUserId,
      pageOwnerId: this.pageOwnerId,
      comment: this.model,
      user: this.commenter,
      thumbnail: this.thumbnail
    }));

    return this;
  },

  setAttributes: function () {
    this.pageOwnerId = (this.leaderId ? this.leaderId: this.userId);
    this.commenter = this.model.user();
    this.thumbnail = "https://www.filepicker.io/api/file/PNXcJrvgR82BzwR5rfeO";
    if (this.commenter.get('filepicker_url')) {
      this.thumbnail = this.commenter.get('filepicker_url');
    }
  },

  delete: function (event) {
    $(event.currentTarget).prop('disabled', true);
    this.model.destroy();
  }
});
