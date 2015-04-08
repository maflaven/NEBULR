Nebulr.Views.MissionShow = Backbone.CompositeView.extend({
  template: JST['mission/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ mission: this.model }));

    var leader = this.model.leader();
    var leaderItemView = new Nebulr.Views.UserIndexItem({
      model: leader
    });
    this.addSubview('.mission-leader', leaderItemView);

    var enlistedUsers = this.model.enlistedUsers();
    var enlistedUsersIndexView = new Nebulr.Views.UserIndex({
      collection: enlistedUsers
    });
    this.addSubview('.enlisted-users-index', enlistedUsersIndexView);

    var followingUsers = this.model.followingUsers();
    var followingUsersIndexView = new Nebulr.Views.UserIndex({
      collection: followingUsers
    });
    this.addSubview('.following-users-index', followingUsersIndexView);

    return this;
  }
});
