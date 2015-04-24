Nebulr.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/show'],
  className: 'user-show',

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.listenTo(this.model, "sync", this.render);

    this.itemSize;
    this.currentUser.id == this.model.id ? this.itemSize = 12 : this.itemSize = 6;

    this.enlistedMissionsIndexView = new Nebulr.Views.MissionIndex({
      collection: this.model.enlistedMissions(),
      itemSize: this.itemSize
    });
    this.addSubview('.enlisted-missions-index', this.enlistedMissionsIndexView);

    if (this.itemSize === 12) {
      this.updatesView = new Nebulr.Views.UpdateFeed({
        collection: this.model.feed()
      });
      this.addSubview('.updates', this.updatesView);
    }

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
      isSameUser: this.model.get('is_same_user'),
      itemSize: this.itemSize
    }));

    this.attachSubviews();
    return this;
  }
});
