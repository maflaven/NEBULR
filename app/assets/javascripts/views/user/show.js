Nebulr.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/show'],
  className: 'user-show',

  initialize: function (options) {
    this.currentUserId = options.currentUserId;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var isCurrentUser = false;
    if (this.currentUserId == this.model.id) {
      isCurrentUser = true;
    }

    this.$el.html(this.template({
      user: this.model,
      isCurrentUser: isCurrentUser
    }));

    var enlistedMissions = this.model.enlistedMissions();
    var enlistedMissionsIndexView = new Nebulr.Views.MissionIndex({
      collection: enlistedMissions
    });
    this.addSubview('.enlisted-missions-index', enlistedMissionsIndexView);

    var followedMissions = this.model.followedMissions();
    var followedMissionsIndexView = new Nebulr.Views.MissionIndex({
      collection: followedMissions
    });
    this.addSubview('.followed-missions-index', followedMissionsIndexView);

    return this;
  }
});
