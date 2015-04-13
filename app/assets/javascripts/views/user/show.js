Nebulr.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/show'],
  className: 'user-show',

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var isCurrentUser = false;
    if (this.currentUser.id == this.model.id) {
      isCurrentUser = true;
    }

    this.$el.html(this.template({
      user: this.model,
      isCurrentUser: isCurrentUser
    }));

    var enlistedMissions = this.model.enlistedMissions();
    var enlistedMissionsIndexView = new Nebulr.Views.MissionIndex({
      collection: enlistedMissions,
      itemSize: 2
    });
    this.addSubview('.enlisted-missions-index', enlistedMissionsIndexView);

    var followedMissions = this.model.followedMissions();
    var followedMissionsIndexView = new Nebulr.Views.MissionIndex({
      collection: followedMissions,
      itemSize: 2
    });
    this.addSubview('.followed-missions-index', followedMissionsIndexView);

    var commentNewModel = new Nebulr.Models.Comment();
    var commentNewView = new Nebulr.Views.CommentNew({
      userId: this.model.id,
      collection: this.model.comments(),
      model: commentNewModel,
      currentUser: this.currentUser
    });
    this.addSubview('.comments-index', commentNewView);

    var commentsIndexView = new Nebulr.Views.CommentIndex({
      collection: this.model.comments(),
      currentUserId: this.currentUser.id,
      userId: this.model.id
    });
    this.addSubview('.comments-index', commentsIndexView);

    return this;
  }
});
