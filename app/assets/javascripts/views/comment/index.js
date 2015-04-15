Nebulr.Views.CommentIndex = Backbone.CompositeView.extend({
  template: JST['comment/index'],

  initialize: function (options) {
    this.currentUserId = options.currentUserId;
    this.leaderId = options.leaderId;
    this.userId = options.userId;
    this.listenTo(this.collection, "add", this.addCommentView);
    this.collection.each(this.addCommentView.bind(this));
    this.listenTo(this.collection, "remove", this.removeCommentView);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addCommentView: function (comment) {
    var subview = new Nebulr.Views.CommentShow({
      currentUserId: this.currentUserId,
      leaderId: this.leaderId,
      userId: this.userId,
      model: comment
    });
    this.addSubview('ul', subview);
  },

  removeCommentView: function (comment) {
    var selector = 'ul';
    _(this.subviews(selector)).each(function (subview) {
      if(subview.model == comment) {
        this.removeSubview(selector, subview);
      }
    }.bind(this));
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
