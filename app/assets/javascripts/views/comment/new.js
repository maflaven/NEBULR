Nebulr.Views.CommentNew = Backbone.View.extend({
  template: JST['comment/form'],
  tagName: 'div',
  className: 'comment-new-form',

  initialize: function (options) {
    this.missionId = options.missionId;
    this.userId = options.userId;
    this.currentUser = options.currentUser;
  },

  events: {
    'click .create-comment': 'create'
  },

  render: function () {
    this.$el.html(this.template({ comment: this.model }));
    return this;
  },

  create: function (event) {
    event.preventDefault();
    var $button = $(event.currentTarget);
    $button.prop('disabled', true);

    var data = $(event.currentTarget.parentElement).serializeJSON();
    if (this.missionId) {
      data = $.extend(data, {
        commentable_id: this.missionId,
        commentable_type: 'Mission',
        user: this.currentUser
      });
    } else {
      data = $.extend(data, {
        commentable_id: this.userId,
        commentable_type: 'User',
        user: this.currentUser
      });
    }

    this.model.set(data, { parse: true });
    this.model.save({}, {
      success: function (model, response, options) {
        this.collection.add(this.model);
        this.model = new Nebulr.Models.Comment();
        this.render();
      }.bind(this)
    });
  }
});
