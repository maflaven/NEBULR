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
    'submit .comment-form': 'create'
  },

  render: function () {
    if (this.currentUser.id) {
      this.$el.html(this.template({ comment: this.model }));
    }
    return this;
  },

  create: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    $btn = $form.find('.create-comment-btn');
    $btn.prop('disabled', true);

    var data = $form.serializeJSON();
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
      }.bind(this),
      error: function () {
        $btn.prop('disabled', false);
      }
    });
  }
});
