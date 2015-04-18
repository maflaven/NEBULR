Nebulr.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/show'],
  className: 'user-show',

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.listenTo(this.model, "sync", this.render);

    this.enlistedMissionsIndexView = new Nebulr.Views.MissionIndex({
      collection: this.model.enlistedMissions(),
    });
    this.addSubview('.enlisted-missions-index', this.enlistedMissionsIndexView);

    this.commentNewView = new Nebulr.Views.CommentNew({
      userId: this.model.id,
      collection: this.model.comments(),
      model: new Nebulr.Models.Comment(),
      currentUser: this.currentUser
    });
    this.addSubview('.comments-index', this.commentNewView);

    this.commentsIndexView = new Nebulr.Views.CommentIndex({
      collection: this.model.comments(),
      currentUserId: this.currentUser.id,
      user: this.model
    });
    this.addSubview('.comments-index', this.commentsIndexView);
  },

  render: function () {
    this.$el.html(this.template({
      user: this.model,
      isSameUser: this.model.get('is_same_user')
    }));

    this.attachSubviews();
    return this;
  }
});
