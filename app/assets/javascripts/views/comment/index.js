Nebulr.Views.CommentIndex = Backbone.View.extend({
  template: JST['comment/index'],
  tagName: 'ul',

  initialize: function (options) {
    this.currentUserId = options.currentUserId;
    this.leaderId = options.leaderId;
    this.userId = options.userId;
    this.listenTo(this.collection, "add remove", this.render);
  },

  events: {
    'click .delete-comment': 'delete'
  },

  render: function () {
    this.$el.html(this.template());

    var pageOwnerId = (this.leaderId ? this.leaderId : this.userId);

    var that = this;
    this.collection.each( function (comment) {
      var commentIndexItem = JST['comment/index_item']({
        currentUserId: that.currentUserId,
        pageOwnerId: pageOwnerId,
        comment: comment
      });
      var $li = $('<li class="comment-index-item">').html(commentIndexItem);
      $li.data('id', comment.id);

      var commenter = comment.user();
      var thumbnail = "/assets/q.jpg";
      if (commenter.get('filepicker_url')) {
        thumbnail = commenter.get('filepicker_url');
      }
      $li.prepend(JST['user/index_item']({
        user: commenter,
        thumbnail: thumbnail
      }));

      that.$el.append($li);
    });

    return this;
  },

  delete: function (event) {
    event.preventDefault();
    $(event.currentTarget).prop('disabled', true);
    var commentId = $(event.currentTarget.parentElement).data('id');
    var comment = this.collection.get(commentId);
    comment.destroy({
      success: function () {
        this.collection.remove(comment);
      }.bind(this)
    });
  }
});
